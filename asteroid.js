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
      height: asteroid.size*10
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

  createAsteroid : function(){
  var x, y 


      

      switch (Math.ceil(Math.random()*4)){
        case 1 :
          x = Math.ceil(Math.random() * renderer.canvas.width()/10);
          y = - 10;
          break;
        case 2 :
          x = -10;
          y = Math.ceil(Math.random() * renderer.canvas.height()/10);
          break;
        case 3 :
          x = renderer.canvas.width()+10;
          y = Math.ceil(Math.random() * renderer.canvas.height()/10);
          break;
        case 4 :
          x = Math.ceil(Math.random() * renderer.canvas.width()/10);
          y = renderer.canvas.height()+10;
          break;
      }


      var velx =  (renderer.canvas.width()/10-x)/ 500,
          vely =  (renderer.canvas.height()/10-y)/ 500,
          size = (Math.random() * 10);

    model.asteroids.push(new Asteroid({x: x, y: y}, {x: velx, y: vely} , size));

  },

  updateAsteroids : function(){
    model.asteroids.forEach(function(element){
      element.tic();
    });
  },

  initializeGame : function(){
    setInterval(this.createAsteroid, 1000);
  }

}

var renderer = new Renderer($("canvas"));
model.initializeGame();

setTimeout(controller.play, 1000);


controller.play()




// Asteroid plan
// When an astroid is created, create it so it's not visible on the screen.
// Using trigonometric functions, calculate a starting velocity angle
// Add +/- 10 degrees to this angle.
// Asteroids should always have a velocity angle that moves them towards the screen
// and then back off of it.

