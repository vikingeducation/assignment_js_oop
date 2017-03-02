// "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.VIEW = {};

// shortcut to access VIEW name-subspace
var view = ASTEROIDS.VIEW;


view.init = function(updateShip){
  $(document).keydown(function(event){
      var keycode = event.which,
          validCodes = [32, 37, 38, 39];
      if (validCodes.indexOf(keycode) !== -1) {
        model.ship.moveShip(keycode);
      }
      event.preventDefault();
  });
};

view.render = function(asteroids, spaceship){
  view.clearCanvas();
  view.renderAsteroids(asteroids);
  view.renderSpaceShip(spaceship);
};


view.renderAsteroids = function(asteroids){
  var canvas = document.getElementById("c"),
      context = canvas.getContext("2d");

  asteroids.forEach(function(asteroid){
    context.beginPath();
    context.arc(asteroid.coordX,
                asteroid.coordY,
                asteroid.size,
                0,
                Math.PI * 2);
    context.stroke();
    context.closePath();
    // context.fill();
  });
};

view.renderSpaceShip = function(spaceship){
  var canvas = document.getElementById("c"),
  context = canvas.getContext("2d"),
  shipSize = spaceship.size;

  context.save();

  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);

  context.beginPath();

  // context.moveTo(0, -shipSize);
  // context.lineTo(-shipSize, 0);
  // context.lineTo(shipSize, 0);
  // context.closePath();

  context.moveTo(0, -shipSize);
  context.lineTo(-shipSize, 0);
  context.lineTo(shipSize, 0);
  context.closePath();

  context.fillStyle = spaceship.color;
  context.fill();
  context.restore();
};

view.clearCanvas = function(){
  var canvas = document.getElementById("c");
  canvas.width = canvas.width;
};
