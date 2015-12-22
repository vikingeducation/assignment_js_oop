"use strict";

function PrototypalAsteroid(options) {
  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };

  if (options) {
    this.position = options['position'] || this.position;
    this.velocity = options['velocity'] || this.velocity;
  }
}

PrototypalAsteroid.prototype.update = function() {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

PrototypalAsteroid.prototype.contructor = PrototypalAsteroid;

function InstantialAsteroid(options) {
  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };

  if (options) {
    this.position = options['position'] || this.position;
    this.velocity = options['velocity'] || this.velocity;
  }

  this.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };
}

InstantialAsteroid.prototype.contructor = InstantialAsteroid;

