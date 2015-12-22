"use strict";

var ASTEROIDS = ASTEROIDS || {};
ASTEROIDS.events = ASTEROIDS.events || {};

ASTEROIDS.events.Event = function Event(options) {
  this.selector = document;
  this.loop = false;
  this.speed = 1000;
  this.listeners = [];

  this._event = 'event';
  this._id = null;

  if (options) {
    this.selector = options['selector'] || this.selector;
    this.loop = options['loop'] || this.loop;
    this.speed = options['speed'] || this.speed;
    this.listeners = options['listeners'] || this.listeners;
  }
};

ASTEROIDS.events.Event.prototype.fire = function() {
  $(this.selector)
    .trigger(this._event);
};

ASTEROIDS.events.Event.prototype.start = function() {
  this._startMethod();
};

ASTEROIDS.events.Event.prototype.stop = function() {
  this._stopMethod();
};

ASTEROIDS.events.Event.prototype.addListener = function(listener) {
  this.listeners.push(listener);
  $(this.selector).bind(this._event, listener);
};

ASTEROIDS.events.Event.prototype.removeListener = function(listener) {
  var index = this.listeners.indexOf(listener);
  this.listeners.splice(index, 1);
  $(this.selector).unbind(this._event, listener);
};

ASTEROIDS.events.Event.prototype.removeAll = function(listener) {
  this.listeners.forEach(function(listener) {
    this.removeListener(listener);
  });
};

ASTEROIDS.events.Event.prototype._startMethod = function() {
  var method = (this.loop) ? setInterval : setTimeout;
  this._id = method($.proxy(this.fire, this), this.speed);
};

ASTEROIDS.events.Event.prototype._stopMethod = function() {
  var method = (this.loop) ? clearInterval : clearTimeout;
  method(this._id);
  this._id = null
};

