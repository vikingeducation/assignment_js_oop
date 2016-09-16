var model = {

  asteroids: [],

  generateData: function(){
    model.generateAsteroids();
  },

  generateAsteroids: function(){
    for(var i = 0; i < 20; i++){
      var x = Math.floor(Math.random() * 800);
      var y = Math.floor(Math.random() * 400);
      var xVelocity = Math.floor(Math.random() * 50);
      var yVelocity = Math.floor(Math.random() * 25);
      var radius = Math.floor(Math.random() * 20);
      
      var asteroid = new model.asteroid(x, y, xVelocity, yVelocity, radius);
      model.asteroids.push(asteroid);
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
    model.asteroids.forEach(function(asteroid){
      asteroid.tic();
      console.log("UPDATED" + asteroid.xVelocity)
    })
  }

  


}


model.asteroid.prototype.tic = function(){
  console.log("DID PREVOUS TICK REGISTER" + this.xVelocity)
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