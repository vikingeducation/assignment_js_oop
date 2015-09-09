//var ASTEROIDS = ASTEROIDS || {};

var model = {


}




var view = {

  drawAsteroid: function() {
    var canvas = $('#playarea')[0].getContext('2d');
    canvas.beginPath();
    canvas.arc(200, 200, 25, 0, Math.PI * 2, false);
    canvas.closePath();
    canvas.strokeStyle = "#000";
    canvas.stroke();
  },


  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
