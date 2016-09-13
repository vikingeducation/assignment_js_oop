function Asteroid(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
  this.size = options.size || 10;
}

function Beam(options) {
  options = options || {};

  this.x = options.x || 1;
  this.y = options.y || 1;
  this.xVel = options.xVel || 1;
  this.yVel = options.yVel || 1;
  this.size = options.size || 10;
  this.direction = options.direction || 360;
}

function Ship(options) {
  options = options || {};

  this.x = options.x || 300;
  this.y = options.y || 300;
  this.xVel = options.xVel || 0;
  this.yVel = options.yVel || 0;
  this.direction = options.direction || 360;
  this.rotate = function(direction) {
    if (direction === 'left'){
      this.direction -= 5;
      if(this.direction < 1) { this.direction = 360; }
    } else if (direction === 'right') {
      this.direction += 5;
      if(this.direction > 360) { this.direction = 1; }
    }
  };
  this.accelerate = function(positive) {
    var radians = (this.direction / 180) * Math.PI;
    if (positive) {
      this.xVel += Math.sin(radians) * 1;
      console.log(this.xVel);
      this.yVel -= Math.cos(radians) * 1;
    } else {
      this.xVel -= Math.sin(radians) * 1;
      this.yVel += Math.cos(radians) * 1;
    }
  };
}

Asteroid.prototype.tic = function() {
  this.x += this.xVel;
  this.y += this.yVel;
  if (this.x > 600) {
    this.x = 0;
  } else if (this.x < 0) {
    this.x = 600;
  }
  if (this.y > 600) {
    this.y = 0;
  } else if (this.y < 0) {
    this.y = 600;
  }
};

Ship.prototype = Object.create(Asteroid.prototype);
Ship.prototype.constructor = Ship;

Beam.prototype = Object.create(Asteroid.prototype);
Beam.prototype.constructor = Beam;



var MODEL = {

  asteroids: [],
  ships: [],
  beams: [],

  init: function(num) {
    this.buildAsteroids(num);
    this.buildShip();
  },

  buildShip: function(options) {
    var ship = new Ship(options);
    this.ships.push(ship);
  },

  buildBeam: function() {
    var ship = MODEL.ships[0]
    var options = {
      x: ship.x,
      y: ship.y,
      xVel: Math.sin(ship.direction / 180 * Math.PI) * 5,
      yVel: Math.cos(ship.direction / 180 * Math.PI) * -5,
      direction: ship.direction
    }
    var beam = new Beam(options);
    this.beams.push(beam);
  },

  buildAsteroids: function(num) {
    for (var i = 0; i < num; i++) {
      var side = this.getSide();
      var coords = this.calculateSide(side);
      var velocity = this.getVelocity();
      coords.xVel = velocity[0];
      coords.yVel = velocity[1];
      var ast = new Asteroid(coords);
      this.asteroids.push(ast);
    }
  },

  updateShip: function(keyCode) {
    switch(keyCode) {
    case 37:
      this.ships[0].rotate('left');
      break;
    case 39:
      this.ships[0].rotate('right');
      break;
    case 38:
      this.ships[0].accelerate(true);
      break;
    case 40:
      this.ships[0].accelerate(false);
      break;
    default:
      return;
    }
  },

  getVelocity: function() {
    var xVel = Math.floor(Math.random() * 3) + 1;
    var yVel = Math.floor(Math.random() * 3) + 1;
    if (Math.random() > 0.5) {
      xVel *= -1;
    }
    if (Math.random() > 0.5) {
      yVel *= -1;
    }
    return [xVel, yVel];
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
  },

  updateGame: function() {
    var asteroids = this.asteroids;
    var beams = this.beams;
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].tic();
    }
    for (var i = 0; i < beams.length; i++) {
      beams[i].tic();
    }
    this.ships[0].tic();
  }

};

var VIEW = {
  init: function() {
    VIEW.keyPressListener();
  },

  render: function(asteroids, ships, beams) {
    var canvas = $('#canvas').get(0);
    canvas.width = 600;
    canvas.height = 600;
    canvas.width = canvas.width;
    for (var i = 0; i < asteroids.length; i++) {
      VIEW.drawAsteroid(asteroids[i], canvas);
    }
    for (var i = 0; i < beams.length; i++) {
      VIEW.drawBeam(beams[i], canvas);
    }
    VIEW.drawShip(ships, canvas);
  },

  keyPressListener: function() {
    var vals = [32, 37, 38, 39, 40];
    $(document).keydown(function(e) {
      var keyCode = e.keyCode;
      if(vals.includes(keyCode)) {
        e.preventDefault();
        CONTROLLER.rotateShip(keyCode);
      }
    });
  },


  drawShip: function(ships, canvas) {
    var ship = ships[0];
    var context = canvas.getContext("2d");
    var centerX = ship.x;
    var centerY = ship.y;

    var shipImage = new Image();
    shipImage.src = 'asteroid_ship.ico';

    var width = shipImage.width;
    var height = shipImage.height;

    var angleInRadians = (ship.direction / 180)* Math.PI;

    context.translate(centerX, centerY);
    context.rotate(angleInRadians);
    context.drawImage(shipImage, -width / 2, -height / 2, width, height);
    context.rotate(-angleInRadians);
    context.translate(-centerX, -centerY);
  },

  drawAsteroid: function(asteroid, canvas) {
    var context = canvas.getContext("2d");
    var centerX = asteroid.x;
    var centerY = asteroid.y;
    var radius = asteroid.size;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  },

  drawBeam: function(beam, canvas) {
    var context = canvas.getContext("2d");
    var startX = beam.x;
    var startY = beam.y;
    var length = beam.size;
    var rotation = beam.direction / 180 * Math.PI;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineWidth = 3;
    context.lineTo(startX + Math.sin(rotation) * length, startY - Math.cos(rotation) * length);
    context.strokeStyle = '#FFF';
    context.stroke();
    //context.endPath();
  }
};

var CONTROLLER = {
  init: function(num) {
    MODEL.init(num);
    VIEW.init();
  },

  gameLoop: function() {
    CONTROLLER.interval = window.setInterval(function() {
      VIEW.render(MODEL.asteroids, MODEL.ships, MODEL.beams);
      MODEL.updateGame();
    }, 50);
  },

  rotateShip: function(keyCode) {
    if (keyCode === 32) {
      MODEL.buildBeam();
    } else {
      MODEL.updateShip(keyCode);
    }
  },

  stopLoop: function() {
    window.clearInterval(CONTROLLER.interval);
  }
};

$(document).ready(function() {
  CONTROLLER.init(20);
  CONTROLLER.gameLoop();
});
