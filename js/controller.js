var GAME = GAME || {};


GAME.width = 1600;
GAME.height = 800;



GAME.controller = {

  init: function() {
    GAME.model.init(); // generate asteroids

    this.allAsteroids = GAME.asteroidModel.asteroids;
    this.ship = GAME.shipModel.ship;

    GAME.view.init(); // draw asteroids

    setInterval( function() {
      GAME.controller.gameLoop();
    }, 1000 / 60 );

    // initialize score

  },

  gameLoop: function() {
    GAME.asteroidModel.update(this.getLasers());
    GAME.laserModel.update();
    GAME.view.draw();
  },


  turnShip: function(amount) {
    this.ship.direction.rotateDeg(amount);
    console.log(this.ship.direction)
  },


  shootLaser: function() {
    GAME.laserModel.shootLaser(this.ship);
  },


  getLasers: function() {
    return GAME.laserModel.laserBeams;
  },



}
