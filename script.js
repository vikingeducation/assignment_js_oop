var asteroidsModel = {

  asteroids: [],

  init: function () {
    this.spawnAsteroids();
  },

  generateAsteroid: function (x, y, radius) {

    vel1 = this.sample(2)
    var v1 = Math.floor(Math.random() * vel1 + Math.ceil(vel1 / 10))
    vel2 = this.sample(2)
    var v2 = Math.floor(Math.random() * vel2 + Math.ceil(vel2 / 10))

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
      this.asteroids[i].tic();
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
    this.setListeners();
    this.render();
  },

  setListeners: function() {
    $(document).on("keydown", this.moveSpaceship);
  },

  setVars: function() {
    this.canvas = document.getElementById('asteroid-canvas');
    this.context = this.canvas.getContext("2d");
  },

  render: function(){
    setInterval(function(){
      asteroidsModel.updateAsteroids();
      player.tic();
      view.draw();
    }, 33);
  },

  moveSpaceship: function(event) {
    switch (event.charCode || event.keyCode){ //
        // turning
        case 37: player.angle -= (Math.PI/3)/4;  break;
        case 39: player.angle += (Math.PI/3)/4;  break;
        // accelerator
        case 38:
          player.accelerate();
          break;
        // brake
        case 40:
          player.decelerate();
          break;
      }
    },

  drawUFO: function(){
  ctx.beginPath();
  ctx.moveTo(28.4, 16.9);
  ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
  ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
  ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
  ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
  ctx.closePath();
  ctx.fillStyle = "rgb(0, 0, 255)";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(22.3, 12.0);
  ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
  ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
  ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
  ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
  ctx.closePath();
  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.fill();
  },

  drawSpaceShip: function(){
    this.context.save();
    this.context.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.restore();
    this.context.save();
    this.context.translate(player.x, player.y);
    this.context.rotate(player.angle);
    this.context.fillStyle = "rgba(150, 255, 0, 0.3)";
    this.context.strokeStyle = "#96FF00";
    this.context.beginPath();
    this.context.moveTo(player.lineLengths[0][0], player.lineLengths[0][1]);
    this.context.lineTo(player.lineLengths[1][0], player.lineLengths[1][1]);
    this.context.lineTo(player.lineLengths[2][0], player.lineLengths[2][1]);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
    this.context.restore();
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
    canvas.height = canvas.height;
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

function SpaceShip() {

  this.x = view.canvasWidth / 2;
  this.y = view.canvasHeight / 2;
  this.lineLengths = [[0, -25], [-10, 0], [10, 0]];
  this.velx = 0;
  this.vely = 0;
  this.angle = 0;

}

SpaceShip.prototype.tic = function() {
  this.x += this.velx;
  this.y += this.vely;
  if (this.x < 0) {
    this.x += view.canvasWidth;
  } else if (this.x > view.canvasWidth) {
    this.x -= view.canvasWidth
  };

  if (this.y < 0) {
    this.y += view.canvasHeight;
  } else if (this.y > view.canvasHeight) {
    this.y -= view.canvasHeight
  };
}

SpaceShip.prototype.accelerate = function() {
  player.velx += Math.sin(player.angle);
  player.vely += Math.cos(player.angle) * -1;

  if (player.velx > 5 ) player.velx = 5;
  if (player.velx < -5 ) player.velx = -5;
  if (player.vely > 5) player.vely = 5;
  if (player.vely < -5 ) player.vely = -5;
  console.log("speed x: " + player.velx)
  console.log("speed y: " + player.vely)
}

SpaceShip.prototype.decelerate = function() {
  player.velx -= Math.sin(player.angle);
  player.vely -= Math.cos(player.angle) * -1;

  if (player.velx > 1 ) player.velx = 1;
  if (player.velx < -1) player.velx = -1;
  if (player.vely > 1) player.vely = 1;
  if (player.vely < -1) player.vely = -1;
  console.log("decelerating x: " + player.velx)
  console.log("decelerating y: " + player.vely)
}

var player = new SpaceShip();



function sortNumber(a,b) {
   return a - b;
}

