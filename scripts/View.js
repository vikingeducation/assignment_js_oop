'use strict;'

var view = {
  init: function(){
    view.canvas = document.getElementById("game");
    view.context = view.canvas.getContext("2d");

    // set listeners
    $(document).keydown(controller.ship.setDirection);
  },

  drawAsteroid: function(x, y, radius){
    // Circle
    view.context.beginPath();
    // center coords (2), radius
    view.context.arc(x, y, radius, 0, 2*Math.PI);
    view.context.stroke();
  },

  drawShip: function(x, y){
    view.context.beginPath();
    view.context.moveTo(x, y);
    view.context.lineTo(x + 5, y + 20);
    view.context.lineTo(x - 5, y + 20);
    view.context.fill();
  },

  clearCanvas: function(){
    view.context.clearRect(0, 0, view.canvas.width, view.canvas.height);
  }
};
