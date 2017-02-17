"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};
var controller = ASTEROIDS.CONTROLLER;

controller.init = function(){
  ASTEROIDS.MODEL.init();
  ASTEROIDS.VIEW.init();

  // controller.play();
};

controller.interval = null;

controller.play = function(miliseconds){
  controller.interval = setInterval(function(){
    controller.render();
  }, miliseconds);
}

controller.render = function(){
  view.render();
  model.render();
};


$(document).ready(function(){
  ASTEROIDS.CONTROLLER.init();
});
