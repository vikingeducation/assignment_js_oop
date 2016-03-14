var model = {
  asteroidCollection: [],
  particles: [],
  boardX: 800,
  boardY: 600,
  ship: new Ship(400, 300, 0, 0, 0),

  init: function() {
    this.ship.board = this;
  },

  generateAsteroids: function(n) {
    for(i=0; i < n; i++) {
      var x = Math.floor(Math.random() * this.boardX);
      var y = Math.floor(Math.random() * this.boardY);
      var newAsteroid = new Asteroid(x, y, 1, 1, 8);
      this.asteroidCollection.push(newAsteroid);
    };
  },

  tic: function() {
    this.asteroidCollection.forEach(function(asteroid){
      asteroid.tic();
    });

    var that = this;

    this.particles.forEach(function(particle, index){
      particle.tic();
      if (particle.life <= 0) {
        that.particles.splice(index, 1);
      }
    });
    model.ship.tic();
  },

  accelerate: function() {
    this.ship.accelerate();
  },

  turnRight: function() {
    this.ship.turnRight();
  },

  turnLeft: function() {
    this.ship.turnLeft();
  },

  addParticle: function(particle) {
    this.particles.push(particle);
  },

  reset: function() {
    this.ship = new Ship(400, 300, 0, 0, 0);
    this.ship.board = this;
  }
};
