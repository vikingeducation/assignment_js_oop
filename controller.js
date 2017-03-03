// check out requestAnimationFrame over setInterval and setTimeout
// PAGE 184 HTML HACKS BOOK

"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

// shortcut to access CONTROLLER name-subspace
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  model.init(5);
  view.init();

  controller.play(model.miliseconds);
  // controller.render();
};

controller.interval = null;

controller.play = function(miliseconds){
  controller.interval = setInterval(function(){
    controller.render();
  }, miliseconds)
};

controller.render = function(){
  if (model.gameOver) {
    controller.stopGame();
  }
  view.render(model.allAsteroids, model.ship);
  model.updateGame();
};

controller.stopGame = function(){
  clearInterval(controller.interval);
};

$(document).ready(function(){
  controller.init();
});
