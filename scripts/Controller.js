'use strict;'

function Controller(){
  var view = new View();
  var asteroids = [];

  for (var i = 1; i <= 10; i++) {
    asteroids.push(new AsteroidModel());
  }

  asteroids.forEach(function(element){
    view.drawAsteroid(element.xLocation, element.yLocation);
  })
};

$(document).ready(function(){
  var game = new Controller();
});