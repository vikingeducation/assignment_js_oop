var GAME = GAME || {};






GAME.controller = {

  init: function() {
    GAME.model.init(10); // generate asteroids
    GAME.view.init(); // draw asteroids

    // new GAME.Ship() // build ship
    
    // initialize score

  },


  allAsteroids: GAME.model.asteroids,








}