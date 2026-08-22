import { CONFIG } from "./config";
import { createStars, updateStars, drawStars } from "./stars";

import { updateMeteor, drawMeteor } from "./meteor";

export function startAnimation(canvas, variant = "full") {
  const ctx = canvas.getContext("2d");

  let animationId;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const area = width * height;

    const density =
      variant === "header" ? CONFIG.stars.headerDensity : CONFIG.stars.density;

    const starCount = Math.min(
      CONFIG.stars.max,
      Math.max(CONFIG.stars.min, Math.floor(area / density)),
    );

    createStars(
      {
        width,
        height,
      },
      starCount,
      CONFIG,
    );
  }

  resizeCanvas();

  // window.addEventListener("resize", resizeCanvas);
  const observer = new ResizeObserver(() => {
    resizeCanvas();
  });

  observer.observe(canvas.parentElement);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateStars();

    drawStars(ctx, CONFIG);

    updateMeteor(canvas, CONFIG);

    drawMeteor(ctx);

    animationId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    observer.disconnect();

    cancelAnimationFrame(animationId);
  };
}
