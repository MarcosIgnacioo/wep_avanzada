const my_canvas = document.getElementById('my_canvas')

// reharia esto usando la madre que lo hace con fps porque fakin shit es mas facil y menos horrible guardar todo el state en un arreglo que tener q andar haciendo jaladas para borrar ciertas cosas y otras no aparte que es mejor para generar el codigo amigue namas 


const output = document.getElementById('output')
const ctx = my_canvas.getContext('2d');

// tool selector shit
const tool_selector = document.getElementById('tool-selector')

let shape = tool_selector.value;

tool_selector.addEventListener('change', (e) => shape = e.target.value)

const width = my_canvas.clientWidth;
const height = my_canvas.clientHeight;
const rectWidth = 100;
const rectHeight = 100;
const cachedRect = { width: 0, height: 0, x: 0, y: 0 };

let pixelWidth = 5;


let flag = true;

let drawMousePath = false;
let x = 0;
let y = 0;

let pivotX = 0;
let pivotY = 0;

let direction = "";
let speed = 10;

let drawRectWidth = 0;
let drawRectHeight = 0;

let prevY = 0
let prevX = 0

let currWidth = 0
let currHeight = 0

// color shit
const colorPicker = document.getElementById('color-picker')
const colorPrev = document.getElementById('color-canvas')
const colorCtx = colorPrev.getContext('2d')
let userColor = colorPicker.innerText
const colorHistory = []

colorPicker.addEventListener('blur', () => {
  updateColor(colorPicker.value)
})

function updateColor(newColor) {
  if (newColor === "")
    return;
  if (newColor[0] !== "#")
    newColor = "#" + newColor;

  colorHistory.push(newColor)
  userColor = newColor;

  drawRect(colorCtx, 0, 0, colorCtx.clientWidth, colorCtx.clientHeight, 'white')

  const prevSqrSize = 40;
  let x = 0;
  for (let i = 0; i < colorHistory.length; i++) {
    const color = colorHistory[i];
    console.log(i)
    drawRect(colorCtx, x, 0, prevSqrSize, prevSqrSize, color)
    x += 40
  }
}

const hexDic = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "09",
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
}

function decToHex(num) {
  let hex = []
  for (let i = 0; num > 0; i++) {
    hex.push(hexDic[num % 16])
    num = Math.trunc(num / 16);
  }
  return (hex).reverse()
}

colorPrev.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const domToCanvasX = e.layerX - 10
  const domToCanvasY = e.layerY - (height + 38)
  var colors = colorCtx.getImageData(domToCanvasX, domToCanvasY, 1, 1).data;

  userColor = "rgba(" + colors.join(",") + ")"
  console.log(userColor)
  // let hexColors = []
  // for (let i = 0; i < 4; i++) {
  //   hexColors.push(decToHex(color.data[i]).join(""))
  // }
  // userColor = hexColors.join("")
})

my_canvas.addEventListener('mousedown', (e) => {
  // las coordenads donde iniciamos la figura
  x = e.layerX
  y = e.layerY

  pivotX = e.layerX
  pivotY = e.layerY
  drawMousePath = true;
})

function error() {
  console.log("weeoerewr")
}

my_canvas.addEventListener('mouseup', () => {
  drawMousePath = false;
  let textFormatFunc = error;
  let args = [];
  switch (shape) {
    case 'rect':
      textFormatFunc = formatRectText
      args = [x, y, currWidth, currHeight]
      break;
    case 'circle':
      textFormatFunc = formatCircleText
      args = [x, y, currWidth]
      break;
    case 'line':
      textFormatFunc = formatLineText
      args = [x, y]
      break;
    default:
      return;
  }
  createFigureOutputText(textFormatFunc, args)
})

my_canvas.addEventListener('mousemove', (e) => {
  if (!drawMousePath) {
    clearCachedFigure(cachedRect)
    return;
  }
  // para obtener la currentWidth y height lo que hacemos es restar la posicion en x y y actual del mouse 
  // con las coordenadas inciiarles en donde se comenzo a dibujar y le hacemos math abs para que sea positive
  currWidth = Math.abs(pivotX - e.layerX);
  currHeight = Math.abs(pivotY - e.layerY);

  x = (pivotX > e.layerX || shape == "line" || shape == "brush") ? e.layerX : x;
  y = (pivotY > e.layerY || shape == "line" || shape == "brush") ? e.layerY : y;

  draw(shape)

  updateCachedFigure(cachedRect, currWidth, currHeight, x, y)
})

function draw(figure) {
  userColor = userColor || "black";
  switch (figure) {
    case 'line':
      drawLine(ctx, x, y, "black");
      drawLine(ctx, cachedRect.x, cachedRect.y, "white");
      break;
    case 'brush':
      drawPixel(ctx, x, y, userColor);
      // ooga booga
      createFigureOutputText(formatPixelText, [x, y, 20, 20])
      break;
    case 'circle':
      drawCircle(ctx, x, y, currWidth, userColor);
      break;
    case 'rect':
      drawRect(ctx, cachedRect.x, cachedRect.y, cachedRect.width, cachedRect.height, "white")
      drawRect(ctx, x, y, currWidth, currHeight, userColor)
      break;
    default:
      drawRect(ctx, x, y, currWidth, currHeight, userColor)
      break;
  }
}



function createFigureOutputText(formatTextFunction, content) {
  const div = document.createElement("div");
  div.innerText = formatTextFunction(...content)
  output.appendChild(div)
}

function updateCachedFigure(figure, width, height, x, y) {
  figure.x = x
  figure.y = y
  figure.width = width;
  figure.height = height;
}

function clearCachedFigure(figure) {
  for (prop in figure) {
    if (figure.hasOwnProperty(prop)) {
      figure[prop] = 0;
    }
  }
}

function drawRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0 * Math.PI, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function drawLine(ctx, x, y, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
}

function drawPixel(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, pixelWidth, pixelWidth);
  ctx.closePath();
}

function formatPixelText(x, y) {
  if (x == undefined || y == undefined) return;
  const color = userColor || "black";
  return `
    ctx.fillStyle = '${color}';
ctx.fillRect(${x}, ${y}, ${pixelWidth}, ${pixelWidth});`
}

function formatRectText(x, y, currWidth, currHeight) {
  const color = userColor || "black";
  return `
    ctx.fillStyle = '${color}';
ctx.fillRect(${x}, ${y}, ${currWidth}, ${currHeight});`
}

function formatLineText(x, y) {
  const color = userColor || "black";
  return `
ctx.strokeStyle = '${color}';
  ctx.beginPath();
  ctx.moveTo(${pivotX}, ${pivotY});
  ctx.lineTo(${x}, ${y});
  ctx.stroke();`
}

function formatCircleText(x, y, radius) {
  const color = userColor || "black";
  return `
ctx.fillStyle = '${color}';
  ctx.beginPath();
  ctx.arc(${x}, ${y}, ${radius}, 0 * Math.PI, 2 * Math.PI);
  ctx.fill();`
}

