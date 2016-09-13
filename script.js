"use strict";

function Asteroid (x, y) {
  this.x = x;
  this.y = y;
  this.xVelocity = 1;
  this.yVelocity = 1;
}

Asteroid.prototype.tic = function() {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
}

var asteroid = new Asteroid(5, 5);
asteroid.tic();
console.log(asteroid.x);
console.log(asteroid.y);

var AsteroidField = {}

for(var i = 0; i < 1000; i++) {
  var xPos = Math.floor(Math.random() * 100);
  var yPos = Math.floor(Math.random() * 100);
  AsteroidField["asteroid" + i] = new Asteroid(xPos, yPos);
  var asteroid = AsteroidField["asteroid" + i];
  console.log("Asteroid number " + i + " was at location [" + asteroid.x + "," + asteroid.y + "]");
  for(var j = 0; j < 1000; j++) {
    asteroid.tic();
  }
  console.log("Asteroid number " + i + " is now at location [" + asteroid.x + "," + asteroid.y + "]");
}