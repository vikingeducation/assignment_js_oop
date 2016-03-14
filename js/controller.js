var GAME = GAME || {};


GAME.width = 1600;
GAME.height = 800;



GAME.controller = {

  init: function() {
    GAME.model.init(2); // generate asteroids
    GAME.view.init(); // draw asteroids

    setInterval( function() {
      GAME.controller.gameLoop();
    }, 20 );

    // new GAME.Ship() // build ship

    // initialize score

  },

  gameLoop: function() {
    GAME.model.update();
    GAME.view.draw();
  },


  allAsteroids: GAME.model.asteroids,








}
