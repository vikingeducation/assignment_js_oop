var Sprite = function Sprite (x, y, x_vel, y_vel, size) {
  this.x = x;
  this.y = y;
  this.x_vel = x_vel;
  this.y_vel = y_vel;
  this.turnSpeed = 0;
  this.otherTic = function() {};
  this.tic = function() {
    this.otherTic();
    this.x = ((this.x + this.x_vel + this.board.boardX) % this.board.boardX);
    this.y = ((this.y + this.y_vel + this.board.boardY) % this.board.boardY);
    this.direction += this.turnSpeed;
  };

  this.boundingBox = function() {
    return this.render().getBoundingClientRect();
  }

  this.collision = function(object2) {
    boundary1 = this.boundingBox();
    boundary2 = object2.getBoundingClientRect();

    return !(boundary2.left > boundary1.right ||
        boundary2.right < boundary1.left ||
        boundary2.top > boundary1.bottom ||
        boundary2.bottom < boundary1.top);
  }
}
