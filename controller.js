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
      
       controller.newPositions();
       view.render(model.ship, model.asteroids);
     }, 50 );
   },

  newPositions: function(ship) {
    var keyCodes = view.keys;
    model.ship.adjustAngle(keyCodes);
    model.checkBulletCollisions();
    model.incrementAsteroids();
    console.log(model.asteroids.length);
  },

  gameOver: function() {
    // ship collides w/ asteroid or all asteroids destroyed
    if ( model.shipCollision()|| model.asteroids.length < 1 ) {
      return true;
    }
  }


};


$( document ).ready( function(){ controller.init(); } );