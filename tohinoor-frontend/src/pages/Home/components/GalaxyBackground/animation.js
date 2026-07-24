import { createStars, updateStars, drawStars } from "./stars";
import { updateMeteor, drawMeteor } from "./meteor";
import CONFIG from "./config";

let animationId = null;

export function startAnimation(canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const area = canvas.width * canvas.height;

    let starCount = Math.floor(area / CONFIG.stars.density);

    starCount = Math.max(CONFIG.stars.min, starCount);

    starCount = Math.min(CONFIG.stars.max, starCount);

    createStars(canvas, starCount, CONFIG);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateStars();

    drawStars(ctx);

    updateMeteor(canvas);

    drawMeteor(ctx);

    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  animate();

  return () => {
    cancelAnimationFrame(animationId);

    window.removeEventListener("resize", resizeCanvas);
  };
}
