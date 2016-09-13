var APP = APP || {};

APP.Model = {
  init: function() {
    //create 30 asteroids
    this.asteroids = [];
    this.bullets = [];

    for (var i = 0; i < 30; i++) {
      this.asteroids.push(APP.buildAsteroid());
    }

    //create spaceship
    this.spaceship = new APP.Spaceship(100,100, 270, 1);
  },

  moveSpaceShip: function(keyPress) {
    switch(keyPress) {


      //left: 37
      //up: 38
      //right: 39
      //down: 40
      //space: 32
      case 37:
        this.spaceship.turn(keyPress);
        break;
      case 38:
        this.spaceship.move(keyPress);
        break;
      case 39:
        this.spaceship.turn(keyPress);
        break;
      case 40:
        this.spaceship.move(keyPress);
        break;
      case 32:
        // debugger
        this.spaceship.shoot(keyPress);
        break;
      default:
        break;
    }
  }
};
