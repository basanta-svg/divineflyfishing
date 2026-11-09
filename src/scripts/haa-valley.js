  document.addEventListener('DOMContentLoaded', function () {
    var heads = document.querySelectorAll('.hv-acc-head');
    heads.forEach(function (h) {
      h.addEventListener('click', function () {
        var item = h.parentElement.parentElement;
        var open = !item.classList.contains('is-open');
        document.querySelectorAll('.hv-acc-item.is-open').forEach(function (i) {
          i.classList.remove('is-open');
          i.querySelector('.hv-acc-head').setAttribute('aria-expanded', 'false');
        });
        if (open) { item.classList.add('is-open'); h.setAttribute('aria-expanded', 'true'); }
      });
    });
    var track = document.getElementById('hvShots');
    function slide(d) { track.scrollBy({ left: d * (track.querySelector('.hv-shot').offsetWidth + 16), behavior: 'smooth' }); }
    document.querySelector('.hv-slide-prev').onclick = function () { slide(-1); };
    document.querySelector('.hv-slide-next').onclick = function () { slide(1); };
    var shots = Array.prototype.slice.call(document.querySelectorAll('.hv-shot img'));
    var lb = document.getElementById('hvLightbox'), img = document.getElementById('hvLbImg'), cur = 0;
    function show(i) { cur = (i + shots.length) % shots.length; img.src = shots[cur].src; img.alt = shots[cur].alt; }
    function open(i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    shots.forEach(function (s, i) { s.parentElement.addEventListener('click', function () { open(i); }); });
    document.getElementById('hvClose').onclick = close;
    document.getElementById('hvPrev').onclick = function () { show(cur - 1); };
    document.getElementById('hvNext').onclick = function () { show(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(cur + 1); else if (e.key === 'ArrowLeft') show(cur - 1);
    });
  });
