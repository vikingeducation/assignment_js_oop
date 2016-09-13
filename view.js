var APP = APP || {};

APP.View = {
  cacheDOM: function() {
    this.$document = $(document);
    this.gameBox = $('#game-box')[0];
    this.gameBox.width = 300;
    this.gameBox.height = 200;
    this.context = this.gameBox.getContext('2d');
    // this.context = document.getElementById("game-box");
    //.getContext('2d');
    // this.context.stroke();
  },

  handleMovement: function() {
    this.$document.on("keydown", function(e) {
        APP.View.keypress = e.which;
        console.log(e.which);
    });
  },

  drawAsteroids: function(asteroids, size) {
    asteroids.forEach( function(el) {
      var x = el.coordX;
      var y = el.coordY;
      APP.View.context.beginPath();
      // APP.View.context.fillRect(10,10,100,100);
      // APP.View.context.fillStyle = 'green';
      APP.View.context.arc(x, y, size, 0, Math.PI * 2, false);
      // APP.View.context.closePath();
      APP.View.context.strokeStyle = "#ff0000";
      APP.View.context.stroke();
    });
  },

  drawSpaceShip: function(spaceship) {
      var x = spaceship.coordX;
      var y = spaceship.coordX;
      var deg = spaceship.degrees;

      // the triangle
      APP.View.context.beginPath();
      APP.View.context.moveTo(x - 10, y + 10);
      APP.View.context.lineTo(x + 10, y + 10);
      APP.View.context.lineTo(x, y - 10);
      APP.View.context.closePath();

      // the outline
      APP.View.context.lineWidth = 10;
      APP.View.context.strokeStyle = '#666666';
      APP.View.context.stroke();

      // the fill color
      APP.View.context.fillStyle = "#FFCC00";
      APP.View.context.fill();



  }
};
