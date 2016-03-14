
// locations, velocities



var asteroid = {
  Constructor: function(x, y, vx, vy, wd, ht ){
    this.locationX = x;
    this.locationY = y;
    this.velX = vx;
    this.velY= vy;
    this.collision = false;
    this.width = wd;
    this.height = ht;

    this.updatePosition = function() {
      this.locationX += this.velX;
      this.locationX = ((this.locationX % space.width) + space.width) % space.width;
      this.locationY += this.velY;
      this.locationY = ((this.locationY % space.height) + space.height) % space.height;
    };
  },

  randAsteroid: function(){
    var randX = Math.random() * space.width + 1;
    var randY = Math.random() * space.height+ 1;

    var randVX =  2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY;
    var randVY =  2 * Math.random() * space.MAX_VELOCITY - space.MAX_VELOCITY;

    return new asteroid.Constructor( randX, randY, randVX, randVY, 50, 50 );
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
  locationX: 300,
  locationY: 300,
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

  headPoint: function() {
    var r = 30;
    var theta = ship.direction;
    point = {
      x: ship.locationX + (r * Math.cos( theta )),
      y: ship.locationY + r * Math.sin( theta ),
    };
    return point;
  },

  rearPoint1: function() {
    var r = 25;
    var theta = 3/4 * Math.PI + ship.direction;
    point = {
      x: ship.locationX + r * Math.cos( theta ),
      y: ship.locationY + r * Math.sin( theta ),
    };
    return point;
  },

  rearPoint2: function() {
    var r = 25;
    var theta = 5/4 * Math.PI + ship.direction;
    point = {
      x: ship.locationX + r * Math.cos( theta ),
      y: ship.locationY + r * Math.sin( theta ),
    };
    return point;
  },

  fire: function() 
  {
    console.log('fire');
    var bulletHeight = 2;
    var bulletWidth = 2;
    var bulletVX =  10 * Math.cos( ship.direction);
    var bulletVY = 10 * Math.sin( ship.direction);
    var bullet =  new asteroid.Constructor( ship.locationX, ship.locationY,
     bulletVX, bulletVY, bulletHeight, bulletWidth );

    space.asteroids.push(bullet);
  },


};

var space = {
  MAX_VELOCITY: 1.8,
  width: 800,
  height: 600,
  asteroids: [],
};
