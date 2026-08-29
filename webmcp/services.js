(function (window) {
  'use strict';

  const NS = window.ShowroomWebMCP = window.ShowroomWebMCP || {};
  const services = {
    open_house: {
      id: 'open_house', name: 'Open House',
      description: 'Pergole, gazebo, tende e sistemi di copertura pensati per proteggere e rendere più vivibili terrazzi, giardini e spazi esterni.',
      uses: ['Creare uno spazio coperto all\'aperto', 'Migliorare la vivibilità di terrazzi e giardini'],
      audiences: ['Privati', 'Attività con spazi esterni'],
      features: ['Soluzioni progettate in base alle esigenze specifiche'], notes: []
    },
    vetrate_panoramiche: {
      id: 'vetrate_panoramiche', name: 'Vetrate panoramiche',
      description: 'Sistemi vetrati destinati a chiudere e proteggere balconi, terrazzi, verande e spazi esterni mantenendo luminosità e visibilità.',
      uses: ['Proteggere spazi esterni', 'Rendere gli ambienti maggiormente sfruttabili durante l\'anno'],
      audiences: ['Privati', 'Attività con spazi esterni'], features: ['Luminosità', 'Visibilità', 'Protezione'], notes: []
    },
    tende_da_sole: {
      id: 'tende_da_sole', name: 'Tende da sole',
      description: 'Sistemi di schermatura per balconi, terrazzi, giardini e attività commerciali.',
      uses: ['Proteggere dal sole', 'Migliorare il comfort degli spazi esterni'],
      audiences: ['Privati', 'Attività commerciali'], features: ['Schermatura solare', 'Soluzioni per diversi spazi esterni'], notes: []
    },
    infissi_pvc: {
      id: 'infissi_pvc', name: 'Infissi PVC', description: 'Serramenti in PVC per abitazioni e altri ambienti.',
      uses: ['Migliorare isolamento termico', 'Migliorare isolamento acustico', 'Migliorare comfort ed efficienza energetica'],
      audiences: ['Privati', 'Altri ambienti residenziali o professionali'],
      features: ['Isolamento termico', 'Isolamento acustico', 'Comfort', 'Efficienza energetica', 'Sicurezza'], notes: []
    },
    infissi_alluminio: {
      id: 'infissi_alluminio', name: 'Infissi alluminio', description: 'Serramenti e sistemi in alluminio resistenti e versatili.',
      uses: ['Abitazioni', 'Locali commerciali', 'Strutture professionali', 'Configurazioni o dimensioni particolari'],
      audiences: ['Privati', 'Professionisti', 'Attività commerciali'], features: ['Resistenza', 'Versatilità', 'Produzione interna'],
      notes: ['Prodotti all\'interno dell\'officina Show Room La Finestra.']
    },
    porte_blindate: {
      id: 'porte_blindate', name: 'Porte blindate', description: 'Porte di sicurezza per abitazioni, uffici e attività commerciali.',
      uses: ['Aumentare la protezione degli accessi'], audiences: ['Privati', 'Uffici', 'Attività commerciali'],
      features: ['Sicurezza', 'Estetica', 'Comfort'], notes: []
    },
    carpenteria: {
      id: 'carpenteria', name: 'Carpenteria', description: 'Progettazione e realizzazione di strutture e lavorazioni di carpenteria su misura.',
      uses: ['Sviluppare una soluzione da un\'esigenza', 'Lavorare da misure o da un progetto esistente', 'Risolvere una problematica specifica'],
      audiences: ['Privati', 'Professionisti', 'Aziende', 'Industrie'], features: ['Progettazione su misura', 'Realizzazione interna specializzata'], notes: []
    }
  };

  Object.keys(services).forEach(function (id) { services[id] = Object.freeze(services[id]); });
  NS.services = Object.freeze({
    ids: Object.freeze(Object.keys(services)),
    all: Object.freeze(services),
    list: function () {
      return Object.keys(services).map(function (id) {
        return { id: id, name: services[id].name, description: services[id].description };
      });
    },
    get: function (id) { return services[id] || null; }
  });
})(window);
