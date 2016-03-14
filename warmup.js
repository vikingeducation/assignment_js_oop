var model = {

  collection: [],

  Asteroid: function(){
    this.X = Math.floor(Math.random() * 1000);
    this.Y = Math.floor(Math.random() * 1000);
    this.Xvel = Math.floor(Math.random() * 10);
    this.Yvel = Math.floor(Math.random() * 10);
    return this
  },

  createAsteroid: function(){
    var asteroid = new this.Asteroid();
    asteroid.X = Math.floor(Math.random() * 1000);
    asteroid.Y = Math.floor(Math.random() * 1000);
    asteroid.Xvel = Math.floor(Math.random() * 10);
    asteroid.Yvel = Math.floor(Math.random() * 10);

    this.collection.push(asteroid);
    return asteroid;
  },

  generateAsteroids: function(num){
    for(var i = 0; i < num; i++){
      this.collection.push(new this.Asteroid());
    }
  },

  Asteroid2: function(){
    this.X = Math.floor(Math.random() * 1000);
    this.Y = Math.floor(Math.random() * 1000);
    this.Xvel = Math.floor(Math.random() * 10);
    this.Yvel = Math.floor(Math.random() * 10);

    this.tic = function(){
      this.X += this.Xvel;
      this.Y += this.Yvel;
    }
    return this;
  }

}

//Happens in a turn of the game
model.Asteroid.prototype.tic = function(){
  this.X += this.Xvel;
  this.Y += this.Yvel;
}


// model.generateAsteroids(6);

//this will be in the init--want your setInterval to act on all the key objects
//in your game
//setInterval(function(){asteroid.tic()}, 1000);

// var update = setInterval(function(){
//   model.collection.forEach(function(element){
//     element.tic();
//   } )
// }, 1000)


function testPerformance() {
  var cstartDate = new Date();
  for (var i = 0; i < 10000000; i++){
    var ast = new model.Asteroid();
    for (var i = 0; i < 10000000; i++){
      ast.tic();
    }
  }
  var cendDate = new Date();



  var startDate = new Date();
  for (var i = 0; i < 10000000; i++){
    var ast2 = new model.Asteroid2();
    for (var i = 0; i < 10000000; i++){
      ast2.tic();
    }
  }
  var endDate = new Date();


var prototypeTime = cendDate.getTime() - cstartDate.getTime();
var constructorTime = endDate.getTime() - startDate.getTime();

alert("Constructor time: " + constructorTime + ", prototype time: " + prototypeTime);

}

testPerformance();