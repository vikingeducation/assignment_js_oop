var tester = {
  // tester.compareTicOnPrototypeVsBuiltIn
  compareTicOnPrototypeVsBuiltIn: function( objectsWithBuiltInTic, objectsWithInheritedTic, numberOfTics ){
    var timeOfBuiltIn = tester.returnTicTime( objectsWithBuiltInTic, numberOfTics );
    var timeOfInherited = tester.returnTicTime( objectsWithInheritedTic, numberOfTics );
    console.log( "Constructor With Built In Tic" );
    console.log( timeOfBuiltIn + " seconds to run tic " + numberOfTics + " times on " + objectsWithBuiltInTic.length + " asteroids." );
    console.log( "Constructor That Inherited Tic" );
    console.log( timeOfInherited + " seconds to run tic " + numberOfTics + " times on " + objectsWithInheritedTic.length + " asteroids." );
  },

  // tester.verifyThatTicWorks
  verifyThatTicWorks: function( object ){
    var objectsInitialX = object.x;
    var objectsInitialY = object.y;
    object.tic();

    if (( objectsInitialX + object.xVelocity) === object.x && (objectsInitialY + object.yVelocity) === object.y) {
      console.log( "object.tic() works!" )
      tester.printobjectsVelocity( object );
      tester.printobjectsInitialCoordinates( objectsInitialX, objectsInitialY );
      tester.printobjectsCurrentCoordinates( object );
    } else {
      console.log( "object.tic() doesn't work!" )
      tester.printobjectsVelocity( object );
      tester.printobjectsInitialCoordinates( objectsInitialX, objectsInitialY );
      tester.printobjectsCurrentCoordinates( object );
    };
  },

  // tester.printObjectsVelocity
  printObjectsVelocity( object ){
    console.log( "Object's Velocity" );
    console.log( "xVelocity: " + object.xVelocity );
    console.log( "yVelocity: " + object.yVelocity );
  },

  // tester.printObjectsInitialCoordinates
  printObjectsInitialCoordinates( objectsInitialX, objectsInitialY ){
    console.log( "Initial Coordinates" );
    console.log( "x: " + objectsInitialX );
    console.log( "y: " + objectsInitialY );
  },

  // tester.printObjectsCurrentCoordinates
  printObjectsCurrentCoordinates( object ){
    console.log( "Current Coordinates" );
    console.log( "x: " + object.x );
    console.log( "y: " + object.y );
  },

  // tester.returnTicTime
  returnTicTime( objects, numberOfTics ){
    var timeBeforeTic = new Date();
    for(var i = 0; i < objects.length; i++){
      for(var tic = 0; tic < numberOfTics; tic++){
        objects[i].tic();
      };
    };
    var timeAfterTic = new Date();
    return ( timeAfterTic - timeBeforeTic );
  }
}