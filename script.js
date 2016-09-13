function Asteroid() {
  var randNum = function() {return Math.floor(Math.random() * 100)};
  this.xCoord = randNum();
  this.yCoord = randNum();
  this.xVel = randNum();
  this.yVel = randNum();
};

Asteroid.prototype.tic = function() {
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
};

astrArray = [];

for (var i = 0; i < 1000; i++) {
  astrArray.push(new Asteroid());
};

var time1 = Date.now();

for (var i = 0; i < astrArray.length; i++) {
  for (var j = 0; j < 1000; j++) {
    astrArray[i].tic();
  } 
};

var time2 = Date.now();

console.log((time2 - time1));

function Asteroid2() {
  var randNum = function() {return Math.floor(Math.random() * 100)};
  this.xCoord = randNum();
  this.yCoord = randNum();
  this.xVel = randNum();
  this.yVel = randNum();
  this.tic = function() {
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
  }
};

astrArray2 = [];

for (var i = 0; i < 1000; i++) {
  astrArray2.push(new Asteroid2());
};

var time3 = Date.now();

for (var i = 0; i < astrArray.length; i++) {
  for (var j = 0; j < 1000; j++) {
    astrArray2[i].tic();
  } 
};

var time4 = Date.now();

console.log((time4 - time3));