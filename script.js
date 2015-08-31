var asteroidsModel = {

  asteroids: [],

  init: function () {
    this.spawnAsteroids();
  },

  generateAsteroid: function (x, y, radius) {

    vel1 = this.sample(10)
    var v1 = Math.floor(Math.random() * vel1 + (vel1 / 10))
    vel2 = this.sample(10)
    var v2 = Math.floor(Math.random() * vel2 + (vel2 / 10))

    var c1 = x || Math.floor(Math.random() * view.canvasWidth)
    var c2 = y || Math.floor(Math.random() * view.canvasHeight)
    var r = radius || Math.floor(Math.random() * 50 + 50)
    this.asteroids.push(new Asteroid([v1, v2], [c1, c2], r))
  },

  sample: function(n){
    vals = [n, -n]
    return vals[Math.floor(Math.random() * 2)]
  },

  spawnAsteroids: function(){
    // for (var i = 0; i < Math.floor(Math.random() * 10); i++){
    for (var i = 0; i < 10; i++){
      this.generateAsteroid();
    }
  },

  updateAsteroids: function(){
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].coordinates[0] += this.asteroids[i].velocity[0];
      this.asteroids[i].coordinates[1] += this.asteroids[i].velocity[1];
    }
    this.checkCollision();
  },

  generateAsteroidsOnCollision: function(collisions){

    collisions.sort(sortNumber);
    for (var i = collisions.length - 1; i >= 0 ; i--) {
      var collidedAsteroid = this.asteroids.splice(collisions[i], collisions[i] + 1)[0]
      if (collidedAsteroid.radius / 2 > 3) {
            this.generateAsteroid(collidedAsteroid.coordinates[0] + collidedAsteroid.radius / 2, collidedAsteroid.coordinates[1] + collidedAsteroid.radius,collidedAsteroid.radius / 2);
            this.generateAsteroid(collidedAsteroid.coordinates[0] - collidedAsteroid.radius / 2, collidedAsteroid.coordinates[1] - collidedAsteroid.radius,collidedAsteroid.radius / 2);
          }
    };

  },

  checkCollision: function() {
    var asteroids = this.asteroids
    var collisions = []
    for (var i = 0; i < asteroids.length; i++) {
      for (var j = i + 1; j < asteroids.length; j++) {
        var radiusDiff = Math.pow((asteroids[i].radius - asteroids[j].radius), 2)
        var radiusSum = Math.pow((asteroids[i].radius + asteroids[j].radius), 2)
        var xCoordsDiff = Math.pow((asteroids[i].coordinates[0] - asteroids[j].coordinates[0]), 2)
        var yCoordsDiff = Math.pow((asteroids[i].coordinates[1] - asteroids[j].coordinates[1]), 2)
        // (R0-R1)^2 <= (x0-x1)^2+(y0-y1)^2 <= (R0+R1)^2
        if ( radiusDiff <= (xCoordsDiff + yCoordsDiff) && (xCoordsDiff + yCoordsDiff) <= radiusSum ) {
          collisions.push(i);
          collisions.push(j);
        }
      };
    };
    this.generateAsteroidsOnCollision(collisions)
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
    }, 100);
  },

  // drawSpaceShip: function(){
  // ctx.beginPath();
  // ctx.moveTo(28.4, 16.9);
  // ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
  // ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
  // ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
  // ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
  // ctx.closePath();
  // ctx.fillStyle = "rgb(0, 0, 255)";
  // ctx.fill();
  // ctx.beginPath();
  // ctx.moveTo(22.3, 12.0);
  // ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
  // ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
  // ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
  // ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
  // ctx.closePath();
  // ctx.fillStyle = "rgb(255, 0, 0)";
  // ctx.fill();
  // }

  drawSpaceShip: function(){
    var path=new Path2D();
    path.moveTo(spaceShip.x, spaceShip.y);
    path.lineTo(spaceShip.x - 25,spaceShip.y - 25);
    path.lineTo(spaceShip.x + 25,spaceShip.y - 25);
    this.context.fill(path);
  },

  drawAsteroids: function(){
    for (var i = 0; i < asteroidsModel.asteroids.length; i++){
      this.context.beginPath();
      this.context.arc(asteroidsModel.asteroids[i].coordinates[0], asteroidsModel.asteroids[i].coordinates[1],
                       (asteroidsModel.asteroids[i].radius), 0, Math.PI * 2, false);
      this.context.strokeStyle = "#000";
      this.context.stroke();
    }
  },

  draw: function(){
    var canvas = this.canvas;
    var context = this.context
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.drawSpaceShip();
    this.drawAsteroids();

  }

}

var controller = {
  init: function() {
    asteroidsModel.init();
    view.init();
  }
}

var spaceShip = {

  x: view.canvasWidth / 2,
  y: view.canvasHeight / 2,
  lineLengths: [[0, -25], [-25, 0], [25, 0]]
  vx: 0,
  vy: 0,
  angle: 0


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

function sortNumber(a,b) {
   return a - b;
}

