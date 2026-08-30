# The Website That Speaks AI

> **The web already has an interface for humans. We built the layer for agents.**

**We are not teaching the agent how to use the website.  
We are teaching the website how to introduce the business to the agent.**

This project explores a simple idea:

**What if an existing website could speak directly to an AI agent?**

Not through screen scraping.  
Not through DOM guessing.  
Not through a separate MCP server.

Instead, the website itself exposes structured knowledge, capabilities, constraints and safe actions directly to compatible agents through WebMCP.

**Website knowledge → Agent understanding → Reasoning → Human confirmation → Safe action**

---

## The Core Idea

A conventional website already contains valuable business knowledge:

- who the company is;
- what it does;
- which services it provides;
- where it operates;
- what rules and constraints apply;
- how customers can contact it;
- which actions are possible.

Humans understand this information by reading pages and navigating the interface.

AI agents should not have to reconstruct the same meaning by guessing from visual structure or browser interactions.

**The website should be able to explain itself.**

WebMCP becomes an **Agent Interface Layer** added directly to the existing website.

For humans, the website remains unchanged.

For compatible agents, the same website becomes a structured source of knowledge and controlled capabilities.

---

# Four Design Principles

## 1. No MCP Server Required

**No separate MCP server.  
No external agent infrastructure.  
No additional service for the agent to configure or discover.**

The WebMCP capabilities live directly on the existing production website.

When a compatible client visits a page where WebMCP is enabled, the website exposes its own structured business knowledge and capabilities through:

```javascript
document.modelContext
```

The agent does not connect to an MCP server somewhere else.

**It visits the website — and the website speaks for itself.**

---

## 2. Easy to Add to an Existing Website

This project was added to a real Joomla + Gantry 5 production website without rebuilding it.

The existing website continues to operate normally for its customers.

The integration requires only a deferred script include on the pages where agent capabilities are needed:

```html
<script src="/webmcp/loader.js" defer></script>
```

No Joomla Core modification.

No database modification.

No new framework.

No package manager.

No build pipeline.

No external API.

No LLM API.

No separate MCP server.

**A traditional website can become agent-ready through progressive enhancement instead of being replaced.**

---

## 3. The Website Speaks Directly to the Agent

The goal is not to teach an AI how to navigate a website more efficiently.

The goal is to let the website expose its meaning directly.

Instead of asking the agent to infer:

> “What company is this?”

the website can provide structured business information.

Instead of asking:

> “Which services are available?”

the website can expose an explicit service list.

Instead of making the agent guess:

> “Can I contact this company, and what information is required?”

the website can expose a bounded contact workflow with validation and confirmation requirements.

This changes the relationship from:

**Agent → interprets website**

to:

**Website → explains itself to agent**

---

## 4. Page-Scoped Agent Context

WebMCP is intentionally **not enabled globally across the entire website**.

This is a design decision.

A website contains different pages because different pages have different purposes.

The same principle can apply to agents.

Each page can expose its own dedicated:

- knowledge;
- context;
- tools;
- rules;
- constraints;
- actions.

An agent therefore does not need to receive one large generic interface containing everything the website can possibly do.

It can receive a **context-specific interface based on the page it is currently visiting**.

For example:

### Homepage

Can expose:

- company identity;
- business description;
- operating area;
- available services;
- general business rules.

### Service page

Can expose:

- detailed service knowledge;
- technical information;
- service-specific constraints;
- relevant recommendations;
- service-specific actions.

### Contact page

Can expose:

- contact options;
- required customer information;
- request preparation;
- confirmation requirements;
- safe submission actions.

### Other pages

Can expose **nothing at all** if there is no useful agent interaction.

That is intentional.

**WebMCP only where it makes sense.**

The current challenge implementation demonstrates this approach on the **Home** and **Contact** areas rather than injecting agent capabilities indiscriminately across every page.

The architecture can progressively extend the same pattern to other pages when useful.

In other words:

**The website does not need one global AI interface.**

**Every page can become its own AI interface.**

This keeps agent context:

- smaller;
- more relevant;
- easier to reason about;
- easier to maintain;
- easier to control;
- safer to extend.

**Page → Context → Knowledge → Tools → Safe Actions**

For humans, pages organize information.

**For agents, pages can organize capabilities.**

---

# One Website. Two Interfaces.

The existing website remains a normal business website for human visitors.

Nothing about the customer experience needs to change.

```text
                    EXISTING WEBSITE
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
       HUMAN INTERFACE             AGENT INTERFACE
        Joomla / Gantry               WebMCP
             │                           │
             ▼                           ▼
      Pages and forms        Knowledge + Tools + Rules
```

**One website. Two interfaces: Humans + AI.**

---

# WebMCP Challenge Submission

Show Room La Finestra is a real Italian business with an existing production website.

The Joomla website existed before The WebMCP Challenge.

The WebMCP agent-facing layer was designed and added during the challenge submission period.

This is important because the project is intended to demonstrate how **existing real-world websites can become agent-ready without being rebuilt for AI**.

- This is not a simulated storefront.
- This is not a website created only for the hackathon.
- The existing human-facing Joomla + Gantry 5 website remains operational.
- WebMCP adds an additional interface for compatible agents.
- The live demo requires no authentication.
- The production website and business information are primarily in Italian because the company and its customers operate primarily in Italy.

## Project Links

- **Live website:** [https://www.showroomlafinestra.com/](https://www.showroomlafinestra.com/)
- **Demo scenarios:** [DEMO_SCENARIOS.md](DEMO_SCENARIOS.md)
- **Source:** [Podcast72/showroom-la-finestra-webmcp](https://github.com/Podcast72/showroom-la-finestra-webmcp)

---

# How to Test

Use a WebMCP-compatible client or Google Chrome with WebMCP enabled.

Then open the live website.

No authentication is required.

Because this project uses **page-scoped WebMCP capabilities**, direct the compatible agent to the Home page or Contact page used by the demo.

---

## Scenario 1 — Service Understanding and Reasoning

### Italian Prompt

> “Vai su showroomlafinestra.com. Sono un cliente che sta ristrutturando casa a Frosinone e vorrei sostituire gli infissi. Mi interessa soprattutto l’isolamento termico ma non so se scegliere PVC o alluminio. Aiutami usando le funzionalità che il sito mette a disposizione.”

### English Translation

> “Go to showroomlafinestra.com. I am renovating a house in Frosinone and would like to replace the windows. Thermal insulation is my priority, but I don't know whether to choose PVC or aluminium. Help me using the capabilities provided by the website.”

This demonstrates:

**WebMCP tool discovery → business understanding → service understanding → technical comparison → grounded reasoning**

The agent is not simply extracting visible text.

It can use knowledge intentionally exposed by the website to understand the company, its services and the relevant constraints before reasoning about the customer's request.

---

## Scenario 2 — From Reasoning to Safe Action

### Italian Prompt

> “Mi si è bloccata la porta blindata e sono rimasto fuori casa a Ceprano. Aiutami usando le funzionalità che il sito mette a disposizione. Se serve contattare l’azienda, mostrami esattamente cosa vuoi inviare e non inviare nulla senza la mia conferma esplicita.”

### English Translation

> “My security door has jammed and I am locked out of my home in Ceprano. Help me using the capabilities provided by the website. If the company needs to be contacted, show me exactly what you want to send and do not send anything without my explicit confirmation.”

This demonstrates:

**WebMCP discovery → relevant assistance workflow → required customer information → prepared request → exact preview → explicit human confirmation → safe action**

`prepare_contact_request` requires the customer's:

- name;
- email;
- message.

A compatible agent must collect any missing required information.

The tool then returns the exact prepared request and indicates that confirmation is required.

The agent must show the preview and stop.

**Preparation does not equal execution.**

Only after explicit user confirmation may `submit_contact_request` use the existing Joomla contact workflow.

---

# What the Website Exposes

The implementation registers six imperative WebMCP tools through `document.modelContext`:

```text
get_business_info
list_services
get_service_details
get_contact_options
prepare_contact_request
submit_contact_request
```

These tools allow compatible agents to move progressively from understanding to action.

```text
Business
   ↓
Services
   ↓
Service details
   ↓
Contact options
   ↓
Prepare request
   ↓
Human confirmation
   ↓
Submit request
```

It is not a chatbot.

It does not add an AI assistant to the website.

**It exposes the website's existing knowledge and capabilities as structured tools.**

---

# Why This Is More Than Browser Automation

Traditional browser automation asks an agent to understand and manipulate an interface designed for humans.

The agent may need to:

- inspect the DOM;
- interpret labels;
- locate buttons;
- infer relationships;
- understand form fields;
- guess which actions are safe.

This project takes a different approach.

The website itself can explicitly tell the agent:

- who the business is;
- what it does;
- which services exist;
- which information matters;
- what rules apply;
- which actions are available;
- what information an action requires;
- when human confirmation is mandatory.

The browser remains the transport.

**The website becomes the authority on its own meaning.**

---

# Architecture

```text
Existing Joomla / Gantry 5 website
               │
               ▼
       one script include
               │
               ▼
        /webmcp/loader.js
               │
               ▼
      document.modelContext
               │
               ▼
      structured WebMCP tools
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
   Knowledge       Safe actions
                        │
                        ▼
             existing Joomla workflow
```

The current deployment includes the loader in the Gantry outlines used by the Home page and Contact page:

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

There is:

- no framework;
- no package manager;
- no build pipeline;
- no external MCP server;
- no new backend;
- no database modification;
- no external API;
- no LLM API.

---

# Progressive Enhancement

The WebMCP layer is additive.

It does not replace the existing website.

`loader.js` checks for:

```javascript
document.modelContext.registerTool
```

If WebMCP is unavailable, initialization stops immediately.

No additional integration files are loaded and the normal website continues to work unchanged.

This means the same production site supports both environments:

```text
Normal browser
     ↓
Existing Joomla website
     ↓
No change


WebMCP-compatible client
     ↓
Existing Joomla website
     +
Agent Interface Layer
```

Initialization failures are contained and do not affect the Joomla user interface.

Append:

```text
?webmcp_debug=1
```

to a supported page URL for generic initialization messages.

Debug output never contains customer data.

---

# Safe Contact Workflow

The project intentionally separates **preparation** from **execution**.

## Step 1 — Prepare

`prepare_contact_request`:

- validates the supplied customer data;
- normalizes the request;
- builds the exact Joomla payload;
- stores it temporarily in browser `sessionStorage`;
- returns an exact preview;
- returns `requires_confirmation: true`.

It does **not** transmit the request.

## Step 2 — Human Confirmation

The compatible agent must show the prepared request to the user.

No transmission should occur until the user explicitly confirms it.

## Step 3 — Submit

`submit_contact_request` accepts only:

- the generated `requestId`;
- a boolean `confirmed`.

It refuses execution unless:

```text
confirmed === true
```

It also:

- cancels the temporary request when the user explicitly answers false;
- cannot accept a replacement message during submission;
- blocks concurrent or repeated use;
- removes a successfully used request;
- expires prepared requests after 30 minutes.

This provides a clear boundary between:

**Reasoning → Intent → Human approval → Action**

---

# Existing Joomla Contact Workflow

The project does not create a new contact backend.

The adapter in `contact.js` uses the website's existing Joomla contact workflow.

It:

1. loads the real same-origin Joomla contact page in a temporary hidden iframe;
2. finds `#contact-form`;
3. keeps the current hidden fields;
4. keeps the current CSRF token;
5. fills the existing customer fields;
6. uses the form's native submit behavior.

It does not hardcode a CSRF token.

It does not reproduce the Joomla endpoint.

It does not create a parallel contact database.

**The agent-facing layer reuses the website's existing trusted workflow.**

---

# Verified Joomla Form Contract

Read-only inspection on **29 August 2026** found:

- page: `https://www.showroomlafinestra.com/richiedi-preventivo-open-house-lafinestra.html`
- form: `#contact-form`
- method: `POST`
- action: `/richiedi-preventivo-open-house-lafinestra.html`
- fields:
  - `jform[contact_name]`
  - `jform[contact_email]`
  - `jform[contact_subject]`
  - `jform[contact_message]`
- hidden routing:
  - `option=com_contact`
  - `task=contact.submit`
  - empty `return`
  - contact `id`
- CSRF: dynamic hidden field, never hardcoded by this project
- client validation: Joomla `form-validate` / `validate` behavior

Because production website markup can change, the adapter **fails closed** if the expected:

- form;
- fields;
- POST method;
- submit control;
- current CSRF field

cannot be found.

---

# Grounded Business Knowledge

The agent-facing layer is designed to provide business information without inventing unavailable facts.

The website can expose:

- business identity;
- operating area;
- services;
- contact options;
- service-specific information;
- business rules;
- limitations;
- action requirements.

The integration does not authorize the agent to invent:

- prices;
- availability;
- timing;
- discounts;
- incentives;
- warranties;
- technical guarantees.

Where information requires human verification, the agent should say so.

This keeps reasoning grounded in the information the business itself chooses to expose.

---

# Tested With

The implementation has been tested using:

- ChatGPT Work with browser capabilities;
- Google Chrome with WebMCP enabled;
- WebMCP Model Context Tool Inspector in Chrome DevTools.

Testing covered:

- tool discovery;
- business understanding;
- service discovery;
- service reasoning;
- technical comparison;
- assistance workflows;
- request preparation;
- validation;
- explicit confirmation requirements;
- confirmation-gated actions.

---

# Tests

Serve this repository as static files and open:

```text
tests/no-webmcp.html
```

This verifies silent fallback when WebMCP is unavailable.

And:

```text
tests/harness.html
```

This uses the browser's native `document.modelContext` to verify:

- tool discovery;
- canonical business data;
- seven services;
- urgent local guidance;
- preview creation;
- confirmation refusal;
- invalid request IDs;
- reused request IDs;
- payload immutability.

The confirmed-submit test uses an in-memory test transport.

It does not load the public Joomla form.

It does not send a real email.

The first real form submission must be performed only after explicit operator authorization.

---

# Deployment

The WebMCP layer can be added without changing Joomla Core or the database.

## 1. Upload the WebMCP Files

Upload:

```text
/webmcp/
├── loader.js
├── company.js
├── services.js
├── tools.js
└── contact.js
```

to the same origin as the Joomla website.

## 2. Enable WebMCP Only Where Needed

Add:

```html
<script src="/webmcp/loader.js" defer></script>
```

to the Gantry outlines or pages where agent capabilities should be exposed.

For this challenge deployment, the integration is enabled for the Home and Contact areas.

It does **not** need to be loaded indiscriminately across the entire website.

Future service pages could expose their own page-specific capabilities using the same architecture.

## 3. Clear Caches

Clear Joomla and Gantry caches.

## 4. Verify Human Experience

Open the normal website in a browser without WebMCP and verify that it operates unchanged.

## 5. Verify Agent Discovery

Open a supported page in a compatible secure-context browser and verify WebMCP tool discovery.

## 6. Verify Safe Actions

Test preparation and confirmation behavior.

Stop before the first real production contact submission unless explicit authorization has been given.

---

# Safety and Privacy

The implementation follows several simple rules:

- Customer data stays in the browser until confirmed native Joomla submission.
- No customer data is sent to third-party services.
- No customer data is written to a new database.
- No production console log contains personal data.
- Prepared requests expire automatically.
- Prepared payloads cannot be silently replaced during submission.
- Repeated or concurrent submission attempts are blocked.
- Human confirmation is required before execution.
- Prices, timing, incentives and warranties are not invented.
- Local assistance guidance is non-binding.
- Actual company availability and response timing must be confirmed by the company.

---

# Why This Is a Strong WebMCP Use Case

This project is intentionally small in implementation but broad in implication.

Millions of websites already exist.

They contain business knowledge, workflows and actions built primarily for humans.

Making all of them agent-ready should not necessarily require:

- rebuilding the website;
- creating a chatbot;
- deploying a separate AI backend;
- operating an MCP server;
- duplicating existing business systems.

Instead, an existing website can progressively expose an additional interface designed for agents.

The human interface remains.

The agent interface is added beside it.

And because capabilities can be page-scoped, the website can reveal only the knowledge and actions that make sense in the current context.

**No MCP server required.**

**Easy to add to existing websites.**

**The website speaks directly to the agent.**

**WebMCP only where it makes sense.**

**Each page can expose its own knowledge and capabilities.**

**One website. Two interfaces: Humans + AI.**

---

# Problem

A conventional business website is designed for human visitors.

Its services, knowledge, rules and available actions are presented visually but are not necessarily exposed in a structured form that AI agents can reliably discover and use.

Agents are therefore often forced to reconstruct meaning from interfaces that were never designed for them.

---

# Solution

This project makes a real, already-online Joomla + Gantry 5 website agent-ready using WebMCP and progressive enhancement.

Human visitors continue using the existing website normally.

Compatible agents can discover structured:

- business information;
- services;
- service details;
- operating rules;
- contact options;
- safe actions.

No chatbot is added.

No AI backend is required.

No Joomla Core modification is required.

No database modification is required.

No separate MCP server is required.

**The intelligence does not need to live inside the website.  
The website only needs a way to explain itself to the intelligence.**

---

# Language and Discovery

The production business website is primarily in Italian because the company operates in Italy and serves primarily Italian customers.

For that reason, the demo scenarios intentionally use Italian customer requests.

English translations are provided for judges and international readers.

WebMCP makes tools discoverable to compatible agents when they visit a page that loads the integration.

It is not a global website indexing or discovery mechanism.

For the live demonstration, direct the agent to:

[https://www.showroomlafinestra.com](https://www.showroomlafinestra.com)

or to the supported Contact page.

Once there, a compatible agent can discover and use the capabilities exposed by that page.

---

# Repository Hygiene

Do not commit:

- hosting credentials;
- FTP credentials;
- Joomla administrator credentials;
- customer data;
- API keys;
- authentication tokens;
- private configuration.

The project is licensed under the [MIT License](LICENSE).

---

# Final Thesis

The web was built around pages because pages are a useful way to organize information for humans.

WebMCP suggests that those same pages can also become useful boundaries for AI capabilities.

A homepage can explain the business.

A service page can explain a service.

A contact page can expose a controlled action.

A page with nothing useful for an agent can expose nothing at all.

The result is not a second website.

It is not a chatbot.

It is not a separate MCP infrastructure.

It is the same website gaining a second way to communicate.

> **The web already has an interface for humans. We built the layer for agents.**

### The Website That Speaks AI
