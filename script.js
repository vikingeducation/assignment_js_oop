// =====================VIEW ====================
var view = {

};

// =================Model ===========
var model = {

  astroid: function(){
    this.coordinateX = 0;
    this.coordinateY = 0;
    this.velocityX = 1;
    this.velocityY = 2;
  },

  astroid.prototype.tic = function(){
    this.coordinateX += this.velocityX; 
    this.coordinateY += this.velocityY;
       console.log(this)
        console.log("tick")
  }
};


//=====================Controller ================
var controller = {

};


model.astroid();

setInterval(model.astroid.prototype.tic, 500);
