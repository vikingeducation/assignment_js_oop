var model = {
  asteroids: [],

  getAsteroids: function() {
    return this.asteroids;
  },

  generateAsteroids: function() {
    var max = 100;
    var spawnRate = 25; // lower = more
    var random = Math.floor(Math.random() * max);

    if (spawnRate < random) {
      this.asteroids.push(new Asteroid());
    }
  },

  updateAsteroids: function() {
    var allAsteroids = this.asteroids, currAsteroid;
    for (var a in allAsteroids) {
      currAsteroid = allAsteroids[a];
      currAsteroid.x +=   currAsteroid.dx;
      currAsteroid.y +=   currAsteroid.dy;
      if (currAsteroid.x < -currAsteroid.size || currAsteroid.x > 800 ||
        currAsteroid.y < -50 || currAsteroid.y > 800) {
          allAsteroids.splice(a, 1);
      }
    }
  },

  hypotenuse: function(asteroid1,asteroid2) {
    var xDiff = Math.pow(asteroid1.x - asteroid2.x, 2);
    var yDiff = Math.pow(asteroid1.y - asteroid2.y, 2);

    return Math.pow((xDiff+yDiff),0.5);
  },

  checkCollisions: function() {

    var asteroids = this.asteroids;
    var max = asteroids.length;

    for (var i=0;i < max; i++) {
      var asteroid = asteroids[i];
      var otherAsteroids = asteroids.slice();
      //otherAsteroids = otherAsteroids.splice(i,1);
      otherAsteroids.splice(i,1);
      var oA = otherAsteroids.length;
      for (var j=0;j < oA; j++) {
         var otherAsteroid = otherAsteroids[j];
         if (this.hypotenuse(asteroid,otherAsteroid) < (asteroid.size + otherAsteroid.size)) {
             this.asteroidHitsAsteroid(asteroid,otherAsteroid);
         }
      }

    }
  },

  asteroidHitsAsteroid: function(asteroid,otherAsteroid) {
    // Break asteroid into pieces
    // if (asteroid.size/2 >= 10) {
    //   var a1 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, -5); // N
    //   var a2 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 5, 0); // E
    //   var a3 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, 5); // S
    //   var a4 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, -5, 5); // W
    //   model.asteroids.push(a1);
    //   model.asteroids.push(a2);
    //   model.asteroids.push(a3);
    //   model.asteroids.push(a4);
    //
    // }
    // // Break asteroid2 into pieces
    // if (asteroid.size/2 >= 10) {
    //   var b1 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, -5); // N
    //   var b2 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 5, 0); // E
    //   var b3 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, 5); // S
    //   var b4 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, -5, 5); // W
    //   model.asteroids.push(b1);
    //   model.asteroids.push(b2);
    //   model.asteroids.push(b3);
    //   model.asteroids.push(b4);
    // }
    // Remove collided asteroids
     this.killAsteroid(asteroid,otherAsteroid);
  },

  killAsteroid: function(asteroid,otherAsteroid) {
    for (var a in arguments) {
       var index = this.asteroids.indexOf(arguments[a]);
       this.asteroids.splice(index,1);
    }

  },

};


function Asteroid(size, x, y, dx, dy) {
  // Size
  this.size = 50;
  this.randomVal = Math.random();
  this.randomCoord = Math.random() * (800 + this.size) - this.size;

  // Starting Position
  // Spawn from North side
  if (this.randomVal < 0.25) {
    this.x = this.randomCoord;
    this.y = -this.size;
  // Spawn from East Side
  }
  else if (this.randomVal < 0.5) {
    this.x = 800;
    this.y = Math.random() * (800 + this.size) - this.size;
  // Spawn from South Side
  }

  else if (this.randomVal < 0.75) {
    this.x = this.x = Math.random() * (800 + this.size) - this.size;
    this.y = 800;
  //Spawn from West Side
  }
  else {
    this.x =  - this.size;
    this.y = Math.random() * (800 + this.size) - this.size;
  }

  // Velocity
  this.dx = (Math.random() * 10) - 5;
  this.dy = (Math.random() * 10) - 5;

  if (arguments.length !== 0) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  this.image = new Image();
  this.image.src = "images/charizard.jpg";

  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  };
}
