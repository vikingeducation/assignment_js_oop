"use strict";

var GAME = GAME || {};

GAME.util = {
  rand: function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  astrCollide: function(){
    var explodeQueue = [];

    $.each(GAME.model.asteroids, function(i, orgAstr){
      $.each(GAME.model.asteroids, function(j, compareAstr){
        if (i !== j ){ 
          var dist = Math.sqrt( Math.pow(orgAstr.posX - compareAstr.posX, 2) +
                                Math.pow(orgAstr.posY - compareAstr.posY, 2) );
          if (dist < orgAstr.size + compareAstr.size) { 
            explodeQueue.push(i);
            return false;
          }
        }
      });
    });

    return explodeQueue;
  }
};


GAME.Asteroid = function(posX, posY, size, velX, velY){
  this.posX = posX || GAME.util.rand(10,490);
  this.posY = posY || GAME.util.rand(10,490);
  this.size = size || GAME.util.rand(35,45);
  this.velX = velX || GAME.util.rand(-1,1) || GAME.util.rand(-1,1);
  this.velY = velY || GAME.util.rand(-1,1) || GAME.util.rand(-1,1);
};


GAME.Asteroid.prototype.tic = function(){
  this.posX += this.velX;
  this.posY += this.velY;
};


GAME.Asteroid.prototype.draw = function(){
  GAME.canvas.ctx.beginPath();
  GAME.canvas.ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
  GAME.canvas.ctx.stroke();
};


GAME.Ship = function(){
  this.posX = 250;
  this.posY = 250;
  this.vel = 0.15;
  this.angle = 270;
  this.rotateLeft = false;
  this.rotateRight = false;
};


GAME.Ship.prototype.tic = function(){
  if (this.rotateLeft) {
    this.angle -= 10;
  } else if (this.rotateRight) {
    this.angle += 10;
  }

  var radians = this.angle * Math.PI/180;
  this.posX += Math.cos(radians) * this.vel;
  this.posY += Math.sin(radians) * this.vel;
};


GAME.Ship.prototype.draw = function(){
  var ctx = GAME.canvas.ctx;
  
  ctx.save();

  ctx.fillStyle = '#00f';
  ctx.translate(this.posX, this.posY -22 );
  ctx.rotate(this.angle * Math.PI/180);

  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(0, -44);
  ctx.lineTo(-16, 0);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};


GAME.model = {
  ship: new GAME.Ship(),
  asteroids: [],
  // store astr in obj, with ids

  init: function(numAsteroids){
    for (var i=0; i<numAsteroids; i++){
      GAME.model.asteroids.push(new GAME.Asteroid());
    }
  },

};


GAME.controller = {
  init: function(){
    GAME.model.init(5);
    GAME.canvas.init();
    window.requestAnimationFrame(GAME.controller.playLoop, 200);
  },


  playLoop: function(){ 
    GAME.controller.moveAsteroids();
    GAME.controller.explodeAsteroids();
    GAME.controller.moveShip();
    GAME.canvas.draw();
    window.requestAnimationFrame(GAME.controller.playLoop, 200);
  },


  moveShip: function(){
    GAME.model.ship.tic();
  },


  moveAsteroids: function(){
    $.each(GAME.model.asteroids, function(idx, astr){
      astr.tic();

      //bounce off sides of canvas
      if (astr.posY < -50 || astr.posY > 550) {
        astr.velY = -astr.velY;
      }
      if (astr.posX < -50 || astr.posX > 550) {
        astr.velX = -astr.velX;
      }
    });
  },


  explodeAsteroids: function(){
    var explodeQueue = GAME.util.astrCollide();
    var newAsteroids = [];

    if (GAME.util.rand(0,200)  > 195){
      GAME.model.asteroids.push(new GAME.Asteroid());
      GAME.model.asteroids.splice(0,1);
    }

    for( var i=explodeQueue.length - 1; i >= 0; i--){
      var astr = GAME.model.asteroids.splice(explodeQueue[i], 1)[0];
      if (astr.size > 15){ 

        newAsteroids.push(new GAME.Asteroid( astr.posX - astr.size/2,
                                             astr.posY - astr.size/2,
                                             astr.size/2 ) );
        newAsteroids.push(new GAME.Asteroid( astr.posX + astr.size/2,
                                             astr.posY + astr.size/2,
                                             astr.size/2 ));
      } 
    }

    GAME.model.asteroids = GAME.model.asteroids.concat(newAsteroids);
  }
};


GAME.canvas = {

  init: function(){
    GAME.canvas.ctx = $('#space')[0].getContext('2d');
  },

  draw: function(){
    GAME.canvas.ctx.clearRect(0,0,500,500);

    $.each(GAME.model.asteroids, function(i, astr){
      astr.draw();
    });

    GAME.model.ship.draw();
  }
};


$( document ).ready(function(){
  GAME.controller.init();
});





// GAME.AsteroidInst = function(posX, posY){
//   this.posX = posX;
//   this.posY = posY;
//   this.velX = GAME.util.rand(-10,10);
//   this.velY = GAME.util.rand(-10,10);
//   this.tic = function(){
//     this.posX += this.velX;
//     this.posY += this.velY;
//   };
// };

// var protos = [];
// for (var i=0; i<1000; i++){
//   var posX = GAME.util.rand(1,100);
//   var posY = GAME.util.rand(1,100);
//   protos.push(new GAME.AsteroidProto(posX, posY));
// }

// var insts = [];
// for (var i=0; i<1000; i++){
//   var posX = GAME.util.rand(1,100);
//   var posY = GAME.util.rand(1,100);
//   insts.push(new GAME.AsteroidInst(posX, posY));
// }

// console.log("Proto Asteroid Benchmark");
// var startTime = new Date();
// for (var i=0; i<protos.length; i++){
//   for (var j=0; j<100000; j++){
//     protos[i].tic();
//   }
// }
// var endTime = new Date();
// console.log(endTime.getTime() - startTime.getTime());

// console.log("Instance Asteroid Benchmark");
// var startTime = new Date();
// for (var i=0; i<insts.length; i++){
//   for (var j=0; j<100000; j++){
//     insts[i].tic();
//   }
// }
// var endTime = new Date();
// console.log(endTime.getTime() - startTime.getTime());