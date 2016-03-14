var view = {

  
  init: function(){
    //listeners

  this.canvas = document.getElementById('board');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = 500;
  this.canvas.height = 500;

    
  this.render();
  },

  render: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


    asteroidModel.collection.forEach(function(element, index){
      view.renderAsteroid(element);
      //console.log(index);
    })

  }, 

  renderAsteroid: function(element){
    
    this.context.beginPath();
    this.context.arc(element.X,element.Y,element.radius, 0, Math.PI*2, false);
    this.context.closePath();

    this.context.strokeStyle = "#FF0000";
    this.context.stroke();

  },


  // renderspaceShip: function(){
  //   this.context.beginPath();
  //   ctx.beginPath();
  //   ctx.moveTo(75,50);
  //   ctx.lineTo(100,75);
  //   ctx.lineTo(100,25);
  //   ctx.fill();

  //   this.context.strokeStyle = "#FFF";
  //   this.context.stroke();
  // },

  tic: function(){
  }

}