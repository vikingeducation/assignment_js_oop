var Asteroid = function(x, y, x_vel, y_vel, size) {
  Sprite.apply(this, arguments);
  this.size = size;
  this.direction = 0;
  this.turnSpeed = Math.PI / 180;

  this.render = function() {
    var asteroidObject = new Two.Ellipse(this.x, this.y, this.size*5, this.size*5);
    asteroidObject.stroke = '#FFFFFF';
    asteroidObject.fill = null;
    asteroidObject.translation.set(this.x, this.y);
    // asteroidObject.rotation = this.direction;
    return asteroidObject;
  }
}
