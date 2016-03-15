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
  },

  updateBullets: function() {
    model.updateBullets();
  },

  generateBullet: function() {
    model.generateBullet();
  },

  getBullets: function() {
    return model.getBullets();
  }
};

$(document).ready( controller.init() );
