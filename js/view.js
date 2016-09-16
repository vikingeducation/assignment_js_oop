var view = {


  render: function(){
    view.resetCanvas();
    this.drawAsteroids(controller.getAsteroids());
  },

  drawAsteroids: function(asteroids){
    var ctx = $("#canvas")[0].getContext("2d");

    for(var i = 0; i < asteroids.length; i++){
      var asteroid = asteroids[i];
      ctx.beginPath();
      ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  resetCanvas: function(){
    var ctx = $("#canvas")[0].getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


}