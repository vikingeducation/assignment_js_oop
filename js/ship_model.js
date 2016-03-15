GAME.shipModel = {

  init: function() {
    this.ship = new GAME.shipModel.Ship();
  },

  Ship: function() {
    this.xCoord = GAME.width / 2;
    this.yCoord = GAME.height / 2;
    this.size = 35;
    this.direction = new Victor(this.size,0);
    this.velocity = new Victor(0,0);
    this.rotation = 0;

  },

  update: function() {
    this.ship.tic();
    this.ship.wrap();
  }
}

GAME.shipModel.Ship.prototype.tic = function() {
  this.xCoord += this.velocity.x;
  this.yCoord += this.velocity.y;
  this.direction.rotateDeg(this.rotation)
}


GAME.shipModel.Ship.prototype.wrap = function() {
  if (this.xCoord < 0) {
    this.xCoord = GAME.width + this.xCoord;
  } else if (this.xCoord > GAME.width) {
    this.xCoord = this.xCoord - GAME.width;
  } else if (this.yCoord < 0) {
    this.yCoord = GAME.height + this.yCoord;
  } else if (this.yCoord > GAME.height) {
    this.yCoord = this.yCoord - GAME.height;
  }
}
