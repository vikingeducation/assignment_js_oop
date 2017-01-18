"use strict";

var APP = APP || {};

APP.helpers = {
  randomColor: function(){
    var hex = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + hex;
  }
};
