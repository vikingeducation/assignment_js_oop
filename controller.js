var controller = {
  // asteroid field
  init: function() {

    // create asteroids + ship
    model.init();
    // set up canvas + listeners
    view.init();

    this.loop = setInterval( function(){ 
      if ( controller.gameOver() ) {   
        clearInterval( controller.loop );
       }
       controller.updateModel();
       view.render(model.ship, model.asteroids);
     }, 50 );
   },

  updateModel: function(ship) {
    var keyCodes = view.keys;
    model.ship.adjustAngle(keyCodes);
    model.checkBulletCollisions();
    model.incrementAsteroids();
  },

  gameOver: function() {
    // ship collides w/ asteroid or all asteroids destroyed
    if ( model.shipCollision()|| model.asteroids.length < 1 ) {
      return true;
    }
  }


};


$( document ).ready( function(){ controller.init(); } );