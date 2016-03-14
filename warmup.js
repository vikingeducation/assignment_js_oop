var AsteroidConstructor = function(){
  this.xCoord = 1;
  this.yCoord = 1;
  this.xVel = 1;
  this.yVel = 1;
  this.tic = function(){
    this.xCoord += this.xVel;
    this.yCoord += this.yVel;
  };
};

var AsteroidConst = function(){
  this.xCoord = 1;
  this.yCoord = 1;
  this.xVel = 1;
  this.yVel = 1;
};

AsteroidConst.prototype.tic = function(){
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
};

var buildAsteroids = function(){
  var timeInit  = new Date();
  for(var i=0; i<= 1000; i++){
    var newAst = new AsteroidConstructor();
  }
  var timeFinal  = new Date();
  return timeFinal.getTime() - timeInit.getTime();
};

var buildAsteroid = function(){
  var timeInit  = new Date().getTime();
  for(var i=0; i<= 1000; i++){
    var newAst = new AsteroidConst();
    for(var j=0; j<=1000; j++){
      newAst.tic();
    }
  }
  var timeFinal  = new Date().getTime();
  return timeFinal - timeInit;
};

console.log(buildAsteroids());
console.log(buildAsteroid());
