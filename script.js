CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 600;
ROCKET_SIZE = 50;
//var ASTEROIDS = ASTEROIDS || {}

model = {

  init: function(num) {
    this.asteroids = model.buildAsteroids(num);
    this.rocket = new model.Rocket();
  },

  buildAsteroids: function(num) {

    var asteroids = []
    for (var i = 0; i < num; i++) {
      asteroids.push(model.createAsteroid());
    }
    model.Asteroid.prototype.tic = function() {
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }
    return asteroids
  },

  getVelocityDir: function() {
    var velNum = Math.floor(Math.random() * 2);
    if (velNum === 1) {
      return 1;
    } else {
      return -1;
    }
  },

  createAsteroid: function() {
    var enterEdge = Math.floor(Math.random() * 4)

      var velocityDir = model.getVelocityDir();
      var size = Math.ceil(Math.random() * 4 + 1) * 10

      var xPos, yPos, xVel, yVel;
      // enter top
      if(enterEdge === 0) {
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = 0
        xVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
        yVel = Math.ceil(Math.random() * 5)
      } else if(enterEdge === 1) { // enter right
        xPos = CANVAS_WIDTH - size - 1
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.ceil(Math.random() * 5) * -1
        yVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
      } else if(enterEdge === 2) { // enter bottom
        xPos = Math.floor(Math.random() * CANVAS_WIDTH)
        yPos = CANVAS_HEIGHT - size - 1
        xVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
        yVel = Math.ceil(Math.random() * 5) * -1
      } else { // enter left
        xPos = 0
        yPos = Math.floor(Math.random() * CANVAS_HEIGHT)
        xVel = Math.ceil(Math.random() * 5)
        yVel = Math.ceil(Math.random() * 5 + 1) * velocityDir;
      }


      return new model.Asteroid(xPos,yPos,xVel,yVel, size);

  },

  Asteroid: function(xPos, yPos, xVel, yVel, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
    this.size = size
  },

  Rocket: function() {
    this.xPos = CANVAS_WIDTH / 2 - ROCKET_SIZE/2;
    this.yPos = CANVAS_HEIGHT / 2 - ROCKET_SIZE/2;
    this.velocity = 0;
    this.direction = 0;
  },

  updateAsteroids: function() {
    var updatedAsteroids = []
    for (var a in model.asteroids) {
      var asteroid = model.asteroids[a];
      if (asteroid.xPos < 0) {
         asteroid.xPos = CANVAS_WIDTH - asteroid.size
      } else if(asteroid.xPos + asteroid.size > CANVAS_WIDTH) {
        asteroid.xPos = 0
      } else if(asteroid.yPos < 0){
        asteroid.yPos = CANVAS_HEIGHT - asteroid.size
      } else if(asteroid.yPos + asteroid.size > CANVAS_HEIGHT) {
        asteroid.yPos = 0
      }


      updatedAsteroids.push(asteroid);

    }
    // var toBuild = model.asteroids.length - updatedAsteroids.length;
    // for (var i = 0; i < toBuild; i++) {
    //   updatedAsteroids.push(model.createAsteroid())
    // }
    model.asteroids = updatedAsteroids;
  },

  moveAsteroids: function() {
    model.updateAsteroids();
    for(var a in model.asteroids){
      model.asteroids[a].tic()
    }
  },

  moveRocket: function(keycode) {
    if (keycode === 37) {
      model.rocket.direction -= 20;
    } else if (keycode === 39) {
      model.rocket.direction += 20;
    } else if (keycode === 38) {
      model.rocket.velocity += 1
      var velocity = model.rocket.velocity
      model.rocket.xPos += velocity * Math.sin(model.rocket.direction * Math.PI / 180);
      model.rocket.yPos -= velocity * Math.cos(model.rocket.direction * Math.PI / 180);
    }
  }

};

controller = {

  init: function(){
    this.play
  },

  play: function() {
    model.init(12)
    view.addArrowKeyEventListener();

    view.render(model.asteroids, model.rocket)
    setInterval(function() {
      model.moveAsteroids()
      view.render(model.asteroids, model.rocket)}, 100);
  },

  moveRocket: function(event){
    model.moveRocket(event.keyCode);
  }

};

view = {
  render: function(asteroids, rocket) {
    var $board = $('#board');
    $board.empty();
    for (var asteroid in asteroids) {
      $board.append('<div></div>')
      $('div').last().css('top', asteroids[asteroid].yPos)
                     .css('left', asteroids[asteroid].xPos)
                     .css("height", asteroids[asteroid].size)
                     .css("width", asteroids[asteroid].size)
                     .addClass('asteroid');
    }
    $board.append('<div></div>')
    $('div').last().css('top', rocket.yPos)
                   .css('left', rocket.xPos)
                   .addClass('rocket')
                   .css('-ms-transform', "rotate("+rocket.direction +"deg)")
                   .css('-webkit-transform', "rotate("+rocket.direction +"deg)")
                   .css('transform', "rotate("+rocket.direction +"deg)")
  },

  addArrowKeyEventListener: function() {
    $('body').on('keydown', controller.moveRocket);
  }
};

$(document).ready(controller.play());