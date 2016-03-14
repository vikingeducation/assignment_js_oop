GAME.shipModel = {

  init: function() {
    this.ship = new GAME.shipModel.Ship();
  },

  Ship: function() {
    this.xCoord = GAME.width / 2;
    this.yCoord = GAME.height / 2;
    this.size = 35;
    this.direction = new Victor(this.size,0);

  }
}

GAME.shipModel.Ship.prototype.tic = function() {

}



GAME.shipModel.Ship.prototype.fire = function() {

}
