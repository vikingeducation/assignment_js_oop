"use strict";

var GAME = GAME || {};

GAME.util = {
  rand: function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


  touch: function(obj, collection, padding){
    var isTouching = false;
    var padding = padding || 0;
    $.each(collection, function(idx, colObj){
      if (obj !== colObj){      
        var dist = Math.sqrt( Math.pow(obj.posX - colObj.posX, 2) +
                              Math.pow(obj.posY - colObj.posY, 2) );
        if (dist + padding < obj.size + colObj.size) { 
          isTouching = true;
          return false;
        }
      }
    });
    return isTouching;
  }
};


GAME.Asteroid = function(posX, posY, size, velX, velY){
  this.posX = posX || GAME.util.rand(10,490);
  this.posY = posY || GAME.util.rand(10,490);
  this.size = size || GAME.util.rand(35,45);
  this.velX = velX || GAME.util.rand(-0.5,1) || GAME.util.rand(-1,0.5);
  this.velY = velY || GAME.util.rand(-0.5,1) || GAME.util.rand(-1,0.5);
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
  this.size = 35;
  this.vel = 0.5;
  this.angle = 270;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.accel = false;
};


GAME.Ship.prototype.tic = function(){
  if (this.rotateLeft) {
    this.angle -= 10;
  } else if (this.rotateRight) {
    this.angle += 10;
  } else if (this.accel) {
    if ( this.vel < 2 ){
      this.vel += 0.1;
    }
  }

  var radians = this.angle * Math.PI/180;
  this.posX += Math.cos(radians) * this.vel;
  this.posY += Math.sin(radians) * this.vel;
};


GAME.Ship.prototype.draw = function(){
  var ctx = GAME.canvas.ctx;
  
  ctx.save();

  ctx.fillStyle = '#00f';
  ctx.translate(this.posX, this.posY );
  ctx.rotate(this.angle * Math.PI/180);

  ctx.beginPath();
  ctx.moveTo(44, 0);
  ctx.lineTo(0, 16);
  ctx.lineTo(0, -16);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};


GAME.Ship.prototype.fire = function(){
  GAME.model.pewpews.push(new GAME.Pewpew());
};


GAME.Pewpew = function(){
  this.size = 2;
  this.vel = GAME.model.ship.vel + 1 * 2;
  this.angle = GAME.model.ship.angle;

  var radians = this.angle * Math.PI/180;
  this.posX = GAME.model.ship.posX + (Math.cos(radians) * 44);
  this.posY = GAME.model.ship.posY + (Math.sin(radians) * 44);
};


GAME.Pewpew.prototype.tic = function(){
  var radians = this.angle * Math.PI/180;
  this.posX += Math.cos(radians) * this.vel;
  this.posY += Math.sin(radians) * this.vel; 
};


GAME.Pewpew.prototype.draw = function(){
  GAME.canvas.ctx.fillStyle = '#f00';
  GAME.canvas.ctx.beginPath();
  GAME.canvas.ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
  GAME.canvas.ctx.fill();
};


GAME.model = {

  init: function(numAsteroids){
    GAME.model.score = 0;
    GAME.model.lives = 10;
    GAME.model.ship = new GAME.Ship();
    GAME.model.asteroids = [];
    GAME.model.pewpews = [];
    GAME.model.newRandAsteroid(numAsteroids);
  },


  newRandAsteroid: function(numAsteroids){
    numAsteroids = numAsteroids || 1;
    for (var i=0; i<numAsteroids; i++){
      var astr = new GAME.Asteroid();
      while( GAME.util.touch(astr, GAME.model.asteroids, 10) || 
             GAME.util.touch(astr, [GAME.model.ship], 100) ){
        astr = new GAME.Asteroid();
      }
      GAME.model.asteroids.push(astr);
    }
  }
};


GAME.controller = {
  init: function(){
    GAME.controller.bindKeys();
    GAME.controller.startGame();
  },


  startGame: function(){
    GAME.model.init(3);
    GAME.view.init();
    GAME.canvas.init();
    GAME.controller.playLoop();
  },


  bindKeys: function(){
    $('body').on("keydown", function(event){
      if (event.which === 37){
        GAME.model.ship.rotateLeft = true;
      } else if (event.which === 39){
        GAME.model.ship.rotateRight = true;
      } else if (event.which === 38){
        GAME.model.ship.accel = true;
      }
    });

    $('body').on("keyup", function(event){
      if (event.which === 37){
        GAME.model.ship.rotateLeft = false;
      } else if (event.which === 39){
        GAME.model.ship.rotateRight = false;
      } else if (event.which === 32){
        GAME.model.ship.fire();
      } else if (event.which === 38){
        GAME.model.ship.accel = false;
        GAME.model.ship.vel = 0.5;
      }
    });  },


  playLoop: function(){ 
    GAME.controller.moveAsteroids();
    GAME.controller.moveShip();
    GAME.controller.movePewpews();
    
    GAME.controller.explodeAsteroids();

    if (GAME.controller.shipHurt()){
      GAME.model.lives -= 1;
      GAME.controller.updateStats();
    }
    
    if (GAME.controller.gameOver()){
      window.cancelAnimationFrame(GAME.controller.loopID);
      GAME.controller.startGame();
      return false;
    }

    GAME.canvas.draw();
    GAME.controller.loopID = window.requestAnimationFrame(GAME.controller.playLoop, 200);
  },


  moveShip: function(){
    GAME.model.ship.tic();
  },


  movePewpews: function(){
    $.each(GAME.model.pewpews, function(idx, pewpew){
      pewpew.tic();
    });
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
    var explodeAstr = [];
    var explodePewpew = [];
    var newAsteroids = [];

    $.each(GAME.model.asteroids, function(idx, astr){
      if (GAME.util.touch(astr, GAME.model.asteroids)) {
        explodeAstr.push(idx);
      }
    });

    $.each(GAME.model.asteroids, function(astrIdx, astr){
      $.each(GAME.model.pewpews, function(pewpewIdx, pewpew){
        if ( GAME.util.touch(astr, [pewpew]) &&
             !(explodeAstr.includes(astrIdx)) ) {
          GAME.model.score += 10;
          GAME.controller.updateStats();
          explodeAstr.push(astrIdx);
          explodePewpew.push(pewpewIdx);
        }
      });
    });

    if (GAME.util.rand(0,200)  > 199){
      GAME.model.newRandAsteroid();
    }


    for( var i=explodePewpew.length - 1; i >= 0; i--){
      GAME.model.pewpews.splice(explodePewpew[i], 1);
    }

    for( var i=explodeAstr.length - 1; i >= 0; i--){
      var astr = GAME.model.asteroids.splice(explodeAstr[i], 1)[0];
      if (astr && astr.size > 15){ 

        newAsteroids.push(new GAME.Asteroid( astr.posX - astr.size/2,
                                             astr.posY - astr.size/2,
                                             astr.size/2 ) );
        newAsteroids.push(new GAME.Asteroid( astr.posX + astr.size/2,
                                             astr.posY + astr.size/2,
                                             astr.size/2 ));
      } 
    }

    GAME.model.asteroids = GAME.model.asteroids.concat(newAsteroids);
  },


  updateStats: function(){
    GAME.view.updateLives(GAME.model.lives);
    GAME.view.updateScore(GAME.model.score);
  },


  shipHurt: function(){
    var isShipHurt = false;
    var vaporizeAstroids = [];

    //vaporize astr if it touches ship's "shield"
    $.each(GAME.model.asteroids, function(idx, astr){
      if ( GAME.util.touch(GAME.model.ship, [astr]) ){
        isShipHurt = true;
        vaporizeAstroids.push(idx);
      }
    });

    for( var i=vaporizeAstroids.length - 1; i >= 0; i--){
      GAME.model.asteroids.splice(vaporizeAstroids[i], 1);
    }

    if (GAME.model.ship.posX > 490 ||
        GAME.model.ship.posX < 10  ||
        GAME.model.ship.posY > 490 ||
        GAME.model.ship.posY < 10 ){
      isShipHurt = true;
    } 
   
    return isShipHurt;
  },


  gameOver: function(){
    if (GAME.model.lives === 0){ return true; }
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

    $.each(GAME.model.pewpews, function(i, pewpew){
      pewpew.draw();
    });

    GAME.model.ship.draw();
  }
};


GAME.view = {

  init: function(){
    GAME.view.score = $('#score');
    GAME.view.lives = $('#lives');
    GAME.view.updateScore(GAME.model.score);
    GAME.view.updateLives(GAME.model.lives);
  },

  updateScore: function(newScore){
    GAME.view.score.text(newScore);
  },


  updateLives: function(newLives){
    GAME.view.lives.text(newLives);
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