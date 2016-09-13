function Asteroid (x, y) {
  this.xPos = x;
  this.yPos = y;
  this.xVelocity = 1;
  this.yVelocity = 1;
  this.tic = function () {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

var AsteroidField = {}

for(var i = 0; i < 1000; i++) {
  var xPos = Math.floor(Math.random() * 100);
  var yPos = Math.floor(Math.random() * 100);
  AsteroidField["asteroid" + i] = new Asteroid(xPos, yPos);
  var asteroid = AsteroidField["asteroid" + i];
}

var canvas = document.getElementById("canvas");
console.log(canvas);
var ctx = canvas.getContext("2d");


// ctx.beginPath();
// ctx.arc(xpos, ypos, 5, 0, 2 * Math.PI);
// ctx.stroke();

var a = new Asteroid(75, 75);

var view = {
  init: function() {

  },

  render: function() {
    setInterval(view.moveAsteroid(a), 100);
  },

  moveAsteroid: function(a) {
    console.log("dsads")
    a.tic();
    ctx.beginPath();
    ctx.arc(a.xPos, a.yPos, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

view.render();