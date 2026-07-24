const stars = [];

/* ===========================
   Create Stars
=========================== */

export function createStars(canvas, count, config) {
  stars.length = 0;

  const colors = config.stars.colors;

  for (let i = 0; i < count; i++) {
    const random = Math.random();

    let radius;

    if (random < 0.8) {
      radius = Math.random() * 1.2 + 0.2;
    } else if (random < 0.95) {
      radius = Math.random() * 2 + 1.2;
    } else {
      radius = Math.random() * 1.5 + 2;
    }

    stars.push({
      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      radius,

      color: colors[Math.floor(Math.random() * colors.length)],

      alpha: Math.random(),

      speed:
        config.stars.twinkleMin +
        Math.random() * (config.stars.twinkleMax - config.stars.twinkleMin),

      direction: Math.random() > 0.5 ? 1 : -1,

      flare: Math.random() < config.stars.flareChance,

      flareRotation: Math.random() * Math.PI,

      flareLength: 2 + Math.random() * 4,
    });
  }
}

/* ===========================
   Update Star
=========================== */

export function updateStar(star) {
  star.alpha += star.speed * star.direction;

  if (star.alpha > 1) {
    star.alpha = 1;
    star.direction = -1;
  }

  if (star.alpha < 0.15) {
    star.alpha = 0.15;
    star.direction = 1;
  }
}

/* ===========================
   Glow
=========================== */

function drawGlow(ctx, star, config) {
  if (star.radius <= 2) return;

  const glow = ctx.createRadialGradient(
    star.x,
    star.y,
    0,

    star.x,
    star.y,

    star.radius * config.glow.size,
  );

  glow.addColorStop(
    0,

    `rgba(170,145,1,${config.glow.alpha})`,
  );

  glow.addColorStop(
    1,

    "rgba(255,255,255,0)",
  );

  ctx.beginPath();

  ctx.fillStyle = glow;

  ctx.arc(
    star.x,

    star.y,

    star.radius * 2.5,

    0,

    Math.PI * 2,
  );

  ctx.fill();
}

/* ===========================
   Flare
=========================== */

function drawFlare(ctx, star, config) {
  if (!star.flare || star.radius <= 2) return;

  ctx.save();

  ctx.translate(star.x, star.y);

  ctx.rotate(star.flareRotation);

  const size = star.radius * config.stars.flareSize;

  const gradient = ctx.createRadialGradient(
    0,
    0,
    0,

    0,
    0,
    size,
  );

  gradient.addColorStop(0, star.color);
  gradient.addColorStop(0.35, "rgba(255,235,180,.18)");
  gradient.addColorStop(1, "rgba(255,235,180,0)");

  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.6, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.6, 0);

  ctx.closePath();

  ctx.fill();

  ctx.restore();
}

/* ===========================
   Draw Star
=========================== */

function drawStar(ctx, star, config) {
  ctx.globalAlpha = star.alpha;

  ctx.beginPath();

  ctx.arc(
    star.x,

    star.y,

    star.radius,

    0,

    Math.PI * 2,
  );

  ctx.fillStyle = star.color;

  ctx.fill();

  drawGlow(ctx, star, config);

  drawFlare(ctx, star, config);

  ctx.globalAlpha = 1;
}

/* ===========================
   Update Stars
=========================== */

export function updateStars() {
  stars.forEach(updateStar);
}

/* ===========================
   Draw Stars
=========================== */

export function drawStars(ctx, config) {
  stars.forEach((star) => {
    drawStar(ctx, star, config);
  });
}
