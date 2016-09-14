CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 600;
ROCKET_SIZE = 50;
//var ASTEROIDS = ASTEROIDS || {}

model = {

  init: function(num) {
    this.asteroids = model.buildAsteroids(num);
    this.rocket = new model.Rocket();
    this.missiles = [];
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
    this.xVel = xVel;
    this.yVel = yVel;
    this.size = size;
    this.xPos = xPos - this.size / 2;
    this.yPos = yPos - this.size / 2;
    model.spaceObject.call(this)
  },

  Rocket: function() {
    this.size = 50;
    this.xPos = CANVAS_WIDTH / 2 - this.size / 2;
    this.yPos = CANVAS_HEIGHT / 2 - this.size / 2;
    this.velocity = 0;
    this.direction = 0;
    model.spaceObject.call(this)
  },

  Missile: function() {
    this.xPos = model.rocket.xPos
    this.yPos = model.rocket.yPos
    this.velocity = 4
    this.direction = model.rocket.direction
  },

  spaceObject: function() {
    this.wrapObject = function() {
      if (this.xPos < 0) {
         this.xPos = CANVAS_WIDTH - this.size
      } else if(this.xPos + this.size > CANVAS_WIDTH) {
        this.xPos = 0
      } else if(this.yPos < 0){
        this.yPos = CANVAS_HEIGHT - this.size
      } else if(this.yPos + this.size > CANVAS_HEIGHT) {
        this.yPos = 0
      }
    }
  },

  updateAsteroids: function() {
    var updatedAsteroids = []
    for (var a in model.asteroids) {
      var asteroid = model.asteroids[a];
      asteroid.wrapObject();
      updatedAsteroids.push(asteroid);

    }

    model.asteroids = updatedAsteroids;
  },

  moveAsteroids: function() {
    model.updateAsteroids();
    for(var a in model.asteroids){
      model.asteroids[a].tic()
    }
  },

  moveRocket: function() {
    var velocity = model.rocket.velocity
    model.rocket.wrapObject();
    model.rocket.xPos += velocity * Math.sin(model.rocket.direction * Math.PI / 180);
    model.rocket.yPos -= velocity * Math.cos(model.rocket.direction * Math.PI / 180);

    if(velocity > 0) {
      model.rocket.velocity -= 0.5
    }
  },

  moveMissiles: function() {
    var updatedMissiles = []
    for(var m in model.missiles) {
      var m = model.missiles[m]

      var velocity = m.velocity
      m.xPos += velocity * Math.sin(m.direction * Math.PI / 180);
      m.yPos -= velocity * Math.cos(m.direction * Math.PI / 180);

      if(m.xPos > 0 && m.xPos < CANVAS_WIDTH && m.yPos > 0 && m.yPos < CANVAS_HEIGHT) {
      updatedMissiles.push(m)
      }
    }

    model.missiles = updatedMissiles
  },

  adjustRocket: function(keycode) {
    if (keycode === 37) {
      model.rocket.direction -= 20;
    } else if (keycode === 39) {
      model.rocket.direction += 20;
    } else if (keycode === 38) {
      model.rocket.velocity += 1.5
    }
  },

  checkForCollisions: function() {
    var rocketXMax = model.rocket.xPos + model.rocket.size;
    var rocketXMin = model.rocket.xPos - model.rocket.size;
    var rocketYMax = model.rocket.yPos + model.rocket.size;
    var rocketYMin = model.rocket.yPos - model.rocket.size;
    for (var i in model.asteroids) {
      var astX = model.asteroids[i].xPos;
      var astY = model.asteroids[i].yPos;
      var radius = model.asteroids[i].size / 2;

      if (astX - radius > rocketXMin && astX + radius < rocketXMax && astY - radius > rocketYMin && astY + radius < rocketYMax) {
        return true;
      }
    }
    return false;
  },

  fireMissile: function(keyCode) {
    if(keyCode === 32) {
      model.missiles.push(new model.Missile())
    }
  }

};

controller = {

  init: function(){
    this.play
  },

  play: function() {
    model.init(1)
    view.addArrowKeyEventListener();
    view.addSpaceBarListener();
    view.render(model.asteroids, model.rocket, model.missiles)

    var gameLoop = setInterval(function() {
      model.moveAsteroids()
      model.moveRocket()
      model.moveMissiles()
      var gameOver = model.checkForCollisions();
      if (gameOver) {
        clearInterval(gameLoop);
        alert("You lose!!")
      }
      view.render(model.asteroids, model.rocket, model.missiles)}, 100);
  },

  adjustRocket: function(event){
    model.adjustRocket(event.keyCode);
  },

  fireMissile: function(event) {
    model.fireMissile(event.keyCode);
  }

};

view = {
  render: function(asteroids, rocket, missiles) {
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
                   .css('transform', "rotate("+rocket.direction +"deg)");

    for (var m in missiles) {
      $board.append('<div></div>')
      $('div').last().addClass('missile')
                  .css('top', missiles[m].yPos)
                  .css('left', missiles[m].xPos)
                  .css('-ms-transform', "rotate("+missiles[m].direction +"deg)")
                  .css('-webkit-transform', "rotate("+missiles[m].direction +"deg)")
                  .css('transform', "rotate("+missiles[m].direction +"deg)");
    }
  },

  addArrowKeyEventListener: function() {
    $('body').on('keydown', controller.adjustRocket);
  },

  addSpaceBarListener: function() {
    $('body').on("keypress", controller.fireMissile);
  }
};

$(document).ready(controller.play());