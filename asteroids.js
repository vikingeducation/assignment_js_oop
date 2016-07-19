'use_strict;'

var controller = {
  init: function( boardSideLength ){
    model.init( boardSideLength );
    view.init( boardSideLength );
    controller.startInterval();
  },

  // controller.startInterval
  startInterval: function(){
    gameInterval = setInterval(function(){
      model.takeTurn();
      view.renderBoard( model.asteroidCentre.asteroids, model.shipCentre.ship );
    }, 100);
  }
};

var model = {
  init: function( boardSideLength ){

    // Establishing Configurations
    model.asteroidCentre.establishAsteroidConfigurations();
    model.shipCentre.establishShipConfigurations( boardSideLength, 30, 30 );
    model.boardSideLength = boardSideLength;

    // The official constructor to build asteroids
    var asteroidConstructor = model.asteroidCentre.asteroidConstructor;

    // Adding to asteroid constructor prototype.
    model.asteroidCentre.addToAsteroidsPrototype( asteroidConstructor );

    // Build asteroids THIS IS WHERE THE ISSUES BEGIN!!!!!
  	model.asteroidCentre.asteroids = model.asteroidCentre.buildAsteroids( asteroidConstructor, 1 );

    // Build ship
    model.shipCentre.buildShip();

    // Adding tic to ship constructor prototype.
    model.addTicToConstructor( model.shipCentre.shipConstructor );
  },

  asteroidCentre: {
    // model.asteroidCentre.establishAsteroidConfigurations
    establishAsteroidConfigurations: function(){
      model.asteroidCentre.asteroidConfigurations = {
        maxSpeed: 6,
        minSpeed: 2,
        maxSize: 30,
        minSize: 10,
      };
    },

    // model.asteroidCentre.addToAsteroidsProtoype
    addToAsteroidsPrototype: function( asteroidConstructor ){
      model.addTicToConstructor( asteroidConstructor );
    },

    // model.asteroidCentre.asteroidConstructor
    asteroidConstructor: function ( x, y, xVelocity, yVelocity, height, width, builtWithTic ){
      this.x = x;
      this.y = y;
      this.xVelocity = xVelocity;
      this.yVelocity = yVelocity;
      this.height = height;
      this.width = width;
      this.longestDimension = model.calculateLongestSideOfTriangle( height, width );
      if (builtWithTic === "y") {
        this.tic = function(){
          this.x += this.xVelocity;
          this.y += this.yVelocity;
        };
      };
    },

    // model.asteroidCentre.buildAsteroids
    // I think it should just take a number of asteroids and then return an array of asteroids...
    buildAsteroids: function( asteroidConstructor, numberOfAsteroids, builtWithTic ){
      var asteroids = []
      var boardSideLength = model.boardSideLength;
      var maxSize = model.asteroidCentre.asteroidConfigurations.maxSize;
      var minSize = model.asteroidCentre.asteroidConfigurations.minSize;
      var maxSpeed = model.asteroidCentre.asteroidConfigurations.maxSpeed;
      var minSpeed = model.asteroidCentre.asteroidConfigurations.minSpeed;

      for( var i = 0; i < numberOfAsteroids; i++ ) {
        var xVelocity = model.asteroidCentre.returnRandomVelocity( maxSpeed, minSpeed );
        var yVelocity = model.asteroidCentre.returnRandomVelocity( maxSpeed, minSpeed );
        var height = model.randomNumber( maxSize, minSize );
        var width = model.randomNumber( maxSize, minSize );

        var x = model.randomNumber( boardSideLength );
        var y = model.randomNumber( boardSideLength );
        var asteroid = new asteroidConstructor( x, y, xVelocity, yVelocity, height, width, builtWithTic );
        model.asteroidCentre.moveAsteroidToStartingPosition( asteroid, boardSideLength );
        asteroids.push( asteroid );
      };
      return asteroids;
    },

    // model.asteroidCentre.returnRandomVelocity
    returnRandomVelocity: function( maxSpeed, minSpeed ){
      var randomNumber = model.randomNumber( maxSpeed, minSpeed );
      var oneOrZero = model.randomNumber( 1 );
      if (oneOrZero === 1) {
        randomNumber *= -1;
      };
      return randomNumber;
    },

    // model.asteroidCentre.moveAsteroidToStartingPosition
    // aka offScreen.
    // no need to return anything because it's working on the asteroid itself.
    moveAsteroidToStartingPosition: function( asteroid, boardSideLength ){
      var answer = model.coordinatesCentre.objectIsOnScreen(asteroid, boardSideLength)
      while( model.coordinatesCentre.objectIsOnScreen(asteroid, boardSideLength) ){
        asteroid.x -= asteroid.xVelocity;
        asteroid.y -= asteroid.yVelocity;
      };
    }
  },

  coordinatesCentre: {

    // model.coordinatesCentre.moveObjectsToOtherSideOfBoard( objectsArray, boardSideLength ){
    moveObjectsToOtherSideOfBoard( objectsArray, boardSideLength ){
      for(var i = 0; i < objectsArray.length; i++){
        model.coordinatesCentre.moveObjectToOtherSideOfBoard(objectsArray[i], boardSideLength);
      };
    },

    // model.coordinatesCentre.moveObjectToOtherSideOfBoard
    moveObjectToOtherSideOfBoard: function( object, boardSideLength ){
      if(model.coordinatesCentre.objectIsOnScreen(object, boardSideLength)){
        
      } else {
        object.x = model.coordinatesCentre.moveCoordinateToOtherSideOfBoard(object.x, object.longestDimension, boardSideLength);
        object.y = model.coordinatesCentre.moveCoordinateToOtherSideOfBoard(object.y, object.longestDimension, boardSideLength);
      };
    },

    // model.coordinatesCentre.moveCoordinateToOtherSideOfBoard
    moveCoordinateToOtherSideOfBoard: function( coordinate, objectsLongestDimension, boardSideLength ){
      var answer = model.coordinatesCentre.coordinateIsPastScreen( coordinate, boardSideLength );
      console.log(coordinate);
      if( model.coordinatesCentre.coordinateIsPastScreen( coordinate, boardSideLength ) ) {
        coordinate = objectsLongestDimension * -1;
      } else if ( model.coordinatesCentre.objectIsBehindScreen( coordinate, objectsLongestDimension ) ) {
        coordinate = boardSideLength;
      };
      return coordinate;
    },

    // model.coordinatesCentre.coordinateIsPastScreen
    coordinateIsPastScreen: function( coordinate, boardSideLength ){
      if (coordinate > boardSideLength){
        return true;
      };
      return false;
    },

    // model.coordinatesCentre.objectIsBehindScreen
    // although not passing in an object, it's still figuring out based on the objects coordinate and longest dimension.
    objectIsBehindScreen: function( coordinate, objectsLongestDimension ){
      if ( coordinate < objectsLongestDimension * -1) {
        return true;
      }
      return false;
    },

    // model.coordinatesCentre.objectIsOnScreen
    objectIsOnScreen: function( object, boardSideLength ){
      var objectInBoardsXAxis = model.coordinatesCentre.objectBetweenBoardsAxis( object.x, object.longestDimension, boardSideLength );
      var objectInBoardsYAxis = model.coordinatesCentre.objectBetweenBoardsAxis( object.y, object.longestDimension, boardSideLength );
      if( objectInBoardsXAxis && objectInBoardsYAxis ){
        return true;
      } else {
        return false;
      };
    },

    // model.coordinatesCentre.objectBetweenBoardsAxis
    // A function which takes a coordinate of an object, it's longest dimension the boardSideLength and figures out whether the object is in range of the board axis.
    objectBetweenBoardsAxis: function( objectsCoordinate, objectsLongestDimension, boardSideLength ){
      if (objectsCoordinate + objectsLongestDimension >= 0 && objectsCoordinate < boardSideLength ) {
        return true;
      } else {
        return false;
      };
    }
  },

  shipCentre: {

    // model.shipCentre.establishShipConfigurations
    establishShipConfigurations: function( boardSideLength, height, width ){
      model.shipCentre.shipConfigurations = {
        height: height,
        width: width,
        x: ( boardSideLength / 2 - ( width / 2 ) ),
        y: ( boardSideLength / 2 - ( height / 2 ) ),
        borderLeft: width / 3 + "px solid transparent",
        borderRight: width / 3 + "px solid transparent",
        borderBottom: width + "px solid white"
      };
    },

    // model.shipCentre.buildShip
    buildShip: function(){
      var height = model.shipCentre.shipConfigurations.height;
      var width = model.shipCentre.shipConfigurations.width;
      var x = model.shipCentre.shipConfigurations.x;
      var y = model.shipCentre.shipConfigurations.y;
      var borderLeft = model.shipCentre.shipConfigurations.borderLeft;
      var borderRight = model.shipCentre.shipConfigurations.borderRight;
      var borderBottom = model.shipCentre.shipConfigurations.borderBottom;

      model.shipCentre.ship = new model.shipCentre.shipConstructor( x, y, height, width, borderLeft, borderRight, borderBottom )
    },

    // model.shipcentre.shipConstructor
    shipConstructor: function( x, y, height, width, borderLeft, borderRight, borderBottom ){
      this.degrees = 0;
      this.x = x;
      this.y = y;
      this.xVelocity = 0;
      this.yVelocity = 0;
      this.height = height;
      this.width = width;
      // The longest dimension will be based on a arrowhead shaped triangle.
      this.longestDimension = model.calculateLongestSideOfTriangle( this.height, this.width / 2 );
      this.borderLeft = borderLeft;
      this.borderRight = borderRight;
      this.borderBottom = borderBottom;
    },

    // model.shipCentre.turnLeft
    turnLeft: function(){
      model.ship.degrees -= 10;
      if (model.ship.degrees < 0) {
        model.ship.degrees = 360 + model.ship.degrees;
      };
    },

    // model.shipCentre.turnRight
    turnRight: function(){
      model.ship.degrees += 10;
      if (model.ship.degrees >= 360){
        model.ship.degrees = model.ship.degrees % 360;
      };
    },

    // model.shipCentre.increaseVelocity
    increaseVelocity: function(){
      // model.ship.degrees
      if(model.ship.degrees <= 90){
        model.ship.yVelocity -= (1 - (model.ship.degrees * 0.011));
        model.ship.xVelocity += (0.011 * model.ship.degrees);
      } else if(model.ship.degrees > 90 && model.ship.degrees <= 180 ){
        model.ship.yVelocity += ((model.ship.degrees - 90) * 0.011);
        model.ship.xvelocity += (1 - ((model.ship.degrees - 90) * 0.011));
      } else if(model.ship.degrees > 180 && model.ship.degrees <= 270){
        model.ship.yVelocity += (1 - ((model.ship.degrees - 180) * 0.011));
        model.ship.xVelocity += ((model.ship.degrees - 180) * 0.011);
      } else {
        model.ship.xVelocity -= ((model.ship.degrees - 270) * 0.011);
        model.ship.yVelocity += (0.011 * (model.ship.degrees - 270));
      };
    },

    // model.shipCentre.decreaseVelocity.=
    decreaseVelocity: function(){
      
    }

  },

  // model.addTicToConstrutor
  addTicToConstructor: function( constructor ){
    constructor.prototype.tic = function(){
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    };
  },

  // model.calculateLongestSideOfTriangle
  calculateLongestSideOfTriangle: function( sideOne, sideTwo ){
    var hypotenuse = Math.sqrt(sideOne * sideOne + sideTwo * sideTwo);
    return hypotenuse;
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

  // model.runTicOnObjects
  runTicOnObjects: function( arrayOfObjects ){
    for(var i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i].tic();
    };
  },

  // model.takeTurn
  takeTurn: function(  ){
    var asteroids = model.asteroidCentre.asteroids;
    var ship = model.shipCentre.ship;
    model.runTicOnObjects( asteroids );
    ship.tic();
    model.coordinatesCentre.moveObjectsToOtherSideOfBoard( asteroids );
    model.coordinatesCentre.moveObjectToOtherSideOfBoard( ship );
  }
};

var view = {
  init: function( boardSideLength ){
    view.listeners.listenOutForKeyPresses();
  },

  // view.asteroidCentre
  asteroidCentre: {

    // view.asteroidCentre.clearAsteroids
    clearAsteroids: function(){
      $(".asteroid").remove();
    },

    // view.asteroidCentre.renderAsteroids
    renderAsteroids: function( asteroids ){
      for (var i = 0; i < asteroids.length; i++){
        view.asteroidCentre.addAsteroidToBoard( i );
        view.asteroidCentre.setCSSOfAsteroid( asteroids[i], i );
      };
    },

    // view.asteroidCentre.setCSSOfAsteroid
    setCSSOfAsteroid: function( asteroid, indexOfAsteroid ){
      view.asteroidCentre.setCSSPositionOfAsteroid( asteroid, indexOfAsteroid );
      view.asteroidCentre.setCSSDimensionsOfAsteroid( asteroid, indexOfAsteroid );
    },

    // view.asteroidCentre.setCSSDimensionsOfAsteroid
    setCSSDimensionsOfAsteroid: function( asteroid, indexOfAsteroid ){
      $("#asteroid-" + indexOfAsteroid).css({ height: asteroid.height,
                                              width: asteroid.width })
    },

    // view.asteroidCentre.setCSSPositionOfAsteroid
    setCSSPositionOfAsteroid: function( asteroid, indexOfAsteroid ){
      $("#asteroid-" + indexOfAsteroid).css({ top: asteroid.y,
                                              left: asteroid.x })
    },

    // view.asteroidCentre.addAsteroidToBoard
    addAsteroidToBoard: function( index ){
      $("#game-board").append("<div class='asteroid' id='asteroid-"+ index + "' ></div>");
    },
  },

  // view.shipCentre
  shipCentre: {
    clearShip: function(){
      $("#ship").remove();
    },

    // border-left: 50px solid transparent;
    // border-right: 50px solid transparent;
    // border-bottom: 100px solid red;
    renderShip: function( ship ){
      $("#game-board").prepend("<div id='ship'></div>")
      $("#ship").css({"left": ship.x + "px",
                      "top": ship.y + "px",
                      "border-left": ship.borderLeft,
                      "border-right": ship.borderRight,
                      "border-bottom": ship.borderBottom})
    }
  },

  // view.listeners
  listeners: {
    listenOutForKeyPresses: function(){
      $(window).keydown(function(event){
        if ( event.keyCode === 37 ) {
          model.turnShipLeft();
        } else if ( event.keyCode === 38 ) {
          model.increaseShipVelocity();
        } else if ( event.keyCode === 39 ) {
          model.turnShipRight();
        } else if (event.keyCode === 40 ) {
          model.decreaseShipVelocity();
        };
      });
    }
  },

  // view.clearBoard
  clearBoard: function(){
    view.asteroidCentre.clearAsteroids();
    view.shipCentre.clearShip();
  },

  // view.renderBoard
  renderBoard: function( asteroids, ship ){
    view.clearBoard();

    view.asteroidCentre.renderAsteroids( asteroids );
    view.shipCentre.renderShip( ship );
  }
};

$(document).ready(function(){
  controller.init( 300 );
});

// tester.testSpeedOfAsteroidsTicWhenPrototypeInherited( model.asteroidConstructor, model.buildAsteroid, model.buildAsteroids, 1000, 1000, model.randomNumber );

// Testing that the tic works on asteroids that have a built in tic.
// var a = [];
// model.buildAsteroid( a, model.asteroidWithTicConstructor, model.randomNumber );
// tester.verifyThatTicWorks(a[0]);

// Comparing inherited vs built-in tic method speed.
// Built in is faster...
// tester.compareTicOnPrototypeVsBuiltIn( model.asteroidWithTicConstructor, model.asteroidConstructor, model.buildAsteroid, model.buildAsteroids, 100000, 100000, model.randomNumber, model.addTicToConstructor )