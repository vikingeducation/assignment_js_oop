"use strict";

var ASTEROIDS = ASTEROIDS || {};
var controller = ASTEROIDS.controller = {};

controller.init = function() {
  var model = ASTEROIDS.model;
  var view = ASTEROIDS.view;

  model.init(10);
  view.init(model.asteroids);

  view.two.bind('update', function(frameCount) {
    model.tic();
    for (var i = 0; i < view.asteroids.length; i++) {
      view.moveAsteroid(view.asteroids[i]);
    }
  });

  view.two.play();
};

controller.init();
