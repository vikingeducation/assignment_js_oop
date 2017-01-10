"use strict";

var ASTEROIDS = ASTEROIDS || {};
var view = ASTEROIDS.view = {};

view.init = function(modelAsteroids) {
  view.two = new Two({
    width: ASTEROIDS.model.boardEdges.right,
    height: ASTEROIDS.model.boardEdges.bottom
  });
  var twoWrapper = document.getElementById('two-wrapper');
  view.two.appendTo(twoWrapper);
  for (var i = 0; i < modelAsteroids.length; i++) {
    view.createAsteroid(modelAsteroids[i]);
  }
};

view.asteroids = [];

view.createAsteroid = function(modelAsteroid) {
  var viewAsteroid = view.two.makeCircle(modelAsteroid.coords.x, modelAsteroid.coords.y, modelAsteroid.radius);
  viewAsteroid.model = modelAsteroid;
  view.two.update();
  view.asteroids.push(viewAsteroid);
};

view.moveAsteroid = function(viewAsteroid) {
  // var velocity = viewAsteroid.model.vel;
  var modelCoords = viewAsteroid.model.coords;
  viewAsteroid.translation.x = modelCoords.x;
  viewAsteroid.translation.y = modelCoords.y;
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
