function Asteroid(options) {
  var randNum = function() {return Math.floor(Math.random() * 100)};
  this.xCoord = options.entryPoint[0];
  this.yCoord = options.entryPoint[0];
  this.xVel = options.getVelocity[0];
  this.yVel = options.getVelocity[1];
  this.radius = options.radius
};

Asteroid.prototype.tic = function() {
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
};

var Model = {
  init: function() {
    this.astrArray = [];
    this.createAsteroid();
  },

  createAsteroid: function(){
    var radius = this.randNum(100);
    var entryPoint = this.getRandomEntryPoint(this.randNum(4));
    var getVelocity = this.getVelocity(entryPoint);
    var options = {
      radius: radius,
      entryPoint: entryPoint,
      getVelocity: getVelocity
    }
    this.astrArray.push(new Asteroid(options));
  },

  randNum: function(multiplier){
    return Math.floor(Math.random() * multiplier);
  },

  getRandomEntryPoint: function(random){
    var x, y;
    switch(random){
      //enters from left
      case 0:
        x = 0;
        y = this.randNum(225);
        break;
      //enters from top
      case 1:
        y = 0;
        x = this.randNum(300);
        break;
      //enters from right
      case 2:
        x = 300;
        y = this.randNum(225);
        break;
      //enters from bottom
      case 3:
        y = 225;
        x = this.randNum(300);
        break;
    }
    return [x,y];
  },

  getVelocity: function(entryPoint){
    var xVelocity, yVelocity;
    //if starting on the left, xVelocity should be positive
    if(entryPoint[0] === 0 || entryPoint[1] === 0){
      xVelocity = this.randNum(100);
      yVelocity = this.randNum(100);
    }
    else{
      xVelocity = -this.randNum(100);
      yVelocity = -this.randNum(100);
    }

    return [xVelocity, yVelocity];
  }
};

// astrArray = [];

// for (var i = 0; i < 1000; i++) {
//   astrArray.push(new Asteroid());
// };

// var time1 = Date.now();

// for (var i = 0; i < astrArray.length; i++) {
//   for (var j = 0; j < 1000; j++) {
//     astrArray[i].tic();
//   } 
// };

// var time2 = Date.now();

// console.log((time2 - time1));

// function Asteroid2() {
//   var randNum = function() {return Math.floor(Math.random() * 100)};
//   this.xCoord = randNum();
//   this.yCoord = randNum();
//   this.xVel = randNum();
//   this.yVel = randNum();
//   this.tic = function() {
//   this.xCoord += this.xVel;
//   this.yCoord += this.yVel;
//   }
// };

// astrArray2 = [];

// for (var i = 0; i < 1000; i++) {
//   astrArray2.push(new Asteroid2());
// };

// var time3 = Date.now();

// for (var i = 0; i < astrArray.length; i++) {
//   for (var j = 0; j < 1000; j++) {
//     astrArray2[i].tic();
//   } 
// };

// var time4 = Date.now();

// console.log((time4 - time3));