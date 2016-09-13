/**
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */

 $(document).ready(function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var asteroidImg = document.getElementByClassName('asteroid');
  var spaceshipImg = document.getElementById('spaceship');
  context.drawImage(asteroidImg, 10, 10);
  context.drawImage(spaceshipImg, 100, 100);
 })

 function SpaceObject(x, y) {
  this.xPos = x;
  this.yPos = y;
  this.xVelocity = undefined;
  this.yVelocity = undefined;
  this.tic = function () {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  };
 }

function Asteroid (x, y) {
  SpaceObject.call(this, x, y);
}
Asteroid.prototype = new SpaceObject();
// will new Asteroid(4, 4) work??

function Ship (x, y) {
  SpaceObject.call(this, x, y);
}
Ship.prototype = new SpaceObject();

function LaserBeam (x, y) {
  SpaceObject.call(this, x, y);
}
LaserBeam.prototype = new SpaceObject();

var view = {

}


var controller = {
  init: function() {
    model.init();
    // set event listeners
    this.interval = setInterval(this.playGame, 100);
    view.render();
  }
}


var model = {
  asteroids: [],

  shipCoords: [],

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