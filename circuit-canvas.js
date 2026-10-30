/**
 * circuit-canvas.js
 * Subtle ambient background animation for Aditya Raj's Portfolio
 * Creates a calm, low-opacity engineering grid with gentle node breathing
 * Respects prefers-reduced-motion and adapts to light/dark modes
 */

(function () {
  'use strict';

  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let width = 0;
  let height = 0;

  // Accessibility check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const points = [];
  const spacing = 70;
  let time = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initPoints();
  }

  function initPoints() {
    points.length = 0;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Only keep a fraction to maintain high performance and clean minimalism
        if ((i + j) % 3 === 0) {
          points.push({
            x: i * spacing,
            y: j * spacing,
            phase: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.006,
            size: Math.random() * 1.2 + 0.8
          });
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    time += 0.01;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const pointColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(6, 182, 212, ';

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const alpha = Math.sin(time * p.speed + p.phase) * 0.18 + 0.22;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${pointColor}${Math.max(0.04, alpha)})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 120);
  });

  resize();
  draw();
})();
