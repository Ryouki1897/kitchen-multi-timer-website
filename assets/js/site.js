/* Applies KMT_I18N and remembers the language in localStorage.
   Switching language does not change the URL, so the current page stays put. */

(function () {
  var STORAGE_KEY = "kitchen-multi-timer-language";
  var LANGUAGES = ["zh-Hant", "en", "ja"];
  var OG_LOCALE = { "zh-Hant": "zh_Hant", en: "en", ja: "ja" };

  function packFor(lang) {
    var packs = window.KMT_I18N || {};
    return packs[lang] || packs["zh-Hant"];
  }

  function textOf(pack, key) {
    if (!pack || !pack.strings) return null;
    var value = pack.strings[key];
    return typeof value === "string" ? value : null;
  }

  function apply(lang) {
    if (LANGUAGES.indexOf(lang) === -1) lang = "zh-Hant";
    var pack = packFor(lang);
    try {
      document.documentElement.lang = lang;
      var page = document.body.getAttribute("data-page") || "home";
      if (pack && pack.meta && pack.meta[page]) {
        document.title = pack.meta[page].title;
        var description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", pack.meta[page].description);
        var ogTitle = document.querySelector('meta[property="og:title"]');
        var ogDescription = document.querySelector('meta[property="og:description"]');
        var ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogTitle) ogTitle.setAttribute("content", pack.meta[page].title);
        if (ogDescription) ogDescription.setAttribute("content", pack.meta[page].description);
        if (ogLocale) ogLocale.setAttribute("content", OG_LOCALE[lang] || "zh_Hant");
        var ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
        var logoAlt = textOf(pack, "brand.logoAlt");
        if (ogImageAlt && logoAlt) ogImageAlt.setAttribute("content", logoAlt);
      }

      var nodes = document.querySelectorAll("[data-i18n]");
      for (var i = 0; i < nodes.length; i++) {
        var key = nodes[i].getAttribute("data-i18n");
        var value = textOf(pack, key);
        if (value === null) {
          console.warn("Missing translation:", lang, key);
          continue;
        }
        nodes[i].textContent = value;
      }

      var alts = document.querySelectorAll("[data-i18n-alt]");
      for (var a = 0; a < alts.length; a++) {
        var alt = textOf(pack, alts[a].getAttribute("data-i18n-alt"));
        if (alt !== null) alts[a].setAttribute("alt", alt);
      }

      var labels = document.querySelectorAll("[data-i18n-aria]");
      for (var j = 0; j < labels.length; j++) {
        var label = textOf(pack, labels[j].getAttribute("data-i18n-aria"));
        if (label !== null) labels[j].setAttribute("aria-label", label);
      }

      var buttons = document.querySelectorAll(".lang-switch [data-lang]");
      for (var k = 0; k < buttons.length; k++) {
        var selected = buttons[k].getAttribute("data-lang") === lang;
        buttons[k].setAttribute("aria-pressed", selected ? "true" : "false");
      }

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (storageError) {
        /* Private mode can reject storage. The language still applies now. */
      }
    } finally {
      document.documentElement.classList.remove("i18n-wait");
    }
  }

  function savedLanguage() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.indexOf(value) !== -1) return value;
    } catch (readError) {
      /* Ignore and use the default. */
    }
    return "zh-Hant";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var button = target.closest(".lang-switch [data-lang]");
    if (!button) return;
    event.preventDefault();
    apply(button.getAttribute("data-lang"));
  });

  apply(savedLanguage());
})();
