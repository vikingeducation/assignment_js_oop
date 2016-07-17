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