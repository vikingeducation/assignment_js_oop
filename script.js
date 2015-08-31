var Asteroid = function(x,y,velx,vely) {


    this.position = { 
      x: x,
      y: y
    };

    this.velocity = {
      x: velx,
      y: vely
    };
  
};

Asteroid.prototype.tic = function(){
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

var allAsteroids = [];

for(var i=0; i < 100; i++){
  var x = Math.ceil(Math.random()*10)-5,
  y = Math.ceil(Math.random()*10)-5,
  velx =  Math.ceil(Math.random()*2)-1,
  vely =  Math.ceil(Math.random()*2)-1;

  allAsteroids.push(new Asteroid(x,y,velx,vely));

}

var currentTime = new Date().getTime();
allAsteroids.forEach(function(element){
  
  for(var t=0; t<100;t++){

    element.tic();
  }
});
console.log(new Date().getTime() - currentTime)

// for(var i=0; i< allAsteroids.length; i++){
//   for(var t=0; t<100;t++)
//   allAsteroids[i].tic();
// }



