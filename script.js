// ===================== VIEW ====================
var view = {

};

// ================= Model ===========
var model = {

};

//===================== Controller ================
var controller = {

};


Asteroid = function(){
  this.coordinateX = 0;
  this.coordinateY = 0;
  this.velocityX = 1;
  this.velocityY = 2;
};

Asteroid.prototype.tic = function(){
  this.coordinateX += this.velocityX;
  this.coordinateY += this.velocityY;
  // console.log(this.coordinateY, this.coordinateX);
};

Asteroid2 = function(){
  this.coordinateX = 0;
  this.coordinateY = 0;
  this.velocityX = 1;
  this.velocityY = 2;

  this.tic = function(){
    this.coordinateX += this.velocityX;
    this.coordinateY += this.velocityY;
    // console.log(this.coordinateY, this.coordinateX);
  };
};

var astr = new Asteroid();
var startTime = new Date().getTime();
for(var i = 0; i < 1000; i++){
  startTime = new Date().getTime();
  astr.tic();
}
var endTime = new Date().getTime();
console.log('Time taken for prototype: ' + (endTime-startTime));

var astr2 = new Asteroid2();
var startTime = new Date().getTime();
for(var i = 0; i < 1000; i++){
  astr2.tic();
}
var endTime = new Date().getTime();
console.log('Time taken for predefined: ' + (endTime-startTime));

// setInterval(function(){astr.tic();}, 500);
