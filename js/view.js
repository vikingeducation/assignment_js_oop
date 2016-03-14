var GAME = GAME || {};


GAME.view = {
  init: function() {
    this.draw();
    this.eventListeners.changeShipDirection();
    this.eventListeners.shootLasers();
    this.eventListeners.accelerateDecelerate();
  },

  canvas: $('canvas').get(0),

  context: $('canvas').get(0).getContext("2d"),

  draw: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawAsteroids();
    this.drawShip();
    this.drawLasers();
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

  drawLasers: function() {
    $.each(GAME.controller.getLasers(), function(i, laser) {
      var vector = new Victor(laser.size, 0);
      var rotated = vector.rotateDeg(laser.velocity.horizontalAngleDeg())

      GAME.view.context.fillStyle = "#000";
      GAME.view.context.beginPath();
      GAME.view.context.moveTo(laser.xCoord, laser.yCoord);
      GAME.view.context.lineTo(rotated.x + laser.xCoord, rotated.y + laser.yCoord);
      GAME.view.context.closePath(); 
      GAME.view.context.stroke();

    })
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
      $(document).keydown(function(e) {
        e.preventDefault();
        if (e.which === 32) {
          GAME.controller.shootLaser();
          console.log("space bar!")
        }
      })
    },

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






