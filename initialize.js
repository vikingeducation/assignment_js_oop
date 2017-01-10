"use strict";

var APP = APP || {};

$(function(){
  // APP.game.benchmark();
  APP.canvas = document.getElementById('canvas');
  APP.ctx = APP.canvas.getContext('2d');
  APP.game.play();
});
