// check out requestAnimationFrame over setInterval and setTimeout
// PAGE 184 HTML HACKS BOOK

//translate: https://www.w3schools.com/tags/canvas_translate.asp

"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

//shortcut to access CONTROLLER name-subspace
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  model.init(3);
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
  view.render(model.allAsteroids, model.ship);
  model.updateAsteroids();
  model.updateShip();
};


$(document).ready(function(){
  controller.init();
});
