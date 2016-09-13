function Asteroid(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
}

Asteroid.prototype.tic = function() {
  this.x += this.xVel;
  this.y += this.yVel;
}

MODEL = {

  asteroids = [];

  init: function(num) {
    this.buildAsteroids(num);
  },

  buildAsteroids: function(num) {
    for (var i = 0; i < num; i++) {
      var side = this.getSide();
      var coords = this.calculateSide(side);
      coords.xVel = i;
      coords.yVel = i;
      var ast = new Asteroid(coords);
      this.asteroids.push(ast);
    }
  },

  getSide: function() {
    var side = Math.floor(Math.random() * 4) + 1;
    var position = Math.floor(Math.random() * 600) + 1;
    return [side, position];
  },

  calculateSide: function(side) {
    switch(side[0]) {
      case 1:
        return { x: 0, y: side[1] };
      case 2:
        return { x: side[1], y: 0 };
      case 3:
        return { x: 600, y: side[1] };
      case 4:
        return { x: side[1], y: 600 };
      default:
        return "Nothing Here!";
    }
  }



};

VIEW = {

};

CONTROLLER = {
  init: function(num) {
    MODEL.init(num);
    VIEW.init();
  },
};

$(document).ready(function() {
  CONTROLLER.init();
});
