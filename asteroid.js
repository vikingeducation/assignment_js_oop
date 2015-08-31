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
      width: 400,
      height:400,
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
      renderer.redraw(model.asteroids);
    }, 100);
  }

}

var model = {
  
  asteroids : [],
  
  createAsteroid : function(){
    this.asteroids.push(new Asteroid({x: 5, y:5}, {x: 1, y: 1} , 5));

  },

  updateAsteroids : function(){
    this.asteroids.forEach(function(element){
      element.tic();
    });
  }

}

var renderer = new Renderer($("canvas"));
model.createAsteroid();

controller.play()



