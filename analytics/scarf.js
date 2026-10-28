/* Public documentation views only; no SDK, cookies or query-string collection. */
(function () {
  'use strict';

  try {
    if (location.protocol !== 'https:' || location.host !== 'docs.eximeebpms.org') return;
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' ||
        navigator.msDoNotTrack === '1' || window.doNotTrack === '1') return;
    if (window.__eximeeScarfDocsRequested) return;

    var script = document.getElementById('eximeebpms-scarf-analytics');
    var pixelID = script && script.getAttribute('data-scarf-pixel');
    if (!pixelID) return;

    window.__eximeeScarfDocsRequested = true;
    var image = new Image(1, 1);
    image.referrerPolicy = 'no-referrer';
    window.__eximeeScarfDocsPixel = image;
    image.src = 'https://static.scarf.sh/a.png?x-pxid=' + encodeURIComponent(pixelID) +
      '&page=' + encodeURIComponent(location.origin + location.pathname);
  } catch (error) {
    // Analytics must not interrupt documentation, including when a browser blocks it.
  }
})();
