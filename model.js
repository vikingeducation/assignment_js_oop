var model = {


}

var asteroidModel = {

  collection: [],

  init: function(num){
    this.generateAsteroids(num);
  },

  createAsteroid: function(){
    var asteroid = {};

    asteroid.X = Math.floor(Math.random() * 20 + 1);
    asteroid.Y = Math.floor(Math.random() * 20 + 1);
    asteroid.radius = Math.floor(Math.random() * 5) + 5;
    // TODO adjust velocity when necessary
    asteroid.Xvel = (Math.random() * 5 - 2) * 3;
    asteroid.Yvel = (Math.random() * 5 - 2) * 3;

    asteroidModel.positions.push(asteroid.X + "," + asteroid.Y);


    return asteroid
  },

  validateAsteroids: function(asteroid) {
    asteroidModel.collection.forEach(function(element){
      if (element.x ) {

      } else if(){

      } else {

      }
    } );
  },

  generateAsteroids: function(num){
    for(var i = 0; i < num; i++){
      var ast = new this.createAsteroid();

      if (validateAsteroids(ast) {

      }

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