"use strict";
//alert("Total time was: " + totalTime + " milliseconds");
// function Asteroid (x, y) {
//   this.x = x;
//   this.y = y;
//   this.xVelocity = 1;
//   this.yVelocity = 1;
// }

function Asteroid (x, y) {
  this.x = x;
  this.y = y;
  this.xVelocity = 1;
  this.yVelocity = 1;
  this.tic = function () {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

//Asteroid.prototype.tic = function() {
  //this.x += this.xVelocity;
  //this.y += this.yVelocity;
//}

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
}

var firstTime = new Date();

for(var i = 0; i < 1000; i++) {
  var asteroid = AsteroidField["asteroid" + i];
  for(var j = 0; j < 1000; j++) {
    asteroid.tic();
  }
}

var secondTime = new Date();

var totalTime =  secondTime.getTime() - firstTime.getTime()
