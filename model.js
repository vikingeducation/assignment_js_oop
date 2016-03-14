
// locations, velocities

var asteroid = {
  Constructor: function(x, y){
    this.startX = x;
    this.startY = y;
    this.velX = 11;
    this.velY= 11;
  },

  randAsteroid: function(){
    randX = Math.floor(Math.random() * space.width) + 1;
    randY = Math.floor(Math.random() * space.height) + 1;
    return new asteroid.Constructor( randX, randY );
  }
};

var ship = {
  // uses locationX, locationY, direction
  width: 30,
  height: 50,
  acceleration: 12,

};

var space = {
  width: 800,
  height: 600,
  asteroids: [],
};
