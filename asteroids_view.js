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
    var asteroidField = this.two();
    var ship = model.ship;

    asteroidField.clear();

    shipObject = asteroidField.makePolygon(ship.x, ship.y, 15, 3);
    shipObject.vertices[2].y += 5;
    shipObject.vertices[2].x += 10;
    shipObject.linewidth = 2;
    shipObject.stroke = '#FFFFFF';
    shipObject.fill = null;
    shipObject.translation.set(ship.x, ship.y);
    shipObject.rotation = ship.direction - (Math.PI / 180) * 30;

    var that = this;  
    asteroidCollection.forEach( function(asteroid) {
      var asteroidObject = asteroidField.makePolygon(asteroid.x, asteroid.y, asteroid.size*5, 5);
      asteroidObject.stroke = '#FFFFFF';
      asteroidObject.fill = null;
      asteroidObject.translation.set(asteroid.x, asteroid.y);
      asteroidObject.rotation = asteroid.direction;

      if (that.collision(shipObject, asteroidObject)) {
        asteroidField.remove(shipObject);
        model.reset();
      };

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

  collision: function(object1, object2) {
    boundary1 = object1.getBoundingClientRect();
    boundary2 = object2.getBoundingClientRect();

    return !(boundary2.left > boundary1.right || 
           boundary2.right < boundary1.left || 
           boundary2.top > boundary1.bottom ||
           boundary2.bottom < boundary1.top);
  }
}
