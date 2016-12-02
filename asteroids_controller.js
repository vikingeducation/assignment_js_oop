var controller = {
  right: false,
  left: false,
  up: false,

  init: function(height, width) {
    model.init(width, height)
    view.init();
    this.loop();
    Mousetrap.bind('right', function(){
      this.right = true
    });
    Mousetrap.bind('right', function(){
      this.right = false
    }, 'keyup');

    Mousetrap.bind('left', function(){
      this.left = true
    });
    Mousetrap.bind('left', function(){
      this.left = false
    }, 'keyup');

    Mousetrap.bind('up', function(){
      this.up = true
    });
    Mousetrap.bind('up', function(){
      this.up = false
    }, 'keyup');

    Mousetrap.bind('space', function(){
      model.fire();
    });
  },

  loop: function() {
    setInterval(function() {
      model.tic();
      view.render();
      if (this.right) {
        model.turnRight();
      } else if (this.left) {
        model.turnLeft();
      }
      if (this.up) {
        model.accelerate();
      }
    }, 1000/60)
  }
};

$(function() {
  controller.init($(window).height() - 10, $(window).width());
});
