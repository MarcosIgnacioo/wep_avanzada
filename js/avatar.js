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

// cremita
// #f6f0ce 
// rosa
// #f9c5db 
// otro cafe
// #231c1c
ctx.fillStyle = '#231c1c';
let originX = 200;
let originY = 280;

ctx.fillStyle = '#f6f0ce';
ctx.beginPath();
ctx.arc(originX-90, originY + 120, 40, 0 * Math.PI, 2 * Math.PI);
ctx.fill();

ctx.fillStyle = '#f9c5db';
ctx.beginPath();
ctx.arc(originX+100, originY + 120, 40, 0 * Math.PI, 2 * Math.PI);
ctx.fill();

ctx.strokeStyle = '#141212';
ctx.fillStyle = '#231c1c';
ctx.lineWidth = 10;
ctx.beginPath();
ctx.arc(originX, originY, 140, 0 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.stroke();

ctx.fillStyle = '#f6f0ce';
ctx.beginPath();
ctx.arc(originX-150, originY , 40, 0 * Math.PI, 2 * Math.PI);
ctx.fill();

ctx.fillStyle = '#f9c5db';
ctx.beginPath();
ctx.arc(originX+150, originY , 40, 0 * Math.PI, 2 * Math.PI);
ctx.fill();

ctx.fillStyle = '#f6f0ce';
ctx.fillRect(originX - 50 - 20, originY - 20 - 20, 40, 80);
ctx.fillStyle = '#f9c5db';
ctx.fillRect(originX + 20, originY - 20 - 20, 40, 80);


ctx.beginPath();
ctx.fillStyle = '#f9c5db';
ctx.arc(originX, originY + 60, 50, 2 * Math.PI, 1 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = '#f6f0ce';
ctx.arc(originX - 30, originY + 60, 50, 2 * Math.PI, 1 * Math.PI);
ctx.fill();


ctx.beginPath();
const anchor_x = 310;
const anchor_y = 100;
ctx.moveTo(anchor_x, anchor_y);
ctx.lineTo(anchor_x - 65, anchor_y + 50);
ctx.lineTo(anchor_x + 35, anchor_y + 50);
ctx.closePath();
ctx.fill();

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = getRandomColor();
  ctx.strokeStyle = "black";
  ctx.fillRect(x, y, rectWidth, rectHeight);
}
