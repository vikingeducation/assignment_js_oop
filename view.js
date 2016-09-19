"use strict"

var MY_APP = MY_APP || {};

MY_APP.view = {
	ctx: function () {
		return $("#gameboard")[0].getContext('2d');
	},

	init: function () {
		this.initializeBackGround();
		this.keyMonitor();
	},

	keyMonitor: function () {
		$(document).keydown(function (e) {
			MY_APP.controller.shipCourseChange(e.keyCode);
		})
	},

	initializeBackGround: function () {
		this.ctx().fillStyle = "black";
		this.ctx().fillRect(0, 0, 1000, 500);
	},

	drawAsteroid: function (asteroid) {
		this.ctx().fillStyle = asteroid.paintcolor;
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

	drawSpaceShip: function (spaceShip, color) {
		this.ctx().fillStyle = color;
		this.ctx().beginPath();
		var n = 10;
		var x = spaceShip.xCoordinate;
		var y = spaceShip.yCoordinate;
		var head = spaceShip.head;
		var topTail = spaceShip.topTail;
		var bottomTail = spaceShip.bottomTail;
		this.ctx().moveTo(head.x + x, head.y + y);
		this.ctx().lineTo(topTail.x + x, topTail.y + y);
		this.ctx().lineTo(bottomTail.x + x, bottomTail.y + y);
		this.ctx().fill();
	},

	drawBullet: function (bullet, color) {
		this.ctx().fillStyle = color;
		this.ctx().beginPath();
		var x = bullet.xCoordinate;
		var y = bullet.yCoordinate;
		var radius = 2;
		var startAngle = 0;
		var endAngle = Math.PI * 2;
		var anticlockwise = true;
		this.ctx().arc(x, y, radius, startAngle, endAngle, anticlockwise);
		this.ctx().fill();
	},

	showGameOver: function () {
		$('header h2').html("Game Over")
	},




	// helper methods
};
