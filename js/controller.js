"use strict";

var ASTEROIDS = ASTEROIDS || {};
var controller = ASTEROIDS.controller = {};

controller.init = function() {
  var model = ASTEROIDS.model;
  var view = ASTEROIDS.view;

  model.init();
  view.init();
  view.createAsteroid(model.asteroids[0]);
  view.createAsteroid(model.asteroids[1]);
  view.createAsteroid(model.asteroids[2]);

  view.two.bind('update', function(frameCount) {
    model.tic();
    for (var i = 0; i < view.asteroids.length; i++) {
      view.moveAsteroid(view.asteroids[i]);
    }
  });

  view.two.play();
};

controller.init();
