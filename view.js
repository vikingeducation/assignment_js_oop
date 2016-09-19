"use strict"

var MY_APP = MY_APP || {};

MY_APP.view = {
	ctx: function () {
		return $("#gameboard")[0].getContext('2d');
	},

	init: function () {
		this.initializeBackGround();
	},

	initializeBackGround: function () {
		this.ctx().fillStyle = "black";
		this.ctx().fillRect(0, 0, 1000, 500);
	},

	drawAsteroid: function (asteroid, color) {
		// this.initializeBackGround();

		this.ctx().fillStyle = color;
		this.ctx().beginPath();
		var x = asteroid.xCoordinate;
		var y = asteroid.yCoordinate;
		var radius = asteroid.radius;
		var startAngle = 0;
		var endAngle = Math.PI * 2;
		var anticlockwise = true;
		this.ctx().arc(x, y, radius, startAngle, endAngle, anticlockwise);
		this.ctx().fill();
	},




	// helper methods
};
