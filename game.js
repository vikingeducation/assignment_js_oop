var APP = APP || {};

APP.Game = {
  init: function() {
    APP.View.cacheDOM();
    APP.View.handleMovement();
    APP.Game.loadObjects();
    APP.Game.listenForChanges();
  },

  loadObjects: function() {
    APP.Model.init();
  },

  moveSpaceShip: function() {
    var button = APP.View.keypress;
    APP.Model.moveSpaceShip(button, APP.View.gameBox.width, APP.View.gameBox.height);
  },

  listenForChanges: function() {
    setInterval(function() {
      APP.Model.asteroids.forEach(function(e) {
        e.tic(APP.View.gameBox.width, APP.View.gameBox.height);
      });
      APP.Game.moveSpaceShip();
      APP.Game.accelerateBullets();
      APP.View.clearKeyPress();
      APP.View.clearCanvas();
      // APP.View.drawImageRot();

      img = new Image(0.3,0.3);
      img.src = "speedship.png";

      APP.View.drawImageRot(img, APP.Model.spaceship.coordX, APP.Model.spaceship.coordY, 100, 100, APP.Model.spaceship.degrees);
      APP.View.drawSpaceShip(APP.Model.spaceship);
      APP.View.drawAsteroids(APP.Model.asteroids, 3);
      APP.View.drawBullets(APP.Model.bullets);
    },200);
  },

  accelerateBullets: function() {
    APP.Model.bullets.forEach(function(e) {
      e.travel();
    });
  }

};
