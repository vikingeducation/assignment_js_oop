var GAME = GAME || {};


GAME.view = {
  init: function() {
    GAME.view.draw();
    eventListeners.registerKeys;
  },

  context: $('canvas').get(0).getContext("2d"),


  draw: function() {
    $.each(GAME.controller.allAsteroids, function(i, astr) {
      astr.draw()
    })
  },


  eventListeners: {
    registerKeys: function() {
      // up, right, down, left
      // spacebar to shoot
    }
  }

}






GAME.model.Asteroid.prototype.draw = function() {
  GAME.view.context.beginPath();
  // arc(x, y, radius, angle, Math.PI * 2, false for clockwise/true for counter-clockwise)
  GAME.view.context.arc(this.xCoord, this.yCoord, this.size, 0, Math.PI * 2, false)
  GAME.view.context.stroke();
}


GAME.Ship.prototype.draw = function() {
  var context = GAME.view.context;
  context.save();

  context.fillStyle = '#000';
  context.translate(this.xCoord, this.yCoord );

  context.beginPath();
  context.moveTo(50, 0);
  context.lineTo(0, 15);
  context.lineTo(0, -15);
  context.closePath();
  context.fill();

  // context.restore();
}



GAME.laser.prototype.draw = function() {
  GAME.view.context.fillStyle = '#000';
  GAME.view.context.beginPath();
  GAME.view.context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
  GAME.view.context.fill();
}