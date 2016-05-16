'use strict;'

var view = {
  init: function(){
    view.canvas = document.getElementById("game");
    view.context = view.canvas.getContext("2d");

    // set listeners
    $(document).keydown({ship: controller.ship}, controller.ship.controlShip);
  },

  drawAsteroid: function(x, y, radius){
    // Circle
    view.context.beginPath();
    // center coords (2), radius
    view.context.arc(x, y, radius, 0, 2*Math.PI);
    view.context.stroke();
  },

  drawShip: function(ship){
    view.context.beginPath();
    view.context.moveTo(ship.noseX, ship.noseY);
    view.context.lineTo(ship.starboardX, ship.starboardY);
    view.context.lineTo(ship.portX, ship.portY);
    view.context.fill();
  },

  clearCanvas: function(){
    view.context.clearRect(0, 0, view.canvas.width, view.canvas.height);
  }
};
