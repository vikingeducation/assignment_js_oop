var model = {
  asteroidCollection: [],
  boardX: 800,
  boardY: 600,

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
  }
};
