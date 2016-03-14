var controller = {
  init: function() {
    view.init();
    this.loop();
    Mousetrap.bind('right', function(){
      model.turnRight();
    });
    Mousetrap.bind('left', function(){
      model.turnLeft();
    });
    Mousetrap.bind('up', function(){
      model.accelerate();
    });
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
