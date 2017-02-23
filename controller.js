var MYAPP = MYAPP || {};

MYAPP.Controller = {
  // asteroid field
  init: function() {
    MYAPP.View.init();
    var asteroids = MYAPP.Model.buildAsteroids(50);
    this.loop = setInterval( function(){ MYAPP.Controller.unleashAsteroids(asteroids); }, 50 );
    //this.unleashAsteroids();
  },

  unleashAsteroids: function(asteroids) {
    MYAPP.View.displayAsteroids(asteroids);
  }
};

$( document ).ready( function(){ MYAPP.Controller.init(); } );