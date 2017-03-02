// "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.VIEW = {};

// shortcut to access VIEW name-subspace
var view = ASTEROIDS.VIEW;


view.init = function(updateShip){

  $(document).keydown(function(event){
      var keycode = event.which;

      switch(keycode){
       //left key arrow
       case 37:
        model.ship.movement.left = true;
        break;

       //right key arrow
       case 39:
        model.ship.movement.right = true;
        break;

       //up key arrow
       case 38:
        model.ship.movement.forward = true;
        break;
      }
      event.preventDefault();
  });

  $(document).keyup(function(event){
      var keycode = event.which;

      switch(keycode){
       //left key arrow
       case 37:
        model.ship.movement.left = false;
        break;

       //right key arrow
       case 39:
        model.ship.movement.right = false;
        break;

       //up key arrow
       case 38:
          model.ship.movement.forward = false;
          break;

       //spacebar fire torpedoe
       case 32:
          model.ship.fireTorpedoe();
          break;
      }
      event.preventDefault();
  });
};

view.render = function(asteroids, spaceship){
  view.clearCanvas();
  view.renderAsteroids(asteroids);
  view.renderSpaceShip(spaceship);
  view.renderTorpedoes(spaceship.torpedoes);
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

view.renderTorpedoes = function(torpedoes){
  var canvas = document.getElementById("c"),
      context = canvas.getContext("2d");

  torpedoes.forEach(function(torpedoe){
    context.beginPath();
    context.arc(torpedoe.position.x,
                torpedoe.position.y,
                torpedoe.size,
                0,
                Math.PI * 2);
    context.fillStyle = torpedoe.color;
    context.fill();
  });
}

view.renderSpaceShip = function(spaceship){
  var canvas = document.getElementById("c"),
  context = canvas.getContext("2d"),
  shipSize = spaceship.size;

  context.save();

  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);

  context.beginPath();

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
