var APP = APP || {};

APP.Model = {
  init: function() {
    this.asteroids = [];

    for (var i = 0; i < 30; i++) {
      this.asteroids.push(APP.buildAsteroid());
    }
  }, 

  moveSpaceShip: function(keyPress) {
    switch(keyPress) {

    
      //left: 37
      //up: 38
      //right: 39
      //down: 40
      //space: 32
      case 37:
        
        break;
      case 38:
        break;
      case 39:
        break;
      case 40:
        break;
      default:
        break;
    }
  }
};
