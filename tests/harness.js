(async function (window, document) {
  'use strict';
  const results = [];

  function assert(condition, label) {
    if (!condition) throw new Error(label);
    results.push('PASS — ' + label);
  }

  async function rejects(action, label) {
    try { await action(); } catch (error) { results.push('PASS — ' + label); return; }
    throw new Error(label);
  }

  let executableTools;

  function tool(name) {
    const found = executableTools.get(name);
    if (!found) throw new Error('tool missing: ' + name);
    return found;
  }

  try {
    await window.ShowroomWebMCP.bootPromise;
    await new Promise(function (resolve, reject) {
      const duplicateLoader = document.createElement('script');
      duplicateLoader.src = '../webmcp/loader.js';
      duplicateLoader.onload = resolve;
      duplicateLoader.onerror = reject;
      document.head.appendChild(duplicateLoader);
    });
    const expectedNames = ['get_business_info', 'list_services', 'get_service_details', 'get_contact_options', 'prepare_contact_request', 'submit_contact_request'];
    const discoveredTools = await document.modelContext.getTools();
    const discoveredNames = discoveredTools.map(function (item) { return item.name; });
    executableTools = new Map(window.ShowroomWebMCP.tools.definitions().map(function (item) { return [item.name, item]; }));
    assert(discoveredNames.length === 6, 'registrati esattamente sei tool nell\'API WebMCP nativa');
    assert(window.ShowroomWebMCP.registeredToolNames.length === 6, 'secondo loader non duplica le registrazioni');
    assert(expectedNames.every(function (name) { return discoveredNames.indexOf(name) !== -1; }), 'nomi tool corretti e discoverable');

    const business = tool('get_business_info').execute({}).structuredContent;
    assert(business.name === 'Show Room La Finestra', 'dati aziendali canonici');
    assert(business.inspection.free && business.quote.free, 'sopralluogo e preventivo gratuiti');

    const services = tool('list_services').execute({}).structuredContent.services;
    assert(services.length === 7, 'elencati sette servizi');
    const aluminium = tool('get_service_details').execute({ service: 'infissi_alluminio' }).structuredContent;
    assert(aluminium.notes[0].indexOf('officina Show Room La Finestra') !== -1, 'nota produzione interna alluminio');
    assert(business.policies.prices.indexOf('Non esistono prezzi standard') === 0, 'scenario infissi non inventa prezzi');
    const panoramic = tool('get_service_details').execute({ service: 'vetrate_panoramiche' }).structuredContent;
    const openHouse = tool('get_service_details').execute({ service: 'open_house' }).structuredContent;
    assert(panoramic.features.indexOf('Luminosità') !== -1 && openHouse.uses.length > 0, 'scenario terrazzo espone vetrate e Open House');

    const urgent = tool('get_contact_options').execute({ urgency: 'urgent', location: 'Ceprano' }).structuredContent;
    assert(urgent.recommended_channel === 'phone_or_whatsapp', 'urgenza locale indirizzata a telefono o WhatsApp');
    assert(urgent.assistance_note.indexOf('devono essere confermati') !== -1, 'nessuna promessa automatica sui tempi');

    const input = {
      name: 'Utente Demo', email: 'demo@example.invalid', phone: '+39 000 000 0000', location: 'Frosinone',
      service: 'infissi_pvc', intent: 'quote', urgency: 'normal', message: 'Vorrei un sopralluogo gratuito.'
    };
    const prepared = tool('prepare_contact_request').execute(input).structuredContent;
    assert(prepared.requires_confirmation === true, 'prepare richiede conferma');
    assert(prepared.preview.message.indexOf('Vorrei un sopralluogo gratuito.') !== -1, 'preview contiene il messaggio finale');
    await rejects(function () {
      return tool('prepare_contact_request').execute({ name: 'Utente Demo', email: 'non-valida', message: 'Test' });
    }, 'prepare rifiuta email non valida');

    const fixture = new DOMParser().parseFromString(
      '<!doctype html><html><head><script type="application/json" class="joomla-script-options">{"csrf.token":"testcsrf"}<\/script></head><body>' +
      '<form id="contact-form" method="post" action="' + window.location.origin + window.ShowroomWebMCP.contact.contactPage + '">' +
      '<input id="jform_contact_name"><input id="jform_contact_email"><input id="jform_contact_emailmsg"><textarea id="jform_contact_message"></textarea>' +
      '<input type="hidden" name="option" value="com_contact"><input type="hidden" name="task" value="contact.submit">' +
      '<input type="hidden" name="testcsrf" value="1"><button type="submit">Invia email</button></form></body></html>',
      'text/html'
    );
    const mapped = window.ShowroomWebMCP.contact.populateJoomlaForm(fixture, {
      name: prepared.preview.name, email: prepared.preview.email, subject: prepared.preview.subject, message: prepared.preview.message
    });
    assert(mapped.tokenName === 'testcsrf' && mapped.form.elements.namedItem('task').value === 'contact.submit', 'adapter conserva routing e token Joomla correnti');
    assert(mapped.form.querySelector('#jform_contact_message').value === prepared.preview.message, 'adapter mappa esattamente il payload confermato');

    const cancelled = tool('prepare_contact_request').execute({
      name: 'Utente Annullamento', email: 'annullamento@example.invalid', message: 'Richiesta da annullare.'
    }).structuredContent;
    await rejects(function () {
      return window.ShowroomWebMCP.contact.submitPreparedRequest(cancelled.requestId, false);
    }, 'submit senza conferma rifiutato e richiesta annullata');
    await rejects(function () {
      return window.ShowroomWebMCP.contact.submitPreparedRequest(cancelled.requestId, true);
    }, 'requestId annullato non è riutilizzabile');
    await rejects(function () {
      return window.ShowroomWebMCP.contact.submitPreparedRequest('missing-request', true);
    }, 'requestId inesistente rifiutato');

    input.message = 'Tentativo di alterazione dopo la preview';
    let capturedPayload = null;
    const fakeTransport = async function (payload) {
      capturedPayload = payload;
      return { submitted: true, channel: 'test_transport_no_email' };
    };
    const result = await window.ShowroomWebMCP.contact.submitPreparedRequest(prepared.requestId, true, fakeTransport);
    assert(result.submitted === true, 'submit confermato usa il trasporto controllato di test');
    assert(capturedPayload.message === prepared.preview.message, 'payload inviato identico alla preview confermata');
    assert(capturedPayload.message.indexOf('Tentativo di alterazione') === -1, 'input successivamente alterato ignorato');
    await rejects(function () {
      return window.ShowroomWebMCP.contact.submitPreparedRequest(prepared.requestId, true, fakeTransport);
    }, 'requestId già utilizzato rifiutato');

    results.push('PASS — nessuna email reale inviata');
    document.getElementById('results').textContent = results.join('\n');
    document.body.dataset.status = 'pass';
  } catch (error) {
    results.push('FAIL — ' + error.message);
    document.getElementById('results').textContent = results.join('\n');
    document.body.dataset.status = 'fail';
    throw error;
  }
})(window, document);
