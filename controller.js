var controller = {
  init: function() {

    view.init();
  },

  getAsteroids: function() {
    return model.getAsteroids();
  },

  generateAsteroids: function() {
    model.generateAsteroids();
  },

  updateAsteroids: function() {
    model.updateAsteroids();
  },

  checkCollisions: function() {
    model.checkCollisions();
  },

  getShip: function() {
    return model.getShip();
  },

  updateShip: function(dir) {
    model.updateShip(dir);
  }

};

$(document).ready( controller.init() );
