var view = {
  max: 800,

  init: function() {
    var INTERVAL = 30; // ~30 fps

    window.onload = function() {
      var canvas = $("#canvas")[0],
        c = canvas.getContext("2d");
      // The Main Game Loop
      setInterval(function() {
        view.clearCanvas(c);
        view.update();
        view.drawAsteroids(c);
      }, INTERVAL);
    };
  },

  drawAsteroids: function(canvas) {
    var asteroids = controller.getAsteroids();
    for (var a in asteroids) {
      canvas.beginPath();
      canvas.fillStyle = "brown";
      canvas.arc(asteroids[a].x, asteroids[a].y, asteroids[a].size,0,2 *Math.PI);
      canvas.fill();
    }
  },

  clearCanvas: function(canvas) {
    canvas.beginPath();
    canvas.rect(0,0,view.max,view.max);
    canvas.fillStyle = "white";
    canvas.fill();
  },

  update: function() {
    //var LEFT = 97, UP = 119, RIGHT = 100, DOWN = 115; // WASD keys
    controller.generateAsteroids();
    controller.updateAsteroids();
    controller.checkCollisions();

    // Avatar movement
    // if (key.isPressed("A")) controller.updateAvatar(LEFT);
    // if (key.isPressed("D")) controller.updateAvatar(RIGHT);
    // if (key.isPressed("W")) controller.updateAvatar(UP);
    // if (key.isPressed("S")) controller.updateAvatar(DOWN);
    // Update bullet locations
    //if (controller.getBullets) controller.updateBullets();
    // After updating everything, check and process any collisions
    //controller.checkCollisions();
  }
};
