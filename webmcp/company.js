(function (window) {
  'use strict';

  const NS = window.ShowroomWebMCP = window.ShowroomWebMCP || {};

  NS.company = Object.freeze({
    name: 'Show Room La Finestra',
    description:
      'Dalla progettazione all\'installazione e all\'assistenza: infissi in PVC, tende da sole, porte blindate, profilati e sistemi in alluminio, con supporto tecnico e interventi anche su prodotti non installati direttamente dall\'azienda. L\'azienda dispone inoltre di un\'officina di carpenteria specializzata nella progettazione e realizzazione di soluzioni su misura per clienti privati e settore industriale. L\'offerta comprende anche tecnologie Open House dedicate al comfort, alla sicurezza e all\'efficienza degli ambienti.',
    address: Object.freeze({
      street: 'Via Cavone 11',
      postalCode: '03024',
      city: 'Ceprano',
      province: 'FR',
      country: 'Italia'
    }),
    operatingArea: Object.freeze({
      primary: Object.freeze(['Ceprano', 'Provincia di Frosinone', 'Ciociaria', 'Lazio']),
      nationwide: true,
      nationwideNote: 'Disponibile anche per lavori, installazioni e progetti in tutta Italia.'
    }),
    inspection: Object.freeze({
      free: true,
      description: 'Il sopralluogo gratuito può essere proposto per valutare spazi, misure, condizioni tecniche ed esigenze e per predisporre un preventivo dettagliato.'
    }),
    quote: Object.freeze({
      free: true,
      noObligation: true,
      indicativeRequirements: Object.freeze(['Prodotto o soluzione richiesta', 'Misure indicative']),
      detailedProcess: Object.freeze(['Sopralluogo gratuito', 'Rilevazioni tecniche', 'Predisposizione del preventivo']),
      targetAfterInspection: 'L\'azienda indica come obiettivo la fornitura del preventivo entro 24 ore dal sopralluogo; non è una promessa automatica.'
    }),
    assistance: Object.freeze({
      onSite: true,
      localGuidance: 'Nell\'area vicina a Ceprano l\'intervento può normalmente essere organizzato indicativamente entro circa 2 ore.',
      regionalGuidance: 'Nel resto del Lazio il riferimento indicativo può essere circa 4 ore.',
      disclaimer: 'Disponibilità e tempo effettivo dipendono da posizione, distanza, tipo di problema e disponibilità del tecnico e devono essere confermati dall\'azienda.',
      urgentLocalChannel: 'Telefono o WhatsApp'
    }),
    contacts: Object.freeze({
      email: 'info@showroomlafinestra.com',
      phone: '+39 347 367 6814',
      whatsapp: '+39 347 367 6814'
    }),
    policies: Object.freeze({
      prices: 'Non esistono prezzi standard: ogni costo dipende da prodotto, misure e lavorazione. Proporre un preventivo senza inventare stime.',
      timing: 'Non promettere tempi di produzione, consegna, installazione o un orario preciso di arrivo del tecnico.',
      incentives: 'Bonus, incentivi, detrazioni e agevolazioni devono essere confermati dall\'azienda in base alla normativa applicabile.',
      warranties: 'Durata, copertura e condizioni dipendono dalla normativa e dallo specifico prodotto o intervento e devono essere confermate dall\'azienda.'
    })
  });
})(window);
