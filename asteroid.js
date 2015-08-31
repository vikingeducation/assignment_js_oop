// ===================== VIEW ====================
var view = {
  ctx:  $("#drawCanvas")[0].getContext("2d"),
  width:  $("#drawCanvas").width(),
  height: $("#drawCanvas").height(),
  bgReady: false,
  bgImage: new Image(),

  init: function(asteroids){
    window.onload = view.runbgImage();
    view.renderAsteroids(asteroids);
    view.renderBackground();
  },

  runbgImage: function () {
      view.bgReady = true;
      view.bgImage.src = "images/background.png";
  },

  renderBackground: function () {
    if (view.bgReady) {
     view.ctx.drawImage(view.bgImage, 0, 0);
    }
  },

  renderAsteroids: function(asteroids) {
    for(var i = 0; i < model.numOfAsteroids; i++){
      view.ctx.beginPath();
      view.ctx.arc(asteroids[i][0], asteroids[i][1], asteroids[i][2], 0, 2*Math.PI);
      console.log(asteroids[i][0],asteroids[i][1],asteroids[i][2] );
      view.ctx.stroke();
    }
  },

  moveAsteroid: function(asteroid){
    var velocityX = Math.floor(Math.random() * 30);
    var velocityY = Math.floor(Math.random() * 30);
    (asteroid[3] === 1) ? asteroid[0] += velocityX : asteroid[0] -= velocityX;
    (asteroid[4] === 1) ? asteroid[1] += velocityY : asteroid[1] -= velocityY;
    // console.log(this.coordinateY, this.coordinateX);
  },

  gameLoop: function(asteroids){
    for (var i = asteroids.length - 1; i >= 0; i--) {
      view.moveAsteroid(asteroids[i]);
    }
    view.ctx.clearRect(0,0,view.width,view.height);
    view.renderAsteroids(asteroids);
    model.asteroidState = asteroids;
  }

};

// ================= Model ===========
var model = {

  asteroidState: [],
  numOfAsteroids: 10,

  init: function(){
    model.createMultipleAsteroids();
  },

  createAsteroid: function(){
    var position = [];
    var radius = Math.floor(Math.random() * 30 + 20);
    var startX = Math.floor(Math.random() * view.height);
    var startY = Math.floor(Math.random() * view.width);
    var directionX = Math.floor(Math.random() * 2);
    var directionY = Math.floor(Math.random() * 2);
    position.push(startX, startY, radius, directionX, directionY);
    return position;
  },

  createMultipleAsteroids: function(){
    for(var i=0; i < model.numOfAsteroids; i++){
      model.addAsteroid();
    }
  },

  addAsteroid: function(){
    model.asteroidState.push(model.createAsteroid());
  },

  asteroidsEscape: function(){
    for(var i = 0; i < model.numOfAsteroids; i++){
      if ((model.asteroidState[i][0] > view.height || model.asteroidState[i][1] < 0) ||
          (model.asteroidState[i][1] > view.height || model.asteroidState[i][0] < 0)){
        model.asteroidState.splice(i, 1);
        model.addAsteroid();
      }
    }
  }

};

//===================== Controller ================
var controller = {

  init: function(){
    model.init();
    view.init(model.asteroidState);
    controller.gameLoop();
  },

  gameLoop: function(){
    window.gameLoop = window.setInterval(function(){
        view.gameLoop(model.asteroidState);
        model.asteroidsEscape();
    }, 100);

  },

  endGame: function(){
    window.clearInterval(window.gameLoop);
  }

};

$(document).ready(function(){ controller.init(); });
