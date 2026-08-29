(function (window, document) {
  'use strict';
  if (!document.modelContext || typeof document.modelContext.registerTool !== 'function') return;
  const NS = window.ShowroomWebMCP = window.ShowroomWebMCP || {};
  if (NS.bootPromise) return;
  NS.debug = new URLSearchParams(window.location.search).get('webmcp_debug') === '1';
  const base = new URL('.', document.currentScript && document.currentScript.src || '/webmcp/loader.js');

  function load(name) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script');
      script.src = new URL(name, base).href;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  NS.bootPromise = ['company.js', 'services.js', 'contact.js', 'tools.js']
    .reduce(function (promise, name) { return promise.then(function () { return load(name); }); }, Promise.resolve())
    .then(function () { return NS.tools.registerAll(); })
    .then(function () { if (NS.debug) console.info('[ShowroomWebMCP] tools registered'); })
    .catch(function () { if (NS.debug) console.warn('[ShowroomWebMCP] initialization failed'); });
})(window, document);
