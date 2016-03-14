var Asteroid = function(x, y, x_vel, y_vel, size) {
  Sprite.apply(this, arguments);
  this.size = size;
  this.direction = 0;
  this.turnSpeed = Math.PI / 180;

  this.break = function() {
    baby1 = new Asteroid();
  }
}
