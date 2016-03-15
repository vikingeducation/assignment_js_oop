var Asteroid = function(xCoord, yCoord, xVelocity, yVelocity) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
}

Asteroid.prototype.tic = function() {
  this.xCoord += this.xVelocity;
  this.yCoord += this.yVelocity;
}


function AsteroidToo(xCoord, yCoord, xVelocity, yVelocity) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.tic = function() {
    this.xCoord += this.xVelocity;
    this.yCoord += this.yVelocity;
  }
}

function makeAsteroids(num, isPrototype) {
  var asteroids = [];
  for (var i = 0; i < num; i++ ) {
    var xCoord = Math.floor(Math.random() * 1000);
    var yCoord = Math.floor(Math.random() * 1000);
    var xV = Math.floor(Math.random() * 10);
    var yV = Math.floor(Math.random() * 10);

    if (isPrototype) {
      asteroids.push(new Asteroid( xCoord, yCoord, xV, yV ));
    } else {
      asteroids.push(new AsteroidToo( xCoord, yCoord, xV, yV ));
    }

  }

  for ( var times = 0; times < 1000; times++ ) {
    for (var i = 0; i < num; i++ ) {
      asteroids[i].tic();
    }
  }
}

function benchmark(func, num, isPrototype) {
  var d = new Date();
  var startTime = d.getTime();

  makeAsteroids(1000, isPrototype);

  d = new Date();
  var endTime = d.getTime();

  var totalTime = endTime - startTime;
  return totalTime;
}

console.log("Prototype:")
console.log( benchmark(makeAsteroids, 1000, true) ); //9ms

console.log("Non-prototype:")
console.log( benchmark(makeAsteroids, 1000, false) ); //28ms
