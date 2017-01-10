"use strict";

var ASTEROIDS = ASTEROIDS || {};
var view = ASTEROIDS.view = {};

view.init = function() {
  view.two = new Two({
    width: ASTEROIDS.model.boardSize.right,
    height: ASTEROIDS.model.boardSize.bottom
  });
  var twoWrapper = document.getElementById('two-wrapper');
  view.two.appendTo(twoWrapper);
};

view.asteroids = [];

view.createAsteroid = function(modelAsteroid) {
  var viewAsteroid = view.two.makeCircle(modelAsteroid.coords.x, modelAsteroid.coords.y, modelAsteroid.radius);
  viewAsteroid.model = modelAsteroid;
  view.two.update();
  view.asteroids.push(viewAsteroid);
};

view.moveAsteroid = function(viewAsteroid) {
  var velocity = viewAsteroid.model.vel;
  viewAsteroid.translation.x += velocity.x;
  viewAsteroid.translation.y += velocity.y;
};


// var circle = view.two.makeCircle(72, 100, 50);
// var rect = view.two.makeRectangle(213, 100, 100, 100);
//
// // The object returned has many stylable properties:
// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;
//
// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();
//
// // Don't forget to tell two to render everything
// // to the screen
// view.two.update();
