'use strict;'

function Controller(){
  this.view = new View();
  this.asteroids = this.initAsteroids(10);
  this.startGameLoop();
};

Controller.prototype.initAsteroids = function(max){
  var asteroids = [];

  for (var i = 1; i <= max; i++) {
    asteroids.push(new AsteroidModel());
  }

  return asteroids;
}

Controller.prototype.startGameLoop = function(){
  this.gameLoop = window.setInterval(this.gameInterval, 100, this.asteroids, this.view);
}

Controller.prototype.gameInterval = function(asteroids, view){
  view.clearCanvas();

  asteroids.forEach(function(element){
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
  },

$(document).ready(function(){
  var game = new Controller();
});