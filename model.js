var model = {
  asteroids: [],

  getAsteroids: function() {
    return this.asteroids;
  },

  generateAsteroids: function() {
    var max = 100;
    var spawnRate = 75; // lower = more
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
  },

  hypotenuse: function(asteroid1,asteroid2) {


    // console.log("Asteroid 1: " + typeof parseInt(asteroid1.x).toFixed(2));
    // console.log("Asteroid 2: " + typeof parseInt(asteroid2.x).toFixed(2));
    // a = Number(asteroid1.x);
    // b = Number(asteroid2.x);
    // console.log("Asteroid 1 **: " + a);
    // console.log("Asteroid 2 **: " + b);
    // console.log("Asteroid **: " + Number(a - b).toFixed(2));
   

    var xDiff = Math.pow(asteroid1.x - asteroid2.x, 2);
    var yDiff = Math.pow(asteroid1.y - asteroid2.y, 2);

    return Math.pow((xDiff+yDiff),0.5);

  },

  checkCollisions: function() {
    
    var asteroids = this.asteroids;
    var max = asteroids.length;

    for (var i=0;i < max; i++) {
      var asteroid = asteroids[i];
      var otherAsteroids = asteroids.slice();
      //otherAsteroids = otherAsteroids.splice(i,1);
      otherAsteroids.splice(i,1);

      for (var j=0;j < otherAsteroids.length; j++) {
         var otherAsteroid = otherAsteroids[j];
          
          //console.log("Hyp is :" + this.hypotenuse(asteroid,otherAsteroid));
          console.log("Asteroid 1 **: " + asteroid.x);
          console.log("Asteroid 2 **: " + otherAsteroid.x);

         if (this.hypotenuse(asteroid,otherAsteroid) < (asteroid.size + otherAsteroid.size)) {
             this.asteroidHitsAsteroid(asteroid,otherAsteroid);
         }
      }

    }
  },

  asteroidHitsAsteroid: function(asteroid,otherAsteroid) {
     this.killAsteroid(asteroid,otherAsteroid);
  },

  killAsteroid: function(asteroid,otherAsteroid) {
    console.log("Killing asteroid");
    for (var a in arguments) {
       var index = this.asteroids.indexOf(arguments[a]);
       this.asteroids.splice(index,1);
    }

  },

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
