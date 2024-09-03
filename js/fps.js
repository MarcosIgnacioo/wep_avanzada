class Entity {
  x;
  y;
  width;
  height;
  speed;
  color;

  constructor(x, y, speed, width, height, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collides(target) {
    return (
      (this.x + this.width > target.x && this.x < target.x + target.width)
      &&
      this.y + this.height > target.y && this.y < target.y + target.height
    )
  }
}


const my_canvas = document.getElementById('my_canvas')
const ctx = my_canvas.getContext('2d');

const player = new Entity(0, 0, 2, 20, 20, "blue")
const foo = new Entity(150, 150, 5, 200, 200, "red")
const puffle = new Entity(150, 350, 5, 20, 20, "pink")
let score = 0;

const directionMasking = {
  "up": "down",
  "down": "up",
  "left": "right",
  "right": "left",
}

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
      player.y -= player.speed;
      if (player.y + 50 <= 0) {
        player.y = 630
      }
      break;
    case 'down':
      player.y += player.speed;
      if (player.y - 50 >= height) {
        player.y = -10;
      }
      break;

    case 'left':
      player.x -= player.speed;
      if (player.x + 50 <= 0) {
        player.x = 830;
      }
      break;
    case 'right':
      player.x += player.speed;
      if (player.x + 50 >= width) {
        player.x = -40;
      }
      break;
  }

  if (player.collides(foo)) {
    switch (direction) {
      case "up":
        player.y += player.speed;
        break;
      case "down":
        player.y -= player.speed;
        break;
      case "left":
        player.x += player.speed;
        break;
      case "right":
        player.x -= player.speed;
        break;
    }
  }
  if (player.collides(puffle)) {
    puffle.x = Math.random() * width - puffle.width
    puffle.y = Math.random() * height - puffle.height
    score += 10;
  }
}

function paint() {
  update();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  puffle.draw(ctx)
  player.draw(ctx);
  foo.draw(ctx)
  ctx.strokeStyle = "pink";
  ctx.font = "italic 50px serif";
  ctx.fillText(`score ${score}`, 505, 95);
  // ctx.fillStyle = getRandomColor();
  // ctx.strokeStyle = "black";
  // ctx.fillRect(x, y, rectWidth, rectHeight);
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
  return 'blue';
}
