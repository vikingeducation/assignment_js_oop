function Asteroid(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
  this.size = options.size || 10;
}

Asteroid.prototype.tic = function() {
  this.x += this.xVel;
  this.y += this.yVel;
};

var MODEL = {

  asteroids: [],

  init: function(num) {
    this.buildAsteroids(num);
  },

  buildAsteroids: function(num) {
    for (var i = 0; i < num; i++) {
      var side = this.getSide();
      var coords = this.calculateSide(side);
      // console.log(coords);
      coords.xVel = i;
      coords.yVel = i;
      var ast = new Asteroid(coords);
      this.asteroids.push(ast);
    }
    // this.asteroids.push(new Asteroid({x: 300, y: 300}));
  },

  getSide: function() {
    var side = Math.floor(Math.random() * 4) + 1;
    var position = Math.floor(Math.random() * 500) + 1;
    return [side, position];
  },

  calculateSide: function(side) {
    // console.log(side);
    switch(side[0]) {
      case 1:
        return { x: 0, y: side[1] };
      case 2:
        return { x: side[1], y: 0 };
      case 3:
        return { x: 500, y: side[1] };
      case 4:
        return { x: side[1], y: 500 };
      default:
        return "Nothing Here!";
    }
  }



};

var VIEW = {
  render: function(asteroids) {
    var canvas = $('#canvas');
    console.log(canvas.offset());
    canvas.get(0).width = canvas.get(0).width;
    for (var i = 0; i < asteroids.length; i++) {
      VIEW.drawAsteroid(asteroids[i], canvas.get(0));
    }
    // VIEW.drawAsteroid({x: 300, y: 300, size: 10}, canvas.get(0));
  },

  drawAsteroid: function(asteroid, canvas) {
    // console.log([asteroid.x, asteroid.y]);
    var context = canvas.getContext("2d");
    var centerX = asteroid.x;
    var centerY = asteroid.y;
    var radius = asteroid.size;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }
};

var CONTROLLER = {
  init: function(num) {
    MODEL.init(num);
    // VIEW.init();
  },

  gameLoop: function() {
    CONTROLLER.interval = window.setInterval(function() {
      VIEW.render(MODEL.asteroids);
    }, 1000);
  },

  stopLoop: function() {
    window.clearInterval(CONTROLLER.interval);
  }
};

$(document).ready(function() {
  CONTROLLER.init(100);
  CONTROLLER.gameLoop();
});
