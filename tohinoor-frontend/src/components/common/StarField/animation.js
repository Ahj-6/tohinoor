import { CONFIG } from "./config";
import { createStars, updateStars, drawStars } from "./stars";

import { updateMeteor, drawMeteor } from "./meteor";

export function startAnimation(canvas) {
  const ctx = canvas.getContext("2d");

  let animationId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const area = canvas.width * canvas.height;

    const starCount = Math.min(
      CONFIG.stars.max,
      Math.max(CONFIG.stars.min, Math.floor(area / CONFIG.stars.density)),
    );

    createStars(canvas, starCount, CONFIG);
  }

  window.addEventListener("resize", resizeCanvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateStars();

    drawStars(ctx, CONFIG);

    updateMeteor(canvas, CONFIG);

    drawMeteor(ctx);

    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();

  animate();

  return () => {
    window.removeEventListener("resize", resizeCanvas);

    cancelAnimationFrame(animationId);
  };
}
