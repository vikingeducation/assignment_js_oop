var asteroidsModel = {

  asteroids: [],

  init: function () {
    this.spawnAsteroids();
    // this.generateAsteroid();
  },

  generateAsteroid: function () {

    vel = sample(10)
    var v1 = Math.floor(Math.random() * vel + (vel / 10))
    var v2 = Math.floor(Math.random() * vel + (vel / 10))

    var c1 = Math.floor(Math.random() * view.canvasWidth)
    var c2 = Math.floor(Math.random() * view.canvasHeight)
    var r = Math.floor(Math.random() * 100 + 50)
    this.asteroids.push(new Asteroid([v1, v2], [c1, c2], r))
  },

  spawnAsteroids: function(){
    for (var i = 0; i < Math.floor(Math.random() * 10); i++){
      this.generateAsteroid();
    }
  },

  updateAsteroids: function(){
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].coordinates[0] += this.asteroids[i].velocity[0];
      this.asteroids[i].coordinates[1] += this.asteroids[i].velocity[1];
    }
  }

}

var view = {

  canvasHeight: 500,
  canvasWidth: 700,

  init: function () {
    // this.placeAsteroids();
    this.render();
  },

  render: function(){
          setInterval(function(){
            asteroidsModel.updateAsteroids();
            view.draw();
          }, 1000)
      },

  draw: function(){
    var canvas = document.getElementById('asteroid-canvas');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (var i = 0; i < asteroidsModel.asteroids.length; i++){
      context.beginPath();
      context.arc(asteroidsModel.asteroids[i].coordinates[0], asteroidsModel.asteroids[i].coordinates[1],
                       (asteroidsModel.asteroids[i].radius), 0, Math.PI * 2, false);
      context.strokeStyle = "#000";
      context.stroke();
    }

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


function Asteroid(velocity, coordinates, radius){

  this.velocity = velocity
  this.coordinates = coordinates
  this.radius = radius
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
  for (var i = 0; i < 10; i++){
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

var sample = function(n){
  vals = [n, -n]
  return vals[Math.round(Math.random())]
}

