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
  this.SPEED = 0.012;
  this.rotation = 0;
  this.xVelocity = 0;
  this.yVelocity = 0;

  this.throttle = function(direction) {
    var radians = utils.toRadians(this.rotation);
    this.xVelocity += direction * (Math.cos(radians) * this.SPEED);
    this.yVelocity += direction * (Math.sin(radians) * this.SPEED);  
    if (this.xVelocity > 5) {
      this.xVelocity = 5;
    }
    if (this.yVelocity > 5) {
      this.yVelocity = 5;
    }
  };
};

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
  velocities: [0.4, 0.6, -0.4, -0.6],

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
      this.keepObjectInBounds(this.asteroids[i]);
      this.asteroids[i].tic();
    }
  },

  moveShip: function () {
    this.keepObjectInBounds(this.ship);

    // left
    if (controller.keyState[37] || controller.keyState[65]){
      this.ship.rotation -= 1;
    }    
    // right
    if (controller.keyState[39] || controller.keyState[68]){
      this.ship.rotation += 1;
    }
    // up
    if (controller.keyState[38]){
      model.ship.throttle(1.01);
    }    
    // down
    if (controller.keyState[40]){
      model.ship.throttle(-0.9);
    }

    this.ship.tic();
  },

  randomVelocity: function() {
    return this.velocities[Math.floor(Math.random() * (this.velocities.length - 1))]
  },

  keepObjectInBounds: function(object) {
    var x = object.xPos;
    var y = object.yPos;
    if (x > 500) {
      object.xPos = 0;
    } else if (y > 500) {
      object.yPos = 0;
    } else if (x < 0) {
      object.xPos = 500;
    } else if (y < 0) {
      object.yPos = 500;
    }
  },


  checkShipCollision: function(asteroid) {
    var diffX = asteroid.xPos - this.ship.xPos;
    var diffY = asteroid.yPos - this.ship.yPos;
    var rad = asteroid.radius
    return (diffX*diffX + diffY*diffY <= rad*rad)
  },

  handleShipCollisions: function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i];
      if (this.checkShipCollision(asteroid)) {
        alert("You died");
        this.recenterShip();
        return
      } 
    }
  },

  recenterShip: function() {
    this.ship.xPos = 250;
    this.ship.yPos = 250;
    this.ship.xVelocity = 0;
    this.ship.yVelocity = 0;
  }
}


var view = {
  init: function() {

  },

  canvas: document.getElementById("canvas"),
  ctx: canvas.getContext("2d"),

  render: function() {
    view.ctx.clearRect(0, 0, 500, 500);
    view.placeShip();
    var asteroids = controller.getAsteroids();
    for(var i = 0; i < asteroids.length; i++) {
      view.placeAsteroid(asteroids[i]);
    }
    
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
    var x = ship.xPos
    var y = ship.yPos

    view.ctx.save();
    view.ctx.translate( ship.xPos, ship.yPos );
    view.ctx.rotate(utils.toRadians(model.ship.rotation));
    view.ctx.translate( -ship.xPos, -ship.yPos );
    view.ctx.beginPath();
    view.ctx.moveTo(x+12, y);
    view.ctx.lineTo(x-6, y-6);
    view.ctx.lineTo(x-6, y+6);
    view.ctx.fillStyle = 'black';
    view.ctx.fill();

    view.ctx.restore();
  },

}


var controller = {
  init: function() {
    this.keyState = {};
    model.init();
    view.init();
    this.interval = setInterval(this.playGame, 6);
    this.setEventListeners();
  },

  playGame: function(){
    model.moveAsteroids();
    model.moveShip();
    model.handleShipCollisions();
    view.render();
  },

  setEventListeners: function() {
    $(document).on('keydown', function (e) {
      controller.keyState[e.which] = true;
    });    
    $(document).on('keyup', function (e) {
      controller.keyState[e.which] = false;
    });
  },    


  getAsteroids: function() {
    return model.asteroids;
  },

  getShip: function() {
    return model.ship;
  }
}


var utils = {
  toRadians: function(degrees) {
    return degrees * (Math.PI / 180);
  },

  toDegrees: function(radians) {
    return radians * (180 / Math.PI);
  }
}



controller.init();


