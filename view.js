var view = {

  init: function(){
    view.listeners.keypressListener();
    view.listeners.keyUpListener();
  },

  listeners: {
    keypressListener: function(){
      $( document ).keydown(function(e) {
        switch(e.which) {
          case 37: // left
          controller.direction = "left";
          break;

          case 38: // up
          controller.direction = "up";
          break;

          case 39: // right
          controller.direction = "right";
          break;

          case 40: // down
          controller.direction = "down";
          break;
        }
      });
    },//end keypressListener

    keyUpListener: function(){
      $( document ).keyup(function(e) {
        switch(e.which) {
          case 37: // left
          controller.direction = "";
          break;

          case 38: // up
          controller.direction = "";
          break;

          case 39: // right
          controller.direction = "";
          break;

          case 40: // down
          controller.direction = "";
          break;
        }
      });
    }

  },

  drawAsteroid: function(asteroid){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    ctx.strokeStyle="#FFFFFF";
    ctx.rect(asteroid.locationX, asteroid.locationY, asteroid.width, asteroid.height);
    ctx.stroke();
  },

  drawShip: function( ship ){

    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {

      var ctx = canvas.getContext("2d");

      // Draw triangle
      ctx.fillStyle="#A2322E";
      ctx.beginPath();
      // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
      ctx.moveTo( ship.rearPoint1().x, ship.rearPoint1().y );
      ctx.lineTo( ship.headPoint().x, ship.headPoint().y );
      ctx.lineTo( ship.rearPoint2().x, ship.rearPoint2().y );
      ctx.closePath();

      ctx.fill();
    }
  },


  clearCanvas: function() {
    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
      var ctx = canvas.getContext("2d");
      canvas.width = canvas.width;
    }

  }

};
