function AsteroidConstructor(x,y,velX,velY) {
  this.x = x;
  this.y = y;
  this.velocityX = velX;
  this.velocityY = velY;
}

AsteroidConstructor.prototype.tic = function() {
  this.x += this.velocityX;
  this.y += this.velocityY;
}


function AlternateConstructor(x,y,velX,velY) {
  this.x = x;
  this.y = y;
  this.velocityX = velX;
  this.velocityY = velY;
  this.tic = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}


function Benchmark() {
  var startTime = new Date();

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for(var i = 0; i < 5000; i++) {
    var a = new AsteroidConstructor( randInt(0,600), randInt(0,600), randInt(-50, 50), randInt(-50, 50) );
    for(var j = 0; j < 5000; j++) {
      a.tic()
    };
  };

  var endTime = new Date()

  console.log(endTime.getTime() - startTime.getTime());
}