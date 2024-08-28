const my_canvas = document.getElementById('my_canvas')
const ctx = my_canvas.getContext('2d');
let flag = true;
const width = 800;
const height = 500;
const rectWidth = 100;
const rectHeight = 100;
let drawMousePath = false;
let x = 0;
let y = 0;
let direction = "";
let speed = 10;
ctx.strokeStyle = 'white';

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case 'w':
      direction = "up"
      break;
    case 's':
      direction = "down"
      break;
    case 'a':
      direction = "left"
      break;
    case 'd':
      direction = "right"
      break;
  }
});

function update() {
  switch (direction) {
    case 'up':
      y -= speed;
      break;
    case 'down':
      y += speed;
      break;

    case 'left':
      x -= speed;
      break;
    default:

    case 'right':
      x += speed;
      break;
  }
}

function paint() {
  update();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = getRandomColor();
  ctx.strokeStyle = "black";
  ctx.fillRect(x, y, rectWidth, rectHeight);
  requestAnimationFrame(paint);
}

requestAnimationFrame(paint);
function getRandomColor() {
  var trans = '0.5'; // 50% transparency
  var color = 'rgba(';
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ',';
  }
  color += trans + ')'; // add the transparency
  return color;
}
