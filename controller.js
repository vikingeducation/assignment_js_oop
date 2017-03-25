"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

// shortcut to access CONTROLLER name-subspace
var Controller = ASTEROIDS.CONTROLLER;

Controller.init = function(){
  Model.init(5);
  View.init();
  Controller.play();
};

Controller.interval = undefined;

Controller.play = function(){
  if (Model.gameOver) {
    Controller.stopGame();
  } else {
    View.render(Model.allAsteroids, Model.ship);
    Model.updateGame();
    Controller.interval = requestAnimationFrame(Controller.play);
  }
};

Controller.stopGame = function(){
  cancelAnimationFrame(Controller.interval);
    Controller.interval = undefined;
};

$(document).ready(function(){
  Controller.init();
});
