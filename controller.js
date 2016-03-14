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
  }
};

$(document).ready( controller.init() );
