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
    asteroidModel.update();
    laserModel.moveShots();
    view.render();
  },

  getShip: function(){
    var ship = shipModel.shipReference;
    return ship;
  },

  processInput: function(event){
    
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
  }
}


$(document).ready(function(){
  controller.init();
})
