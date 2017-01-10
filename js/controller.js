"use strict";

var ASTEROIDS = ASTEROIDS || {};
var controller = ASTEROIDS.controller = {};

controller.init = function() {
  var model = ASTEROIDS.model;
  var view = ASTEROIDS.view;

  model.init(5);
  view.init(model.asteroids, model.ship, controller.handlers);

  view.two.bind('update', function(frameCount) {
    model.tic();
    for (var i = 0; i < view.asteroids.length; i++) {
      view.moveAsteroid(view.asteroids[i]);
    }
    view.rotateShip(model.ship.heading);
    view.moveShip(model.ship);
  });

  view.two.play();
};

controller.handlers = {
  rotateShip: function(direction) {
    model.ship.rotate(direction);
  },

  accelerateShip: function() {
    model.ship.accelerate();
  }
};

controller.init();
