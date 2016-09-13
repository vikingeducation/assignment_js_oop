$(document).ready(function(){

  var c = document.getElementById("grid");
  var ctx=c.getContext("2d");
  Controller.init();

})

var View = {

  init: function(){
    this.c = document.getElementById("grid");
    this.ctx= this.c.getContext("2d");

    $(document).on("keydown", function(e){
      Controller.rotateShip(e.which);
    });
  },

  render: function(array, ship) {
    this.ctx.fillStyle = "#3370d4";
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    for (var i = 0; i < array.length; i++) {
      this.buildAstr(array[i])
    }
    this.ctx.save();
    this.ctx.translate(ship.xCoord, ship.yCoord);
    this.ctx.rotate(Model.rotation);
    this.buildShip(ship);

    this.ctx.restore();

    // this.ctx.translate(this.c.width / 2, this.c.height / 2);
    // this.ctx.rotate(20*Math.PI/180);
  },

  buildAstr: function(asteroid) {
    this.ctx.beginPath();
    this.ctx.arc(asteroid.xCoord,asteroid.yCoord,asteroid.radius,0,2*Math.PI);
    this.ctx.fill();
  },

  buildShip: function(ship) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(50, 100);
    this.ctx.lineTo(-50, +100);
    this.ctx.fill();
  },

  // buildPShip: function() {
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(ship.xCoord, ship.yCoord);
  //   this.ctx.lineTo(ship.xCoord+50, ship.yCoord+100);
  //   this.ctx.lineTo(ship.xCoord-50, ship.yCoord+100);
  //   this.ctx.fill();
  // },
};

var Controller = {

  init: function() {
    View.init();
    Model.init();
    View.render(Model.astrArray, Model.ship);
    setInterval(function(){
      Model.moveAsteroids();
      Model.removeAsteroids();
      View.render(Model.astrArray, Model.ship);
      Model.countCheck(5);
      Model.ship.tic();
    }, 40);
  },

  rotateShip: function(key){
    Model.rotateShip(key);
  }

};