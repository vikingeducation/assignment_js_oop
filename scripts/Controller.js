'use strict;'

function Controller(){
  var view = new View();
  var asteroid1 = new AsteroidModel(5, 5);
  var asteroid2 = new AsteroidModel(25, 25);
  view.drawAsteroid(asteroid1.xLocation, asteroid1.yLocation);
  view.drawAsteroid(asteroid2.xLocation, asteroid2.yLocation);
};

$(document).ready(function(){
  var game = new Controller();
});