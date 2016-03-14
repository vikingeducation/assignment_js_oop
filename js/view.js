var GAME = GAME || {};


GAME.view = {
  init: function() {
    this.draw();
    this.eventListeners.changeShipDirection();
  },

  canvas: $('canvas').get(0),

  context: $('canvas').get(0).getContext("2d"),

  draw: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawAsteroids();
    this.drawShip();
  },

  drawAsteroids: function() {
    $.each(GAME.controller.allAsteroids, function(i, astr) {
      GAME.view.context.beginPath();
      // arc(x, y, radius, angle, Math.PI * 2, false for clockwise/true for counter-clockwise)
      GAME.view.context.arc(astr.xCoord, astr.yCoord, astr.size, 0, Math.PI * 2, false)
      GAME.view.context.stroke();
    });
  },

  drawShip: function() {
    var ship = GAME.controller.ship;
    // var newXCoords = ship.xCoord + ship.direction["x"];
    // var newYCoords = ship.yCoord - ship.direction["y"];
    var victor = ship.direction.clone();
    

    this.context.fillStyle = '#000';
    this.context.beginPath();
    this.context.moveTo(ship.xCoord + victor.x, ship.yCoord + victor.y);

    var rotated = victor.rotateDeg(90)
    this.context.lineTo(ship.xCoord + rotated.x, ship.yCoord + rotated.y);

    var taters = rotated.rotateDeg(180)
    this.context.lineTo(ship.xCoord + taters.x, ship.yCoord + taters.y)


    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  },

  drawLaser: function() {

  },

  eventListeners: {
    changeShipDirection: function() {
      $( document ).keydown(function(e) {
        e.preventDefault();
        switch(e.which) {
          case 37:
          GAME.controller.turnShip(-10);
          break;

          case 39:
          GAME.controller.turnShip(10);
          break;
        }
      })


    },


    shootLasers: function() {
    },
    // spacebar to shoot

    accelerateDecelerate: function() {
      $( document ).keydown(function(e) {
        e.preventDefault();
        switch(e.which) {
          case 38:
          // controller.direction = "up";
          console.log("Up!")
          break;

          case 40:
          // controller.direction = "down";
          console.log("Down!")
          break;
        }
      })
    },
  }
}





GAME.laser.prototype.draw = function() {
  GAME.view.context.fillStyle = '#000';
  GAME.view.context.beginPath();
  GAME.view.context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
  GAME.view.context.fill();
}
