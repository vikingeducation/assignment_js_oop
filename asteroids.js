'use_strict;'

var controller = {
  init: function(){
    model.init( 300, 30, 3 );
    view.init();
    controller.startInterval();
  },

  startInterval: function(){
    gameInterval = setInterval(function(){
      model.takeTurn();
    }, 100);
  }
};

var model = {
  init: function( boardSideLength, maxAsteroidSize, startingNumberOfAsteroids ){
  	model.asteroids = [];
    model.gameBoardSide = boardSideLength;
    model.maxAsteroidSize = maxAsteroidSize;
    model.addToAsteroidsPrototype( model.asteroidConstructor );
    // Building asteroids that have the tic function in it's prototype.
    model.buildAsteroids( model.asteroids, model.asteroidConstructor, startingNumberOfAsteroids );
    model.buildShip();
  },

  buildShip: function(){
    var shipHeight = 30;
    var shipWidth = 30;
    model.ship = {
      x: (model.gameBoardSide/2 - (shipWidth/2)),
      y: (model.gameBoardSide/2 - (shipHeight/2)),
      xVelocity: 0,
      yVelocity: 0,
      height: shipHeight,
      width: shipWidth
    };
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

  adjustAsteroidsPositionsIfOffScreen: function( asteroids ){
    for(var i = 0; i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      if(!model.asteroidIsOnScreen(asteroid.x, asteroid.y, model.maxAsteroidSize, model.gameBoardSide)){
        asteroid.x = model.moveCoordinateToOtherSideOfBoard(asteroid.x);
        asteroid.y = model.moveCoordinateToOtherSideOfBoard(asteroid.y);
      };
    };
  },

  moveCoordinateToOtherSideOfBoard: function( coordinate ){
    if( coordinate > model.gameBoardSide ) {
      coordinate = model.maxAsteroidSize * -1;
    } else if ( coordinate < model.maxAsteroidSize * -1 ) {
      coordinate = model.gameBoardSide;
    };
    return coordinate;
  },

  // Ways the asteroid can be travelling
  // 1: +xVelocity & +yVelocity = Up and Right...
  // 2: +xVelocity & -yVeolicty = Down and Right...
  // 3: -xVelocity & +yVelocity = Up and Left...
  // 4: -xVelocity & -yVelocity = Down and Left...
  asteroidStartingCoordinates: function( gameBoardSide, maxAsteroidSize, xVelocity, yVelocity ){
    var x = model.randomNumber( gameBoardSide );
    var y = model.randomNumber( gameBoardSide );
    x = model.changeCoordinateDependingOnVelocity( x, xVelocity, maxAsteroidSize );
    y = model.changeCoordinateDependingOnVelocity( y, yVelocity, maxAsteroidSize );
    var coordinates = model.changeCoordinatesToStartOffScreen(x, y, xVelocity, yVelocity, maxAsteroidSize, gameBoardSide);
    return coordinates;
  },

  changeCoordinatesToStartOffScreen: function(x, y, xVelocity, yVelocity, maxAsteroidSize, gameBoardSide){
    while( model.asteroidIsOnScreen(x, y, maxAsteroidSize, gameBoardSide) ){
      x -= xVelocity;
      y -= yVelocity;
    };
    return [x, y]
  },

  asteroidIsOnScreen: function(x, y, maxAsteroidSize, gameBoardSide){
    if( ( (x + maxAsteroidSize) >= 0 && x < gameBoardSide ) && ( (y + maxAsteroidSize) >= 0 && y < gameBoardSide) ){
      return true;
    } else {
      return false;
    };
  },

  changeCoordinateDependingOnVelocity: function( coordinate, velocity, maxAsteroidSize ){
    if (velocity > 0) {
      coordinate -= maxAsteroidSize;
    } else {
      coordinate += maxAsteroidSize;
    };
    return coordinate;
  },

  // SOLID PRINCIPLES - A FUNCTION SHOULD JUST BE ABLE TO TAKE A BUNCH OF INPUTS AND SPIT SOMETHING OUT
  // IT SHOULDN'T BE TIED IN WITH A LOT OF OTHER STUFF.
  // AT THE SAME TIME, DOES THAT MEAN YOU HAVE TO CALLECT EVERYTHING AT THE START AND PASS THINGS IN ALL THE WAY THROUGH THE CHAIN??
  // IT SEEMS LIKE A LOT OF UNNECESSARY CODE.
  // I feel like this method should just take an array and an asteroid constructor, and return that array with a new asteroid pushed into it.
  // Do you really need to pass in the random number method or can we just call it... Just call it, 
  // Ruby you can't even pass around functions, is it really that big a deal... 
  buildAsteroid: function( asteroidsArray, asteroidConstructor ){
    var maxSpeed = 6;
    var minSpeed = 1;
    var maxSize = 30;
    var minSize = 10;
    var xVelocity = model.figureOutVelocity( maxSpeed, minSpeed );
    var yVelocity = model.figureOutVelocity( maxSpeed, minSpeed );
    var startingCoordinates = model.asteroidStartingCoordinates( model.gameBoardSide, model.maxAsteroidSize, xVelocity, yVelocity );
    var x = startingCoordinates[0];
    var y = startingCoordinates[1];
    var height = model.randomNumber( maxSize, minSize );
    var width = model.randomNumber( maxSize, minSize );
    var asteroid = new asteroidConstructor( x, y, xVelocity, yVelocity, height, width );
    asteroidsArray.push( asteroid );
    return asteroidsArray;
  },

  figureOutVelocity: function( maxSpeed, minSpeed ){
    var randomNumber = model.randomNumber( maxSpeed, minSpeed );
    var oneOrZero = model.randomNumber( 1 );
    if (oneOrZero === 1) {
      randomNumber *= -1;
    };
    return randomNumber;
  },

  buildAsteroids: function( asteroidsArray, asteroidConstructor, numberOfAsteroids ){
    for( var i = 0; i < numberOfAsteroids; i++ ) {
      model.buildAsteroid( asteroidsArray, asteroidConstructor);
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
    model.adjustAsteroidsPositionsIfOffScreen( model.asteroids );
    view.renderBoard( view.addAsteroidsToBoard, model.asteroids, view.clearAsteroids, view.setCSSOfAsteroid );
  }
};

var view = {
  init: function(){
    view.renderBoard( view.addAsteroidsToBoard, model.asteroids, view.clearAsteroids, view.setCSSOfAsteroid );
    view.placeShip( model.ship );
    view.listenOutForKeyPresses();
  },

  listenOutForKeyPresses: function(){
    $(window).
  },

  // border-left: 50px solid transparent;
  // border-right: 50px solid transparent;
  // border-bottom: 100px solid red;
  placeShip: function( ship ){
    $("#game-board").prepend("<div id='ship'></div>")
    $("#ship").css({"left": model.ship.x + "px", "top": model.ship.y + "px", "border-left": model.ship.width/3 + "px solid transparent", "border-right": model.ship.width/3 + "px solid transparent", "border-bottom": model.ship.width + "px solid white"})
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