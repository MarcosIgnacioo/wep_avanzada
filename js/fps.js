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
  console.log(e.key);
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
    case ' ':
      speed *= 2;
      break;
  }
});

function update() {
  switch (direction) {
    case 'up':
      y -= speed;
      if (y + 50 <= 0) {
        y = 630
      }
      break;
    case 'down':
      y += speed;
      if (y - 50 >= height) {
        y = -10;
      }
      break;

    case 'left':
      x -= speed;
      if (x + 50 <= 0) {
        x = 830;
      }
      break;
    case 'right':
      console.log("wep")
      x += speed;
      if (x + 50 >= width) {
        x = -40;
      }
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
