(function () {
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  function initMath() {
    if (typeof renderMathInElement !== 'function') return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }

  function initBibtexCopy() {
    var button = document.getElementById('copy-bibtex');
    var bib = document.getElementById('bibtex');
    if (!button || !bib) return;

    button.addEventListener('click', function () {
      var text = bib.textContent || '';
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        button.textContent = 'Copy failed';
        setTimeout(function () { button.textContent = 'Copy BibTeX'; }, 1200);
        return;
      }

      navigator.clipboard.writeText(text).then(function () {
        button.textContent = 'Copied';
        setTimeout(function () { button.textContent = 'Copy BibTeX'; }, 1200);
      }).catch(function () {
        button.textContent = 'Copy failed';
        setTimeout(function () { button.textContent = 'Copy BibTeX'; }, 1200);
      });
    });
  }

  function initLightbox() {
    var root = document.getElementById('lightbox');
    var image = document.getElementById('lightbox-image');
    var caption = document.getElementById('lightbox-caption');
    var closeButton = document.getElementById('lightbox-close');
    if (!root || !image || !caption || !closeButton) return;

    function closeLightbox() {
      root.classList.remove('open');
      root.setAttribute('aria-hidden', 'true');
      image.removeAttribute('src');
    }

    document.querySelectorAll('.zoomable').forEach(function (img) {
      img.addEventListener('click', function () {
        image.src = img.src;
        image.alt = img.alt || 'Expanded figure';
        var fig = img.closest('figure');
        caption.textContent = fig ? (fig.querySelector('figcaption') || {}).textContent || '' : '';
        root.classList.add('open');
        root.setAttribute('aria-hidden', 'false');
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    root.addEventListener('click', function (event) {
      if (event.target === root) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  function setYear() {
    var year = document.getElementById('year');
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initMath();
    initBibtexCopy();
    initLightbox();
    setYear();
  });
})();
