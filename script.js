/**
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */

 // $(document).ready(function() {
 //  var canvas = document.getElementById('canvas');
 //  var context = canvas.getContext('2d');
 //  var asteroidImg = document.getElementByClassName('asteroid');
 //  var spaceshipImg = document.getElementById('spaceship');
 //  context.drawImage(asteroidImg, 10, 10);
 //  context.drawImage(spaceshipImg, 100, 100);
 // })

 function SpaceObject(x, y) {
  this.xPos = x;
  this.yPos = y;
  this.xVelocity = 1;
  this.yVelocity = 1;
  this.tic = function () {
    this.xPos += this.xVelocity;
    this.yPos += this.yVelocity;
  };
 }

function Asteroid (x, y, radius) {
  SpaceObject.call(this, x, y);
  this.radius = radius;
}
Asteroid.prototype = new SpaceObject();
// will new Asteroid(4, 4) work??

function Ship (x, y) {
  SpaceObject.call(this, x, y);
}
Ship.prototype = new SpaceObject();

function LaserBeam (x, y) {
  SpaceObject.call(this, x, y);
}
LaserBeam.prototype = new SpaceObject();



var model = {
  init: function() {
    this.createAsteroids();
    this.createShip();
  },

  asteroids: [],
  ship: null,
  velocities: [2, 4, -2, -4],

  createShip: function() {
    this.ship = new Ship(250, 250);
  },

  createAsteroids: function() {
    for(var i = 0; i < 10; i++) {
      var x = Math.floor(Math.random()* 500) ;
      var y = Math.floor(Math.random()* 500) ;
      var radius = Math.floor(Math.random() * 20) + 10;
      var a = new Asteroid(x,y, radius);
      a.xVelocity = this.randomVelocity();
      a.yVelocity = this.randomVelocity();
      this.asteroids.push(a);
    }
  },

  moveAsteroids: function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      this.keepAsteroidInBounds(this.asteroids[i]);
      this.asteroids[i].tic();
    }
  },

  randomVelocity: function() {
    return this.velocities[Math.floor(Math.random() * (this.velocities.length - 1))]
  },

  keepAsteroidInBounds: function(asteroid) {
    var x = asteroid.xPos;
    var y = asteroid.yPos;
    if (x > 500) {
      asteroid.xPos = 0;
    } else if (y > 500) {
      asteroid.yPos = 0;
    } else if (x < 0) {
      asteroid.xPos = 500;
    } else if (y < 0) {
      asteroid.yPos = 500;
    }
  }
}


var view = {
  init: function() {

  },

  canvas: document.getElementById("canvas"),
  ctx: canvas.getContext("2d"),

  render: function() {
    view.ctx.clearRect(0, 0, 500, 500);
    var asteroids = controller.getAsteroids();
    for(var i = 0; i < asteroids.length; i++) {
      view.placeAsteroid(asteroids[i]);
    }
    view.placeShip();
  },

  placeAsteroid: function(a) {
    view.ctx.beginPath();
    view.ctx.arc(a.xPos, a.yPos, a.radius, 0, 2 * Math.PI);
    view.ctx.fillStyle = 'grey';
    view.ctx.fill();
    view.ctx.stroke();
    view.ctx.closePath();
  },

  placeShip: function(ship) {
    var ship = controller.getShip();
    var x = ship.xPos;
    var y = ship.yPos;
    // view.ctx.beginPath();
    // view.ctx.moveTo(x, y);
    // view.ctx.lineTo(x + 12, y + 12);
    // view.ctx.lineTo(x + 28, y - 18);
    // view.ctx.fillStyle = 'black';
    // view.ctx.fill();
    view.rotateShip(ship)
  },

  rotateShip: function(ship) {
    var angle = 0;
    angle = (angle + 1) % 360;

    view.ctx.save();
    view.ctx.fillStyle = "#FF0000";

    view.ctx.translate(150,200);
    view.ctx.rotate( angle*Math.PI/180 ); 
    view.ctx.translate(-150,-200);

    view.ctx.beginPath();
    view.ctx.moveTo(100, 100);
    view.ctx.lineTo(200, 100);
    view.ctx.lineTo(200,300);
    view.ctx.lineTo(100,300);
    view.ctx.closePath();
    view.ctx.fill();

    view.ctx.restore();
}, 5);
  }
}


var controller = {
  init: function() {
    model.init();
    // set event listeners
    this.interval = setInterval(this.playGame, 100);
  },

  playGame: function(){
    model.moveAsteroids();
    view.render();
  },

  getAsteroids: function() {
    return model.asteroids;
  },

  getShip: function() {
    return model.ship;
  }

}

controller.init();