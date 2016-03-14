var GAME = GAME || {};


GAME.model = {

  init: function() {
    GAME.asteroidModel.init(2);
    GAME.shipModel.init();
    GAME.laserModel.init();
  }

}

GAME.useful = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  randomVelocity: function() {
    return Math.floor(Math.random() * 4 - 2);
  },

  randomX: function() {
    var side = Math.round(Math.random());
    switch (side) {
      case 0:
        return Math.floor( Math.random() * 700 );
        break;
      case 1:
        return Math.floor( Math.random() * 700 + (GAME.width - 700) );
        break;
    }
  },

  circleArea: function(r) {
    return Math.PI * Math.pow(r, 2);
  },

  radiusFromArea: function(a) {
    return Math.sqrt( a / Math.PI );
  },

  halfSize: function(r) {
    var halfArea = this.circleArea(r) / 2;
    return this.radiusFromArea(halfArea);
  },
}
