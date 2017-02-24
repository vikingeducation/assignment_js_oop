var MYAPP = MYAPP || {};

MYAPP.controller = {
  // asteroid field
  init: function() {

    // prepare ctx object + callbacks
    MYAPP.view.init({ // operateSpaceship: this.operateSpaceship 
    });

    MYAPP.controller.asteroids = MYAPP.model.buildAsteroids(5);
    MYAPP.controller.ship = new MYAPP.Ship();

    this.loop = setInterval( function(){ 
      MYAPP.controller.positionShip();
      MYAPP.view.displayAsteroids(asteroids);
      MYAPP.view.displayShip(MYAPP.controller.ship);
      MYAPP.view.displayBullets(MYAPP.controller.ship)
      MYAPP.controller.collisionTests();



      }, 20 );
  },

  positionShip: function(event) {
    var keyCodes = MYAPP.view.keys;
    MYAPP.controller.ship.adjustAngle(keyCodes);
  },

  collisionTests: function() {
    var ship = MYAPP.controller.ship;
    var asteroids = MYAPP.controller.asteroids;
    MYAPP.model.shipCollision(ship, asteroids);
    explosions = MYAPP.model.bulletCollision(ship, asteroids);
  }
};



// clearInterval( MYAPP.controller.loop );


$( document ).ready( function(){ MYAPP.controller.init(); } );