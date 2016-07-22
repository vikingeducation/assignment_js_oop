var GAME = {};
GAME.proto = {};
GAME.litteral = {};

$(document).ready(function() {

	GAME.proto.Asteroid = function(px, py, vx, vy) {
		this.px = px;
		this.py = py;
		this.vx = vx;
		this.vy = vy;
	}

	GAME.proto.Asteroid.prototype.tic = function() {
		this.px += this.vx;
		this.py += this.vy;
	}

	GAME.proto.asteroidsArray = [];

	GAME.proto.buildAsteroids = function() {
		for (var i = 0; i < 1000; i++) {
			var px, py, vx, vy;
			px = Math.floor( Math.random() * 100 );
			py = Math.floor( Math.random() * 100 );
			vx = Math.floor( Math.random() * 10 );
			vy = Math.floor( Math.random() * 10 );

			var newAs = new GAME.proto.Asteroid(px, py, vx, vy);
			GAME.proto.asteroidsArray.push( newAs );
		}
	}

	GAME.proto.benchmark = function() {
		var protoTimeStart = new Date();
		for (var i = 0; i < 1000; i++) {
			for (var j = 0; j < 1000; j++) {
				GAME.proto.asteroidsArray[j].tic();
			}
		}
		var protoTimeEnd = new Date();
		var protoTime = protoTimeEnd.getTime() - protoTimeStart.getTime();
		console.log("it took : " + protoTime + " milliseconds to run prototype based");
	}

	GAME.proto.runTest = function() {
		GAME.proto.buildAsteroids();
		GAME.proto.benchmark();
	}


	GAME.litteral.Asteroid = function(px, py, vx, vy) {
		this.px = px;
		this.py = py;
		this.vx = vx;
		this.vy = vy;

		this.tic = function() {
			this.px += this.vx;
			this.py += this.vy;
		};
	}

	GAME.litteral.asteroidsArray = [];

	GAME.litteral.buildAsteroids = function() {
		for (var i = 0; i < 1000; i++) {
			var px, py, vx, vy;
			px = Math.floor( Math.random() * 100 );
			py = Math.floor( Math.random() * 100 );
			vx = Math.floor( Math.random() * 10 );
			vy = Math.floor( Math.random() * 10 );

			var newAs = new GAME.litteral.Asteroid(px, py, vx, vy);
			GAME.litteral.asteroidsArray.push( newAs );
		}
	}

	GAME.litteral.benchmark = function() {
		var litteralTimeStart = new Date();
		for (var i = 0; i < 1000; i++) {
			for (var j = 0; j < 1000; j++) {
				GAME.litteral.asteroidsArray[j].tic();
			}
		}
		var litteralTimeEnd = new Date();
		var litteralTime = litteralTimeEnd.getTime() - litteralTimeStart.getTime();
		console.log("it took : " + litteralTime + " milliseconds to run prototype based");
	}

	GAME.litteral.runTest = function() {
		GAME.litteral.buildAsteroids();
		GAME.litteral.benchmark();
	}
});