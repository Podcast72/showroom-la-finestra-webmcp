# Live WebMCP Demo Scenarios

The live production website is an Italian business website whose real customers primarily communicate in Italian. For this reason, the WebMCP demonstrations are intentionally presented in Italian. English translations are included for hackathon judges and international readers. The scenarios and reference responses are grounded in the repository implementation and focus on agent discovery, business understanding and reasoning, not on browser automation.

**Website knowledge → Agent understanding → Reasoning → Human confirmation → Safe action**

The purpose of these scenarios is to show how a website can expose structured business knowledge, services, operating rules, constraints and available actions directly to compatible agents.

## Demo 1 — Window Replacement Consultation

### Customer prompt — Italian

“Vai su showroomlafinestra.com. Sono un cliente che sta ristrutturando casa a Frosinone e vorrei sostituire gli infissi. Mi interessa soprattutto l’isolamento termico ma non so se scegliere PVC o alluminio. Aiutami usando le funzionalità che il sito mette a disposizione.”

### English translation

“Go to showroomlafinestra.com. I am a customer renovating a home in Frosinone, and I would like to replace the windows. I am mainly interested in thermal insulation, but I do not know whether to choose PVC or aluminium. Help me using the capabilities made available by the website.”

### Reference agent response — Italian

“La soluzione da approfondire per prima è il PVC.

Nei dati WebMCP del sito, gli infissi in PVC sono indicati per migliorare isolamento termico, isolamento acustico, comfort ed efficienza energetica. Gli infissi in alluminio sono descritti come resistenti e versatili, adatti anche a configurazioni o dimensioni particolari e prodotti nell’officina Show Room La Finestra. Con l’isolamento termico come priorità, il PVC è quindi la raccomandazione iniziale più direttamente supportata dai dati strutturati.

Valuterei anche l’alluminio quando resistenza, versatilità o una configurazione particolare sono requisiti determinanti. I tool non pubblicano valori numerici Uw né prezzi standard, quindi non li inventerei: la scelta tecnica finale deve essere confermata dall’azienda sulla configurazione reale.

Le funzioni WebMCP pertinenti consentono di:

* confrontare i dettagli di PVC e alluminio;
* verificare copertura geografica, sopralluogo e regole sui preventivi.

Il sito propone un sopralluogo gratuito e un preventivo senza impegno; per una richiesta non urgente consiglia una richiesta di contatto o l’email. Non esistono prezzi standard senza misure. Non ho inviato nulla.

Se vuoi procedere, mi bastano numero e misure indicative delle finestre, più nome ed email: posso preparare la richiesta WebMCP e mostrartela integralmente prima dell’invio.”

### English translation

“The first option to investigate is PVC.

In the website’s WebMCP data, PVC windows are presented as a way to improve thermal insulation, sound insulation, comfort and energy efficiency. Aluminium windows are described as resistant and versatile, suitable for unusual configurations or dimensions and produced in Show Room La Finestra’s workshop. With thermal insulation as the priority, PVC is therefore the initial recommendation most directly supported by the structured data.

I would also consider aluminium when resistance, versatility or a particular configuration is decisive. The tools do not publish numerical Uw values or standard prices, so I would not invent them: the final technical choice must be confirmed by the company for the actual configuration.

The relevant WebMCP capabilities make it possible to:

* compare the details of PVC and aluminium;
* verify geographic coverage, the on-site survey and quote rules.

The website offers a free on-site survey and a no-obligation quote; for a non-urgent request, it recommends the contact form or email. There are no standard prices without measurements. I have not sent anything.

If you would like to proceed, I only need the number and approximate measurements of the windows, along with your name and email address. I can prepare the WebMCP request and show it to you in full before it is sent.”

### What this demonstrates

The agent discovered and used the WebMCP capabilities exposed by the website, understood the customer’s objective and compared PVC with aluminium using business-specific information. It also understood the company’s geographic coverage, respected the rule that prices cannot be invented without measurements and proposed a safe next step. This is a demonstration of structured discovery and reasoning, not primarily of browser navigation.

## Demo 2 — Urgent Locked Security Door

### Customer prompt — Italian

“Vai su showroomlafinestra.com.
Sono rimasto fuori casa perché la porta blindata si è bloccata e non riesco più ad entrare. Mi trovo a Ceprano.
Aiutami usando le funzionalità che il sito mette a disposizione. Se serve contattare l’azienda, prima mostrami chiaramente cosa vuoi inviare e non inviare nulla senza la mia conferma esplicita.”

### English translation

“Go to showroomlafinestra.com.
I am locked out of my home because the security door is jammed and I can no longer get inside. I am in Ceprano.
Help me using the capabilities made available by the website. If the company needs to be contacted, first show me clearly what you want to send, and do not send anything without my explicit confirmation.”

### Reference first-turn response — Italian

“Per un’assistenza urgente a Ceprano, il sito indica telefono o WhatsApp come canali consigliati. Disponibilità e tempo effettivo di intervento devono comunque essere confermati dall’azienda.

Se vuoi usare il flusso di richiesta WebMCP del sito, per preparare una richiesta valida mi servono ancora il tuo nome e un indirizzo email. Il messaggio del cliente che proporrei è:

Mi trovo a Ceprano e sono rimasto fuori casa perché la porta blindata si è bloccata e non riesco più a entrare. Potete confermare se è disponibile un intervento urgente?

Non ho preparato né inviato nulla. Dopo che mi avrai fornito nome ed email, userò `prepare_contact_request`, ti mostrerò l’anteprima esatta restituita dal sito e mi fermerò per chiedere la tua conferma esplicita. Solo dopo quella conferma potrà essere usato `submit_contact_request`, che inoltra il payload già preparato tramite il modulo Joomla esistente.”

### English translation

“For urgent assistance in Ceprano, the website recommends phone or WhatsApp. Actual availability and response time must still be confirmed by the company.

If you want to use the website’s WebMCP request workflow, I still need your name and email address to prepare a valid request. The customer message I would propose is:

I am in Ceprano and I am locked out of my home because the security door is jammed and I can no longer get inside. Can you confirm whether urgent assistance is available?

I have not prepared or sent anything. After you provide your name and email address, I will use `prepare_contact_request`, show you the exact preview returned by the website and stop for your explicit confirmation. Only after that confirmation may `submit_contact_request` be used; it sends the already-prepared payload through the existing Joomla form.”

### Continue through the confirmation gate

The initial prompt intentionally omits two fields required by `prepare_contact_request`: customer name and email. A compliant client must ask for them instead of inventing them. Once the user supplies the missing information, the client can prepare the request and display the returned preview and `requires_confirmation: true` value. It must then stop. Only a subsequent explicit confirmation permits the immutable `requestId` to be passed to `submit_contact_request`.

**Preparation does not equal execution.** Judges can demonstrate discovery, preparation, exact preview and confirmation refusal without making a real production submission.

### What this demonstrates

The agent correctly understands the requested service, urgency, location and available assistance channels, then identifies the customer information required by the safe contact workflow. The complete path is **WebMCP discovery → relevant assistance workflow → required customer information → prepared contact request → exact preview → explicit human confirmation → only then may the existing Joomla contact workflow be used**. No guarantee or technician availability is invented.

## What the demos are intended to prove

**The demonstrations intentionally focus on agent discovery, business understanding and reasoning rather than on the final contact submission.**

Submitting a contact form is not the central innovation of this project. The core idea is that a normal business website can expose enough structured knowledge for an agent to understand:

* who the company is;
* what it offers;
* where it operates;
* its constraints and policies;
* which actions are available;
* when human confirmation is required.

**The website is not merely being operated by the agent. The website is explaining the business to the agent.**
