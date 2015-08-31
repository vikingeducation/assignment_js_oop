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
    console.log(this.position.x, this.position.y, target.position.x, target.position.y);
    var distance = Math.sqrt( Math.pow(this.position.x - target.position.x, 2) + Math.pow(this.position.y - target.position.y, 2) )
    return distance <= (this.size + target.size)/2;
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
      x: asteroid.position.x,
      y: asteroid.position.y,
      width: asteroid.size,
      height: asteroid.size,
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
    model.width = width;
    model.height = height;
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

    var velx =  (model.width/(Math.random() * 5)-x)/ 150,
        vely =  (model.height/(Math.random() * 5)-y)/ 150,
        size = (Math.random() * 100);

    // Add +/- 20 degree variance to the velocity
    model.asteroids.push(new Asteroid({x: x, y: y}, {x: velx, y: vely} , size));

  },

  childAsteroid : function(parent, times){
        if (parent.size/times<10) return ;
        var x = parent.position.x, 
            y = parent.position.y,
            velx =  parent.velocity.x/times,
            vely =  parent.velocity.y/times,
            size = parent.size/times;
        model.asteroids.push(new Asteroid({x: x, y: y}, {x: velx, y: vely} , size));
  },

  updateAsteroids : function(){
  
    model.asteroids.forEach(function(element, index, arr){
      element.tic();
      //Check if out of canvas
      if (element.outOfBounds()){
        arr.splice(index, 1);
      }
      //Check if collided
    });
    


    // // Iterate through list of asteroids except last one
    // for(var i = 0; i < model.asteroids.length-1; i++)
    //   // For each asteroid, check collisions of all following asteroids
    //   for(var j = i; j < model.asteroids.length-1; j++)


    console.log(model.asteroids.length);
    var destroyed = [];

    for(var i = 0; i < model.asteroids.length-1; i++){
      for(var j = i+1; j < model.asteroids.length; j++){

        if(model.asteroids[i].colliding(model.asteroids[j])){
          model.asteroids[i].bounce();
          model.asteroids[j].bounce();
          destroyed.push(model.asteroids[i]);
          destroyed.push(model.asteroids[j]);
         
          model.asteroids[i].tic();
          model.asteroids[j].tic();
        }
      }
    }
    
    destroyed.forEach(function(element){
      var times = Math.ceil(Math.random()*3);
      for(var i=0; i<times; i++){
        model.childAsteroid(element);
      };
      model.asteroids.splice(model.asteroids.indexOf(element),1)
    })
    destroyed = [];

  },

  initializeGame : function(){
    setInterval(this.createAsteroid, 100);
  }

}

var renderer = new Renderer($("canvas"));
model.initialize($("canvas").width(), $("canvas").height());
model.initializeGame();

setTimeout(controller.play, 1000);


//controller.play()




// Asteroid plan
// When an astroid is created, create it so it's not visible on the screen.
// Using trigonometric functions, calculate a starting velocity angle
// Add +/- 10 degrees to this angle.
// Asteroids should always have a velocity angle that moves them towards the screen
// and then back off of it.

