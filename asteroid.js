// ===================== VIEW ====================
var view = {
  ctx:  $("#drawCanvas")[0].getContext("2d"),
  width:  $("#drawCanvas").width(),
  height: $("#drawCanvas").height(),
  bgReady: false,
  bgImage: new Image(),

  init: function(){
    window.onload = view.runbgImage();
    view.render();
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
      model.ctx.beginPath();
      model.ctx.arc(asteroid[0], asteroid[1], asteroid[2], 0, 2*Math.PI);
      model.ctx.stroke();
    }
  },

  moveAsteroid: function(asteroid){
    var velocityX = Math.floor(Math.random() * 5);
    var velocityY = Math.floor(Math.random() * 5);
    this.move = function(asteroid){
    asteroid.coordinateX += velocityX;
    asteroid.coordinateY += velocityY;
    // console.log(this.coordinateY, this.coordinateX);
    };
  },

  gameLoop: function(){

  }

};

// ================= Model ===========
var model = {

  asteroidState: [],
  numOfAsteroids: 20,

  init: function(){
    model.createMultipleAsteroids();
  },

  createAsteroid: function(){
    position = [];
    var radius = Math.floor(Math.random() * 30 + 20);
    var startX = Math.floor(Math.random() * view.height);
    var startY = Math.floor(Math.random() * view.width);
    position.push(startX).push(startY).push(radius);
    return position;
  },

  createMultipleAsteroids: function(){
    for(var i=0; i < model.numOfAsteroids; i++){
      model.addAsteroids();
    }
  },

  addAsteroids: function(){
    model.asteroidState.push(model.createAsteroid());
  },

};

//===================== Controller ================
var controller = {

  init: function(){
    model.init();
    view.init(asteroidState);
    controller.gameLoop();
  },

  gameLoop: function(){
    window.gameLoop = window.setInterval(view.gameLoop, 500);
  },

  endGame: function(){
    window.clearInterval(window.gameLoop);
  }

};

$(document).ready(function(){ controller.init(); });
