var MYAPP = MYAPP || {};

MYAPP.model = {};

MYAPP.model.buildAsteroids = function(number) {
  asteroids = [];
  for(var i = 0; i < number; i++) {
    asteroids.push( new MYAPP.Asteroid() );
  }
  return asteroids;
};

MYAPP.model.shipCollision = function(ship, asteroids) {
  // if true call game over

};

MYAPP.model.bulletCollision = function(ship, asteroids) {
  var dx, dy, distance;
  var exploded = [];

  asteroids.forEach( function(asteroid) {
    ship.arsenal.forEach( function(bullet) {
      dx = bullet.x - asteroid.x;
      dy = bullet.y - asteroid.y;
      distance = Math.sqrt( dx*dx + dy*dy );

      if ( distance < (2 + asteroid.radius) ) {
        console.log('HIT A GODDAMN ASTEROID');
        exploded.push(asteroid);
      }        
    });
  });

  return exploded;
};


/// ASTEROIDS

MYAPP.Asteroid = function Asteroid (x, y, radius) {
  this.x = x || Math.floor(Math.random() * 400);
  this.y = y || Math.floor(Math.random() * 400);
  this.radius = radius || Math.floor(Math.random() * 30) + 10;
  // still too clustered
  this.counter = 0;
  this.sign = 5 + Math.random() * 10;
  this.speed = .01;
};

MYAPP.Asteroid.prototype.increment = function() {
  this.counter += .05 * (this.sign + this.speed);
};

MYAPP.Asteroid.explode = function() {
  if ( this.radius < 5 ) {
    this = null;
  } else {
    // split into two new asteroids

  }
}


/// SPACESHIP 

MYAPP.Ship = function Ship () {
  this.x = 250;
  this.y = 250;
  this.dx = 0;
  this.dy = 0;
  this.angle = 0;
  this.moveAngle = 0;
  this.width = 5;
  this.height = 30;
  this.arsenal = [];
};

MYAPP.Ship.prototype.adjustAngle = function(keyCodes) {
    this.moveAngle = 0;
    this.speed = 0;
    if (keyCodes[37]) {
        this.moveAngle = -1;      
    }
    if (keyCodes[38]) {
        this.dx = 1;     
        this.dy = -1;
    }
    if (keyCodes[39]) {
        this.moveAngle = 1;
    }
    if (keyCodes[40]) {
        this.dx = -1;
        this.dy = 1;
    }
    if (keyCodes[32]) {
        this.fireBullet();
    }
};

MYAPP.Ship.prototype.newPos = function() {
  this.angle += this.moveAngle * Math.PI / 180;
  this.x += this.dx * Math.sin(this.angle);
  this.y += this.dy * Math.cos(this.angle);
};

// implement at the end of view.displayship
MYAPP.Ship.prototype.decelerate = function() {
  [dx, dy].forEach( function(velocity) {
    if (velocity < 0) {
      velocity = 0;
    } else if ( velocity > 0 ) {
      velocity -= .1
    }
  } );
};

MYAPP.Ship.prototype.fireBullet = function() {
  // create new bullet and add to arsenal
  this.arsenal.push( new MYAPP.Bullet(this) );
};


/// BULLETS

MYAPP.Bullet = function Bullet (ship) {
  this.x = ship.x;
  this.y = ship.y;
  this.speed = 5;
  this.angle = ship.angle;
};

MYAPP.Bullet.prototype.newPos = function() {
  this.x += this.speed * Math.sin(this.angle);
  this.y -= this.speed * Math.cos(this.angle);
};