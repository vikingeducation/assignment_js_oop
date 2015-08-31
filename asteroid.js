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

  this.initCanvas = function(){
    this.canvas.drawRect({
      fillStyle: "black",
      x:0,
      y:0,
      width: 400,
      height:400,
      fromCenter: false,
    })
  }
}

var renderer = new Renderer($("canvas"));
renderer.initCanvas();
