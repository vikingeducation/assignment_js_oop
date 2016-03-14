var GAME = GAME || {};


GAME.view = {
  init: function() {
  
  },

  context: $('canvas').get(0).getContext("2d"),

  draw: function() {
    $.each(GAME.controller.allAsteroids, function(i, astr) {
      astr.draw()
    })

  }
}






GAME.model.Asteroid.prototype.draw = function() {
  GAME.view.context.beginPath();
  // arc(x, y, radius, angle, Math.PI * 2, false for clockwise/true for counter-clockwise)
  GAME.view.context.arc(this.xCoord, this.yCoord, this.size, 0, Math.PI * 2, false)
  GAME.view.context.stroke();
}