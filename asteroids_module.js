function Sprite (x, y, x_vel, y_vel, size) {
  this.boardY = 600;
  this.boardX = 800;
  this.x = x;
  this.y = y;
  this.x_vel = x_vel;
  this.y_vel = y_vel;

  this.tic = function() {
    this.x = (this.x + this.x_vel) % this.boardX;
    this.y = (this.y + this.x_vel) % this.boardY;
  }
}
