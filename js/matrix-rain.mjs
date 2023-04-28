// Initialising the canvas
let canvas = document.getElementById('matrixRainCanvas'),
    ctx = canvas.getContext('2d');

// // Setting the width and height of the canvas
// canvas.width = "300";
// canvas.height = "800";


let div = document.getElementById('matrixRain');
canvas.width = 300;
canvas.height = 750;


// Setting up the letters
let letters = '1234567890/><,.]°[ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ';
letters = letters.split('');

// Setting up the columns
let fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
let drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

// function changeValue() {
//   canvas.width = div.clientWidth;
//   canvas.height = div.clientHeight;
// }

// window.onresize = changeValue;

// Setting up the draw function
export function drawRain() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}