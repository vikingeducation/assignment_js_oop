var MYAPP = MYAPP || {};

MYAPP.Model = {};

MYAPP.Model.Asteroid = function Asteroid (options) {
  this.x = Math.floor(Math.random() * 500) + 100;
  this.y = Math.floor(Math.random() * 500) + 100;
  this.radius = Math.floor(Math.random() * 40) + 20;
  // still need to fiddle with movement of asteroids to be more randomized
  this.counter = 0;
  this.sign = 5 + Math.random() * 10;
  this.speed = .01;

};

MYAPP.Model.Asteroid.prototype.increment = function() {
  this.counter += .1*(this.sign + this.speed);
}

MYAPP.Model.Asteroid.prototype.validateCoords = function(coord) {
  coord > 500 ? this.overLimit(coord) : 0;
  coord < 0 ? coord += coord : 0;
}

MYAPP.Model.Asteroid.prototype.overLimit = function(x) {
  console.log('coord is ' + x)
  x -= 500;
  console.log('coord is now ' + x)
}

MYAPP.Model.buildAsteroids = function(number) {
  var asteroids = [];
  for(var i = 0; i < number; i++) {
    asteroids.push( new MYAPP.Model.Asteroid() );
  }
  return asteroids;
};
