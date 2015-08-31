var Ship = function(){
  this.rotation = 0;
  this.boundingBoxSize = 5,

  this.position = {
    x: 350,
    y: 350,
  },

  this.velocity = {
    x: 0,
    y: 0,
  },

  this.rotateLeft = function(){
    rotation++;
  },

  this.rotateRight = function(){
    rotation--;
  }

  this.thrust = function(){
    this.velocity.y += Math.cos(this.rotation);
    this.velocity.x += Math.sin(this.rotation);
  }


}

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
    return (this.position.x <= -11 ||
            this.position.x >= renderer.canvas.width() + 11 ||
            this.position.y <= -11 ||
            this.position.y >= renderer.canvas.height() + 11);
  }

  this.colliding = function(target){
    // console.log(this.position.x, this.position.y, target.position.x, target.position.y);
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
    this.drawShip(ship);
    asteroids.forEach(function(element){
      renderer.drawAsteroid(element);
    });
  };

  this.drawShip = function(ship){
    this.canvas.drawRect({
      fillStyle: "white",
      x: ship.position.x,
      y: ship.position.y,
      width: 50,
      height: 100,
      rotate: ship.rotation,
    })
  }

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

  initControls: function(){
    var keys = {
      37: this.rotateLeft,
      38: this.thrust,
      39: this.rotateRight,
      // 32: shoot,
    }

    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        controller.keys[e.keyCode]();
      }
    })
  },

  rotateLeft: function(){
    ship.rotateLeft();
  },

  rotateRight: function(){
    ship.rotateRight();
  },

  thrust: function(){
    ship.thrust();
  },

  play: function(){
    loopMove : setInterval(function(){
      model.updateAsteroids();
    requestAnimationFrame(function(){
      renderer.redraw(model.asteroids)
    });
    }, 30);
  },

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
    if (model.asteroids.length > 30) return;
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

    var velx =  (model.width/(Math.random() * 5)-x)/ 250,
        vely =  (model.height/(Math.random() * 5)-y)/ 250,
        size = (Math.random() * 50) + 30;

    // Add +/- 20 degree variance to the velocity
    model.asteroids.push(new Asteroid({x: x, y: y}, {x: velx, y: vely} , size));

  },

  childAsteroid : function(parent, times){
    console.log(parent);
    if (!parent) return;
    if (parent.size/times< 15) return ;
    var x = parent.position.x + (Math.ceil(Math.random() * 100)) - 50,
        y = parent.position.y + (Math.ceil(Math.random() * 100)) - 50,
        velx = -parent.velocity.x,
        vely = -parent.velocity.y,
        size = parent.size/times;
    console.log(x, y, velx, vely, size);
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


    // console.log(model.asteroids.length);
    var destroyed = [];

    for(var i = 0; i < model.asteroids.length-1; i++){
      for(var j = i+1; j < model.asteroids.length; j++){

        if(model.asteroids[i].colliding(model.asteroids[j])){
          destroyed.push(model.asteroids[i]);
          destroyed.push(model.asteroids[j]);
        }
      }
    }

    destroyed.forEach(function(element){
      var times = Math.ceil(Math.random()*3);
      for(var i=0; i<times; i++){
        model.childAsteroid(element, times);
      };
      model.asteroids.splice(model.asteroids.indexOf(element),1)
    })
    destroyed = [];

  },

  initializeGame : function(){
    setInterval(this.createAsteroid, 100);
  }

}

var ship = new Ship();
controller.initControls();
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

