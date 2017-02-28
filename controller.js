// check out requestAnimationFrame over setInterval and setTimeout
// PAGE 184 HTML HACKS BOOK

//translate: https://www.w3schools.com/tags/canvas_translate.asp

//negative velocties


"use strict;"

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.CONTROLLER = {};

//shortcut to access CONTROLLER name-subspace
var controller = ASTEROIDS.CONTROLLER;


controller.init = function(){
  // ASTEROIDS.MODEL.init(22);
  // ASTEROIDS.VIEW.init();
  model.init(3);
  view.init();
  //


  controller.play(model.miliseconds);
  // controller.render();
};

controller.interval = null;

controller.play = function(miliseconds){
  controller.interval = setInterval(function(){
    controller.render();
  }, miliseconds);
}

controller.render = function(){
  // ASTEROIDS.VIEW.render(ASTEROIDS.MODEL.allAsteroids);
  // ASTEROIDS.MODEL.updateAsteroids();
  view.render(ASTEROIDS.MODEL.allAsteroids);
  model.updateAsteroids();
  //

};


$(document).ready(function(){
  // ASTEROIDS.CONTROLLER.init();
  controller.init();
});
