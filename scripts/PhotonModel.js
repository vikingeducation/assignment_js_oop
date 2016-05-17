'use strict;'

function Photon(x, y, direction, velocity){
  this.x = x;
  this.y = y;
  this.theta = getTheta(direction);
  this.velocity = velocity + 2;
}

Photon.prototype.tic = function(){
  // move location
  this.x = arcX(this.x, this.velocity, this.theta);
  this.y = arcY(this.y, this.velocity, this.theta);
};