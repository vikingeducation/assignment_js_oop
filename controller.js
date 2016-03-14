var controller = {

  init: function(){
    // set initial values for ship

    view.clearCanvas();
    view.drawShip( ship );
    ship.randomStartInfo();
    controller.generateAsteroids(10);
  },

  setDirection: function(  ) {
    // console.log('im here');
    ship.direction += 1/2 * Math.PI;
    view.clearCanvas();
    view.drawShip( ship );
  },

  direction: "",

  gameLoop: function(){
    // controller.generateAsteroids(1);
    view.clearCanvas();
    view.drawShip( ship );
    controller.updateAsteroidPos();
    ship.updatePosition();
  },

  updateAsteroidPos: function(){
    space.asteroids.forEach(function(ast){

      ast.updatePosition();
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
