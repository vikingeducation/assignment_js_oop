$(document).ready(function(){
  // var asteroidInterval = setInterval(createAsteroid, 1000);

  var c = document.getElementById("grid");
  var ctx=c.getContext("2d");
  Controller.init();
  
})

var View = {

  render: function(array) {
    var c = document.getElementById("grid");
    var ctx= c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < array.length; i++) {
      this.buildAstr(array[i])
    }
  },

  buildAstr: function(asteroid) {
    var c = document.getElementById("grid");
    var ctx= c.getContext("2d");
    ctx.beginPath();
    ctx.arc(asteroid.xCoord,asteroid.yCoord,asteroid.radius,0,2*Math.PI);
    ctx.stroke();
  },

};

var Controller = {

  init: function() {
    Model.init();
    View.render(Model.astrArray);
  }

};