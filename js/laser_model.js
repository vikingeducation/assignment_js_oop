GAME.laserModel = {

  init: function() {
    this.laserBeams = [];

  },

  Laser: function(xCoord, yCoord, velocity) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.size = 10;
    this.velocity = velocity;
  },

  shootLaser: function(ship) {
    var direction = ship.direction.horizontalAngleDeg();
    var vector = new Victor(10,0);
    var velocity = vector.rotateDeg(direction);

    this.laserBeams.push(new this.Laser(ship.xCoord, ship.yCoord, velocity));
  },


  update: function() {
    for ( var i = 0; i < this.laserBeams.length; i++ ) {
      this.laserBeams[i].tic();
    }    
  },



}


GAME.laserModel.Laser.prototype.tic = function() {
  this.xCoord += this.velocity.x;
  this.yCoord += this.velocity.y;
}
