var APP = APP || {};

APP.View = {
  cacheDOM: function() {
    //this.$gameBox = $('game-box');
    this.context = document.getElementById("game-box");
    //.getContext('2d');
    // this.context.stroke();
  },

  drawAsteroids: function(asteroids, size) {

    asteroids.forEach( function(el) {
      var x = el.x;
      var y = el.y;
      APP.View.context.arc(x,y, size, 0, Path.PI * 2, false);
    });
  }
};
