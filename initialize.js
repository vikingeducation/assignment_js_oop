"use strict";

var APP = APP || {};

$(function(){
  $('.canvas').each(function(index, canvas){
    $(canvas).width(APP.CONFIG.canvas.width);
    $(canvas).height(APP.CONFIG.canvas.height);
    canvas.width = APP.CONFIG.canvas.width;
    canvas.height = APP.CONFIG.canvas.height;
  });
  APP.asteroidCanvas = document.getElementById('asteroid-canvas');
  APP.shipCanvas = document.getElementById('ship-canvas');
  APP.game.play();
});
