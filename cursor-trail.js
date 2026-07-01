(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return;

  const style = document.createElement('style');
  style.textContent = `
    .cursor-trail {
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      opacity: 0.75;
      transition: opacity 0.7s ease-out, transform 0.7s ease-out;
      background: #00cfa2;
      box-shadow: 0 0 8px rgba(0, 207, 162, 0.55);
    }

    .cursor-trail.fade-out {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.25);
    }
  `;
  document.head.appendChild(style);

  let lastTime = 0;
  const throttleMs = 30;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < throttleMs) return;
    lastTime = now;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    document.body.appendChild(trail);

    requestAnimationFrame(() => trail.classList.add('fade-out'));
    setTimeout(() => trail.remove(), 750);
  });
})();
