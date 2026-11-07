    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImg');
      const modalVideo = document.getElementById('modalVideo');
      const counter = document.getElementById('modalCounter');
      const items = Array.from(document.querySelectorAll('.gallery-item'));
      let current = 0;

      const stopVideo = () => { modalVideo.pause(); modalVideo.removeAttribute('src'); modalVideo.load(); };

      const show = (index, animate) => {
        current = (index + items.length) % items.length;
        const item = items[current];
        const apply = () => {
          counter.textContent = (current + 1) + ' / ' + items.length;
          if (item.dataset.video) {
            modal.classList.add('is-video');
            modalVideo.src = item.dataset.video;
            modalVideo.play().catch(() => {});
          } else {
            stopVideo();
            modal.classList.remove('is-video');
            const img = item.querySelector('img');
            modalImg.src = img.dataset.full || img.src;
            modalImg.alt = img.alt;
          }
          modalImg.classList.remove('fading');
        };
        if (item.dataset.video) stopVideo();
        if (animate && !item.dataset.video) {
          modalImg.classList.add('fading');
          setTimeout(apply, 200);
        } else apply();
      };

      const open = (i) => { show(i, false); modal.classList.add('visible'); };
      const close = () => { modal.classList.remove('visible'); stopVideo(); };
      const next = () => show(current + 1, true);
      const prev = () => show(current - 1, true);

      items.forEach((item, i) => item.addEventListener('click', () => open(i)));
      document.getElementById('modalClose').addEventListener('click', close);
      document.getElementById('modalNext').addEventListener('click', (e) => { e.stopPropagation(); next(); });
      document.getElementById('modalPrev').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

      document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('visible')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
      });

      // Swipe support (not on the video controls)
      let startX = 0;
      modal.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      modal.addEventListener('touchend', (e) => {
        if (e.target === modalVideo) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
      });
    });
  