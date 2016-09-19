"use strict"

var MY_APP = MY_APP || {};

MY_APP.controller = {
	init: function () {
		MY_APP.view.init();
		MY_APP.model.generateAsteroids();
		setInterval(function () {
			MY_APP.controller.moveAllAsteroids();
		}, 50);
	},



	moveAllAsteroids: function () {
		var asteroids = MY_APP.model.asteroids;
		for (var i = 0; i < asteroids.length; i++) {
			this.moveAsteroid(asteroids[i]);
		};
	},

	// Helper methods


	moveAsteroid: function (asteroid) {
		MY_APP.view.drawAsteroid(asteroid, "black");
		asteroid.tic();
		MY_APP.view.drawAsteroid(asteroid, "white");
	},


};

$(document).ready(
	function () {
		MY_APP.controller.init();
	}
);
