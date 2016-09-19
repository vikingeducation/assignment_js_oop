"use strict"

var MY_APP = MY_APP || {};
MY_APP.model = {
	asteroidsNum: 10,
	turnTime: 1,
	asteroids: [],
	spaceShip: undefined,
	bullets: [],
	asteroidsID: 0,
	bulletID: 0,

	generateSpaceShip: function () {
		this.spaceShip = new MY_APP.model.SpaceShip(500, 250, 0, 0);
		this.spaceShip.head = {
			x: 20,
			y: 0,
		};
		this.spaceShip.topTail = {
			x: -20,
			y: -20 * Math.sin(this.spaceShip.course - 0.5),
		};
		this.spaceShip.bottomTail = {
			x: -20,
			y: -20 * Math.sin(this.spaceShip.course + 0.5),
		}
	},

	changeShipCourse: function (key) {
		if (key === 37) {
			this.spaceShip.course -= 0.1;
			this.spaceShip.tic();
		} else if (key === 38) {
			this.spaceShip.speed += 1;
		} else if (key === 39) {
			this.spaceShip.course += 0.1;
			this.spaceShip.tic();
		} else if (key === 40) {
			this.spaceShip.speed -= 1;
		} else if (key === 32) {
			this.spaceShip.fire();
		}
	},

	generateAsteroids: function () {
		for (var i = 0; i < this.asteroidsNum; i++) {
			this.generateOneAsteroid();
		};
	},

	changeAsteroidCourse: function (asteroid) {
		var x = asteroid.xCoordinate;
		var y = asteroid.yCoordinate;
		if (x > 1000) {
			asteroid.xVelocity = -asteroid.xVelocity;
			asteroid.yVelocity *= this.randomBoolean();
			asteroid.xCoordinate = 1000;
		} else if (x < 0) {
			asteroid.xVelocity = -asteroid.xVelocity;
			asteroid.yVelocity *= this.randomBoolean();
			asteroid.xCoordinate = 0;
		} else if (y > 500) {
			asteroid.xVelocity *= this.randomBoolean();
			asteroid.yVelocity = -asteroid.yVelocity;
			asteroid.yCoordinate = 500;
		} else if (y < 0) {
			asteroid.xVelocity *= this.randomBoolean();
			asteroid.yVelocity = -asteroid.yVelocity;
			asteroid.yCoordinate = 0;
		};
	},




	// Helper methods
	generateOneAsteroid: function () {
		var point = this.enterPoint();
		var x = point.x;
		var y = point.y;
		var vx = (Math.random() + 1) * this.randomBoolean();
		var vy = (Math.random() + 1) * this.randomBoolean();
		var newAsteroid = new this.Asteroid(x, y, vx, vy);
		newAsteroid.radius = Math.random() * 40 + 30;
		this.asteroids.push(newAsteroid);
	},

	randomBoolean: function () {
		if (Math.random() > 0.5) {
			return 1;
		} else {
			return -1;
		};
	},

	enterPoint: function () {
		var edge = Math.floor(Math.random() * 4 + 1);
		if (edge === 1) {
			var xCoordinate = Math.random() * 999 + 1;
			var yCoordinate = 0;
		} else if (edge === 2) {
			var xCoordinate = Math.random() * 999 + 1;
			var yCoordinate = 500;
		} else if (edge === 3) {
			var xCoordinate = 0;
			var yCoordinate = Math.random() * 499 + 1;
		} else {
			var xCoordinate = 1000;
			var yCoordinate = Math.random() * 499 + 1;
		};
		return {
			x: xCoordinate,
			y: yCoordinate
		};
	},

	explodeIfCollision: function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			for (var j = 0; j < this.bullets.length; j++) {
				if (this.bullets[j].hit(this.asteroids[i])) {
					this.asteroids[i].explode();
					this.asteroids.splice(i, 1);
					this.bullets.splice(j, 1);
				};
			};
		};
	},

	generateAsteroidPiece: function (x, y, radius) {
		var course = Math.random(2 * Math.PI);
		var xCoordinate = x + radius * Math.cos(course);
		var yCoordinate = y + radius * Math.sin(course);
		var vx = (Math.random() + 1) * this.randomBoolean();
		var vy = (Math.random() + 1) * this.randomBoolean();
		var newAsteroidPiece = new MY_APP.model.Asteroid(xCoordinate, yCoordinate, vx, vy)
		newAsteroidPiece.radius = radius * Math.random();
		this.asteroids.push(newAsteroidPiece);
	},

	clearSmallAsteroid: function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].radius <= 30) {
				this.asteroids.splice(i, 1);
			};
		};
	},

};

// Contructors

MY_APP.model.SpaceShip = function (x, y, course, speed) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.course = course;
	this.speed = speed;
};

MY_APP.model.SpaceShip.prototype.tic = function () {
	this.head.x = 20 * Math.cos(this.course);
	this.head.y = 20 * Math.sin(this.course);

	this.topTail.x = -20 * Math.cos(this.course - 0.5);
	this.topTail.y = -20 * Math.sin(this.course - 0.5)

	this.bottomTail.x = -20 * Math.cos(this.course + 0.5);
	this.bottomTail.y = -20 * Math.sin(this.course + 0.5);
};

MY_APP.model.SpaceShip.prototype.changePosition = function () {
	this.xCoordinate += this.speed * MY_APP.model.turnTime * Math.cos(this.course);
	this.yCoordinate += this.speed * MY_APP.model.turnTime * Math.sin(this.course);
};

MY_APP.model.SpaceShip.prototype.fire = function () {
	var x = this.xCoordinate;
	var y = this.yCoordinate;
	var course = this.course;
	var newBullet = new MY_APP.model.Bullet(x, y, course);
	MY_APP.model.bullets.push(newBullet);
};

// Bullet Constructer

MY_APP.model.Bullet = function (x, y, course) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.course = course;
	this.speed = 10;
	this.bID = MY_APP.model.bulletID;
	MY_APP.model.bulletID += 1;
};

MY_APP.model.Bullet.prototype.move = function () {
	this.xCoordinate += this.speed * MY_APP.model.turnTime * Math.cos(this.course);
	this.yCoordinate += this.speed * MY_APP.model.turnTime * Math.sin(this.course);
};

MY_APP.model.Bullet.prototype.hit = function (asteroid) {
	var xBullet = this.xCoordinate;
	var yBullet = this.yCoordinate;
	var xAsteroid = asteroid.xCoordinate;
	var yAsteroid = asteroid.yCoordinate;
	var distance = Math.sqrt((xBullet - xAsteroid) * (xBullet - xAsteroid) + (yBullet - yAsteroid) * (yBullet - yAsteroid));
	if (distance <= asteroid.radius) {
		return true;
	};

};


// Asteroid Constructor

MY_APP.model.Asteroid = function (x, y, vx, vy) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.xVelocity = vx;
	this.yVelocity = vy;
	this.aID = MY_APP.model.asteroidsID;
	MY_APP.model.asteroidsID += 1;
};

MY_APP.model.Asteroid.prototype.tic = function () {
	this.xCoordinate += this.xVelocity * MY_APP.model.turnTime;
	this.yCoordinate += this.yVelocity * MY_APP.model.turnTime;
};

MY_APP.model.Asteroid.prototype.explode = function () {
	var pieces = Math.floor(Math.random() * 3 + 2);
	var x = this.xCoordinate;
	var y = this.yCoordinate;
	var radius = this.radius;
	for (var i = 0; i < pieces; i++) {
		MY_APP.model.generateAsteroidPiece(x, y, radius);
	};
};
