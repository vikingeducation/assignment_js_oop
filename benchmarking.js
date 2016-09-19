// Benchmarking test suit

// Test function
MY_APP.Model.SAsteroid = function (x, y, vx, vy) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.xVelocity = vx;
	this.yVelocity = vy;
	this.tic = function () {
		this.xCoordinate += this.xVelocity * MY_APP.Model.turnTime;
		this.yCoordinate += this.yVelocity * MY_APP.Model.turnTime;
	}
};


function testPerformance() {
	// Using prototype method
	var protoStartDateTime = new Date();

	for (var i = 0; i < 10000; i++) {
		var x = Math.floor(Math.random() * 1000);
		var y = Math.floor(Math.random() * 1000);
		var vx = Math.floor(Math.random() * 100);
		var vy = Math.floor(Math.random() * 100);
		var newAsteroid = new MY_APP.Model.Asteroid(x, y, vx, vy);
		for (var j = 0; j < 10000; j++) {
			newAsteroid.tic();
		};
	};

	var protoEndDateTime = new Date();

	var protoProcessTime = protoEndDateTime.getTime() - protoStartDateTime.getTime();
	console.log("Time cost for prototype method: " + protoProcessTime);

	// Put function just inside the instance
	var staticStartDateTime = new Date();

	for (var i = 0; i < 10000; i++) {
		var x = Math.floor(Math.random() * 1000);
		var y = Math.floor(Math.random() * 1000);
		var vx = Math.floor(Math.random() * 100);
		var vy = Math.floor(Math.random() * 100);
		var newSAsteroid = new MY_APP.Model.SAsteroid(x, y, vx, vy);
		for (var j = 0; j < 10000; j++) {
			newSAsteroid.tic();
		};
	};

	var staticEndDateTime = new Date();

	var staticProcessTime = staticEndDateTime.getTime() - staticStartDateTime.getTime();
	console.log("Time cost for static method: " + staticProcessTime);
};

testPerformance();
