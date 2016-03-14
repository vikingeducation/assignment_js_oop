var Particle = function(x, y, x_vel, y_vel) {
  Sprite.apply(this, arguments);
  this.size = 3;
  this.life = 100;

  this.otherTic = function() {
    this.life -= 1;
  }
};

var Ship = function(x, y, x_vel, y_vel, size) {
  Sprite.apply(this, arguments);
  this.health = 100;
  this.direction = ((2 * Math.PI) / 360) * 270;
  this.accerelation = 0.5;

  this.accelerate = function() {
    var xVector = Math.cos(this.direction);
    var yVector = Math.sin(this.direction);
    var particle = new Particle(this.x, this.y, (xVector * -1), yVector * -1);
    this.board.addParticle(particle);
    this.x_vel += (xVector * this.accerelation);
    this.y_vel += (yVector * this.accerelation);

    this.x_vel = Math.min(this.x_vel, 3);
    this.y_vel = Math.min(this.y_vel, 3);
  };

  this.turnRight = function(){
    this.turnSpeed += ((Math.PI / 360) * 1) % (Math.PI * 2);
    this.turnSpeed = Math.min(this.turnSpeed, 3);
  };

  this.turnLeft = function(){
    this.turnSpeed -= (Math.PI / 360) * 1 % (Math.PI * 2);
    this.turnSpeed = Math.min(this.turnSpeed, 3);
  };
}
