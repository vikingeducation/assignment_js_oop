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
    
    asteroidModel.update();
    laserModel.moveShots();
    controller.detectCollisions();
    view.render();
    
    
  },

  detectCollisions: function(){
    gameModel.manageLaserCollisions();
    gameModel.manageShipCollisions();
    if(gameModel.status === "over"){
      view.displayEndGame();
    }
  },

  getShip: function(){
    var ship = shipModel.shipReference;
    return ship;
  },

  handleMovement: function(event){
    
    if(event.which >= 37 && event.which <= 40){
      shipModel.moveShip(event.which);
    }  

  },

  handleLaser: function(event){
    if(event.which === 13){
      
      shipModel.fireLaser();
    }
  },

  getShotsFired: function(){
    return laserModel.shotsFired;
  },

  input: false
}


var gameController = {

  score: function(){
    return gameModel.score;
  }
}


$(document).ready(function(){
  controller.init();
})
