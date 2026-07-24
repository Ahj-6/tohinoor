/* ===========================
   Meteor
=========================== */

let shootingStar = null;

let nextMeteorTime = Date.now() + randomBetween(3000, 8000);

/* ===========================
   Helpers
=========================== */

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/* ===========================
   Create
=========================== */

function createShootingStar(canvas, config) {
  shootingStar = {
    x: randomBetween(-200, canvas.width * 0.3),
    y: randomBetween(-100, canvas.height * 0.25),

    length: randomBetween(config.meteor.lengthMin, config.meteor.lengthMax),

    speed: randomBetween(config.meteor.speedMin, config.meteor.speedMax),

    angle: Math.PI / 4,

    alpha: 1,
  };
}

/* ===========================
   Update
=========================== */

export function updateMeteor(canvas, config) {
  if (!shootingStar && Date.now() > nextMeteorTime) {
    createShootingStar(canvas, config);
  }

  if (!shootingStar) return;

  shootingStar.x += shootingStar.speed;
  shootingStar.y += shootingStar.speed;

  if (shootingStar.x > canvas.width + 300) {
    shootingStar = null;

    nextMeteorTime =
      Date.now() +
      randomBetween(
        config.meteor.intervalMin,

        config.meteor.intervalMax,
      );
  }
}

/* ===========================
   Draw
=========================== */

export function drawMeteor(ctx) {
  if (!shootingStar) return;

  const s = shootingStar;
  const tailX = Math.cos(s.angle) * s.length;
  const tailY = Math.sin(s.angle) * s.length;

  ctx.save();
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#ffd36b";

  const gradient = ctx.createLinearGradient(
    s.x,
    s.y,

    s.x - tailX,
    s.y - tailY,
  );

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,235,180,.9)");
  gradient.addColorStop(1, "rgba(255,235,180,0)");

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(s.x, s.y);

  ctx.lineTo(
    s.x - tailX,
    s.y - tailY,
  );

  ctx.stroke();

  // Core

  ctx.beginPath();

  ctx.arc(
    s.x,
    s.y,
    3.5,
    0,
    Math.PI * 2,
  );

  ctx.fillStyle = "#fff8e7";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#ffe49b";
  ctx.fill();
  ctx.restore();
}
