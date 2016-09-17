var view = {

  init: function(){
    view.render()

    $(document).keyup(function(event){
      controller.handleLaser(event);
    })
    $(document).keydown(function(event){
      controller.handleMovement(event);
    })
    setInterval(controller.play, 100);
  },

  render: function(){
    view.resetCanvas();
    view.drawShip();
    view.drawAsteroids(controller.getAsteroids());
    view.drawLaserShots();
    view.displayScore();
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
  }, 

  drawShip: function(){
    var ctx = $("#canvas")[0].getContext("2d");
    var ship = controller.getShip();

    ctx.rect(ship.x, ship.y, ship.width, ship.height);
    ctx.stroke();
  },

  drawLaserShots: function(){
    var shots = controller.getShotsFired();
    var ctx = $("#canvas")[0].getContext("2d");
    //loop through shots and draw line
    shots.forEach(function(shot){
      ctx.beginPath();
      ctx.moveTo(shot.x, shot.y);
      ctx.lineTo(shot.x, shot.y + 4);
      ctx.stroke();

    })
  },

  displayScore: function(){
    var score = gameController.score();

    $("#score").text("Score: " + score);
  },

  displayEndGame: function(){
    $("#end-game").text("Game Over, your ship was decimated captain");
  }


}