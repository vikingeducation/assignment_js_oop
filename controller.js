"use strict"

var MY_APP = MY_APP || {};

MY_APP.controller = {
	init: function () {
		MY_APP.view.init();
		MY_APP.model.generateAsteroids();
		MY_APP.model.generateSpaceShip();
		setInterval(function () {
			MY_APP.view.initializeBackGround();
			MY_APP.controller.moveAllAsteroids();
			MY_APP.controller.moveSpaceShip();
			MY_APP.controller.moveAllBullets();
		}, 50);
	},

	moveAllBullets: function () {
		var bullets = MY_APP.model.bullets;
		for (var i = 0; i < bullets.length; i++) {
			this.moveBullet(bullets[i]);
		}
	},

	moveSpaceShip: function () {
		var spaceShip = MY_APP.model.spaceShip;
		spaceShip.changePosition();
		MY_APP.view.drawSpaceShip(spaceShip, "red");
	},

	shipCourseChange: function (key) {
		MY_APP.model.changeShipCourse(key);
	},

	moveAllAsteroids: function () {
		MY_APP.model.explodeIfCollision();
		MY_APP.model.clearSmallAsteroid();
		var asteroids = MY_APP.model.asteroids;
		for (var i = 0; i < asteroids.length; i++) {
			this.moveAsteroid(asteroids[i]);
		};
	},



	// Helper methods
	moveAsteroid: function (asteroid) {
		asteroid.tic();
		MY_APP.view.drawAsteroid(asteroid, "white");
		MY_APP.model.changeAsteroidCourse(asteroid);
	},

	moveBullet: function (bullet) {
		bullet.move();
		MY_APP.view.drawBullet(bullet, "red");
	},


};

$(document).ready(
	function () {
		MY_APP.controller.init();
	}
);
