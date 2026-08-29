(function (window) {
  'use strict';

  const NS = window.ShowroomWebMCP = window.ShowroomWebMCP || {};

  function response(data) {
    return { content: [{ type: 'text', text: JSON.stringify(data) }], structuredContent: data };
  }

  function isUrgent(value) {
    return typeof value === 'string' && /^(urgent|urgente|emergency|emergenza)$/i.test(value.trim());
  }

  function isLocal(value) {
    return typeof value === 'string' && /(ceprano|frosinone|ciociaria)/i.test(value);
  }

  function definitions() {
    const serviceIds = NS.services.ids.slice();
    return [
      {
        name: 'get_business_info',
        description: 'Restituisce informazioni canoniche su Show Room La Finestra, sede, area operativa, sopralluoghi, preventivi, assistenza e contatti.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: function () { return response(NS.company); }
      },
      {
        name: 'list_services',
        description: 'Elenca i servizi disponibili presso Show Room La Finestra con identificatori e descrizioni sintetiche.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: function () { return response({ services: NS.services.list() }); }
      },
      {
        name: 'get_service_details',
        description: 'Restituisce dettagli affidabili su uno specifico servizio di Show Room La Finestra.',
        inputSchema: {
          type: 'object',
          properties: { service: { type: 'string', enum: serviceIds, description: 'Identificatore del servizio.' } },
          required: ['service'], additionalProperties: false
        },
        annotations: { readOnlyHint: true },
        execute: function (input) {
          const service = NS.services.get(input && input.service);
          if (!service) throw new Error('service_not_found');
          return response(service);
        }
      },
      {
        name: 'get_contact_options',
        description: 'Suggerisce i canali di contatto in base a intento, urgenza e località senza promettere tempi di intervento.',
        inputSchema: {
          type: 'object',
          properties: {
            intent: { type: 'string', enum: ['information', 'quote', 'inspection', 'assistance', 'custom_project'] },
            urgency: { type: 'string', description: 'Livello di urgenza dichiarato dall\'utente.' },
            location: { type: 'string', description: 'Località indicata dall\'utente.' }
          },
          additionalProperties: false
        },
        annotations: { readOnlyHint: true },
        execute: function (input) {
          const urgent = isUrgent(input && input.urgency);
          const local = isLocal(input && input.location);
          return response({
            email: NS.company.contacts.email,
            phone: NS.company.contacts.phone,
            whatsapp: NS.company.contacts.whatsapp,
            can_prepare_contact_request: true,
            recommended_channel: urgent ? 'phone_or_whatsapp' : 'contact_request_or_email',
            priority_reason: urgent && local ? 'Assistenza urgente nell\'area vicina a Ceprano.' : null,
            assistance_note: urgent ? 'L\'azienda offre assistenza rapida nella zona; disponibilità e tempo effettivo di intervento devono essere confermati dall\'azienda.' : null
          });
        }
      },
      {
        name: 'prepare_contact_request',
        description: 'Valida i dati e prepara l\'esatto riepilogo della richiesta da mostrare all\'utente. Non invia nulla e richiede conferma esplicita.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Nome e cognome del cliente.' },
            email: { type: 'string', format: 'email', description: 'Email alla quale l\'azienda può rispondere.' },
            phone: { type: 'string', description: 'Recapito telefonico facoltativo.' },
            location: { type: 'string', description: 'Località dell\'intervento o progetto.' },
            service: { type: 'string', enum: serviceIds },
            intent: { type: 'string', enum: ['information', 'quote', 'inspection', 'assistance', 'custom_project'] },
            urgency: { type: 'string', enum: ['normal', 'urgent'] },
            message: { type: 'string', description: 'Richiesta del cliente, senza aggiunte inventate.' }
          },
          required: ['name', 'email', 'message'], additionalProperties: false
        },
        execute: function (input) { return response(NS.contact.prepare(input || {})); }
      },
      {
        name: 'submit_contact_request',
        description: 'Invia tramite il modulo Joomla esistente esclusivamente il payload già preparato e mostrato, solo dopo conferma esplicita.',
        inputSchema: {
          type: 'object',
          properties: {
            requestId: { type: 'string', description: 'Identificatore restituito da prepare_contact_request.' },
            confirmed: { type: 'boolean', description: 'Deve essere true dopo la conferma esplicita dell\'utente.' }
          },
          required: ['requestId', 'confirmed'], additionalProperties: false
        },
        execute: async function (input) {
          return response(await NS.contact.submitPreparedRequest(input && input.requestId, input && input.confirmed));
        }
      }
    ];
  }

  async function registerAll() {
    if (NS.registered) return;
    if (!document.modelContext || typeof document.modelContext.registerTool !== 'function') return;
    const toolDefinitions = definitions();
    const controller = new AbortController();
    try {
      for (const tool of toolDefinitions) await document.modelContext.registerTool(tool, { signal: controller.signal });
      NS.toolAbortController = controller;
      NS.registered = true;
      NS.registeredToolNames = Object.freeze(toolDefinitions.map(function (tool) { return tool.name; }));
    } catch (error) {
      controller.abort();
      throw error;
    }
  }

  NS.tools = Object.freeze({ definitions: definitions, registerAll: registerAll });
})(window);
