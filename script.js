var protoAsteroid = function(x,y,velx,vely) {

  this.position = {
    x: x,
    y: y
  };

  this.velocity = {
    x: velx,
    y: vely
  };

};

protoAsteroid.prototype.tic = function(){
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

var currentProtoTime = Date.now();
var allprotoAsteroids = [];

for(var i=0; i < 10000; i++){
  var x = Math.ceil(Math.random()*10)-5,
  y = Math.ceil(Math.random()*10)-5,
  velx =  Math.ceil(Math.random()*2)-1,
  vely =  Math.ceil(Math.random()*2)-1;

  allprotoAsteroids.push(new protoAsteroid(x,y,velx,vely));

}

allprotoAsteroids.forEach(function(element){

  for(var t=0; t<10000;t++){

    element.tic();
  }
});

console.log(Date.now() - currentProtoTime)

/*
  Instance asteroids
*/

var Asteroid = function(x,y,velx,vely) {

  this.tic = function(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  this.position = {
    x: x,
    y: y
  };

  this.velocity = {
    x: velx,
    y: vely
  };

};

var currentTime = Date.now();
var allAsteroids = [];

for(var i=0; i < 10000; i++){
  var x = Math.ceil(Math.random()*10)-5,
  y = Math.ceil(Math.random()*10)-5,
  velx =  Math.ceil(Math.random()*2)-1,
  vely =  Math.ceil(Math.random()*2)-1;

  allAsteroids.push(new Asteroid(x,y,velx,vely));

}

allAsteroids.forEach(function(element){

  for(var t=0; t<10000;t++){

    element.tic();
  }
});
var nowTime = Date.now();
console.log(nowTime - currentTime)

