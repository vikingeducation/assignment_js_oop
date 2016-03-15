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
      var xArr = [];
      var yArr = [];

      for (var i = element.x; i > element.x - element.radius; i++){
        xArr.push(i);
      }
      for (var i = element.x; i < element.x + element.radius; i++){
        xArr.push(i);
      }

      for (var i = element.y; i < element.y - element.radius; i++){
        yArr.push(i);
      }
      for (var i = element.y; i > element.y + element.radius; i++){
        yArr.push(i);
      }
    }

    for(var i = 0; i < Xarr.length; i++){
      x = (asteroid.X-asteroid.radius) + (2* asteroid.radius)
      //want to check the whole range of Xs...
      if(xArr[i] )
    }
      if(xArr.includes(element.X) && y.Arr.include(element.Y)){

      } else if(){

      } else {

      }
    } );

  },

  generateAsteroids: function(num){
    for(var i = 0; i < num; i++){
      var ast = new this.createAsteroid();
      var validasteroid = false;

      while !(validasteroid) {
        
        if(validateAsteroids(ast)){
          this.collection.push(ast);
          validasteroid = true;
        }
        else{
          ast = new this.createAsteroid();
        } 
      } 
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