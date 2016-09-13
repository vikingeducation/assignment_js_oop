var AN = AN || {};

var pic = new Image();

AN.initialize = function() {
  window.addEventListener("mousemove", AN.moveMouse, false);

  cv = $('canvas')[0];
  canvas = cv.getContext('2d');
  pic.src = "spaceship.png";

};

AN.moveMouse = function(e) {
  canvas.clearRect(0, 0, 600, 425);
  var xPos = e.clientX;
  var yPos = e.clientY;
  console.log(e.clientX + " , " + e.clientY);
  canvas.drawImage(pic, xPos, yPos, pic.width, pic.height);
};

$(document).ready(function(){
  AN.initialize();
})
