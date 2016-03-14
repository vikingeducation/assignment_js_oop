var model = {


}

var asteroidModel = {

  collection: [],

  init: function(num){
    this.generateAsteroids(num);
  },

  createAsteroid: function(){
    this.X = Math.floor(Math.random() * 500);
    this.Y = Math.floor(Math.random() * 500);
    this.radius = Math.floor(Math.random() * 5 + 1);
    this.Xvel = Math.floor(Math.random() * 10);
    this.Yvel = Math.floor(Math.random() * 10);
    
    // this.tic = function(){
    //   this.X += this.Xvel;
    //   this.Y += this.Yvel;
    // }
    return this
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