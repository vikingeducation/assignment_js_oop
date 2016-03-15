GAME.asteroidModel = {

  init: function(numAsteroids) {
    this.asteroids = [];
    this.generateAsteroids(numAsteroids);
    this.deltaTime = 0;
    this.lastAsteroidCreatedAt = 0;
  },


  Asteroid: function(xCoord, yCoord, size, xVelocity, yVelocity) {
    this.xCoord = xCoord || GAME.useful.randomX();
    this.yCoord = yCoord || GAME.useful.random(10, 790);
    this.size = size || GAME.useful.random(20,90);
    this.xVelocity = xVelocity || GAME.useful.randomVelocity();
    this.yVelocity = yVelocity || GAME.useful.randomVelocity();
  },


  generateAsteroids: function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var ast = new this.Asteroid();
      this.asteroids.push(ast);
    }
  },


  findAsteroidsToExplode: function(lasers) {
    var astrToExplode = [];

    for (var i = 0; i < this.asteroids.length; i++) {
      // check for asteroid collisions
      for (var j = 0; j < this.asteroids.length; j++) {
        if (i === j) {
          continue;
        }
        var astrA = this.asteroids[i];
        var astrB = this.asteroids[j];
        var distance = Math.sqrt( Math.pow(astrA.xCoord - astrB.xCoord, 2) + Math.pow(astrA.yCoord - astrB.yCoord, 2) );
        var sumRadii = astrA.size + astrB.size;

        if (distance <= sumRadii) {
          astrToExplode.push(astrA);
          astrToExplode.push(astrB);
        }
      }
      // check for laser collisions
      for (var k = 0; k < lasers.length; k ++) {
        var astr = this.asteroids[i]
        var radius = astr.size;
        var distance = Math.sqrt( Math.pow(astr.xCoord - lasers[k].xCoord, 2) + Math.pow(astr.yCoord - lasers[k].yCoord, 2) );

        if (distance <= radius) {
          // TODO: make sure it's not already there
          astrToExplode.push(astr);
        }
      }
      // check for ship collisions
      var astr = this.asteroids[i];
      var radius = astr.size + GAME.controller.ship.size;
      var distance = Math.sqrt( Math.pow(astr.xCoord - GAME.controller.ship.xCoord, 2) + Math.pow(astr.yCoord - GAME.controller.ship.yCoord, 2) );

      if (distance <= radius) {
        console.log("Game over :(");
      }

    }
    return astrToExplode;
  },



  explodeAsteroids: function(arr) {
    // halve existing asteroid's size, randomize velocity
    for (var i = 0; i < arr.length; i++) {
      var collisionX = arr[i].xCoord;
      var collisionY = arr[i].yCoord;
      var originalSize = arr[i].size;

      // if size is too small, don't add
      var aIdx = this.asteroids.indexOf(arr[i]);
      if (originalSize < 10) {
        arr.splice(i,1);
        this.asteroids.splice(aIdx, 1);
      } else {
        this.asteroids[aIdx].xCoord = collisionX + originalSize;
        this.asteroids[aIdx].yCoord = collisionY + originalSize;
        this.asteroids[aIdx].size = GAME.useful.halfSize(originalSize);
        this.asteroids[aIdx].xVelocity = GAME.useful.randomVelocity();
        this.asteroids[aIdx].yVelocity = GAME.useful.randomVelocity();

        // create new tiny asteroid, with random velocity
        this.asteroids.push(new GAME.asteroidModel.Asteroid(collisionX-originalSize, collisionY-originalSize, originalSize/2));
      }
    }
  },


  // TODO: make this better...
  update: function(lasers) {
    for ( var i = 0; i < this.asteroids.length; i++ ) {
      this.asteroids[i].tic();
    }
    this.explodeAsteroids(this.findAsteroidsToExplode(lasers));
    this.addNewAsteroid();
  },



  addNewAsteroid: function() {
    var d = new Date();
    this.deltaTime = d.getTime() - this.lastAsteroidCreatedAt;
    if (this.deltaTime > 5000) {
      this.generateAsteroids(1);
      this.lastAsteroidCreatedAt = d.getTime();
    }
  }

}

GAME.asteroidModel.Asteroid.prototype.tic = function() {
  this.xCoord += this.xVelocity;
  this.yCoord += this.yVelocity;

  this.wrap();
}



GAME.asteroidModel.Asteroid.prototype.wrap = function() {
  // if x-coord is < min width or > max, reset
  if (this.xCoord < 0) {
    this.xCoord = GAME.width + this.xCoord;
  } else if (this.xCoord > GAME.width) {
    this.xCoord = this.xCoord - GAME.width;
  } else if (this.yCoord < 0) {
    this.yCoord = GAME.height + this.yCoord;
  } else if (this.yCoord > GAME.height) {
    this.yCoord = this.yCoord - GAME.height;
  }
}
