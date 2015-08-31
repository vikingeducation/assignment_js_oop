// ===================== VIEW ====================
var view = {
  ctx:  $("#drawCanvas")[0].getContext("2d"),
  width:  $("#drawCanvas").width(),
  height: $("#drawCanvas").height(),

  createAsteroid: function(){
    var radius = Math.floor((Math.random() * 30) + 20);
    var startX = Math.floor((Math.random() * 30) + 20); 
    var startY = Math.floor((Math.random() * 30) + 20);

    view.ctx.beginPath();
    view.ctx.arc(100,75,radius,0,2*Math.PI);
    view.ctx.stroke();
  }
};

// ================= Model ===========
var model = {
  Asteroid: function(){

  this.velocityX = 1;
  this.velocityY = 2;

  this.tic = function(){
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
