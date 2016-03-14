var controller = {

  init: function(){
    asteroidModel.init();
  }

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

}

$(document).ready(function(){
  controller.init();
});