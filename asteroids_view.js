var view = {
  init: function() {
    var params = {height: 600, width: 800};
    var asteroidField = new Two(params);
    var asteroidCollection = model.asteroidCollection;

    var gameField = document.getElementById('asteroid-field');
    asteroidField.appendTo(gameField);
    asteroidCollection.forEach( function(asteroid) {
      var asteroidObject = asteroidField.makeCircle(asteroid.x, asteroid.y, asteroid.size*5);
      asteroidObject.fill = '#FF0000';
    });

    asteroidField.update();
  }
}