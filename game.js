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
    APP.Model.moveSpaceShip(button);
  },

  listenForChanges: function() {
    setInterval(function() {
      APP.Game.moveSpaceShip();
      APP.View.clearCanvas();
      // APP.View.drawImageRot();

      img = new Image(0.3,0.3);
      img.src = "speedship.png";
      console.log(img);



      APP.View.drawImageRot(img, APP.Model.spaceship.coordX, APP.Model.spaceship.coordY, 100, 100, APP.Model.spaceship.degrees);



      APP.View.drawSpaceShip(APP.Model.spaceship);
      APP.View.drawAsteroids(APP.Model.asteroids, 3);
    },200);
  },

};
