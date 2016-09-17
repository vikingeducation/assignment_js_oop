
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
    var laserShot = new laserModel.laser(this.shipReference.x + 10, this.shipReference.y);

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
    var shotsIndexToRemove = [];
    this.shotsFired.forEach(function(shot, index){
      //should probable store the board height and width in a variable
      if(shot.x > 800 || shot.x < 0 || shot.y < 0 || shot.y > 400){
        shotsIndexToRemove.push(index);
      } else {
        shot.y -= 4;
      }
    })

    shotsIndexToRemove.forEach(function(index){
      laserModel.shotsFired.splice(index, 1);
    })
  }
};//end laser model



var gameModel = {
  
  score: 0,

  status: "playing",

  manageShipCollisions: function(){
    var ship = shipModel.shipReference;
    //check if an asteroid has hit the ship
    asteroidModel.asteroids.forEach(function(asteroid){
      //if asteroid has hit the ship the game is over
      if(asteroid.x > ship.x && asteroid.x <= (ship.x + ship.width) && asteroid.y > ship.y && asteroid.y <= (ship.y + ship.height)){
        gameModel.status = "over";
        return;
      }
    })
  },

  manageLaserCollisions: function(){
    //check all coords for laser shots and coords for asteroids
    //if the coords match remove the asteroid and laser
    laserModel.shotsFired.forEach(function(shot, laserIndex){
      asteroidModel.asteroids.forEach(function(asteroid, asteroidIndex){
        //will only register if asteroid center is hit
        
        if(asteroid.hit(shot)){
          //remove laser shot
          //remove asteroid
          laserModel.shotsFired.splice(laserIndex, 1);
          asteroidModel.asteroids.splice(asteroidIndex, 1);
          gameModel.score += 1;
        }

      })
        
    })
      
  }


}//end game model

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

asteroidModel.asteroid.prototype.hit = function(laser){
  var x = Math.pow(laser.x - this.x, 2);
  var y = Math.pow(laser.y - this.y, 2);

  if( x + y <= Math.pow(this.radius, 2) ){
    return true;
  } else {
    return false;
  }
};

// 