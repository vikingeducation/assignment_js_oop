var model = {


}

var asteroidModel = {

  collection: [],

  init: function(num){
    this.generateAsteroids(num);
  },

  createAsteroid: function(){
    var asteroid = {};
<<<<<<< HEAD
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
=======

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
>>>>>>> 60a2e4e9719900d1e7262a8599ee82d1825696ef
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