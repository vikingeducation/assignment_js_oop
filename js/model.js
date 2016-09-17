
 var asteroidModel = {
    asteroids: [],

    generateData: function(){
      this.generateAsteroids();
    },

    generateAsteroids: function(){
      for(var i = 0; i < 20; i++){
        var x = Math.floor(Math.random() * 800);
        var y = Math.floor(Math.random() * 400);
        var xVelocity = Math.floor(Math.random() * 50);
        var yVelocity = Math.floor(Math.random() * 25);
        var radius = Math.floor(Math.random() * 20);
        
        var asteroid = new this.asteroid(x, y, xVelocity, yVelocity, radius);
        this.asteroids.push(asteroid);
      }
    },


    asteroid: function(x, y, xVelocity, yVelocity, radius){
      this.x = x;
      this.y = y;
      this.xVelocity = xVelocity;
      this.yVelocity = yVelocity;
      this.radius = radius;
    },

    update: function(){
      this.asteroids.forEach(function(asteroid){
        asteroid.tic();
        
      })
    }
  };//end asteroids
  
var shipModel = {

  shipReference: undefined,

  placeShip: function(){
    var ship = shipModel.buildShip();
    shipModel.shipReference = ship;
  },
  
  ship: function(x, y, height, width){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

  },

  buildShip: function(){
    var ship = new this.ship(400, 370, 20, 20);
    return ship;
  },

  moveShip: function(code){
    if(code === 38){
      this.shipReference.y -= 4;
    } else if(code === 37) {
      this.shipReference.x -= 4;
    } else if(code === 39) {
      this.shipReference.x += 4;
    } else if(code === 40){
      this.shipReference.y += 4;
    }
  },
  
  fireLaser: function(){
    var laserShot = new laserModel.laser(this.shipReference.x, this.shipReference.y);

    laserModel.shotsFired.push(laserShot);
  }


};//end shipModel


var laserModel = {

  shotsFired: [],

  laser: function(x, y){
    this.x = x;
    this.y = y;
  },

  moveShots: function(){
    this.shotsFired.forEach(function(shot){
      shot.y -= 4;
    })
  }
};//end laser model


asteroidModel.asteroid.prototype.tic = function(){
  
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  
  
  if(this.x > 800){
    
    this.xVelocity -= (2 * this.xVelocity);
  } else if(this.x < 0){
    this.xVelocity += (-2 * this.xVelocity);
  }
  

  if(this.y > 400){
    this.yVelocity -= (2 * this.yVelocity);
  } else if(this.y < 0){
    this.yVelocity += (-2 * this.yVelocity);
  }
  
  
    
};

// 