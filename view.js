var MYAPP = MYAPP || {};

MYAPP.view = {
  keys: {
    32: false,
    37: false,
    38: false, 
    39: false,
    40: false,
  },

  init: function(callbacks) {
    // var operateSpaceship = callbacks.operateSpaceship;

    this.getCtx();

    $(document).keydown( function(e) {
      e.preventDefault();
      MYAPP.view.keys[e.keyCode] = true;
    });

    $(document).keyup( function(e) {
      e.preventDefault();
      MYAPP.view.keys[e.keyCode] = false;
    });
  },

  getCtx: function() {
    this.canvas = $('#board').get(0);
    this.ctx = this.canvas.getContext('2d');
  },

  displayAsteroids: function(asteroids) {
    var ctx = this.ctx;
    
    // clear canvas
    ctx.clearRect(0, 0, 500, 500);
    for(var i = 0; i < asteroids.length; i++) {
      var a = asteroids[i];

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
  },

  displayShip: function(ship) {
    ship.newPos();
    var ctx = this.ctx;
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.fillStyle = 'black';
    ctx.fillRect(ship.width/-2, ship.height/-2, ship.width, ship.height);
    ctx.restore();
  },

  displayBullets: function(ship) {
    var arsenal = ship.arsenal;
    var ctx = this.ctx;
    arsenal.forEach( function(bullet) {
      bullet.newPos();
      ctx.beginPath();
      ctx.arc(bullet.x,
              bullet.y,
              2,
              0,
              2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
    });
  },

  // render: function(asteroids, ship) {
  //   this.displayAsteroids(asteroids);
  //   this.displayShip(ship);
  // },

};