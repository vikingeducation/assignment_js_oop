// "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.VIEW = {};

// shortcut to access VIEW name-subspace
var View = ASTEROIDS.VIEW;


View.init = function(updateShip){

  $(document).keydown(function(event){
      var keycode = event.which;

      switch(keycode){
       //left key arrow
       case 37:
        Model.ship.movement.left = true;
        break;

       //right key arrow
       case 39:
        Model.ship.movement.right = true;
        break;

       //up key arrow
       case 38:
        Model.ship.movement.forward = true;
        break;
      }
  });

  $(document).keyup(function(event){
      var keycode = event.which;

      switch(keycode){
       //left key arrow
       case 37:
        Model.ship.movement.left = false;
        break;

       //right key arrow
       case 39:
        Model.ship.movement.right = false;
        break;

       //up key arrow
       case 38:
          Model.ship.movement.forward = false;
          break;

       //spacebar fire torpedoe
       case 32:
          Model.ship.fireTorpedoe();
          break;
      }
      event.preventDefault();
  });
};

View.render = function(asteroids, spaceship){
  View.clearCanvas();
  View.renderAsteroids(asteroids);
  View.renderSpaceShip(spaceship);
  View.renderTorpedoes(spaceship.torpedoes);
};


View.renderAsteroids = function(asteroids){
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

View.renderTorpedoes = function(torpedoes){
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

View.renderSpaceShip = function(spaceship){
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


View.clearCanvas = function(){
  var canvas = document.getElementById("c");
  canvas.width = canvas.width;
};
