/* OASIS @ MBZUAI — small progressive enhancement.
   The site must read perfectly without this file. Everything below only
   softens how sections arrive; if anything fails, or the visitor asks for
   reduced motion, every element is shown immediately. */
(function () {
  "use strict";

  var targets = [].slice.call(document.querySelectorAll(".reveal"));
  if (!targets.length) return;

  function showAll() {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }

  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) { showAll(); return; }

  // Failsafe: whatever happens with the observer, nothing stays hidden.
  var failsafe = setTimeout(showAll, 2000);
  window.addEventListener("load", function () {
    setTimeout(showAll, 400);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
    if (!document.querySelectorAll(".reveal:not(.is-in)").length) {
      clearTimeout(failsafe);
    }
  }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });

  targets.forEach(function (el, n) {
    el.style.setProperty("--d", Math.min(n, 3) * 60 + "ms");
    io.observe(el);
  });
})();
