var controller = {

  init: function(){

    Asteroids.generateData();
    view.render();
    setInterval(controller.play, 3000);
  },

  getAsteroids: function(){
    return Asteroids.asteroids;
  },

  play: function(){
    //will take an event soon
    Asteroids.update();
    view.render();
  },
}


$(document).ready(function(){
  controller.init();
})
