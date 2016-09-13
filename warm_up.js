var APP = APP || {};

APP.Asteroid = function Asteroid (x,y,velocityX,velocityY) {
  this.coordX = x;
  this.coordY = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

APP.Asteroid.prototype.tic = function() {
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
};

var asteroid = new APP.Asteroid(2,2,1,1);

APP.buildManyAsteroids = function (numOfAsteroids, numOfTics) {
  var staticObjectStartDateTime = new Date();
  var asteroids = [];
  for (var i=0; i < numOfAsteroids; i++) {
    var randX = Math.floor(Math.random() * 10) + 1;
    var randY = Math.floor(Math.random() * 10) + 1;
    var randVelocityX = Math.floor(Math.random() * 3) + 1;
    var randVelocityY = Math.floor(Math.random() * 3) + 1;

    var newAsteroid = new APP.Asteroid(randX, randY, randVelocityX, randVelocityY);

    newAsteroid.tic = function() {
      this.coordX += this.velocityX;
      this.coordY += this.velocityY;
    };

    asteroids.push(newAsteroid);
  }

  //do this tic times
  for (var i=0; i < numOfTics; i++) {
    asteroids.forEach(function(el) { 
      el.tic();
    });
  }

  var staticObjectEndDateTime = new Date();

  var staticTime = staticObjectEndDateTime.getTime() - staticObjectStartDateTime.getTime();

  console.log(staticTime + " milliseconds");
};

// using chrome
//prototype : 18 ms
//constructor: 30 ms
APP.buildManyAsteroids(1000, 1000);
