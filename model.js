"use strict"

var MY_APP = MY_APP || {};
MY_APP.model = {
	asteroidsNum: 50,
	turnTime: 1,
	asteroids: [],

	generateAsteroids: function () {
		for (var i = 0; i < this.asteroidsNum; i++) {
			this.generateOneAsteroid();
		};
	},




	// Helper methods
	generateOneAsteroid: function () {
		var point = this.enterPoint();
		var x = point.x;
		var y = point.y;
		var vx = Math.random() * 10;
		var vy = Math.random() * 10;
		var newAsteroid = new this.Asteroid(x, y, vx, vy);
		newAsteroid.radius = Math.random() * 50;
		this.asteroids.push(newAsteroid);
	},

	enterPoint: function () {
		var edge = Math.floor(Math.random() * 4 + 1);
		if (edge === 1) {
			var xCoordinate = Math.random() * 1000;
			var yCoordinate = 0;
		} else if (edge === 2) {
			var xCoordinate = Math.random() * 1000;
			var yCoordinate = 500;
		} else if (edge === 3) {
			var xCoordinate = 0;
			var yCoordinate = Math.random() * 500;
		} else {
			var xCoordinate = 1000;
			var yCoordinate = Math.random() * 500;
		};
		return {
			x: xCoordinate,
			y: yCoordinate
		};
	},
};

// Contructors

MY_APP.model.Asteroid = function (x, y, vx, vy) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.xVelocity = vx;
	this.yVelocity = vy;
};

MY_APP.model.Asteroid.prototype.tic = function () {
	this.xCoordinate += this.xVelocity * MY_APP.model.turnTime;
	this.yCoordinate += this.yVelocity * MY_APP.model.turnTime;
};
