(function () {
  'use strict';

  var SUPPORTED = ['en', 'fr', 'pt', 'it', 'de', 'es'];
  var STORAGE_KEY = 'mab_lang';

  function detectLang() {
    var stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : 'en';
  }

  function resolve(obj, key) {
    return key.split('.').reduce(function (o, k) { return o && o[k]; }, obj);
  }

  function applyLang(lang) {
    var t = window.MAB_TRANSLATIONS && window.MAB_TRANSLATIONS[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    // Update document title
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      var titleVal = resolve(t, titleKey);
      if (titleVal) document.title = titleVal + ' - MyAstroBoard';
    }

    // data-i18n → textContent
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      var val = resolve(t, key);
      if (val !== undefined) els[i].textContent = val;
    }

    // data-i18n-html → innerHTML
    var hels = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < hels.length; j++) {
      var hkey = hels[j].getAttribute('data-i18n-html');
      var hval = resolve(t, hkey);
      if (hval !== undefined) hels[j].innerHTML = hval;
    }

    // sync picker
    var picker = document.getElementById('lang-select');
    if (picker) picker.value = lang;
  }

  function init() {
    var lang = detectLang();
    applyLang(lang);

    var picker = document.getElementById('lang-select');
    if (picker) {
      picker.addEventListener('change', function () {
        var chosen = picker.value;
        if (SUPPORTED.indexOf(chosen) !== -1) {
          sessionStorage.setItem(STORAGE_KEY, chosen);
          applyLang(chosen);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
