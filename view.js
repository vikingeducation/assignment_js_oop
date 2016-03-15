var view = {
  max: 800,

  init: function() {
    var INTERVAL = 30; // ~30 fps

    view.fireListener();

    window.onload = function() {
      var canvas = $("#canvas")[0],
        c = canvas.getContext("2d");
      // The Main Game Loop
      setInterval(function() {
        view.update();
        view.clearCanvas(c);
        view.drawAsteroids(c);
        view.drawShip(c);
        view.drawBullets(c);
        view.displayStats();
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

  drawShip: function(canvas) {
    var ship = controller.getShip();
    ship.draw(canvas);
  },

  drawBullets: function(canvas) {
    var bullets = controller.getBullets();
    for (var a in bullets) {

      canvas.beginPath();
      canvas.fillStyle = "red";
      canvas.arc(bullets[a].x, bullets[a].y, bullets[a].size,0,2 *Math.PI);
      canvas.fill();
    }
  },

  clearCanvas: function(canvas) {
    canvas.clearRect(0,0,view.max,view.max);
  },

  update: function() {
    // controller incremental functions
    controller.generateAsteroids();
    controller.updateAsteroids();
    controller.checkCollisions();
    controller.updateBullets();

    // Avatar movement
    if (key.isPressed("A")) controller.updateShip("left");
    if (key.isPressed("D")) controller.updateShip("right");
    if (key.isPressed("W")) controller.updateShip("up");
  },

  fireListener: function() {
    // Avatar launching fireball on hitting spacebar
    $(document).on("keydown", function(e) {
      if (e.keyCode == 32) controller.generateBullet();
    });
  },

  displayStats: function() {
    var score = model.score;
    var hp = model.ship.hp;

    $(".game-stats").text("Score: " + score + " HP: " + hp);
  }

};
