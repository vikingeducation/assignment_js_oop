var Asteroid = function(x, y, velocityX, velocityY){
  this.coordX = x;
  this.coordY = y;
  
  this.velocityX = velocityX;
  this.velocityY = velocityY;
};

Asteroid.prototype.tic = function(){
  this.coordX += this.velocityX;
  this.coordY += this.velocityY;
  console.log(this.coordX, this.coordY) ; console.log
};

var testAst = new Asteroid(1,2,3,4)

var stop = 0;

var interval = setInterval(function(){
  testAst.tic()
  stop++
  if (stop === 5) {
    clearInterval(interval)  
  }
}, 1000)


//'psuedo-classical', or prototypal: uses less space
//but takes longer to run as it has a lookup chain


var getRand = function(){
  return Math.floor(Math.random() * 10);
};


for (var i = 0; i < 100; i++){
  
}

//