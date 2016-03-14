var model = {


}

var asteroidModel = {

  collection: [],

  init: function(num){
    this.generateAsteroids(num);
  },

  createAsteroid: function(){
    var asteroid = {};
    asteroid.X = Math.floor(Math.random() * 500);
    asteroid.Y = Math.floor(Math.random() * 500);
    asteroid.radius = Math.floor(Math.random() * 5 + 3);
    asteroid.Xvel = Math.floor(Math.random() * 10)-5;
    asteroid.Yvel = Math.floor(Math.random() * 10)-5;
    
    // this.tic = function(){
    //   this.X += this.Xvel;
    //   this.Y += this.Yvel;
    // }
    return asteroid;
  },

  generateAsteroids: function(num){
    for(var i = 0; i < num; i++){
      this.collection.push(new this.createAsteroid());
    }
  },

  tic: function(){
    this.collection.forEach(function(element){
      element.X += element.Xvel;
      element.Y += element.Yvel;
    });
  }
}

var spaceshipModel = {
  tic:function(){
  }
}

var bulletModel = {
  tic:function(){
  }
}