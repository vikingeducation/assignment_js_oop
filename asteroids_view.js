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
    var bulletObjects = [];

    asteroidField.clear();

    var shipObject = model.ship.render();

    asteroidField.add(shipObject);

    bullets.forEach( function(bullet) {
      asteroidField.add(bullet.render());
    });

    var that = this;
    asteroidCollection.forEach( function(asteroid) {
      var asteroidObject = asteroidField.makePolygon(asteroid.x, asteroid.y, asteroid.size*5, 5);
      asteroidObject.stroke = '#FFFFFF';
      asteroidObject.fill = null;
      asteroidObject.translation.set(asteroid.x, asteroid.y);
      asteroidObject.rotation = asteroid.direction;

      asteroidCollection.forEach(function(asteroid2) {

        if (asteroid2.collision(asteroidObject)) {
          asteroid2.asteroidHit(asteroid);
          asteroidField.remove(asteroidObject);
          asteroidField.remove(asteroid2);
        };
      })

      if (ship.collision(asteroidObject)) {
        model.reset();
      };

      bullets.forEach(function(bullet){
        if (bullet.collision(asteroidObject)) {
          asteroidField.remove(asteroidObject);
          bullet.asteroidHit(asteroid);
        };
      })

    });

    particles.forEach( function(particle) {
      var particleObject = asteroidField.makeLine(particle.x, particle.y, particle.x + particle.x_vel * 5, particle.y + particle.y_vel * 5);
      particleObject.stroke = '#FFAAAA';
      particleObject.fill = null;
      particleObject.opacity = particle.life / 100;
      particleObject.translation.set(particle.x, particle.y);
    });

    asteroidField.update();
  },

}
