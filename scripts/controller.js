'use strict;'

var controller = {
  init: function(){
    controller.ship = new ShipModel();
    controller.asteroids = controller.initAsteroids(10);
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

    controller.asteroids.forEach(function(element){
      element.tic();
      view.drawAsteroid(element.xLocation, element.yLocation, element.radius);
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