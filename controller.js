var controller = {

  init: function(){
    // set initial values for ship
    ship.locationX = 115;
    ship.locationY = 160;
    ship.direction = 0.0 * Math.PI;

    view.clearCanvas();
    view.drawShip( ship );
  },

  setDirection: function(  ) {
    console.log('im here');
    ship.direction += 1/2 * Math.PI
    view.clearCanvas();
    view.drawShip( ship );
  },

  direction: "",

};
