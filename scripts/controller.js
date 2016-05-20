'use strict;'

var controller = {
  init: function(){
    controller.ship = new ShipModel();
    controller.asteroids = controller.initAsteroids(10);
    controller.photons = [];
    view.init();
    controller.startGameLoop();
  },

  initAsteroids: function(max){
    var asteroids = [];

    for (var i = 1; i <= max; i++) {
      asteroids.push(new AsteroidModel());
    }

    return asteroids;
  },

  startGameLoop: function(){
    controller.gameLoop = window.setInterval(controller.gameInterval, 100);
  },

  gameInterval: function(){
    view.clearCanvas();

    controller.ship.tic();
    view.drawShip(controller.ship);

    // TODO: delete photons once off-screen
    controller.photons.forEach(function(element){
      element.tic();
      view.drawCircle(element.x, element.y, 1)
    });

    // Detect asteroid collisions with photons
    var exploded = [];
    controller.asteroids.forEach(function(element, index){
      element.tic();
      if (element.detectCollision() === true){
        console.log('I collided');
        exploded.push(index);
      } else {
        view.drawCircle(element.x, element.y, element.radius);
      }
    });

    // Remove exploded asteroids and replace with smaller ones
    exploded.forEach(function(asteroidIndex){
      // Temporary variable for hit asteroid
      var original = controller.asteroids[asteroidIndex];

      // Remove original asteroid from game set
      controller.asteroids.splice(asteroidIndex, 1);

      original.makeChildren();
    });
    // model.moveSnake();
    // view.render();

    // // Clear interval if game over
    // if (model.checkGameOver() === true) {
    //   window.clearInterval(controller.gameLoop);
    //   view.renderGameOver();
    // }

    // // Check if ate food
    // if (model.snake[0].x === model.food.x && model.snake[0].y === model.food.y) {
    //   model.increaseScore();
    //   model.addSegment();
    //   view.removeFood();
    //   model.addFood();
    //   view.renderFood();
    // }
  }

};

$(document).ready(function(){
  controller.init();
});