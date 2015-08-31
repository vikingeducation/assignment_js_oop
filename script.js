var asteroidsModel = {

  asteroids: [],

  init: function () {
    this.generateAsteroid();
  },

  generateAsteroid: function () {
    v1 = Math.floor(Math.random() * 10)
    v2 = Math.floor(Math.random() * 10)
    c1 = Math.floor(Math.random() * view.canvasWidth)
    c2 = Math.floor(Math.random() * view.canvasHeight)
    this.asteroids.push(new Asteroid([v1, v2], [c1, c2]))
  }

}

var view = {

  canvasHeight: 500,
  canvasWidth: 700,

  init: function () {
    this.placeAsteroids();
  },

  placeAsteroids: function () {
    // var canvasContext = document.getElementById('asteroid-canvas').getContext("2d");
    // document.getElementById('asteroid-canvas').fillRect(50, 25, 150, 100);
  }

}

var controller = {
  init: function() {
    asteroidsModel.init();
    view.init();
  }
}

$(document).ready(function() {
  $canvas = $("#asteroid-canvas");
  controller.init();
})







function Asteroid(velocity, coordinates){

  this.velocity = velocity
  this.coordinates = coordinates
  // this.tic = function(){
  //   this.coordinates[0] += this.velocity[0]
  //   this.coordinates[1] += this.velocity[1]
  // }

}

Asteroid.prototype.tic = function(){

  this.coordinates[0] += this.velocity[0]
  this.coordinates[1] += this.velocity[1]

}

var asteroidSim = function(){
  asteroids = []
  for (var i = 0; i < 10000; i++){
    v1 = Math.floor(Math.random() * 100)
    v2 = Math.floor(Math.random() * 100)
    c1 = Math.floor(Math.random() * 100)
    c2 = Math.floor(Math.random() * 100)
    asteroids.push(new Asteroid([v1, v2], [c1, c2]))
  }

  start = Date.now()

  for (var i = 0; i < asteroids.length; i++){
    for (var j = 0; j < 10000; j++){
      asteroids[i].tic()
    }
  }

  console.log(Date.now() - start)

}

