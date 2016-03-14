var Particle = function(x, y, x_vel, y_vel) {
  Sprite.apply(this, arguments);
  this.size = 3;
  this.life = 50;

  this.otherTic = function() {
    this.life -= 1;
  }
};

var Ship = function(x, y, x_vel, y_vel, size) {
  Sprite.apply(this, arguments);
  this.direction = ((2 * Math.PI) / 360) * 270;
  this.accerelation = 0.1;
  this.turn = 0.3;

  this.accelerate = function() {
    var xVector = Math.cos(this.direction);
    var yVector = Math.sin(this.direction);
    if ((Math.random() * 10) > 8) {
      var particle = new Particle(this.x + Math.random() * 8, this.y + Math.random() * 8, (xVector * -3), yVector * -3);
      this.board.addParticle(particle);
    }
    this.x_vel += (xVector * this.accerelation);
    this.y_vel += (yVector * this.accerelation);

    this.x_vel = Math.min(this.x_vel, 3);
    this.y_vel = Math.min(this.y_vel, 3);
  };

  this.turnRight = function(){
    this.turnSpeed += ((Math.PI / 360) * this.turn) % (Math.PI * 2);
    this.turnSpeed = Math.min(this.turnSpeed, 3);
  };

  this.turnLeft = function(){
    this.turnSpeed -= (Math.PI / 360) * this.turn % (Math.PI * 2);
    this.turnSpeed = Math.min(this.turnSpeed, 3);
  };  

}
