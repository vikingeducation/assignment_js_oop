function Asteroid(options) {
  this.xCoord = options.entryPoint[0];
  this.yCoord = options.entryPoint[1];
  this.xVel = options.getVelocity[0];
  this.yVel = options.getVelocity[1];
  this.radius = options.radius
};

Asteroid.prototype.tic = function() {
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
};

function Ship() {
  // this.height = 100;
  // this.width = 80;
  this.xCoord = View.c.width / 2;
  this.yCoord = View.c.height / 2;
  this.xVel = 0;
  this.yVel = 0;
  this.tic = function() {
    this.xCoord += this.xVel;
    this.yCoord -= this.yVel;
  }
};

function Bullet(options){
  this.xCoord = options.xCoord;
  this.yCoord = options.yCoord;
  this.xVel = options.xVel;
  this.yVel = options.yVel;
};

Bullet.prototype.tic = function(){
  this.xCoord += this.xVel;
  this.yCoord += this.yVel;
}

var Model = {
  init: function() {
    this.astrArray = [];
    this.bulletsArray = [];
    for(var i = 0; i < 5; i++){
      this.createAsteroid();
    }
    this.astrCount = function() {
      return this.astrArray.length;
    }
    this.createShip();
    this.rotation = 0;
  },

  moveAsteroids: function(){
    for(var i = 0; i < this.astrArray.length; i++){
      this.astrArray[i].tic();
    }
  },

  moveBullets: function(){
    for(var i = 0; i< this.bulletsArray.length; i++){
      this.bulletsArray[i].tic();
    }
  },

  countCheck: function(num) {
    while (this.astrCount() < num) {
      this.createAsteroid();
    }
  },

  removeAsteroids: function(){
    for(var i = 0; i < this.astrArray.length; i++){
      if(this.astrArray[i].xCoord < 0 || this.astrArray[i].xCoord > View.c.width || this.astrArray[i].yCoord < 0 || this.astrArray[i].yCoord > View.c.height){
        this.astrArray.splice(i,1);
      }
    }
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

  createShip: function(){
    this.ship = new Ship();
  },

  handleKey: function(key){
    if(key === 32){
      this.fireBullet();
    }
    else{
      this.rotateShip(key);
    }
  },

  rotateShip: function(key){
    if (key === 37) {
      this.rotation -= (2 * 3.14)/10;
    } else if (key === 39) {
      this.rotation += (2 * 3.14)/10;
    } else if (key === 38) {
      this.ship.yVel = (this.ship.yVel + 2*Math.cos(this.rotation));
      this.ship.xVel = (this.ship.xVel + 2*Math.sin(this.rotation));
    } else if (key === 40) {
      this.ship.yVel = (this.ship.yVel - 2*Math.cos(this.rotation));
      this.ship.xVel = (this.ship.xVel - 2*Math.sin(this.rotation));
    }
  },

  fireBullet: function(){
    var options = {
      xCoord: this.ship.xCoord,
      yCoord: this.ship.yCoord,
      xVel: 2 * Math.sin(this.rotation),
      yVel: -2 * Math.cos(this.rotation)
    }
    this.bulletsArray.push(new Bullet(options));
  },

  bulletCollide: function(bul, ast) {
    var dx = ast.xCoord - bul.xCoord;
    var dy = ast.yCoord - bul.yCoord;
    var rSum = ast.radius + 2;
    return (dx*dx + dy*dy <= rSum*rSum);
  },

  bulletCheck: function() {
    for (var i = 0; i < this.bulletsArray.length; i++) {
      for (var j = 0; j < this.astrArray.length; j++) {
        if (this.bulletCollide(this.bulletsArray[i], this.astrArray[j]))
          this.astrBoom(this.astrArray[j], j);
      }
    }
  },

  astrBoom: function(astr, index) {
    if (astr.radius > 30) {
      this.createAsteroid();
      this.astrArray[this.astrArray.length - 1].xCoord = astr.xCoord;
      this.astrArray[this.astrArray.length - 1].yCoord = astr.yCoord;
      this.astrArray[this.astrArray.length - 1].radius = astr.radius / 2;
      this.createAsteroid();
      this.astrArray[this.astrArray.length - 1].xCoord = astr.xCoord;
      this.astrArray[this.astrArray.length - 1].yCoord = astr.yCoord;
      this.astrArray[this.astrArray.length - 1].radius = astr.radius / 2;
    }
    this.astrArray.splice(index, 1);
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
        y = this.randNum(View.c.height);
        break;
      //enters from top
      case 1:
        y = 0;
        x = this.randNum(View.c.width);
        break;
      //enters from right
      case 2:
        x = View.c.width;
        y = this.randNum(View.c.height);
        break;
      //enters from bottom
      case 3:
        y = View.c.height;
        x = this.randNum(View.c.width);
        break;
    }
    return [x,y];
  },

  getVelocity: function(entryPoint){
    var xVelocity, yVelocity;
    //if starting on the left, xVelocity should be positive
    if(entryPoint[0] === 0 || entryPoint[1] === 0){
      xVelocity = this.randNum(10) + 1;
      yVelocity = this.randNum(10) + 1;
    }
    else{
      xVelocity = -this.randNum(10) - 1;
      yVelocity = -this.randNum(10) - 1;
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