var view = {
  init: function() {
    model.generateAsteroids(3);

    this.render();
  },

  two: function() {
    if (this.asteroidField) {
      return this.asteroidField;
    } else {
      var params = {height: model.boardY, width: model.boardX};
      var asteroidField = new Two(params);
      var gameField = document.getElementById('asteroid-field');
      asteroidField.appendTo(gameField);
      $('#asteroid-field > svg').addClass('game')
        return this.asteroidField = asteroidField;
    }
  },

  render: function() {
    var asteroidCollection = model.asteroidCollection;
    var particles = model.particles;
    var bullets = model.bullets;
    var asteroidField = this.two();
    var ship = model.ship;

    asteroidField.clear();


    asteroidField.add(ship.render());

    bullets.forEach( function(bullet) {
      asteroidField.add(bullet.render());
    });

    var that = this;
    asteroidCollection.forEach( function(asteroid) {

      asteroidField.add(asteroid.render());

      // asteroidCollection.forEach(function(asteroid2) {
      //   if (asteroid != asteroid2 && asteroid2.collision(asteroid)) {
      //     asteroid2.asteroidHit(asteroid);
      //   };
      // })

      // if (ship.collision(asteroid)) {
      //   model.reset();
      // };

      bullets.forEach(function(bullet){
        if (bullet.collision(asteroid)) {
          bullet.asteroidHit(asteroid);
        };
      })

    });

    particles.forEach( function(particle) {
      asteroidField.add(particle.render());
    });


    asteroidField.update();
  },

}
