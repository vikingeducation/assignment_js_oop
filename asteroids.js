'use_strict;'

var controller = {
  init: function(){
    model.init();
  }
};

var model = {
  init: function(){
  	model.asteroids = [];
    model.addToAsteroidsPrototype( model.asteroidConstructor );
    model.addAsteroidToGame( model.asteroids, model.asteroidConstructor )
  },

  addToAsteroidsPrototype: function( asteroidConstructor ){
    asteroidConstructor.prototype.tic = function(){
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    }
  },

  addAsteroidToGame: function( asteroidsArray, asteroidConstructor ){
    var asteroid = new asteroidConstructor( 1, 1, 2, 2 );
    asteroidsArray.push( asteroid );
  },

  asteroidConstructor: function ( x, y, xVelocity, yVelocity ){
  	this.x = x;
  	this.y = y;
  	this.xVelocity = xVelocity;
  	this.yVelocity = yVelocity;
  }
};

var view = {
  init: function(){

  }
};

var tester = {
  verifyThatTicWorks: function( asteroid ){
    var asteroidsInitialX = asteroid.x;
    var asteroidsInitialY = asteroid.y;
    asteroid.tic();

    if (( asteroidsInitialX + asteroid.xVelocity) === asteroid.x && (asteroidsInitialY + asteroid.yVelocity) === asteroid.y) {
      console.log( "asteroid.tic() works!" )
      tester.printAsteroidsVelocity( asteroid );
      tester.printAsteroidsInitialCoordinates( asteroidsInitialX, asteroidsInitialY );
      tester.printAsteroidsCurrentCoordinates( asteroid );
    } else {
      console.log( "asteroid.tic() doesn't work!" )
      tester.printAsteroidsVelocity( asteroid );
      tester.printAsteroidsInitialCoordinates( asteroidsInitialX, asteroidsInitialY );
      tester.printAsteroidsCurrentCoordinates( asteroid );
    };
  },

  printAsteroidsVelocity( asteroid ){
    console.log( "Asteroid's Velocity" );
    console.log( "xVelocity: " + asteroid.xVelocity );
    console.log( "yVelocity: " + asteroid.yVelocity );
  },

  printAsteroidsInitialCoordinates( asteroidsInitialX, asteroidsInitialY ){
    console.log( "Initial Coordinates" );
    console.log( "x: " + asteroidsInitialX );
    console.log( "y: " + asteroidsInitialY );
  },

  printAsteroidsCurrentCoordinates( asteroid ){
    console.log( "Current Coordinates" );
    console.log( "x: " + asteroid.x );
    console.log( "y: " + asteroid.y );
  }
}

$(document).ready(function(){
  controller.init();
});