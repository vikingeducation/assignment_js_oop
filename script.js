$(document).ready(function(){
  // var asteroidInterval = setInterval(createAsteroid, 1000);

  var c = document.getElementById("grid");
  var ctx=c.getContext("2d");
  Controller.init();
  
})

var View = {

  init: function(){
    this.c = document.getElementById("grid");
    this.ctx= this.c.getContext("2d");
  },

  render: function(array) {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    for (var i = 0; i < array.length; i++) {
      this.buildAstr(array[i])
    }
  },

  buildAstr: function(asteroid) {
    this.ctx.beginPath();
    this.ctx.arc(asteroid.xCoord,asteroid.yCoord,asteroid.radius,0,2*Math.PI);
    this.ctx.stroke();
  },

};

var Controller = {

  init: function() {
    View.init();
    Model.init();
    View.render(Model.astrArray);
    setInterval(function(){
      Model.moveAsteroids();
      View.render(Model.astrArray);
    }, 1000);
  }

};