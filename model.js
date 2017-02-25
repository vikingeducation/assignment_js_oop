var model = {};

model.init = function() {
  model.asteroids = model.buildAsteroids(20);
  model.ship = new Ship();
};

model.buildAsteroids = function(number) {
  asteroids = [];
  for(var i = 0; i < number; i++) {
    asteroids.push( new Asteroid() );
  }
  return asteroids;
};

model.incrementAsteroids = function() {
  model.asteroids.forEach( function(a) {
    a.increment();
  });
};

model.shipCollision = function() {
  for(var i = 0; i < model.asteroids.length; i++) {
    if (model.asteroids[i].checkCollision(model.ship, 5)) {
      return true;
    }
  }
};

model.checkBulletCollisions = function() {
  for(var i = 0; i < model.ship.arsenal.length; i++) {
    for (var j = 0; j < model.asteroids.length; j++) {
      if( model.asteroids[j].checkCollision(model.ship.arsenal[i]) ){
        model.asteroids[j].explode();
        model.ship.arsenal.splice(i, 1);
        model.asteroids.splice(j, 1);
      }
    }
  }
};


/// ASTEROIDS

Asteroid = function Asteroid (x, y, radius) {
  this.x = x || Math.floor(Math.random() * 500);
  this.y = y || Math.floor(Math.random() * 500);
  this.radius = radius || Math.floor(Math.random() * 30) + 5;
  this.dx = Math.floor(Math.random() * 5) - 2;
  this.dy = Math.floor(Math.random() * 5) - 2;
};

Asteroid.prototype.increment = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.checkBounce();
};

Asteroid.prototype.checkBounce = function() {
  if (this.x > 500 || this.x < 0) {
    this.dx = -this.dx;
  }

  if (this.y > 500 || this.y < 0) {
    this.dy = -this.dy;
  } 
};

Asteroid.prototype.checkCollision = function(object, radius) {
  var dx, dy, distance, secondRadius;
  dx = this.x - object.x;
  dy = this.y - object.y;
  distance = Math.sqrt(dx*dx + dy*dy);

  secondRadius = radius || object.radius;

  if (distance < this.radius + secondRadius) {
    return true;
  };
};

Asteroid.prototype.explode = function() {
  if (this.radius > 20) {
    var x = this.x;
    var y = this.y;
    var radius = this.radius / 2;
    for (var i = 2; i > 0; i-- ) {
      model.asteroids.push( new Asteroid(x, y, radius) );
    }
  }
};


/// SPACESHIP 

Ship = function Ship () {
  this.x = 250;
  this.y = 250;
  this.speed = 0;
  // this.dx = 0;
  // this.dy = 0;
  this.radians = 0;
  this.degrees = 0;
  this.width = 5;
  this.height = 30;
  this.arsenal = [];
};

Ship.prototype.adjustAngle = function(keyCodes) {
  this.degrees = 0;
  // delete to re introduce drage to ship movement
  // this.dx = 0;
  // this.dy = 0;
  // left
  if (keyCodes[37]) {
      this.degrees = -10;      
  }
  // up
  if (keyCodes[38]) {
      // this.dx = 0;     
      // this.dy = 1;
      this.speed = 5;
  }
  // right
  if (keyCodes[39]) {
      this.degrees = 10;
  }
  // down
  if (keyCodes[40]) {
    this.speed = -5;
      // this.dx = 1;
      // this.dy = -1;
  }
  if (keyCodes[32]) {
      this.fireBullet();
  }
  this.newPos();
};

Ship.prototype.newPos = function() {
  this.radians += this.degrees * Math.PI / 180;

  this.x += this.speed * Math.sin(this.radians);
  this.y -= this.speed * Math.cos(this.radians);

  this.arsenal.forEach(function(bullet) {
    bullet.newPos();
  });

};


Ship.prototype.fireBullet = function() {
  // create new bullet and add to arsenal
  this.arsenal.push( new Bullet(this) );
};


/// BULLETS

Bullet = function Bullet (ship) {
  this.x = ship.x;
  this.y = ship.y;
  this.radius = 2;
  this.speed = 5;
  this.radians = ship.radians;
};

Bullet.prototype.newPos = function() {
  this.x += this.speed * Math.sin(this.radians);
  this.y -= this.speed * Math.cos(this.radians);
};