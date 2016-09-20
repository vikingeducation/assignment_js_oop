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

function Laser (x, y) {
  SpaceObject.call(this, x, y);
}
Laser.prototype = new SpaceObject();



var model = {
  
  init: function() {
    this.createAsteroids(10);
    this.createShip();
  },

  asteroids: [],
  startingAsteroids: 10,
  lasers: [],
  ship: null,
  velocities: [0.4, 0.6, -0.4, -0.6],

  createShip: function() {
    this.ship = new Ship(250, 250);
  },

  createAsteroids: function(num) {
    for(var i = 0; i < num; i++) {
      var asteroidCoords = this.randomAsteroidStartCoords();
      var radius = Math.floor(Math.random() * 20) + 10;
      var a = new Asteroid(asteroidCoords[0],asteroidCoords[1], radius);
      a.xVelocity = this.randomVelocity();
      a.yVelocity = this.randomVelocity();
      this.asteroids.push(a);
    }
  },

  randomAsteroidStartCoords: function() {
    var lowX = Math.floor(Math.random() * 100); 
    var hiX = Math.floor(Math.random() * 100 + 400);
    var lowY = Math.floor(Math.random()* 100);
    var hiY = Math.floor(Math.random()* 100 + 400);
    var randX = Math.floor(Math.random() * 500);
    var randY = Math.floor(Math.random() * 500);

    var options = [
      [lowX, randY],
      [hiX, randY],
      [randX, lowY],
      [randX, hiY]
    ]
    return options[Math.floor(Math.random() * options.length)]
  },

  moveAsteroids: function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      this.keepObjectInBounds(this.asteroids[i]);
      this.asteroids[i].tic();
    }
  },

  moveShip: function () {
    this.keepObjectInBounds(this.ship);

    var key = controller.keyState;
    // left
    if (key[37] || key[65]) {
      this.ship.rotation -= 1.5;
    }    
    // right
    if (key[39] || key[68]) {
      this.ship.rotation += 1.5;
    }
    // up
    if (key[38] || key[87]){
      model.ship.throttle(1.01);
    }    
    // down
    if (key[40] || key[83]){
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
        console.log("You died");
        this.recenterShip();
        this.startingAsteroids = 10;
        this.asteroids = [];
        this.createAsteroids(this.startingAsteroids);
        controller.resetLevel();
      } 
    }
  },  

  shootLaser: function(){
    var xPos = this.ship.xPos,
        yPos = this.ship.yPos,
        xVelocity = 3 * Math.cos(utils.toRadians(this.ship.rotation)),
        yVelocity = 3 * Math.sin(utils.toRadians(this.ship.rotation));

    var laser = new Laser(xPos, yPos)
    laser.xVelocity = xVelocity;
    laser.yVelocity = yVelocity;

    this.lasers.push(laser);
  },

  checkLaserCollision: function(laser, asteroid) {
    var x = asteroid.xPos - laser.xPos;
    var y = asteroid.yPos - laser.yPos;
    var rSum = asteroid.radius + 2;
    return (x*x + y*y <= rSum*rSum);
  },

  handleLaserCollision: function() {
    for (var i = 0; i < this.lasers.length; i++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if (this.checkLaserCollision(this.lasers[i], this.asteroids[j])) {
          this.explodeAsteroid(this.asteroids[j], j);
          this.lasers.splice(i, 1);
        }
      }
    }
  },

  explodeAsteroid: function(a, index) {
    if (a.radius > 20) {
      for (var i = 0; i < 3; i ++) {
        var newA = new Asteroid(a.xPos, a.yPos, a.radius/3);
        newA.xVelocity = this.randomVelocity();
        newA.yVelocity = this.randomVelocity();
        this.asteroids.push(newA);
      }
    }
    this.asteroids.splice(index, 1);
  },

  moveLasers: function() {
    for (var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].tic();
    }
  },

  handleLevelUp: function() {
    if (this.asteroids.length === 0) {
      this.recenterShip();
      this.lasers = [];
      this.startingAsteroids = Math.floor(this.startingAsteroids * 1.7);
      console.log(this.startingAsteroids);
      this.createAsteroids(this.startingAsteroids);
      controller.levelUp();
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
    this.$levelDisplay.attr("src", "images/" + controller.level + ".png");
  },

  $levelDisplay: $("#level-num"),

  canvas: document.getElementById("canvas"),
  ctx: canvas.getContext("2d"),

  render: function() {
    view.ctx.clearRect(0, 0, 500, 500);
    view.placeShip();
    var asteroids = controller.getAsteroids();
    for (var i = 0; i < asteroids.length; i++) {
      view.placeAsteroid(asteroids[i]);
    }
    var lasers = controller.getLasers();
    for (var j = 0; j < lasers.length; j++) {
      view.placeLaser(lasers[j]);
    }
    
  },

  updateLevel: function() {
    this.$levelDisplay.attr("src", "images/" + controller.level + ".png");
  },  

  placeAsteroid: function(a) {
    view.ctx.beginPath();
    view.ctx.arc(a.xPos, a.yPos, a.radius, 0, 2 * Math.PI);
    view.ctx.fillStyle = 'grey';
    view.ctx.fill();
    view.ctx.stroke();
    view.ctx.closePath();
  },

  placeLaser: function(a) {
    view.ctx.beginPath();
    view.ctx.arc(a.xPos, a.yPos, 2, 0, 2 * Math.PI);
    view.ctx.fillStyle = 'red';
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
    view.ctx.fillStyle = 'white';
    view.ctx.fill();

    view.ctx.restore();
  },

}


var controller = {

  count: 0,
  level: 1,

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
    model.moveLasers();
    model.handleShipCollisions();
    model.handleLaserCollision();
    model.handleLevelUp();
    if (controller.count === 0 || controller.count % 40 === 0) {
      if (controller.keyState[32]) {
        model.shootLaser();
      }
    }
    view.render();
    controller.count += 1;
  },

  levelUp: function() {
    this.level += 1;
    view.updateLevel();
  },

  resetLevel: function() {
    this.level = 1;
    view.updateLevel();
  },

  setEventListeners: function() {
    $(document).on('keydown', function (e) {
      console.log(e.which);
      controller.keyState[e.which] = true;
      if (e.which === 32) {
        controller.count = 0;
      }
      if (e.which === 37 || e.which === 38 || 
          e.which === 39 || e.which === 40 ||
          e.which === 32) {
        e.preventDefault();
      }
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
  },

  getLasers: function() {
    return model.lasers;
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


