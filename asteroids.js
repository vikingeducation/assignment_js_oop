'use_strict;'

var controller = {
  init: function(){
    model.init();
    view.init();
    controller.startInterval();
  },

  startInterval: function(){
    gameInterval = setInterval(function(){
      model.takeTurn();
    }, 1000);
  }
};

var model = {
  init: function(){
  	model.asteroids = [];
    model.addToAsteroidsPrototype( model.asteroidConstructor );
    // Building asteroids that have the tic function in it's prototype.
    model.buildAsteroids( 1000, model.asteroids, model.buildAsteroid, model.asteroidConstructor, model.randomNumber )
  },

  // I feel like this a hub of sorts so don't have to pass in functions (as in it can just call method.something())
  addToAsteroidsPrototype: function( asteroidConstructor ){
    model.addTicToConstructor( asteroidConstructor );
  },

  addTicToConstructor: function( asteroidConstructor ){
    asteroidConstructor.prototype.tic = function(){
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    };
  },

  buildAsteroid: function( asteroidsArray, asteroidConstructor, randomNumberFunction ){
    var asteroid = new asteroidConstructor( randomNumberFunction( 1000 ), randomNumberFunction( 1000 ), randomNumberFunction( 3, 1 ), randomNumberFunction( 3, 1 ), randomNumberFunction( 30, 10 ), randomNumberFunction( 30, 10 ) );
    asteroidsArray.push( asteroid );
  },

  buildAsteroids: function( numberOfAsteroids, asteroidsArray, buildAsteroidFunction, asteroidConstructor, randomNumberFunction ){
    for( var i = 0; i < numberOfAsteroids; i++ ) {
      buildAsteroidFunction( asteroidsArray, asteroidConstructor, randomNumberFunction );
    };
  },

  asteroidConstructor: function ( x, y, xVelocity, yVelocity, height, width ){
  	this.x = x;
  	this.y = y;
  	this.xVelocity = xVelocity;
  	this.yVelocity = yVelocity;
    this.height = height;
    this.width = width;
  },

  asteroidWithTicConstructor: function( x, y, xVelocity, yVelocity, height, width ){
    this.x = x;
    this.y = y;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.height = height;
    this.width = width;
    this.tic = function(){
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    };
  },

  // Random number from 0 to largestNumber
  randomNumber: function( largestNumber, smallestNumber ){
    var smallest = smallestNumber || 0;
    var number =  Number( (Math.random() * largestNumber).toFixed(0) );
    while (number < smallestNumber) {
      number = Number( (Math.random() * largestNumber).toFixed(0) );
    };
    return number;
  },

  runTicOnAllAsteroids: function( asteroids ){
    for(var i= 0; i < asteroids.length; i++) {
      asteroids[i].tic();
    };
  },

  // This is a control center so I'm gonna call model methods directly from here...
  takeTurn: function(){
    model.runTicOnAllAsteroids( model.asteroids );
    view.renderBoard( view.addAsteroidsToBoard, model.asteroids, view.clearAsteroids, view.setCSSOfAsteroid );
  }
};

var view = {
  init: function(){
    view.renderBoard( view.addAsteroidsToBoard, model.asteroids, view.clearAsteroids, view.setCSSOfAsteroid );
  },

  // let's try the easier way which is to clear the board of all asteroids
  // then render each asteroid...
  renderBoard: function( addAsteroidsToBoard , asteroids, clearAsteroids, setCSSOfAsteroid ){
    clearAsteroids();
    addAsteroidsToBoard( asteroids, setCSSOfAsteroid );
  },

  clearAsteroids: function(){
    $(".asteroid").remove();
  },

  addAsteroidsToBoard: function( asteroids, setCSSOfAsteroid ){
    for (var asteroidNumber = 0; asteroidNumber < asteroids.length; asteroidNumber++) {
      $("#game-board").append("<div class='asteroid' id='asteroid-"+ asteroidNumber + "' ></div>");
      setCSSOfAsteroid(asteroids, asteroidNumber)
    };
  },

  // I feel like this is the hub for all css position changes so going to call view functions straight from this function.
  setCSSOfAsteroid: function( asteroids, asteroidNumber ){
    view.setCSSPositionOfAsteroid( asteroids, asteroidNumber );
    view.setCSSDimensionsOfAsteroid( asteroids, asteroidNumber );
  },

  setCSSDimensionsOfAsteroid: function( asteroids, asteroidNumber ){
    $("#asteroid-" + asteroidNumber).css({height: asteroids[asteroidNumber].height, width: asteroids[asteroidNumber].width})
  },

  setCSSPositionOfAsteroid: function( asteroids, asteroidNumber ){
    $("#asteroid-" + asteroidNumber).css({top: asteroids[asteroidNumber].y, left: asteroids[asteroidNumber].x})
  }
};

var tester = {

  compareTicOnPrototypeVsBuiltIn( constructorWithBuiltIn, constructorWithoutBuiltIn, buildAsteroidFunction, buildAsteroidsFunction, numberOfAsteroids, numberOfTics, randomNumberFunction, addTicToConstructorFunction ){
    addTicToConstructorFunction( constructorWithoutBuiltIn );
    timeOfBuiltIn = tester.testSpeedOfAsteroidsTic( constructorWithBuiltIn, buildAsteroidFunction, buildAsteroidsFunction, numberOfAsteroids, numberOfTics, randomNumberFunction );
    timeOfInherited = tester.testSpeedOfAsteroidsTic( constructorWithoutBuiltIn, buildAsteroidFunction, buildAsteroidsFunction, numberOfAsteroids, numberOfTics, randomNumberFunction );
    console.log( "Constructor With Built In Tic" );
    console.log( timeOfBuiltIn + " seconds to run tic " + numberOfTics + " times on " + numberOfAsteroids + " asteroids." );
    console.log( "Constructor That Inherited Tic" );
    console.log( timeOfInherited + " seconds to run tic " + numberOfTics + " times on " + numberOfAsteroids + " asteroids." );
  },

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

  testSpeedOfAsteroidsTic( asteroidConstructor, buildAsteroidFunction, buildAsteroidsFunction, numberOfAsteroids, numberOfTics, randomNumberFunction ){
    var asteroids = [];
    buildAsteroidsFunction( numberOfAsteroids, asteroids, buildAsteroidFunction, asteroidConstructor, randomNumberFunction );
    var timeBeforeTic = new Date();
    for(var asteroid = 0; asteroid < model.asteroids.length; asteroid++){
      for(var tic = 0; tic < numberOfTics; tic++){
        model.asteroids[asteroid].tic();
      };
    };
    var timeAfterTic = new Date();
    return ( timeAfterTic - timeBeforeTic );
  }
}

$(document).ready(function(){
  controller.init();
});

// tester.testSpeedOfAsteroidsTicWhenPrototypeInherited( model.asteroidConstructor, model.buildAsteroid, model.buildAsteroids, 1000, 1000, model.randomNumber );

// Testing that the tic works on asteroids that have a built in tic.
// var a = [];
// model.buildAsteroid( a, model.asteroidWithTicConstructor, model.randomNumber );
// tester.verifyThatTicWorks(a[0]);

// Comparing inherited vs built-in tic method speed.
// Built in is faster...
// tester.compareTicOnPrototypeVsBuiltIn( model.asteroidWithTicConstructor, model.asteroidConstructor, model.buildAsteroid, model.buildAsteroids, 100000, 100000, model.randomNumber, model.addTicToConstructor )