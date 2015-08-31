var asteroidsModel = {

  asteroids: [],

  init: function () {
    this.spawnAsteroids();
    // this.generateAsteroid();
  },

  generateAsteroid: function () {

    vel1 = this.sample(10)
    var v1 = Math.floor(Math.random() * vel1 + (vel1 / 10))
    vel2 = this.sample(10)
    var v2 = Math.floor(Math.random() * vel2 + (vel2 / 10))

    var c1 = Math.floor(Math.random() * view.canvasWidth)
    var c2 = Math.floor(Math.random() * view.canvasHeight)
    var r = Math.floor(Math.random() * 50 + 50)
    this.asteroids.push(new Asteroid([v1, v2], [c1, c2], r))
  },

  sample: function(n){
    vals = [n, -n]
    return vals[Math.floor(Math.random() * 2)]
  },

  spawnAsteroids: function(){
    for (var i = 0; i < Math.floor(Math.random() * 10); i++){
      this.generateAsteroid();
    }
  },

  updateAsteroids: function(){
    this.checkCollision();
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].coordinates[0] += this.asteroids[i].velocity[0];
      this.asteroids[i].coordinates[1] += this.asteroids[i].velocity[1];
    }
  },

  checkCollision: function() {
    var asteroids = this.asteroids
    var collisions = [];
    for (var i = 0; i < asteroids.length; i++) {
      for (var j = i + 1; j < asteroids.length; j++) {
        var radiusDiff = Math.pow((asteroids[i].radius - asteroids[j].radius), 2)
        var radiusSum = Math.pow((asteroids[i].radius + asteroids[j].radius), 2)
        var xCoordsDiff = Math.pow((asteroids[i].coordinates[0] - asteroids[j].coordinates[0]), 2)
        var yCoordsDiff = Math.pow((asteroids[i].coordinates[1] - asteroids[j].coordinates[1]), 2)
        // (R0-R1)^2 <= (x0-x1)^2+(y0-y1)^2 <= (R0+R1)^2
        if ( radiusDiff <= (xCoordsDiff + yCoordsDiff) && (xCoordsDiff + yCoordsDiff) <= radiusSum ) {
          // console.log("asteroid " + asteroids[i] + " and asteroid " asteroids[j] + "collided");
          collisions.push(i);
          collisions.push(j);
        }
      };
    };
    console.log(collisions.length + "collisions occurred")
    for (var i = collisions.length - 1; i >= 0 ; i--) {
      var collidedAsteroid = collisions[i].splice(i, i + 1)
    };

  }

}

var view = {

  canvasHeight: 500,
  canvasWidth: 700,
  canvas: null,
  context: null,

  init: function () {
    this.setVars();
    this.render();
  },

  setVars: function() {
    this.canvas = document.getElementById('asteroid-canvas');
    this.context = this.canvas.getContext("2d");
  },

  render: function(){
    setInterval(function(){
      asteroidsModel.updateAsteroids();
      view.draw();
    }, 500);
  },

  draw: function(){
    var canvas = this.canvas;
    var context = this.context
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

}

Asteroid.prototype.tic = function(){

  this.coordinates[0] += this.velocity[0]
  this.coordinates[1] += this.velocity[1]

}

// Two asteroids collide
// For each of them, we divide the radius by 2
// If radius is below 5 we remove it from screen
// Otherwise we generate two more asteroids with the close coordinates but opposite directions


Asteroid.prototype.tic = function(){

  this.coordinates[0] += this.velocity[0]
  this.coordinates[1] += this.velocity[1]

}

