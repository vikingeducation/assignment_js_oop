var controller = {

  init: function(){

    model.generateData();
    view.render();
    setInterval(controller.play, 3000);
  },

  getAsteroids: function(){
    return model.asteroids;
  },

  play: function(){
    //will take an event soon
    model.update();
    view.render();
  },
}


$(document).ready(function(){
  controller.init();
})
