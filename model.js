var model = {
  asteroids: [],

  getAsteroids: function() {
    return this.asteroids;
  },

  generateAsteroids: function() {
    var max = 100;
    var spawnRate = 50; // lower = more
    var random = Math.floor(Math.random() * max);

    if (spawnRate < random) {
      this.asteroids.push(new Asteroid());
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
  }


};


function Asteroid() {
  // Size
  this.size = 50;
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
}
