let circles = new Array(15);
let circlesLocation = new Array(15);
let sample;

let colorPalet = [
  [186, 229, 213],
  [215, 172, 212],
  [238, 194, 194],
  [242, 242, 176],
  [150, 233, 198],
  [131, 192, 193],
  [105, 98, 173],
  [108, 34, 166]
];

function initializeZero(arr, location, x,y) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      diametre: random(x / 3),
      maxDiamter: random(x / 3),
      color: randomColor(),
      alpha: 255 // Initial alpha value for each circle
    };

    location[i] = {
      x: random(x),
      y: random(y)
    };
  }
}
function preload(){
   soundFormats('mp3', 'ogg');
  sample = loadSound('bubble.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeZero(circles, circlesLocation, width,height);
  
  userStartAudio().then(function() {
    console.log('Audio context started');
    sample.play();  // Now it's safe to play the sound
  }).catch(function(err) {
    console.error('Error starting audio context:', err);
  });
 
}

function draw() {
  background(255);

  randomCircle(circles);
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].diametre > circles[i].maxDiamter) {
      circles[i].diametre = 0;
      circlesLocation[i].x = random(width);
      circlesLocation[i].y = random(height);
      circles[i].maxDiamter = random(width);
      circles[i].alpha = 255; 
	  sample.play();
    } else {
      circles[i].diametre += 1 / 2;

      circles[i].alpha = max(0, circles[i].alpha - 1/6);
    }
  }
}

function randomColor() {
  let rnd = floor(random(colorPalet.length));
  return color(colorPalet[rnd][0], colorPalet[rnd][1], colorPalet[rnd][2]);
}

function randomCircle(circles) {
  for (let i = 0; i < circles.length; i++) {
    fill(circles[i].color.levels[0], circles[i].color.levels[1], circles[i].color.levels[2], circles[i].alpha);
    noStroke();
    circle(circlesLocation[i].x, circlesLocation[i].y, circles[i].diametre);
  }
}
