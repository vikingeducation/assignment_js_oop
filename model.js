
// locations, velocities



var asteroid = {
  Constructor: function(x, y, vx, vy ){
    this.locationX = x;
    this.locationY = y;
    this.velX = vx;
    this.velY= vy;
    this.collision = false;
    this.width = 50;
    this.height = 50;

    this.updatePosition = function() {
      this.locationX += this.velX;
      this.locationX = ((this.locationX % space.width) + space.width) % space.width;
      this.locationY += this.velY;
      this.locationY = ((this.locationY % space.height) + space.height) % space.height;
    };
  },


  randAsteroid: function(){
    var randX = Math.floor(Math.random() * space.width) + 1;
    var randY = Math.floor(Math.random() * space.height) + 1;

    var randVX =  Math.floor( 2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY );
    var randVY =  Math.floor( 2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY);

    return new asteroid.Constructor( randX, randY, randVX, randVY );
  },

  collision: function(){
    $.each(space.asteroids, function(indexA, astA){
      $.each(space.asteroids, function(indexB, astB){
        if (astA.locationX < astB.locationX + astB.width &&
           astA.locationX + astA.width > astB.locationX &&
           astA.locationY < astB.locationY + astB.height &&
           astA.height + astA.locationY > astB.locationY && astA !== astB){
             console.log('Collision!');
             astA.collision = true;
             astB.collision = true;
           }
      });

    });

  }
};



var ship = {
  // uses locationX, locationY, direction
  width: 30,
  height: 50,
  // acceleration: 12,
  locationX: 115,
  locationY: 160,
  direction: 0.0 * Math.PI,
  velX: 0,
  velY: 0,

  randomStartInfo: function(){
    this.velX =  Math.floor( 2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY );
    this.velY =  Math.floor( 2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY);
  },

  updatePosition: function() {
      this.locationX += this.velX;
      this.locationX = ((this.locationX % space.width) + space.width) % space.width;
      this.locationY += this.velY;
      this.locationY = ((this.locationY % space.height) + space.height) % space.height;
  },
};

var space = {
  MAX_VELOCITY: 25,
  width: 800,
  height: 600,
  asteroids: [],
};
