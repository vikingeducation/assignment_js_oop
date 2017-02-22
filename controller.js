"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

//shortcut to access controller subspace
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  ASTEROIDS.MODEL.init();
  ASTEROIDS.VIEW.init();

  controller.render();

  // controller.play();
};

controller.interval = null;

controller.play = function(miliseconds){
  controller.interval = setInterval(function(){
    controller.render();
  }, miliseconds);
}

controller.render = function(){
  ASTEROIDS.VIEW.render(ASTEROIDS.MODEL.allAsteroids);
  // ASTEROIDS.MODEL.render();
};


$(document).ready(function(){
  ASTEROIDS.CONTROLLER.init();
});
