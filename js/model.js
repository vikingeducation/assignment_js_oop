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
    this.xVelocity = Math.random() * 20 - 10;
    this.yVelocity = Math.random() * 20 - 10;
  },


  generateAsteroids: function(numAsteroids) {
    numAsteroids = numAsteroids || 1;
    for (var i = 0; i < numAsteroids; i++) {
      var ast = new GAME.model.Asteroid();
      GAME.model.asteroids.push(ast);
    }
  },


  explodeAsteroids: function() {
    // one asteroid explodes into two asteroids of half size
  },


  update: function() {
    for ( var i = 0; i < this.asteroids.length; i++ ) {
      this.asteroids[i].tic();
    }
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
