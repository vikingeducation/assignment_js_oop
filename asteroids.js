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
    model.buildAsteroids( 1000, model.asteroids, model.buildAsteroid, model.asteroidConstructor, model.randomNumber )
  },

  addToAsteroidsPrototype: function( asteroidConstructor ){
    asteroidConstructor.prototype.tic = function(){
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    }
  },

  buildAsteroid: function( asteroidsArray, asteroidConstructor, randomNumberFunction ){
    var asteroid = new asteroidConstructor( randomNumberFunction( 1000 ), randomNumberFunction( 1000 ), randomNumberFunction( 3 ), randomNumberFunction( 3 ) );
    asteroidsArray.push( asteroid );
  },

  buildAsteroids: function( numberOfAsteroids, asteroidsArray, buildAsteroidFunction, asteroidConstructor, randomNumberFunction ){
    for( var i = 0; i < numberOfAsteroids; i++ ) {
      buildAsteroidFunction( asteroidsArray, asteroidConstructor, randomNumberFunction );
    };
  },

  asteroidConstructor: function ( x, y, xVelocity, yVelocity ){
  	this.x = x;
  	this.y = y;
  	this.xVelocity = xVelocity;
  	this.yVelocity = yVelocity;
  },

  // Random number from 0 to largestNumber
  randomNumber: function( largestNumber ){
    return Number( (Math.random() * largestNumber).toFixed(0) )
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
  },

  testSpeedOfAsteroidsTicWhenPrototypeInherited( asteroidConstructor, buildAsteroidFunction, buildAsteroidsFunction, numberOfAsteroids, numberOfTics, randomNumberFunction ){
    var asteroids = [];
    buildAsteroidsFunction( numberOfAsteroids, asteroids, buildAsteroidFunction, asteroidConstructor, randomNumberFunction );
    var timeBeforeTic = new Date();
    for(var asteroid = 0; asteroid < model.asteroids.length; asteroid++){
      for(var tic = 0; tic < numberOfTics; tic++){
        model.asteroids[asteroid].tic();
      };
    };
    var timeAfterTic = new Date();
    console.log( timeAfterTic - timeBeforeTic );
  }
}

$(document).ready(function(){
  controller.init();
  tester.testSpeedOfAsteroidsTicWhenPrototypeInherited( model.asteroidConstructor, model.buildAsteroid, model.buildAsteroids, 1000, 1000, model.randomNumber );
});