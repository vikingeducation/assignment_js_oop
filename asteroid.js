// ===================== VIEW ====================
var view = {
  ctx:  $("#drawCanvas")[0].getContext("2d"),
  width:  $("#drawCanvas").width(),
  height: $("#drawCanvas").height(),
  bgReady: false,
  bgImage: new Image(),

  createAsteroid: function(){
    var radius = Math.floor(Math.random() * 30 + 20);
    var startX = Math.floor(Math.random() * view.height); 
    //(startX >= view.height/ 2) ? startX += view.height : startX -= view.height;
    var startY = Math.floor(Math.random() * view.width);
    //(startY >= view.width/ 2) ? startY += view.width : startY -= view.width;


      console.log(startX);
      console.log(startY);

    view.ctx.beginPath();
    view.ctx.arc(startX , startY ,radius,0,2*Math.PI);
    view.ctx.stroke();
  },

  render: function () {
    if (view.bgReady) {
     view.ctx.drawImage(view.bgImage, 0, 0);
    }
  }
};

// ================= Model ===========
var model = {
  Asteroid: function(){

  this.velocityX = 1;
  this.velocityY = 2;

  this.move = function(){
    this.coordinateX += this.velocityX;
    this.coordinateY += this.velocityY;
    // console.log(this.coordinateY, this.coordinateX);
    };
  }

};

//===================== Controller ================
var controller = {

};

view.createAsteroid();

view.bgImage.onload = function () {
  view.bgReady = true;

  };

view.bgImage.src = "images/background.png";


