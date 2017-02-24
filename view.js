// "use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.VIEW = {};

//shortcut to access VIEW name-subspace
var view = ASTEROIDS.VIEW;


view.init = function(){

    };

view.render = function(asteroids){
  view.clearCanvas();
  view.renderAsteroids(asteroids);
};


view.renderAsteroids = function(asteroids){
  var canvas = document.getElementById("c"),
      context = canvas.getContext("2d");

  asteroids.forEach(function(asteroid){
    context.beginPath();
    context.arc(asteroid.coordX, asteroid.coordY, asteroid.size, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
    // context.fill();
  });
};

view.clearCanvas = function(){
  var canvas = document.getElementById("c");
  canvas.width = canvas.width;
};
