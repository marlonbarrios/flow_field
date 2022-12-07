
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5()

let points = [];


let density = 35;
let mult = 0.005;






const settings = {
  pixelsPerInch: 300,
   // Tell canvas-sketch we're using p5.js
   p5: true,
   // Turn on a render loop (it's off by default in canvas-sketch)

   duration: 3,

    animate: true,
    // We can specify dimensions if we want a fixed size on the first render
    dimensions:[512, 512],
    // orientation: 'landscape',
    bleed: 1 / 8,
    // attributes: {
    // antialias: true
    // }
};



canvasSketch(() => {
  angleMode(DEGREES);
  noiseDetail(1)
  // Return a renderer, which is like p5.js 'draw' loop
  let space = width /density;


  

  for (let x = 0; x < width ; x += space) {
    for (let y = 0; y < height; y += space) {
     var p = createVector(x + random(-10, 10), y+ random(-20, 20),);
      points.push(p);
    }
  }

shuffle(points, true);


 return ({ playhead, width, height }) => {
stroke(0,alpha)
strokeWeight(0.5)


  if (frameCount * 5 <= points.length) {
    var max = frameCount * 5}
    else { var max = points.length }


  for (var i = 0; i < max; i++) {

 var alpha = map(dist( width/2, height/2,points[i].x, points[i].y), 10, 360, 255, 0);


var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);

points[i].add(createVector(cos(angle), sin(angle)));

if (dist(width / 2 , height / 2, points[i].x, points[i].y) < 350) {

point(points[i].x, points[i].y, 1);
  }
  }
  }
},  settings);
