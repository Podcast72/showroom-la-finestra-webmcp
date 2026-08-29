# Live WebMCP Demo Scenarios

The live production website is an Italian business website whose real customers primarily communicate in Italian. For this reason, the WebMCP demonstrations were intentionally performed in Italian. English translations are included for hackathon judges and international readers. The demonstrations focus on agent discovery, business understanding and reasoning, not on browser automation.

**Website knowledge → Agent understanding → Reasoning → Safe action**

The purpose of these scenarios is to show how a website can expose structured business knowledge, services, operating rules, constraints and available actions directly to compatible agents.

## Demo 1 — Window Replacement Consultation

### Customer prompt — Italian

“Vai su showroomlafinestra.com. Sono un cliente che sta ristrutturando casa a Frosinone e vorrei sostituire gli infissi. Mi interessa soprattutto l’isolamento termico ma non so se scegliere PVC o alluminio. Aiutami usando le funzionalità che il sito mette a disposizione.”

### English translation

“Go to showroomlafinestra.com. I am a customer renovating a home in Frosinone, and I would like to replace the windows. I am mainly interested in thermal insulation, but I do not know whether to choose PVC or aluminium. Help me using the capabilities made available by the website.”

### Actual agent response — Italian

“La scelta più adatta al tuo caso è PVC.

Per una ristrutturazione a Frosinone con priorità all’isolamento termico, il sito documenta per il PVC valori precisi fino a Uw 0,73–0,74 W/m²K, isolamento acustico fino a 48 dB e sicurezza RC2/RC3. La soluzione più completa sembra LinearQ 94: Uw 0,73, 48 dB e RC3. ThermoFrame C76 e AuraSoft R76 offrono lo stesso Uw con estetica più classica o arrotondata.

Preferirei invece l’alluminio a taglio termico per aperture molto grandi, forme particolari, profili più sottili o massima durata. La scheda alluminio parla di ottime prestazioni, ma non pubblica un valore Uw preciso: prima di sceglierlo chiederei quindi il valore Uw della finestra completa configurata, non soltanto quello del profilo.

Ho usato realmente le funzioni WebMCP del sito per:

* confrontare i dettagli di PVC e alluminio;
* verificare copertura e servizi;
* individuare il percorso consigliato per Frosinone.

Il sito propone un sopralluogo gratuito e un preventivo senza impegno; per una richiesta non urgente consiglia modulo di contatto o email. Non esistono prezzi standard senza misure. Non ho inviato nulla.

Se vuoi procedere, mi bastano numero e misure indicative delle finestre, più nome ed email: posso preparare la richiesta WebMCP e mostrartela integralmente prima dell’invio.”

### English translation

“The most suitable choice for your situation is PVC.

For a renovation in Frosinone where thermal insulation is the priority, the website provides precise PVC performance figures of up to Uw 0.73–0.74 W/m²K, sound insulation of up to 48 dB and RC2/RC3 security. LinearQ 94 appears to be the most comprehensive solution: Uw 0.73, 48 dB and RC3. ThermoFrame C76 and AuraSoft R76 offer the same Uw with a more classic or rounded appearance.

I would instead prefer thermally broken aluminium for very large openings, unusual shapes, slimmer profiles or maximum durability. The aluminium information page describes excellent performance but does not publish a precise Uw value. Before choosing it, I would therefore ask for the Uw value of the complete configured window, not just that of the profile.

I actually used the website’s WebMCP capabilities to:

* compare the details of PVC and aluminium;
* verify service coverage and services;
* identify the recommended path for Frosinone.

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

### Actual agent response — Italian

“Il sito offre un contatto WhatsApp diretto al +39 347 367 6814 e un modulo email. Per l’urgenza, WhatsApp è il canale più rapido. Il sito parla di assistenza, ma non garantisce esplicitamente un pronto intervento 24/7.

Questo è il messaggio esatto che propongo:

Buongiorno, mi trovo a Ceprano e sono rimasto fuori casa perché la porta blindata si è bloccata e non riesco più a entrare. Potete intervenire con urgenza oppure indicarmi un tecnico disponibile subito? Grazie.

Non ho compilato né inviato nulla. Se approvi, rispondi: “Confermo l’invio WhatsApp”. Lo invierò al numero indicato tramite la funzione WhatsApp del sito.”

### English translation

“The website offers direct WhatsApp contact at +39 347 367 6814 and an email form. Given the urgency, WhatsApp is the fastest channel. The website mentions assistance but does not explicitly guarantee a 24/7 emergency response service.

This is the exact message I propose:

Hello, I am in Ceprano and I am locked out of my home because the security door is jammed and I can no longer get inside. Can you respond urgently or direct me to a technician who is available immediately? Thank you.

I have not filled in or sent anything. If you approve, reply: “I confirm the WhatsApp message.” I will send it to the listed number using the website’s WhatsApp capability.”

### What this demonstrates

The agent correctly understood the requested service, the urgency, the customer’s location and the available contact method. It also recognized that the company does **not** explicitly guarantee a 24/7 emergency service and respected the requirement for explicit user confirmation before an external action. The agent did not invent guarantees or availability.

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
