function Asteroid(xPos, yPos, xVel, yVel) {
  this.xPos = xPos
  this.yPos = yPos
  this.xVel = xVel
  this.yVel = yVel
}

Asteroid.prototype.tic = function() {
  console.log(this)
  this.xPos += this.xVel
  this.yPos += this.yVel
}

a = new Asteroid(0, 0, 1, 1)
// a.tic

controller = {
  play: function() {
    setInterval(a.tic(this), 1000)
  }
}

$(document).ready(controller.play)