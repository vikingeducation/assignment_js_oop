var Asteroid = function(pos, vel, size) {
  this.position = {
    x: pos.x,
    y: pos.y
  };

  this.velocity = {
    x: vel.x,
    y: vel.y
  };

  this.size = size;

  this.outOfBounds = function(){
    return (this.position.x <= -30 ||
            this.position.x >= renderer.canvas.width() + 30 ||
            this.position.y <= -30 ||
            this.position.y >= renderer.canvas.height() + 30);
  }

  this.colliding = function(target){
    var distance = Math.sqrt( Math.pow(this.position.x - target.position.x, 2) + Math.pow(this.position.y - target.position.y, 2) )
    console.log(distance)
    return distance < (this.size + target.size);
  }

  this.bounce = function(){
    this.velocity.x *= -1;
    this.velocity.y *= -1;
  }

};

Asteroid.prototype.tic = function(){
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

var Renderer = function(canvas){
  // Cache DOM element
  this.canvas = $(canvas);

  this.drawBg = function(){
    this.canvas.drawRect({
      fillStyle: "black",
      x:0,
      y:0,
      width: this.canvas.width(),
      height:this.canvas.height(),
      fromCenter: false,
    })
  };

  this.redraw = function(asteroids){
    this.canvas.clearCanvas();
    this.drawBg();
    asteroids.forEach(function(element){
      renderer.drawAsteroid(element);
    });
  };

  this.drawAsteroid = function(asteroid){
    this.canvas.drawEllipse({
      strokeStyle: "white",
      x: asteroid.position.x*10,
      y: asteroid.position.y*10,
      width: asteroid.size*10,
      height: asteroid.size*10,
      fromCenter: true
    })
  }
}

var controller = {
  play: function(){
    loopMove : setInterval(function(){
      model.updateAsteroids();
    requestAnimationFrame(function(){
      renderer.redraw(model.asteroids)
    });
    }, 30);
  }

}

var model = {

  asteroids : [],
  width: undefined,
  height: undefined,

  initialize: function(width, height){
    model.width = width/10;
    model.height = height/10;
  },

  createAsteroid : function(){
    if (model.asteroids.length > 10) return;
    var x, y;
    switch (Math.ceil(Math.random()*4)){
      case 1 :
        x = Math.ceil(Math.random() * model.width);
        y = - 10;
        break;
      case 2 :
        x = -10;
        y = Math.ceil(Math.random() * model.height);
        break;
      case 3 :
        x = model.width+10;
        y = Math.ceil(Math.random() * model.height);
        break;
      case 4 :
        x = Math.ceil(Math.random() * model.width);
        y = model.height+10;
        break;
    }

    var velx =  (model.width/(Math.random() * 5)-x)/ 50,
        vely =  (model.height/(Math.random() * 5)-y)/ 50,
        size = (Math.random() * 10);

    // Add +/- 20 degree variance to the velocity
    model.asteroids.push(new Asteroid({x: x, y: y}, {x: velx, y: vely} , size));

  },

  updateAsteroids : function(){
    console.log(model.asteroids.length);
    model.asteroids.forEach(function(element, index, arr){
      element.tic();
      //Check if out of canvas
      if (element.outOfBounds()){
        arr.splice(index, 1);
      }
      //Check if collided
    });
    for(var i=0; i < model.asteroids.length; i++){
      for(var j=i+1; j < model.asteroids.length-1; j++){

        if(model.asteroids[j].colliding(model.asteroids[j+1])){
          model.asteroids[j].bounce();
          model.asteroids[j+1].bounce();
        }
      }
    }
  },

  initializeGame : function(){
    setInterval(this.createAsteroid, 100);
  }

}

var renderer = new Renderer($("canvas"));
model.initialize($("canvas").width(), $("canvas").height());
model.initializeGame();

setTimeout(controller.play, 1000);


controller.play()




// Asteroid plan
// When an astroid is created, create it so it's not visible on the screen.
// Using trigonometric functions, calculate a starting velocity angle
// Add +/- 10 degrees to this angle.
// Asteroids should always have a velocity angle that moves them towards the screen
// and then back off of it.

