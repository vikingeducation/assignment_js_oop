
var gameModel ={

}


var model = {

  collection:[],

  Asteroid: function(X, Y, Xvel, Yvel){
    this.X;
    this.Y;
    this.Xvel;
    this.Yvel;
  },

  createAsteroid: function(){
    var asteroid = new this.Asteroid();
    asteroid.X = 0;
    asteroid.Y = 0;
    asteroid.Xvel = 1;
    asteroid.Yvel = 1;

    this.collection.push(asteroid);
    return asteroid;
  },

  generateAsteroids: function(num){
    for(var i = 0; i < num; i++){
      this.createAsteroid();
    }
  }

}

//Happens in a turn of the game
model.Asteroid.prototype.tic = function(){
  this.X += this.Xvel;
  this.Y += this.Yvel;
}

//this will be in the init--want your setInterval to act on all the key objects
//in your game
//setInterval(function(){asteroid.tic()}, 1000);

model.generateAsteroids();
