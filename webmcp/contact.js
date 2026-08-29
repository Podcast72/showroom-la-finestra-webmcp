(function (window) {
  'use strict';

  const NS = window.ShowroomWebMCP = window.ShowroomWebMCP || {};
  const CONTACT_PAGE = '/richiedi-preventivo-open-house-lafinestra.html';
  const SUBJECT = 'Richiesta cliente tramite Assistente WebMCP — Show Room La Finestra';
  const STORAGE_PREFIX = 'showroom_webmcp_contact_';
  const TTL_MS = 30 * 60 * 1000;
  const pending = new Map();
  const allowedServices = ['open_house', 'vetrate_panoramiche', 'tende_da_sole', 'infissi_pvc', 'infissi_alluminio', 'porte_blindate', 'carpenteria'];
  const allowedIntents = ['information', 'quote', 'inspection', 'assistance', 'custom_project'];
  const allowedUrgencies = ['normal', 'urgent'];

  function cleanText(value, maxLength) {
    return typeof value === 'string'
      ? value.replace(/\r\n?/g, '\n').replace(/[\t ]+/g, ' ').trim().slice(0, maxLength)
      : '';
  }

  function requiredText(value, field, maxLength) {
    const normalized = cleanText(value, maxLength);
    if (!normalized) throw new Error('invalid_' + field + ': campo obbligatorio');
    return normalized;
  }

  function optionalEnum(value, field, allowed) {
    if (value === undefined || value === null || value === '') return '';
    if (typeof value !== 'string' || allowed.indexOf(value) === -1) {
      throw new Error('invalid_' + field + ': valore non supportato');
    }
    return value;
  }

  function validateEmail(value) {
    const email = requiredText(value, 'email', 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid_email: formato non valido');
    return email;
  }

  function createRequestId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
    }
    throw new Error('secure_request_id_unavailable');
  }

  function buildMessage(data) {
    const lines = ['Richiesta tramite Assistente WebMCP', ''];
    if (data.service) lines.push('Servizio: ' + data.service);
    if (data.intent) lines.push('Tipo richiesta: ' + data.intent);
    if (data.location) lines.push('Località: ' + data.location);
    if (data.phone) lines.push('Telefono: ' + data.phone);
    if (data.urgency) lines.push('Urgenza: ' + data.urgency);
    if (lines[lines.length - 1] !== '') lines.push('');
    lines.push('Messaggio del cliente:', data.customerMessage);
    return lines.join('\n');
  }

  function storageKey(requestId) { return STORAGE_PREFIX + requestId; }

  function safeStore(record) {
    try {
      window.sessionStorage.setItem(storageKey(record.requestId), JSON.stringify(record));
    } catch (error) {
      throw new Error('temporary_storage_unavailable');
    }
  }

  function safeRemove(requestId) {
    pending.delete(requestId);
    try { window.sessionStorage.removeItem(storageKey(requestId)); } catch (error) { /* In-memory copy removed. */ }
  }

  function loadRecord(requestId) {
    if (pending.has(requestId)) return pending.get(requestId);
    try {
      const raw = window.sessionStorage.getItem(storageKey(requestId));
      if (!raw) return null;
      const record = JSON.parse(raw);
      if (!record || record.requestId !== requestId) return null;
      pending.set(requestId, record);
      return record;
    } catch (error) {
      return null;
    }
  }

  function purgeExpired() {
    const now = Date.now();
    const expired = [];
    try {
      for (let index = 0; index < window.sessionStorage.length; index += 1) {
        const key = window.sessionStorage.key(index);
        if (!key || key.indexOf(STORAGE_PREFIX) !== 0) continue;
        const requestId = key.slice(STORAGE_PREFIX.length);
        const record = loadRecord(requestId);
        if (!record || now - record.createdAt > TTL_MS) expired.push(requestId);
      }
    } catch (error) {
      return;
    }
    expired.forEach(safeRemove);
  }

  function prepare(input) {
    purgeExpired();
    const data = {
      name: requiredText(input && input.name, 'name', 120),
      email: validateEmail(input && input.email),
      phone: cleanText(input && input.phone, 60),
      location: cleanText(input && input.location, 240),
      service: optionalEnum(input && input.service, 'service', allowedServices),
      intent: optionalEnum(input && input.intent, 'intent', allowedIntents),
      urgency: optionalEnum(input && input.urgency, 'urgency', allowedUrgencies),
      customerMessage: requiredText(input && input.message, 'message', 5000)
    };
    const requestId = createRequestId();
    const payload = { name: data.name, email: data.email, subject: SUBJECT, message: buildMessage(data) };
    const preview = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      location: data.location || null,
      service: data.service || null,
      intent: data.intent || null,
      urgency: data.urgency || null,
      subject: payload.subject,
      message: payload.message
    };
    const record = { requestId: requestId, createdAt: Date.now(), status: 'prepared', payload: payload, preview: preview };
    pending.set(requestId, record);
    safeStore(record);
    return { requestId: requestId, preview: preview, requires_confirmation: true, expires_in_minutes: TTL_MS / 60000 };
  }

  function findField(form, selector) {
    const field = form.querySelector(selector);
    if (!field) throw new Error('joomla_form_changed: campo mancante ' + selector);
    return field;
  }

  function populateJoomlaForm(frameDocument, payload) {
    const form = frameDocument.querySelector('#contact-form');
    if (!form || form.method.toLowerCase() !== 'post') throw new Error('joomla_form_changed: modulo non disponibile');
    const action = new URL(form.action, frameDocument.baseURI);
    if (action.origin !== window.location.origin) throw new Error('joomla_form_changed: action non same-origin');

    findField(form, '#jform_contact_name').value = payload.name;
    findField(form, '#jform_contact_email').value = payload.email;
    findField(form, '#jform_contact_emailmsg').value = payload.subject;
    findField(form, '#jform_contact_message').value = payload.message;

    const optionsElement = frameDocument.querySelector('script.joomla-script-options');
    let tokenName = '';
    try {
      tokenName = JSON.parse(optionsElement && optionsElement.textContent || '{}')['csrf.token'] || '';
    } catch (error) {
      throw new Error('joomla_form_changed: opzioni Joomla non valide');
    }
    const token = tokenName && form.elements.namedItem(tokenName);
    if (!token || token.value !== '1') throw new Error('joomla_form_changed: token CSRF non disponibile');

    const button = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!button) throw new Error('joomla_form_changed: pulsante submit non disponibile');
    return { form: form, button: button, tokenName: tokenName };
  }

  function submitViaJoomla(payload) {
    return new Promise(function (resolve, reject) {
      const iframe = document.createElement('iframe');
      let phase = 'loading';
      let finished = false;
      const timeout = window.setTimeout(function () { finish(new Error('contact_form_timeout')); }, 30000);

      function finish(error, result) {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeout);
        iframe.remove();
        if (error) reject(error); else resolve(result);
      }

      iframe.hidden = true;
      iframe.setAttribute('aria-hidden', 'true');
      iframe.setAttribute('title', 'Invio richiesta Show Room La Finestra');
      iframe.addEventListener('load', function () {
        try {
          const frameDocument = iframe.contentDocument;
          if (!frameDocument) throw new Error('contact_form_same_origin_required');
          if (phase === 'loading') {
            const mapped = populateJoomlaForm(frameDocument, payload);
            phase = 'submitted';
            if (typeof mapped.form.requestSubmit === 'function') mapped.form.requestSubmit(mapped.button);
            else mapped.button.click();
            return;
          }
          const pageText = (frameDocument.body && frameDocument.body.textContent || '').toLowerCase();
          const success = frameDocument.querySelector('.alert-success, .joomla-alert--success, [type="success"]') || pageText.indexOf('grazie per la tua email') !== -1;
          if (!success) throw new Error('contact_form_submission_not_confirmed');
          finish(null, { submitted: true, channel: 'existing_joomla_contact_form' });
        } catch (error) {
          finish(error);
        }
      });
      iframe.addEventListener('error', function () { finish(new Error('contact_form_load_failed')); });
      iframe.src = CONTACT_PAGE;
      document.body.appendChild(iframe);
    });
  }

  async function submitPreparedRequest(requestId, confirmed, transport) {
    purgeExpired();
    if (confirmed !== true) {
      if (confirmed === false && typeof requestId === 'string' && requestId) safeRemove(requestId);
      throw new Error('confirmation_required: confirmed deve essere true');
    }
    if (typeof requestId !== 'string' || !requestId) throw new Error('invalid_request_id');
    const record = loadRecord(requestId);
    if (!record) throw new Error('request_not_found_or_expired');
    if (Date.now() - record.createdAt > TTL_MS) {
      safeRemove(requestId);
      throw new Error('request_not_found_or_expired');
    }
    if (record.status !== 'prepared') throw new Error('request_already_used_or_in_progress');

    record.status = 'submitting';
    safeStore(record);
    try {
      const send = typeof transport === 'function' ? transport : submitViaJoomla;
      const result = await send(Object.freeze(Object.assign({}, record.payload)));
      safeRemove(requestId);
      return Object.assign({ requestId: requestId }, result);
    } catch (error) {
      record.status = 'prepared';
      safeStore(record);
      throw error;
    }
  }

  function cancelPreparedRequest(requestId) {
    safeRemove(requestId);
    return { cancelled: true, requestId: requestId };
  }

  purgeExpired();
  NS.contact = Object.freeze({
    subject: SUBJECT,
    contactPage: CONTACT_PAGE,
    prepare: prepare,
    populateJoomlaForm: populateJoomlaForm,
    submitPreparedRequest: submitPreparedRequest,
    cancelPreparedRequest: cancelPreparedRequest
  });
})(window);
