var model = {


}

var asteroidModel = {

  collection: [],

  init: function(num){
    this.generateAsteroids(num);
  },

  createAsteroid: function(){
    this.X = Math.floor(Math.random() * 500 + 1);
    this.Y = Math.floor(Math.random() * 500 + 1);
    this.radius = Math.floor(Math.random()) + 5;

    // TODO adjust velocity when necessary

    this.Xvel = (Math.random() * 5 - 2) * 3;
    this.Yvel = (Math.random() * 5 - 2) * 3;
    

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