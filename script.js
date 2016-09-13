function Asteroid(xPos, yPos, xVel, yVel) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = xVel;
  this.yVel = yVel;
}

Asteroid.prototype.tic = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
}

function AsteroidConst(xPos, yPos, xVel, yVel) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = xVel;
  this.yVel = yVel;
  this.tic = function() {
    this.xPos += this.xVel;
    this.yPos += this.yVel;
  };
}

// a = new Asteroid(0, 0, 1, 1);
// a.tic

controller = {
  // play: function() {
  //   setInterval(function(){
  //     a.tic.apply(a);
  //   }, 1000);
  // }

  benchmark: function() {
    var astArray = []
    for (var i = 0; i < 1000; i++) {
      var xPos = Math.floor(Math.random() * 100)
      var yPos = Math.floor(Math.random() * 100)
      var xVel = Math.floor(Math.random() * 10)
      var yVel = Math.floor(Math.random() * 10)
      var newAst = new Asteroid(xPos,yPos,xVel,yVel);
      astArray.push(newAst);
    }

    var timeBefore = new Date();

    for (var i = 0; i < astArray.length; i++) {
      for (var j = 0; j < 1000; j++) {
        astArray[i].tic();
      }
    }

    var timeAfter = new Date();

    var timeElapsedProto = timeAfter.getTime() - timeBefore.getTime();

    astArray = []
    for (var i = 0; i < 1000; i++) {
      var xPos = Math.floor(Math.random() * 100)
      var yPos = Math.floor(Math.random() * 100)
      var xVel = Math.floor(Math.random() * 10)
      var yVel = Math.floor(Math.random() * 10)
      var newAst = new AsteroidConst(xPos,yPos,xVel,yVel);
      astArray.push(newAst);
    }

    timeBefore = new Date();

    for (var i = 0; i < astArray.length; i++) {
      for (var j = 0; j < 1000; j++) {
        astArray[i].tic();
      }
    }

    timeAfter = new Date();

    var timeElapsedInher = timeAfter.getTime() - timeBefore.getTime();



    console.log("Tic time for Proto: " + timeElapsedProto);
    console.log("Tic time for Inher: " + timeElapsedInher);
  }
}

$(document).ready(controller.benchmark);