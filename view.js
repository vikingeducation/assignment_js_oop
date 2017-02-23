var MYAPP = MYAPP || {};

MYAPP.View = {
  init: function() {
    this.canvas = $('#board').get(0);
    this.ctx = this.canvas.getContext('2d');
  },
  displayAsteroids: function(asteroids) {
    var ctx = this.ctx;
    // clear canvas
    ctx.clearRect(0, 0, 500, 500);
    for(var i = 0; i < asteroids.length; i++) {
      var a = asteroids[i];
      console.log('making asteroid')
      console.log('before x'+ a.x)
      console.log('before y'+ a.y)

      ctx.beginPath(); 
      ctx.arc(a.x + Math.cos( a.counter / 100 ) * 150, 
              a.y + Math.sin( a.counter / 100 ) * 150, 
              a.radius, 
              0, 
              2 * Math.PI, 
              false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath();
      // alter asteroid positioning for subsequent rendering
      a.increment();
    }
  }

};