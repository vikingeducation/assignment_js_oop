var controller = {

  init: function(){
    // set initial values for ship
    ship.locationX = 115;
    ship.locationY = 160;
    ship.direction = 270;

    view.drawShip( ship );
  },

  direction: "",

};
