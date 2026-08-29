# Show Room La Finestra — WebMCP

This project makes an existing Joomla + Gantry 5 website agent-ready through progressive enhancement. Human visitors keep using the site as they do today; compatible agents can discover structured business information, services, contact options and a confirmation-gated contact workflow.

## What it does

The integration registers exactly six imperative WebMCP tools through `document.modelContext`:

- `get_business_info`
- `list_services`
- `get_service_details`
- `get_contact_options`
- `prepare_contact_request`
- `submit_contact_request`

It is not a chatbot. It exposes the website's existing capabilities as structured tools.

## Architecture

```text
Joomla / Gantry 5
       ↓
one script include
       ↓
/webmcp/loader.js
       ↓
document.modelContext
       ↓
six structured tools
       ↓
existing Joomla contact form
```

Only this line is required in the Gantry home outline:

```html
<script src="/webmcp/loader.js" defer></script>
```

The deployable files are:

```text
/webmcp/
├── loader.js
├── company.js
├── services.js
├── tools.js
└── contact.js
```

No framework, package manager, build pipeline, external MCP server, new backend, database, external API or LLM API is used.

## Progressive enhancement

`loader.js` checks for `document.modelContext.registerTool`. If WebMCP is unavailable it returns immediately, loads no other integration files and leaves the normal site unchanged. Initialization failures are contained and do not affect the Joomla UI.

Append `?webmcp_debug=1` to a page URL for generic initialization messages. Debug output never contains customer data.

## Safe contact workflow

`prepare_contact_request` validates and normalizes the customer data, builds the exact Joomla payload, stores it temporarily in browser `sessionStorage`, and returns a preview plus `requires_confirmation: true`. It does not transmit anything.

`submit_contact_request` accepts only the `requestId` and a boolean `confirmed`. It refuses the call unless `confirmed === true`, cancels the temporary request when the user explicitly answers false, cannot accept a replacement message, blocks concurrent or repeated use, and removes a successfully used request. Prepared requests expire after 30 minutes.

The adapter in `contact.js` loads the real same-origin Joomla contact page in a temporary hidden iframe, finds `#contact-form`, keeps its current hidden fields and CSRF token, fills the four existing fields, and uses the form's native submit behavior. It does not hardcode a token or reproduce the Joomla endpoint.

## Verified Joomla form contract

Read-only inspection on 29 August 2026 found:

- page: `https://www.showroomlafinestra.com/richiedi-preventivo-open-house-lafinestra.html`
- form: `#contact-form`
- method: `POST`
- action: `/richiedi-preventivo-open-house-lafinestra.html`
- fields: `jform[contact_name]`, `jform[contact_email]`, `jform[contact_subject]`, `jform[contact_message]`
- hidden routing: `option=com_contact`, `task=contact.submit`, empty `return`, contact `id`
- CSRF: dynamic hidden field; never hardcoded by this project
- client validation: Joomla `form-validate` / `validate` behavior

Because live website markup can change, the adapter fails closed if the expected form, fields, POST method, submit control or current CSRF field is missing.

## Tests

Serve this repository as static files and open:

- `tests/no-webmcp.html` — verifies silent fallback without WebMCP.
- `tests/harness.html` — uses the browser's native `document.modelContext` to verify discovery, canonical data, seven services, urgent local guidance, preview creation, confirmation refusal, invalid and reused request IDs, and payload immutability.

The confirmed-submit test uses an in-memory test transport. It does not load the public Joomla form and does not send an email.

The first real form submission must be performed only after Roberto's explicit authorization.

## Deployment

1. Upload the five files in `webmcp/` to the same origin as the Joomla site, preserving the `/webmcp/` URL.
2. Add the single deferred loader tag to the Gantry 5 home outline or a site-wide custom JavaScript atom.
3. Clear Joomla/Gantry caches.
4. Verify normal pages in a browser without WebMCP.
5. Verify tool discovery in a compatible secure-context browser.
6. Stop before the first real contact submission and obtain explicit authorization.

No Joomla Core or database modification is required.

## Safety and privacy

- Customer data stays in the browser until the confirmed native Joomla submission.
- No customer data is sent to third-party services or written to a new database.
- No production console log contains personal data.
- Prices, timing, incentives and warranties are not invented.
- Local assistance guidance is explicitly non-binding; actual availability and timing must be confirmed by the company.

## Repository hygiene

Do not commit hosting, FTP or Joomla credentials, customer data, API keys, tokens or other private configuration. The project is licensed under the MIT License.
