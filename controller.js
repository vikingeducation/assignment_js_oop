"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

// shortcut to access CONTROLLER name-subspace
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  model.init(5);
  view.init();
  controller.play();
};

controller.interval = undefined;

controller.play = function(miliseconds){
  if (model.gameOver) {
    controller.stopGame();
  } else {
    view.render(model.allAsteroids, model.ship);
    model.updateGame();
    controller.interval = requestAnimationFrame(controller.play);
  }
};

controller.render = function(){
};

controller.stopGame = function(){
  console.log("stop game ran")
  cancelAnimationFrame(controller.interval);
    controller.interval = undefined;
    return;
};

$(document).ready(function(){
  controller.init();
});
