GAME.model.as.BuildAsteroid = function(px, py, vx, vy, aSize) {
	this.px = px;
	this.py = py;
	this.vx = vx;
	this.vy = vy;
	this.aSize = aSize;
	this.next = null;
}

GAME.model.as.createAsteroid = function(positionX, positionY, aSize) {

	var position = [];
	if (positionX && positionY) {
		position.push(positionX, positionY);
	} else {

		var choice = rand(4,0);

		switch(choice) {
			case 0:
				var px = rand(GAME.widthSize,0);
				var py = 0;
				break;
			case 1:
				var px = GAME.widthSize;
				var py = rand(GAME.heightSize,0);
				break;
			case 2:
				var px = rand(GAME.widthSize,0);
				var py = GAME.heightSize;
				break;
			case 3:
				var px = 0;
				var py = rand(GAME.heightSize,0);			
				break;
		}
		position.push(px);
		position.push(py);
	}
	
	var velocity =  GAME.model.as.createVelocity();
	var vx = velocity[0];
	var vy = velocity[1];

	if (aSize) {
		aSize = aSize;
	} else {
		aSize = rand(40,10);
	}


	var asteroid = new GAME.model.as.BuildAsteroid( position[0], position[1], vx, vy, aSize );
	GAME.model.as.asteroidList.add(asteroid);
}

GAME.model.as.createVelocity = function() {
	var vx = rand(15,3) / 10;
	var vy = rand(15,3) / 10;
	if ( rand(2,0) === 1) {
		vx = -vx;
	}

	if ( rand(2,0) === 1) {
		vy = -vy;
	}

	return [vx, vy];
}

GAME.model.as.BuildAsteroid.prototype.tic = function() {
	this.px += this.vx;
	this.py += this.vy;
}


GAME.model.as.refresh = function() {
	var asteroids = GAME.model.as.asteroidList;
	var currentNode = asteroids.head;
	var count = 0;

	while (count < asteroids._length) {
		var asteroid = currentNode;

		asteroid.tic();
		GAME.model.updatePosition(asteroid);

		currentNode = currentNode.next;
		count++;
	}
}