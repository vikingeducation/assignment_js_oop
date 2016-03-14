var controller = {

  init: function(){
    // set initial values for ship

    view.clearCanvas();
    view.drawShip( ship );
    ship.randomStartInfo();
    controller.generateAsteroids(5);
  },

  setDirection: function(  ) {
    if(controller.direction === "right"){
    ship.direction += 1/8 * Math.PI;
    view.drawShip( ship );
    controller.direction = "";
  }else if (controller.direction === "left"){
    ship.direction -= 1/8 * Math.PI;
    controller.direction = "";
  }
  // console.log(ship.direction);
  },

  direction: "",

  gameLoop: function(){
    // controller.generateAsteroids(1);
    view.clearCanvas();
    view.drawShip( ship );
    controller.setDirection();
    controller.updateAsteroidPos();
    ship.updatePosition();
    asteroid.collision();
  },

  updateAsteroidPos: function(){
    space.asteroids.forEach(function(ast, index, array){
      if (ast.collision === true && ast.width > 20){
        controller.splitAsteroid(ast, index);
      }
      ast.updatePosition();
      view.drawAsteroid(ast);
    });
  },

  splitAsteroid: function(ast, index){
    space.asteroids.push(new asteroid.Constructor(ast.locationX - 50, ast.locationY - 50, ast.velX * -1, ast.velY * -1, ast.width/2, ast.height/2));
    space.asteroids.push(new asteroid.Constructor(ast.locationX + 50, ast.locationY + 50, ast.velX * -1, ast.velY * -1, ast.width/2, ast.height/2));

    space.asteroids.splice(index, 1);

  },

  generateAsteroids: function(num){
    for(var i=0; i <= num; i++){
      space.asteroids.push(asteroid.randAsteroid());
    }
  },

  game: function(){
    setInterval(controller.gameLoop, 100);
  }

};
