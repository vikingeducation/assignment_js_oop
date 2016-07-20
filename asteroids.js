'use_strict;'

var controller = {
  init: function( boardSideLength ){

    controller.gameOver = false;

    model.init( boardSideLength );

    view.init( boardSideLength,
               model.bulletCentre.bullets,
               model.bulletCentre.bulletConfigurations.speed,
               model.shipCentre.ship );

    controller.startInterval( model.asteroidCentre.asteroids,
                              model.asteroidCentre.asteroidConstructor,
                              boardSideLength,
                              model.bulletCentre.bullets,
                              model.shipCentre.ship );
  },

  // controller.startInterval
  startInterval: function( asteroids, asteroidConstructor, boardSideLength, bullets, ship ){
    gameInterval = setInterval(function(){
      model.takeTurn( asteroids, 
                      asteroidConstructor,
                      boardSideLength, 
                      bullets, 
                      ship, 
                      controller.gameOver );
      view.renderBoard( asteroids, boardSideLength, bullets, ship, controller.gameOver, model.counter );
    }, 100);
  }
};

var model = {
  init: function( boardSideLength ){
    // Counter to figure out when to add more asteroids
    model.counter = 0;

    // Establishing Configurations
    model.asteroidCentre.establishAsteroidConfigurations();
    model.shipCentre.establishShipConfigurations( boardSideLength,
                                                  50, 
                                                  30 );
    model.boardSideLength = boardSideLength;

    // The official constructor to build asteroids
    var asteroidConstructor = model.asteroidCentre.asteroidConstructor;

    // Adding to asteroid constructor prototype.
    model.asteroidCentre.addToAsteroidsPrototype( asteroidConstructor,
                                                  model.asteroidCentre.asteroidConfigurations.maxSize,
                                                  model.asteroidCentre.asteroidConfigurations.minSize,
                                                  model.asteroidCentre.asteroidConfigurations.maxSpeed,
                                                  model.asteroidCentre.asteroidConfigurations.minSpeed );

    // Adding to ship constructor prototype.
    model.shipCentre.addToShipsPrototype( model.shipCentre.shipConfigurations.maxSpeed, 
                                          model.shipCentre.shipConstructor );

    // Build asteroids
  	model.asteroidCentre.asteroids = [];
    model.asteroidCentre.buildAsteroids( asteroidConstructor, 
                                         model.asteroidCentre.asteroids, 
                                         boardSideLength,
                                         4 );

    // Build ship
    model.shipCentre.ship = new model.shipCentre.shipConstructor( model.shipCentre.shipConfigurations.x, 
                                                                  model.shipCentre.shipConfigurations.y, 
                                                                  model.shipCentre.shipConfigurations.height, 
                                                                  model.shipCentre.shipConfigurations.width, 
                                                                  model.shipCentre.shipConfigurations.borderLeft, 
                                                                  model.shipCentre.shipConfigurations.borderRight, 
                                                                  model.shipCentre.shipConfigurations.borderBottom );

    // Adding tic to bullet constructor prototype.
    model.addTicToConstructor( model.bulletCentre.bulletConstructor );
  },

  asteroidCentre: {
    // model.asteroidCentre.establishAsteroidConfigurations
    establishAsteroidConfigurations: function(){
      model.asteroidCentre.asteroidConfigurations = {
        maxSize: 60,
        minSize: 10,
        maxSpeed: 6,
        minSpeed: 2
      };
    },

    // model.asteroidCentre.addToAsteroidsProtoype
    addToAsteroidsPrototype: function( asteroidConstructor, maxSize, minSize, maxSpeed, minSpeed ){
      model.addTicToConstructor( asteroidConstructor );
      asteroidConstructor.prototype.maxSpeed = maxSpeed;
      asteroidConstructor.prototype.minSpeed = minSpeed;
      asteroidConstructor.prototype.maxSize = maxSize;
      asteroidConstructor.prototype.minSize = minSize;
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
    buildAsteroids: function( asteroidConstructor, asteroids, boardSideLength, numberOfAsteroids, builtWithTic ){
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

    // model.asteroidCentre.calculateVelocityForSplitAsteroid
    // I'm just gonna change up the speed a wee bit
    calculateVelocityForSplitAsteroid( previousVelocity, maxSpeed ){
      var randomNumber = model.randomNumber(5);

      // 50 / 50 on whether it goes up or down
      if ( model.randomNumber(1) === 1 ) {
        randomNumber * -1;
      };
      return previousVelocity + randomNumber;
    },

    // model.asteroidCentre.figureOutCollisions
    figureOutCollisions: function( asteroids, bullets, ship ){
      for( i = 0; i < asteroids.length; i++ ){
        var asteroid = asteroids[i];
        model.asteroidCentre.processAsteroidAndShipCollision( asteroid, asteroids, i, ship );
        for( b = 0; b < bullets.length; b++ ){
          var bullet = bullets[b];
          model.asteroidCentre.processAsteroidAndBulletCollision( asteroid, 
                                                                  asteroids, 
                                                                  i, 
                                                                  bullet, 
                                                                  bullets, 
                                                                  b );
        };
      };
    },

    // model.asteroidCentre.moveAsteroidToStartingPosition
    // aka offScreen.
    // no need to return anything because it's working on the asteroid itself.
    moveAsteroidToStartingPosition: function( asteroid, boardSideLength ){
      while( model.coordinatesCentre.objectIsOnScreen(asteroid, boardSideLength) ){
        asteroid.x -= asteroid.xVelocity;
        asteroid.y -= asteroid.yVelocity;
      };
    },

    // Going to do this very rough for the meanwhile...
    // No matter how you rotate a div, the center spot is always going to be the same.
    // I might just make that circle around that area the hittable area.
    // With an asteroid, I might make that whole asteroid div a hittable area 

    // model.asteroidCentre.processAsteroidAndShipCollision
    processAsteroidAndShipCollision: function( asteroid, asteroids, asteroidIndex, ship ){
      if ( model.coordinatesCentre.objectsOverlapping( asteroid, ship ) ) {
        model.asteroidCentre.splitAsteroid(asteroid, asteroids, 2);
        model.removeObjectFromArray( asteroids, asteroidIndex );
        controller.gameOver = true;
      };
    },

    // model.asteroidCentre.processAsteroidAndBulletCollision
    // This should be alot easier than figuring out asteroids and ship collision because the bullet and the asteroid don't rotate.
    processAsteroidAndBulletCollision: function( asteroid, asteroids, asteroidIndex, bullet, bullets, bulletIndex, minSpeed, maxSpeed, splitNumber ){
      if ( model.coordinatesCentre.objectsOverlapping( asteroid, bullet ) ) {
        model.asteroidCentre.splitAsteroid(asteroid, asteroids, 2);
        model.removeObjectFromArray( asteroids, asteroidIndex );
        model.removeObjectFromArray( bullets, bulletIndex );
      };
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

    // model.asteroidCentre.splitAsteroid
    splitAsteroid: function( asteroid, asteroids, splitNumber ){
      if ( asteroid.height / splitNumber > asteroid.minSize && asteroid.width / splitNumber > asteroid.minSize ) {
        for(var i = 0; i < splitNumber; i++) {
          var newXVelocity = model.asteroidCentre.calculateVelocityForSplitAsteroid( asteroid.xVelocity, asteroid.maxSpeed);
          var newYVelocity = model.asteroidCentre.calculateVelocityForSplitAsteroid( asteroid.yVelocity, asteroid.maxSpeed);
          var newAsteroid = new model.asteroidCentre.asteroidConstructor( asteroid.x, 
                                                                          asteroid.y, 
                                                                          newXVelocity, 
                                                                          newYVelocity, 
                                                                          (asteroid.height / splitNumber),
                                                                          (asteroid.width / splitNumber) );
          asteroids.push( newAsteroid );
        };
      };
    }

  },

  // model.bulletCentre
  bulletCentre: {

    // model.bulletCentre.bulletConfigurations
    bulletConfigurations: {
      speed: 16
    },

    bullets: [],

    // model.bulletCentre.destroyBulletsThatGoOffScreen
    destroyBulletsThatGoOffScreen: function( boardSideLength, bullets ){
      for (var i = 0; i < bullets.length; i++){
        if ( !model.coordinatesCentre.objectIsOnScreen( bullets[i], boardSideLength ) ){
          model.removeObjectFromArray(bullets, i);
        };
      };
    },

    // model.bulletCentre.shootBullet
    shootBullet: function( bullets, bulletSpeed, ship ){
      var bullet = new model.bulletCentre.bulletConstructor( bulletSpeed, ship );
      bullets.push( bullet );
    },

    // model.bulletCentre.bulletConstructor
    bulletConstructor: function( bulletSpeed, ship ){
      var velocities = model.bulletCentre.calculateBulletVelocities( bulletSpeed, ship )
      this.height = 1;
      this.width = 1;
      this.x = ship.x + ( ship.width / 2 );
      this.y = ship.y + ( ship.width / 2 );
      this.longestDimension = model.calculateLongestSideOfTriangle(this.height, this.width);
      this.xVelocity = velocities[0];
      this.yVelocity = velocities[1];
    },

    // I'm gonna shoot the bullet based on the ship's degree rather than the x and y velocity of the ship
    // First off How quick is a bullet going to travel if it travels too many pixels per seconds per tick, it could easily miss smaller asteroids by skipping over them. 
    // The smallest asteroid is 10px
    // let's make the bullet's speed 8 px and we can adjust later on...

    // Both of these depend on the the formulas to find the sides of a right triangle when you have the hypotenuise and one other angle...

    // model.bulletCentre.calculateBulletVelocities
    calculateBulletVelocities: function( bulletSpeed, ship ){
      var degrees = ship.degrees;
      var xVelocity, yVelocity;
      if ( model.shipCentre.shipIsFacingNorthToNorthEast( ship ) ) {
        xVelocity = model.calculateSideOfRightTriangle(degrees, bulletSpeed);
        yVelocity = -1 * model.calculateSideOfRightTriangle(90 - degrees, bulletSpeed);
      } else if ( model.shipCentre.shipIsFacingSouthToSouthEast( ship ) ) {
        degrees = degrees - 90;
        xVelocity = model.calculateSideOfRightTriangle(90 - degrees, bulletSpeed);
        yVelocity = model.calculateSideOfRightTriangle(degrees, bulletSpeed);
      } else if ( model.shipCentre.shipIsFacingSouthToSouthWest( ship ) ) {
        degrees = degrees - 180;
        xVelocity = -1 * model.calculateSideOfRightTriangle(degrees, bulletSpeed);
        yVelocity = model.calculateSideOfRightTriangle(90 - degrees, bulletSpeed);
      } else {
        degrees = degrees - 270;
        xVelocity = -1 * model.calculateSideOfRightTriangle(90 - degrees, bulletSpeed);
        yVelocity = -1 * model.calculateSideOfRightTriangle(degrees, bulletSpeed);
      };
      return [xVelocity, yVelocity]
    }
  },

  coordinatesCentre: {

    // model.coordinatesCentre.objectsOverlapping
    objectsOverlapping( objectOne, objectTwo ){
      xAxisOverlap = model.coordinatesCentre.twoObjectsAxisOverlapping( objectOne.x, 
                                                                        objectOne.width, 
                                                                        objectTwo.x, 
                                                                        objectTwo.width );
      yAxisOverlap = model.coordinatesCentre.twoObjectsAxisOverlapping( objectOne.y,
                                                                        objectOne.height,
                                                                        objectTwo.y,
                                                                        objectTwo.height );
      if (xAxisOverlap && yAxisOverlap){
        return true;
      } else {
        return false;
      }; 

    },

    // model.coordinatesCentre.twoObjectsAxisOverlapping
    // Name could be clearer but it's all my caffeine addled mind can conjure up right now
    twoObjectsAxisOverlapping: function( objectOneCoordinate, objectOneDimension, objectTwoCoordinate, objectTwoDimension ) {
      if (objectOneCoordinate + objectOneDimension >= objectTwoCoordinate && objectOneCoordinate < objectTwoCoordinate + objectTwoDimension ) {
        return true;
      };
      return false;
    },

    // model.coordinatesCentre.moveObjectsToOtherSideOfBoard( objectsArray, boardSideLength ){
    moveObjectsToOtherSideOfBoard( objectsArray, boardSideLength ){
      for(var i = 0; i < objectsArray.length; i++){
        model.coordinatesCentre.moveObjectToOtherSideOfBoard(objectsArray[i], boardSideLength);
      };
    },

    // model.coordinatesCentre.moveObjectToOtherSideOfBoard
    moveObjectToOtherSideOfBoard: function( object, boardSideLength ){
      if( !model.coordinatesCentre.objectIsOnScreen(object, boardSideLength) ){
        object.x = model.coordinatesCentre.moveCoordinateToOtherSideOfBoard(object.x, object.longestDimension, boardSideLength);
        object.y = model.coordinatesCentre.moveCoordinateToOtherSideOfBoard(object.y, object.longestDimension, boardSideLength);
      };
    },

    // model.coordinatesCentre.moveCoordinateToOtherSideOfBoard
    moveCoordinateToOtherSideOfBoard: function( coordinate, objectsLongestDimension, boardSideLength ){
      var answer = model.coordinatesCentre.coordinateIsPastScreen( coordinate, boardSideLength );
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
      };
      return false;
    },

    // model.coordinatesCentre.objectBetweenBoardsAxis
    // A function which takes a coordinate of an object, it's longest dimension the boardSideLength and figures out whether the object is in range of the board axis.
    objectBetweenBoardsAxis: function( objectsCoordinate, objectsLongestDimension, boardSideLength ){
      return model.coordinatesCentre.twoObjectsAxisOverlapping( objectsCoordinate, 
                                                                objectsLongestDimension, 
                                                                0,
                                                                boardSideLength )
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
        borderLeft: width / 2 + "px solid transparent",
        borderRight: width / 2 + "px solid transparent",
        borderBottom: width + "px solid white",
        maxSpeed: 8
      };
    },

    // model.shipCentre.addToShipsPrototype
    addToShipsPrototype: function( maxSpeed, shipConstructor ){
      model.addTicToConstructor( shipConstructor );
      shipConstructor.prototype.maxSpeed = maxSpeed;
    },

    // model.shipCentre.shipConstructor
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
    turnLeft: function( ship ){
      ship.degrees -= 11.25;
      if ( ship.degrees < 0 ) {
        ship.degrees = 360 + ship.degrees;
      };
    },

    // model.shipCentre.turnRight
    turnRight: function( ship ){
      ship.degrees += 11.25;
      if ( ship.degrees >= 360 ){
        ship.degrees = ship.degrees % 360;
      };
    },

    // I don't think the ship should be able to travel as fast as it's weapon...
    // I'll max it out ONE below the bullet speed.

    // model.shipCentre.increaseVelocity
    increaseVelocity: function( ship ){
      if( model.shipCentre.shipIsFacingNorthToNorthEast( ship ) ){
        ship.yVelocity -= (1 - (ship.degrees * 0.011));
        ship.xVelocity += (0.011 * ship.degrees);
      } else if( model.shipCentre.shipIsFacingSouthToSouthEast( ship ) ){
        ship.yVelocity += ((ship.degrees - 90) * 0.011);
        ship.xVelocity += (1 - ((ship.degrees - 90) * 0.011));
      } else if( model.shipCentre.shipIsFacingSouthToSouthWest( ship ) ){
        ship.yVelocity += (1 - ((ship.degrees - 180) * 0.011));
        ship.xVelocity -= ((ship.degrees - 180) * 0.011);
      } else {
        ship.xVelocity -= ( (360 - ship.degrees) * 0.011);
        ship.yVelocity -= (0.011 * (ship.degrees - 270));
      };
    },

    // model.shipCentre.decreaseVelocity
    decreaseVelocity: function( ship ){
      if( model.shipCentre.shipIsFacingNorthToNorthEast( ship ) ){
        ship.yVelocity += ( 1 - ( ship.degrees * 0.011 ) );
        ship.xVelocity -= ( ship.degrees * 0.011 );
      } else if( model.shipCentre.shipIsFacingSouthToSouthEast( ship ) ){
        ship.xVelocity -= ( 1 - ( ship.degrees - 90 ) * 0.011 );
        ship.yVelocity -= ( 0.011 * ( ship.degrees - 90 ) );
      } else if( model.shipCentre.shipIsFacingSouthToSouthWest( ship ) ){
        ship.yVelocity -= ( 1 - (ship.degrees - 180) * 0.011 );
        ship.xVelocity += ( 0.011 * (ship.degrees - 180) );
      } else {
        ship.yVelocity += ( (ship.degrees - 270) * 0.011 );
        ship.xVelocity += ( (360 - ship.degrees) * 0.011 );
      };
    },

    // model.shipCentre.shipIsFacingNorthToNorthEast
    shipIsFacingNorthToNorthEast: function( ship ){
      if (ship.degrees <= 90) {
        return true;
      };
      return false;
    },

    // model.shipCentre.shipIsFacingSouthToSouthEast
    shipIsFacingSouthToSouthEast: function( ship ){
      if (ship.degrees >= 90 && ship.degrees <= 180) {
        return true;
      };
      return false;
    },

    // model.shipCentre.shipisFacingNortToNorthWest
    shipIsFacingNorthToNorthWest: function( ship ){
      if (ship.degrees >= 270 && ship.degrees < 360){
        return true;
      };
      return false;
    },

    // model.shipCentre.shipIsFacingSouthToSouthWest
    shipIsFacingSouthToSouthWest: function( ship ){
      if (ship.degrees >= 180 && ship.degrees <= 270){
        return true;
      };
      return false;
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

  // model.calculateSideOfRightTriangle
  // calculates the length of the opposite leg of a given angle of a right triangle
  calculateSideOfRightTriangle: function( angle, hypotenuse ){
    var radian = model.convertAngleToRadian( angle );
    var lengthOfSideOppositeAngle = Math.sin( radian ) * hypotenuse;
    return lengthOfSideOppositeAngle;
  },

  // model.calculateCoordinateToCenterObjectOnBoard
  calculateCoordinateToCenterObjectOnBoard: function( boardSideLength, lengthOfDimension ){
    return ( boardSideLength / 2 - ( lengthOfDimension / 2 ) )
  },

  // model.convertAngleToRadian
  convertAngleToRadian: function( angle ){
    return angle * Math.PI / 180.0
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

  // model.reduceVelocitiesToMaximum
  reduceVelocitiesToMaximum: function( maxSpeed, object ){
    object.xVelocity = model.reduceVelocityToMaximum( maxSpeed, object.xVelocity );
    object.yVelocity = model.reduceVelocityToMaximum( maxSpeed, object.yVelocity );
  },

  // model.reduceVelocityToMaximum
  reduceVelocityToMaximum: function( maxSpeed, velocity ){
    var negativeMaxSpeed = -1 * maxSpeed;

    if (velocity < negativeMaxSpeed) {
      velocity = negativeMaxSpeed;
    } else if (velocity > maxSpeed) {
      velocity = maxSpeed;
    };

    return velocity
  },

  // model.removeObjectFromArray
  removeObjectFromArray: function( array, objectIndex ){
    array.splice( objectIndex, 1 );
  },

  // model.runTicOnObjects
  runTicOnObjects: function( arrayOfObjects ){
    for(var i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i].tic();
    };
  },

  // model.takeTurn
  takeTurn: function( asteroids, asteroidConstructor, boardSideLength, bullets, ship, gameOver ){

    model.counter++;

    // Might try to hack this
    // If the game is over send the ship well off the map
    // so it can't crash into any thing.

    // Also
    if (gameOver === true){
      ship.x = -500;
      ship.y = -500;
    } else { 
      if (model.counter % 150 === 0){
        model.asteroidCentre.buildAsteroids( asteroidConstructor, 
                                             asteroids, 
                                             boardSideLength,
                                             10 );
      };
    };

    // Slowing down the ship's velocity if too high
    model.reduceVelocitiesToMaximum( ship.maxSpeed, ship );

    // Running tic on all objects that tic
    model.runTicOnObjects( asteroids );
    model.runTicOnObjects( bullets );
    ship.tic();

    // Offscreen processing
    model.bulletCentre.destroyBulletsThatGoOffScreen( boardSideLength, bullets );
    model.coordinatesCentre.moveObjectsToOtherSideOfBoard( asteroids, boardSideLength );
    model.coordinatesCentre.moveObjectToOtherSideOfBoard( ship, boardSideLength );

    // Collision processing
    model.asteroidCentre.figureOutCollisions( asteroids, bullets, ship );
  }
};

var view = {
  init: function( boardSideLength, bulletsArray, bulletSpeed, ship ){
    view.listeners.actionKeyPresses( bulletsArray, 
                                     bulletSpeed, 
                                     ship );
  },

  // view.asteroidCentre
  asteroidCentre: {

    // view.asteroidCentre.addAsteroidToBoard
    addAsteroidToBoard: function( index ){
      $("#game-board").append("<div class='asteroid' id='asteroid-" + index + "'></div>");
    },

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
      $("#asteroid-" + indexOfAsteroid).css({ height : asteroid.height,
                                              width  : asteroid.width })
    },

    // view.asteroidCentre.setCSSPositionOfAsteroid
    setCSSPositionOfAsteroid: function( asteroid, indexOfAsteroid ){
      $("#asteroid-" + indexOfAsteroid).css({ top  : asteroid.y,
                                              left : asteroid.x })
    }
  },

  // view.bulletCentre
  bulletCentre: {

    // view.bulletCentre.addBulletToBoard
    addBulletToBoard: function( index ){
      $("#game-board").append("<div class='bullet' id='bullet-" + index + "' ></div>");
    },

    // view.bulletCentre.clearBullets
    clearBullets: function(){
      $(".bullet").remove();
    },

    // view.bulletCentre.renderBullets
    renderBullets: function( bullets ){
      for (var i = 0; i < bullets.length; i++){
        view.bulletCentre.addBulletToBoard( i );
        view.bulletCentre.setCSSPositionOfBullet( bullets[i], i );
      };
    },

    // view.setCSSPositionOfBullet
    setCSSPositionOfBullet: function( bullet, indexOfBullet ){
      $("#bullet-" + indexOfBullet).css({ top  : bullet.y,
                                          left : bullet.x });
    }

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
      var cssForRotate = ("rotate(" + ship.degrees + "deg)");
      $("#game-board").prepend("<div id='ship'></div>")
      $("#ship").css({"left"              : ship.x + "px",
                      "top"               : ship.y + "px",
                      "border-left"       : ship.borderLeft,
                      "border-right"      : ship.borderRight,
                      "border-bottom"     : ship.borderBottom,
                      "-ms-transform"     : cssForRotate,
                      "-webkit-transform:": cssForRotate,
                      "transform"         : cssForRotate});
    }
  },

  // view.listeners
  listeners: {

    // view.listeners.actionKeyPresses
    actionKeyPresses: function( bulletsArray, bulletSpeed, ship ){
      $(window).keydown(function(event){
        // left key
        if ( event.keyCode === 37 ) {
          model.shipCentre.turnLeft( ship );
          view.shipCentre.clearShip();
          view.shipCentre.renderShip( ship );
        // up key
        } else if ( event.keyCode === 38 ) {
          model.shipCentre.increaseVelocity( ship );
        // right key
        } else if ( event.keyCode === 39 ) {
          model.shipCentre.turnRight( ship );
          view.shipCentre.clearShip();
          view.shipCentre.renderShip( ship );
        // down key
        } else if (event.keyCode === 40 ) {
          model.shipCentre.decreaseVelocity( ship );
        } else if (event.keyCode === 32) {
          model.bulletCentre.shootBullet( bulletsArray, bulletSpeed, ship );
        };
      });
    }
  },

  // view.clearBoard
  clearBoard: function(){
    view.asteroidCentre.clearAsteroids();
    view.bulletCentre.clearBullets();
    view.shipCentre.clearShip();
  },

  // view.displayGameOver
  displayGameOver: function( boardSideLength, counter ){
    if ( counter % 15 === 0) {
      if ($("#game-over").length > 0){
        $("#game-over").remove();
      } else {
        $("#game-board").append("<div id='game-over'>Game Over</div>")
        var width = $("#game-over").width();
        var height = $("#game-over").height();
        var left = model.calculateCoordinateToCenterObjectOnBoard( boardSideLength, width );
        var top = model.calculateCoordinateToCenterObjectOnBoard( boardSideLength, height );
        $("#game-over").css({"top": top,
                            "left": left});
      };
    };
  },

  // view.renderBoard
  renderBoard: function( asteroids, boardSideLength, bullets, ship, gameOver, counter ){
    view.clearBoard();

    view.asteroidCentre.renderAsteroids( asteroids );
    view.bulletCentre.renderBullets( bullets );
    if (!gameOver) {
      view.shipCentre.renderShip( ship );
    } else {
      view.displayGameOver( boardSideLength, counter );
    };
  }
};

$(document).ready(function(){
  controller.init( 300 );
});