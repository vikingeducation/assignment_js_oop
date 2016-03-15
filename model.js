var model = {
  ship: new Ship(),
  asteroids: [],
  bullets: [],
  score: 0,

  getAsteroids: function() {
    return this.asteroids;
  },

  getShip: function() {
    return this.ship;
  },

  getBullets: function () {
    return this.bullets;
  },

  generateAsteroids: function() {
    var max = 100;
    var spawnRate = 50; // lower = more
    var random = Math.floor(Math.random() * max);

    if (spawnRate < random) {
      this.asteroids.push(new Asteroid());
    }
  },

  generateBullet: function() {
    console.log(model.bullets);
    model.bullets.push(new Bullet());
  },


  updateBullets: function() {
    var allBullets = model.bullets;
    for (var b in allBullets) {
      allBullets[b].x += Math.cos(this.ship.angle) * allBullets[b].dx * Math.pow(2, 0.5);
      allBullets[b].y += Math.sin(this.ship.angle) * allBullets[b].dy * Math.pow(2, 0.5);
      if (allBullets[b].y <= -10 || allBullets[b].y >= 810 ||
      allBullets[b].x <= -10 || allBullets[b].y >= 810) {
         allBullets.splice(b, 1);
      }
    }
  },

  updateAsteroids: function() {
    var allAsteroids = this.asteroids, currAsteroid;
    for (var a in allAsteroids) {
      currAsteroid = allAsteroids[a];
      currAsteroid.x +=   currAsteroid.dx;
      currAsteroid.y +=   currAsteroid.dy;
      if (currAsteroid.x < -currAsteroid.size || currAsteroid.x > 800 ||
        currAsteroid.y < -50 || currAsteroid.y > 800) {
          allAsteroids.splice(a, 1);
      }
    }
  },

  updateShip: function(dir) {

    if (dir === "left") {
      this.ship.angle = (this.ship.angle + this.ship.dtheta) % (2 * Math.PI);
    } else if (dir === "right") {
      this.ship.angle = (this.ship.angle - this.ship.dtheta) % (2 * Math.PI);
    }
    if (dir === "up" ) {
      this.ship.x += Math.cos(this.ship.angle) * 5 * Math.pow(2, 0.5);
      this.ship.y += Math.sin(this.ship.angle) * 5 * Math.pow(2, 0.5);

    }
    this.ship.x = Math.max(0, Math.min(this.ship.x, view.max - this.ship.size));
    this.ship.y = Math.max(0, Math.min(this.ship.y, view.max - this.ship.size));
  },

  hypotenuse: function(asteroid1,asteroid2) {
    var xDiff = Math.pow(asteroid1.x - asteroid2.x, 2);
    var yDiff = Math.pow(asteroid1.y - asteroid2.y, 2);

    return Math.pow((xDiff+yDiff),0.5);
  },

  checkCollisions: function() {
    var ship = this.ship;
    var asteroids = this.asteroids;
    var killed = false;
    for (var i=0;i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      // asteroid vs asteroid
      var otherAsteroids = asteroids.slice();
      otherAsteroids.splice(i,1);
      for (var j=0;j < otherAsteroids.length; j++) {
         var otherAsteroid = otherAsteroids[j];
         if (this.hypotenuse(asteroid,otherAsteroid) < (asteroid.size + otherAsteroid.size)) {
          this.asteroidHitsAsteroid(asteroid,otherAsteroid);
         }
      }
      // asteroid vs bullet
      var bullets = this.bullets;
      for (var k = 0; k < bullets.length; k++) {
        var bullet = bullets[k];
        if (this.hypotenuse(asteroid, bullet) < (asteroid.size + bullet.size)) {
          this.asteroidHitsBullet(asteroid, bullet);
        }
      }
      // asteroid vs ship
      if (this.hypotenuse(asteroid, ship) < (asteroid.size + ship.size)) {
        // This needs to be changed later obviously since a ship is not a circle
        this.asteroidHitsAsteroid(asteroid);
        this.ship.hp -= 10;
      }
    }
  },

  asteroidHitsAsteroid: function(asteroid,otherAsteroid) {
    // Break asteroid into pieces
    // if (asteroid.size/2 >= 10) {
    //   var a1 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, -5); // N
    //   var a2 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 5, 0); // E
    //   var a3 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, 5); // S
    //   var a4 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, -5, 5); // W
    //   model.asteroids.push(a1);
    //   model.asteroids.push(a2);
    //   model.asteroids.push(a3);
    //   model.asteroids.push(a4);
    //
    // }
    // // Break asteroid2 into pieces
    // if (asteroid.size/2 >= 10) {
    //   var b1 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, -5); // N
    //   var b2 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 5, 0); // E
    //   var b3 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, 0, 5); // S
    //   var b4 = new Asteroid(asteroid.size/2, asteroid.x, asteroid.y, -5, 5); // W
    //   model.asteroids.push(b1);
    //   model.asteroids.push(b2);
    //   model.asteroids.push(b3);
    //   model.asteroids.push(b4);
    // }
    // Remove collided asteroids
     this.killAsteroid(asteroid,otherAsteroid);
  },

  asteroidHitsBullet: function(asteroid, bullet) {
    this.killAsteroid(asteroid);
    this.killBullet(bullet);
    model.score += 1;
  },

  killAsteroid: function(asteroid,otherAsteroid) {
    for (var a in arguments) {
       var index = this.asteroids.indexOf(arguments[a]);
       this.asteroids.splice(index,1);
    }
  },

  killBullet: function(bullet) {
    var i = this.bullets.indexOf(bullet);
    this.bullets.splice(i, 1);
  }

};

function Bullet() {

  this.size = 3;
  this.x = model.ship.x + model.ship.size/2;
  this.y = model.ship.y + model.ship.size/2;
  this.angle = model.ship.angle ;

   // Velocity
  this.dx = 25;
  this.dy = 25;

  //this.image = new Image();
  //this.image.src = "images/fireball.png";

  this.draw = function(context) {
    context.save();
    var sSize = model.ship.size;
    context.translate(this.x + sSize/2, this.y + sSize/2);
    context.rotate(this.angle);
    context.arc(this.x,this.y,this.size,0,Math.PI * 2);
    context.restore();
  };
}

function Ship() {
  this.hp = 100;
  this.size = 50;
  this.x = 375;
  this.y = 375;
  this.angle = - Math.PI / 2 ;

   // Velocity
  this.dx = 10;
  this.dy = 10;
  this.dtheta = Math.PI / 36;


  this.image = new Image();
  this.image.src = "images/batwing.jpg";

  this.draw = function(context) {
    context.save();
    context.translate(this.x + this.size/2, this.y + this.size/2);
    context.rotate(this.angle);
    context.drawImage(this.image, - this.size/2, - this.size/2, this.size, this.size);
    context.restore();
  };
}

function Asteroid(size, x, y, dx, dy) {
  // Size
  this.size = 25;
  this.randomVal = Math.random();
  this.randomCoord = Math.random() * (800 + this.size) - this.size;

  // Starting Position
  // Spawn from North side
  if (this.randomVal < 0.25) {
    this.x = this.randomCoord;
    this.y = -this.size;
  // Spawn from East Side
  }
  else if (this.randomVal < 0.5) {
    this.x = 800;
    this.y = Math.random() * (800 + this.size) - this.size;
  // Spawn from South Side
  }

  else if (this.randomVal < 0.75) {
    this.x = this.x = Math.random() * (800 + this.size) - this.size;
    this.y = 800;
  //Spawn from West Side
  }
  else {
    this.x =  - this.size;
    this.y = Math.random() * (800 + this.size) - this.size;
  }

  // Velocity
  this.dx = (Math.random() * 10) - 5;
  this.dy = (Math.random() * 10) - 5;

  if (arguments.length !== 0) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  this.image = new Image();
  this.image.src = "images/charizard.jpg";

  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  };
}
