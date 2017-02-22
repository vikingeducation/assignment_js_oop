"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.VIEW = {};

//shortcut to access view subspace
var view = ASTEROIDS.VIEW;

view.init = function(){

    };

view.render = function(allAsteroids){
  view.clearCanvas();
  view.renderAsteroids(allAsteroids);
};


view.renderAsteroids = function(allAsteroids){
  var canvas = document.getElementById("c"),
      context = canvas.getContext("2d");

  allAsteroids.forEach(function(asteroid){
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
