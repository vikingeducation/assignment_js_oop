var GAME = GAME || {};


GAME.model = {

  asteroids: [],

  init: function(numAsteroids) {
    GAME.model.generateAsteroids(numAsteroids);
  },


  Asteroid: function(xCoord, yCoord, size, xVelocity, yVelocity) {
    this.xCoord = xCoord || GAME.useful.random(10, 1590);
    this.yCoord = yCoord || GAME.useful.random(10, 790);
    this.size = size || GAME.useful.random(20,90);
    this.xVelocity = xVelocity || GAME.useful.randomVelocity();
    this.yVelocity = yVelocity || GAME.useful.randomVelocity();
  },


  generateAsteroids: function(numAsteroids) {
    numAsteroids = numAsteroids || 1;
    for (var i = 0; i < numAsteroids; i++) {
      var ast = new GAME.model.Asteroid();
      GAME.model.asteroids.push(ast);
    }
  },


  findAsteroidsToExplode: function() {
    // one asteroid explodes into two asteroids of half size
    // OR bullet hits asteroid
    var astrToExplode = [];

    for (var i = 0; i < GAME.model.asteroids.length; i++) {
      for (var j = 0; j < GAME.model.asteroids.length; j++) {
        if (i == j) {
          continue;
        }
        var astrA = GAME.model.asteroids[i];
        var astrB = GAME.model.asteroids[j];
        var distance = Math.sqrt( Math.pow(astrA.xCoord - astrB.xCoord, 2) + Math.pow(astrA.yCoord - astrB.yCoord, 2) );
        var sumRadii = astrA.size + astrB.size;

        if (distance < sumRadii) {
          astrToExplode.push(astrA);
          astrToExplode.push(astrB);
          console.log("Explode!!!!!!")
        }
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


      arr[i].xCoord = collisionX + originalSize;
      arr[i].yCoord = collisionY + originalSize;
      arr[i].size = originalSize / 2;
      arr[i].xVelocity = GAME.useful.randomVelocity();
      arr[i].yVelocity = GAME.useful.randomVelocity();

      // create new tiny asteroid, with random velocity
      GAME.model.asteroids.push(new GAME.model.Asteroid(collisionX-originalSize, collisionY-originalSize, originalSize/2))
    }


  },


  update: function() {
    for ( var i = 0; i < this.asteroids.length; i++ ) {
      this.asteroids[i].tic();
    }
    this.explodeAsteroids(this.findAsteroidsToExplode());
  },






}

GAME.model.Asteroid.prototype.tic = function() {
  this.xCoord += this.xVelocity;
  this.yCoord += this.yVelocity;

  this.wrap();
}


GAME.model.Asteroid.prototype.wrap = function() {
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








GAME.useful = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  randomVelocity: function() {
    return Math.floor(Math.random() * 20 - 10);
  }
  // function to see if two objects collide


}


GAME.Ship = function() {
  this.xCoord = 500;
  this.yCoord = 500;
  this.size = 35;
}

GAME.Ship.prototype.tic = function() {

}




GAME.Ship.prototype.fire = function() {

}






GAME.laser = function() {
  this.size = 2;

}



GAME.laser.prototype.tic = function() {

}
