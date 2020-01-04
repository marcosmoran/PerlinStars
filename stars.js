var inc = 0.01;
var scl = 20;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield

function setup() {
  createCanvas(400, 400);
  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
for(var i = 0; i <  500; i++){
  particles[i] = new Particle();
}
  flowfield = new Array(cols * rows);
}

function draw() {
  noStroke();
 fill(0,10);
  rect(0,0,width,height);
  randomSeed(10);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(5);
      xoff += inc;
     

      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
   zoff += 0.0003;
  }
  for(var i = 0; i < particles.length; i++) {
  particles[i].follow(flowfield);
  particles[i].update();
  particles[i].show();
  particles[i].edges();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 2;
  }
  
  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    strokeWeight(1);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
  edges() {
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
    
  }
}
