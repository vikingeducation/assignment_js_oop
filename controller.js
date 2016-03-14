var controller = {

  init: function(){
    asteroidModel.init(5);
    view.init();
    setInterval(function(){controller.update()}, 60);
    //after update need to clear canvas and then re-render
  },

//setinterval
  //creates a new asteroid each loop
  //pushed to our collection
  //all asteroids are moved each interval

//Question
  //how to asteroids appear on the page? 
  //from the side?
  //when asteroids float off the page
  //hack, x starting limiting -5 to 0 || 500 to 505
  //must make border at least as big as asteroid max size

  update: function(){
    asteroidModel.tic();
    spaceshipModel.tic();
    bulletModel.tic();
    view.render();
  }

}

$(document).ready(function(){
  controller.init();
});