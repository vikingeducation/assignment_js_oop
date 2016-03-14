var model = {
  asteroidCollection: [],
  boardX: 800,
  boardY: 600,

  Asteroid: function(x, y, x_vel, y_vel, size) {
    Sprite.apply(this, arguments);
    this.x = x;
    this.y = y;
    this.x_vel = x_vel;
    this.y_vel = y_vel;
    this.size = size;
  },

  generateAsteroids: function(n) {
    for(i=0; i < n; i++) {
      var x = Math.floor(Math.random() * boardX);
      var y = Math.floor(Math.random() * boardY);
      newAsteroid = new Asteroid(x, y, 1, 1, 1);
      asteroidCollection.push(newAsteroid);
    };
  }
};