var view = {

  init: function(){
    view.listeners.keypressListener();
  },

  listeners: {
    keypressListener: function(){
      $( document ).keydown(function(e) {
        switch(e.which) {
          case 37: // left
          controller.direction = "left";
          controller.setDirection();
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
    }//end keypressListener
  },

  drawAsteroid: function(asteroid){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    ctx.strokeStyle="#FFFFFF";
    ctx.rect(asteroid.startX, asteroid.startY, 50, 50);
    ctx.stroke();
  },

  drawShip: function( ship ){

    var canvas = document.getElementById("canvas");
    // console.log('im also here');
    if(canvas.getContext) {

      var rearPoint1 =  {
          x: ship.locationX - ship.height,
          y: ship.locationY + ship.width / 2,
      };

      var rearPoint2 = {
          x: ship.locationX - ship.height,
          y: ship.locationY - ship.width / 2,
        };

      var headPoint = {
          x: ship.locationX,
          y: ship.locationY,
        };


      var ctx = canvas.getContext("2d");


      // Draw triangle
      ctx.fillStyle="#A2322E";
      ctx.beginPath();
      // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
      ctx.moveTo( rearPoint1.x, rearPoint1.y );
      ctx.lineTo( headPoint.x, headPoint.y );
      ctx.lineTo( rearPoint2.x, rearPoint2.y );
      ctx.closePath();
      console.log( ship.direction );
      ctx.rotate( ship.direction );
      ctx.restore();
      ctx.fill();
    }
  },

  clearCanvas: function() {
    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
      // console.log('im also here');
      var ctx = canvas.getContext("2d");
      // console.log(ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.width
    }

  }

};
