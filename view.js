var view = {
  max: 800,

  init: function() {
    var INTERVAL = 30; // ~30 fps

    window.onload = function() {
      var canvas = $("#canvas")[0],
        c = canvas.getContext("2d");
      // The Main Game Loop
      setInterval(function() {
        //view.clearCanvas(c);
        view.update();
        view.clearCanvas(c);
        view.drawAsteroids(c);
        view.drawShip(c);
      }, INTERVAL);
    };
  },

  drawAsteroids: function(canvas) {
    //view.clearCanvas(canvas);
    var asteroids = controller.getAsteroids();
    for (var a in asteroids) {

      canvas.beginPath();
      canvas.fillStyle = "brown";
      //canvas.rect(asteroids[a].x, asteroids[a].y, asteroids[a].size, asteroids[a].size);
      canvas.arc(asteroids[a].x, asteroids[a].y, asteroids[a].size,0,2 *Math.PI);
      canvas.fill();
    }
  },

  drawShip: function(canvas) {
    //view.clearCanvas(canvas);
    var ship = controller.getShip();
    ship.draw(canvas);
  },

  clearCanvas: function(canvas) {
    // canvas.beginPath();
    // canvas.rect(0,0,view.max,view.max);
    // canvas.fillStyle = "white";
    // canvas.fill();
    canvas.clearRect(0,0,view.max,view.max);
  },

  update: function() {
    
    controller.generateAsteroids();
    controller.updateAsteroids();
    controller.checkCollisions();

    // Avatar movement
    if (key.isPressed("A")) controller.updateShip("left");
    if (key.isPressed("D")) controller.updateShip("right");
    if (key.isPressed("W")) controller.updateShip("up");
    //if (key.isPressed("S")) controller.updateAvatar(DOWN);
    // Update bullet locations
    //if (controller.getBullets) controller.updateBullets();
    // After updating everything, check and process any collisions
    //controller.checkCollisions();
  }

};
