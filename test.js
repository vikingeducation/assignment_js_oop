function Asteroid(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
}

Asteroid.prototype.tic = function() {
  this.x += this.xVel;
  this.y += this.yVel;
}

function Asteroid2(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
  this.tic = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  };
}


var benchmark = function(num) {
  var startTime = new Date();
  for (var i = 0; i < num; i++) {
    var a = new Asteroid({
      x: i,
      y: i,
      xVel: i,
      yVel: i
    });
    for (var j = 0; j < num; j++) {
      a.tic();
    }
  }
  var endTime = new Date();
  var diffTime = endTime.getTime() - startTime.getTime();
  return diffTime + " ms";
}

var benchmark2 = function(num) {
  var startTime = new Date();
  for (var i = 0; i < num; i++) {
    var a = new Asteroid2({
      x: i,
      y: i,
      xVel: i,
      yVel: i
    });
    for (var j = 0; j < num; j++) {
      a.tic();
    }
  }
  var endTime = new Date();
  var diffTime = endTime.getTime() - startTime.getTime();
  return diffTime + " ms";
}




console.log(benchmark(100000));
console.log(benchmark2(100000));
