// check out requestAnimationFrame over setInterval and setTimeout
// PAGE 184 HTML HACKS BOOK


"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

//shortcut to access CONTROLLER name-subspace
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  ASTEROIDS.MODEL.init(22);
  ASTEROIDS.VIEW.init();

  controller.render();

  // controller.play(200);
};

controller.interval = null;

controller.play = function(miliseconds){
  controller.interval = setInterval(function(){
    controller.render();
  }, miliseconds);
}

controller.render = function(){
  ASTEROIDS.VIEW.render(ASTEROIDS.MODEL.allAsteroids);
  ASTEROIDS.MODEL.updateAsteroids();
};


$(document).ready(function(){
  ASTEROIDS.CONTROLLER.init();
});
