var view = {

  init: function() {
    this.getCtx();

    $(document).keydown( function(e) {
      e.preventDefault();
      view.keys[e.keyCode] = true;
    });

    $(document).keyup( function(e) {
      e.preventDefault();
      view.keys[e.keyCode] = false;
    });
  },

  keys: {
    32: false,
    37: false,
    38: false, 
    39: false,
    40: false,
  },

  getCtx: function() {
    this.canvas = $('#board').get(0);
    this.ctx = this.canvas.getContext('2d');
  },

  displayAsteroids: function(ctx, asteroids) {
    // clear canvas
    ctx.clearRect(0, 0, 500, 500);
    asteroids.forEach( function(a) {
      ctx.beginPath(); 
      ctx.arc(a.x, a.y, a.radius, 0, 2*Math.PI, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath();
    });
  },

  displayShip: function(ctx, ship) {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.radians);

    //ship as triangle
    ctx.beginPath();
    // head of triangle, 15px up
    ctx.moveTo(0, -20);
    // // bottom left of triangle
    ctx.lineTo(-7, +5);
    // // bottom right of triangle
    ctx.lineTo(+7, +5);
    ctx.fillStyle = 'black'
    ctx.fill();
    ctx.closePath();

    //ship as rectangle
    // ctx.fillStyle = 'black';
    // ctx.fillRect(ship.width/-2, ship.height/-2, ship.width, ship.height);


    ctx.restore();
  },

  displayBullets: function(ctx, arsenal) {
    arsenal.forEach( function(bullet) {
      ctx.beginPath();
      ctx.arc(bullet.x,
              bullet.y,
              bullet.radius,
              0,
              2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
    });
  },

  render: function(ship, asteroids) {
    this.displayAsteroids(this.ctx, asteroids);
    this.displayShip(this.ctx, ship);
    this.displayBullets(this.ctx, ship.arsenal);
  },

};