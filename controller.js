var controller = {

  init: function(){
    asteroidModel.init(10);
<<<<<<< HEAD
    view.init();
    setInterval(function(){controller.update()}, 100);
=======
    view.init(asteroidModel.collection);

    setInterval(function(){controller.update()}, 60);
>>>>>>> 60a2e4e9719900d1e7262a8599ee82d1825696ef
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
    view.render(asteroidModel.collection);
  }

}

$(document).ready(function(){
  controller.init();
});