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
<<<<<<< HEAD
    ship.direction += 1/12 * Math.PI;
    view.drawShip( ship );
  }else if (controller.direction === "left"){
    ship.direction -= 1/12 * Math.PI;
  }
  // console.log(ship.direction);
=======
      ship.direction += 1/8 * Math.PI;
      view.drawShip( ship );
      controller.direction = "";
    }else if (controller.direction === "left"){
      ship.direction -= 1/8 * Math.PI;
      controller.direction = "";
    }
  },

  controlShipFire: function() {
    if(controller.fire === true){
      ship.fire();
      controller.fire = false;
    }
>>>>>>> dd2bab43a75d0407ad6aacd5b5c4e469db496837
  },

  setThrust: function(){
    if(controller.direction === "up"){
      ship.velX += 1 * Math.cos(ship.direction);
      ship.velY += 1 * Math.sin(ship.direction);
    }else if (controller.direction === "down"){
      ship.velX -= 1 * Math.cos(ship.direction);
      ship.velY -= 1 * Math.sin(ship.direction);
    }
  },

  direction: "",
  fire: false,

  gameLoop: function(){
    // controller.generateAsteroids(1);
    view.clearCanvas();
    view.drawShip( ship );
    controller.setDirection();
<<<<<<< HEAD
    controller.setThrust();
=======
    controller.controlShipFire();
>>>>>>> dd2bab43a75d0407ad6aacd5b5c4e469db496837
    controller.updateAsteroidPos();
    ship.updatePosition();
    asteroid.collision();
  },

  updateAsteroidPos: function(){
    space.asteroids.forEach(function(ast, index, array){
      if (ast.collision === true && ast.width > space.minAsteroidSize){
        controller.splitAsteroid(ast, index);
      }
      ast.updatePosition();
      view.drawAsteroid(ast);
    });
  },

  splitAsteroid: function(ast, index){
    space.asteroids.push(new asteroid.Constructor(ast.locationX - 25, ast.locationY - 25, ast.velX * -1, ast.velY * -1, ast.width/2, ast.height/2));
    space.asteroids.push(new asteroid.Constructor(ast.locationX + 25, ast.locationY + 25, ast.velX * -1, ast.velY * -1, ast.width/2, ast.height/2));

    space.asteroids.splice(index, 1);

  },

  generateAsteroids: function(num){
    for(var i=0; i <= num; i++){
      space.asteroids.push(asteroid.randAsteroid());
    }
  },

  game: function(){
    setInterval(controller.gameLoop, 20);
  }

};
