(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return;

  const style = document.createElement('style');
  style.textContent = `
    .cursor-trail-line {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);

  const canvas = document.createElement('canvas');
  canvas.className = 'cursor-trail-line';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const points = [];
  const maxPoints = 140;
  const minDistance = 5;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (points.length < 2) return;

    ctx.lineWidth = 1;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'round';

    for (let i = 1; i < points.length; i++) {
      const t = i / (points.length - 1);
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.strokeStyle = `rgba(0, 207, 162, ${0.12 + t * 0.88})`;
      ctx.stroke();
    }
  }

  let lastX;
  let lastY;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    if (lastX !== undefined) {
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < minDistance) return;
    }

    lastX = x;
    lastY = y;
    points.push({ x, y });
    if (points.length > maxPoints) points.shift();
    draw();
  });

  setInterval(() => {
    if (points.length === 0) return;
    points.shift();
    draw();
  }, 25);
})();
