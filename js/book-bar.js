/* Desktop sticky Call/Book bar reveal.
   Shows the .mbook bar (desktop styling via .mbook-show) once the
   visitor scrolls past the booking band on the homepage, or past
   the top of the page (~500px) on interior pages. No effect on
   mobile: the mobile bar is always visible via its own media query. */
(function () {
  var bar = document.querySelector('.mbook');
  if (!bar) return;

  var sentinel = document.querySelector('.booking-band');

  function setShown(shown) {
    bar.classList.toggle('mbook-show', shown);
  }

  if (sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      // Show the bar only when the booking band has scrolled above the viewport
      var e = entries[0];
      setShown(!e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(sentinel);
  } else {
    var onScroll = function () { setShown(window.scrollY > 500); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
