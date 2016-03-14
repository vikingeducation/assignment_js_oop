var Ship = function(x, y, x_vel, y_vel) {
  Sprite.apply(this, arguments);
  this.health = 100;
  this.direction = 0;
  this.accelerate = function() {
    var xVector = Math.cos(this.direction);
    var yVector = Math.sin(this.direction);
    var delta = 1;

    this.x_vel += (xVector * delta);
    this.y_vel += (yVector * delta);
  }
}