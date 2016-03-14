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

  drawLittleAsteroid: function(){

  },

  drawMediumAsteroid: function(){

  },

  drawBigAsteroid: function(){

  },

  drawShip: function( ship ){

    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {

      var rearPoint1 =  { 
          x: ship.locationX - ship.width / 2,
          y: ship.locationY - ship.height,
      }

      var rearPoint2 = { 
          x: ship.locationX + ship.width / 2,
          y: ship.locationY - ship.height,
        }

      var headPoint = { 
          x: ship.locationX,
          y: ship.locationY,
        }


      var ctx = canvas.getContext("2d");
      // Draw triangle
      ctx.fillStyle="#A2322E";
      ctx.beginPath();
      // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
      ctx.moveTo( rearPoint1.x, rearPoint1.y );
      ctx.lineTo( headPoint.x, headPoint.y );
      ctx.lineTo( rearPoint2.x, rearPoint2.y );
      ctx.closePath();
      ctx.fill();
    }
  },


};
