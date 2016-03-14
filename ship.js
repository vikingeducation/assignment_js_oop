var Bullet = function(x, y, x_vel, y_vel) {
  Sprite.apply(this, arguments);
  this.size = 3;
  this.life = 100;

  this.otherTic = function() {
    this.life -= 1;
  };

  this.render = function() {
    var bulletObject = new Two.Ellipse(this.x, this.y, 3, 3);
    bulletObject.fill = '#FFAAAA';
    bulletObject.noStroke();
    bulletObject.translation.set(this.x, this.y);
    return bulletObject;
  };

};

var Particle = function(x, y, x_vel, y_vel) {
  Sprite.apply(this, arguments);
  this.size = 3;
  this.life = 50;

  this.otherTic = function() {
    this.life -= 1;
  }

  this.render = function() {
    var particleObject = new Two.Line(this.x, this.y, this.x + this.x_vel * 5, this.y + this.y_vel * 5);
    particleObject.stroke = '#FFAAAA';
    particleObject.fill = null;
    particleObject.opacity = this.life / 100;
    particleObject.translation.set(this.x, this.y);
    return particleObject;
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
    if ((Math.random() * 10) > 6) {
      var particle = new Particle(this.x + Math.random() * 8, this.y + Math.random() * 8, (xVector * -3) + Math.random() * 2, yVector * -3 + Math.random() * 2);
      particle.board = this.board
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

  this.fire = function() {
    var xVector = Math.cos(this.direction);
    var yVector = Math.sin(this.direction);
    var bullet = new Bullet(this.x, this.y, xVector * 10, yVector * 10);
    bullet.board = this.board
    this.board.addBullet(bullet);
  };

  this.render = function() {
    var shipObject = new Two.Polygon(this.x, this.y, 15, 3);
    shipObject.vertices[2].y += 5;
    shipObject.vertices[2].x += 10;
    shipObject.linewidth = 2;
    shipObject.stroke = '#FFFFFF';
    shipObject.fill = null;
    shipObject.translation.set(this.x, this.y);
    shipObject.rotation = this.direction - (Math.PI / 180) * 30;
    return shipObject;
  };
}
