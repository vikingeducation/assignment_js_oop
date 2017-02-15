"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};
var controller = ASTEROIDS.CONTROLLER;

    controller.init = function(){
      ASTEROIDS.MODEL.init();
      ASTEROIDS.VIEW.init();

    };


$(document).ready(function(){
  ASTEROIDS.CONTROLLER.init();
});
