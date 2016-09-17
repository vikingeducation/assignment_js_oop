var controller = {

  init: function(){

    asteroidModel.generateData();
    shipModel.placeShip();
    view.init();
    
  },

  getAsteroids: function(){
    return asteroidModel.asteroids;
  },

  play: function(){
    //this is called each interval
    if(controller.input === true){
      //do absolutely nothing 
    } else {
      asteroidModel.update();
      laserModel.moveShots();
      view.render();
    }

    controller.input = false;
    
  },

  getShip: function(){
    var ship = shipModel.shipReference;
    return ship;
  },

  processInput: function(event){
    controller.input = true;
    if(event.which >= 37 && event.which <= 40){
      shipModel.moveShip(event.which);
    } else if(event.which === 13){
      
      shipModel.fireLaser();
    }

    asteroidModel.update()
    laserModel.moveShots();
    view.render();

  },

  getShotsFired: function(){
    return laserModel.shotsFired;
  },

  input: false
}


$(document).ready(function(){
  controller.init();
})
