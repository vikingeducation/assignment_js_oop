'use_strict;'

var controller = {
  init: function(){
    model.init();
  }
};

var model = {
  init: function(){
  	model.asteroids = [];
    model.addAsteroidToGame( model.asteroids, model.asteroidConstructor )
  },

  addAsteroidToGame: function( asteroidsArray, asteroidConstructor ){
    var asteroid = new asteroidConstructor( 1, 1, 2, 2 );
    asteroidsArray.push( asteroid );
  },

  asteroidConstructor: function ( x, y, xVelocity, yVelocity ){
  	this.x = x;
  	this.y = y;
  	this.xVelocity = xVelocity;
  	this.yVelocity = yVelocity;
  }
};

var view = {
  init: function(){

  }
};

$(document).ready(function(){
  controller.init();
});