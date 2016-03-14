var controller = {
  init: function() {
    view.init();
    this.loop();
  },

  loop: function() {
    setInterval(function() {
      model.tic();
    }, 1000/60)
  }
};

$(function() {
  controller.init();
});
