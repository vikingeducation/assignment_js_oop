var controller = {

  init: function(){
    // set initial values for ship
    ship.locationX = 115;
    ship.locationY = 160;
    ship.direction = 0.0 * Math.PI;
    view.clearCanvas();
    view.drawShip( ship );
    controller.generateAsteroids(10);
  },

  setDirection: function(  ) {
    console.log('im here');
    ship.direction += 1/2 * Math.PI;
    view.clearCanvas();
    view.drawShip( ship );
  },

  direction: "",

  gameLoop: function(){

    controller.updateAsteroidPos();

  },

  updateAsteroidPos: function(){
    space.asteroids.forEach(function(ast){
      asteroid.startX += asteroid.velX;
      asteroid.startY += asteroid.velY;
      view.drawAsteroid(ast);
    });
  },

  generateAsteroids: function(num){
    for(var i=0; i <= num; i++){
      space.asteroids.push(asteroid.randAsteroid());
    }
  },

  game: function(){
    setInterval(controller.gameLoop, 500);
  }

};
