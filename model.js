var GAME = GAME || {};

rand = function(max, min) {
	return Math.floor( (Math.random() * max) + min)
}

GAME.widthSize = 640;
GAME.heightSize  = 480;

GAME.model = {};

GAME.model.updatePosition = function(object) {
	if ( object.px < 0 ) {
		object.px = GAME.widthSize;
	}

	if ( object.py < 0 ) {
		object.py = GAME.heightSize;
	}

	if ( object.px > GAME.widthSize ) {
		object.px = 0;
	}

	if ( object.py > GAME.heightSize ) {
		object.py = 0;
	}
}

GAME.model.as = {
	asteroidArray: []
}


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


// Player declaration



GAME.model.player = {
	px: GAME.widthSize / 2,
	py: GAME.heightSize / 2,
	rotation: Math.PI / 2,
	velocity: 0
}

GAME.model.player.updateRotation = function(left, right) {
	if (left) {
		GAME.model.player.rotation -= 0.07;

		if (GAME.model.player.rotation < 0) {
			GAME.model.player.rotation = 2 * Math.PI;
		}
	} else {
		GAME.model.player.rotation += 0.07;

		if (GAME.model.player.rotation > 2 * Math.PI) {
			GAME.model.player.rotation = 0;
		}
	}
}


GAME.model.player.updateVelocity = function(up, down) {
	if (up) {
		if (GAME.model.player.velocity < 4) {
			GAME.model.player.velocity += 1;
		}
	} else {
		if (GAME.model.player.velocity > -4) {
			GAME.model.player.velocity -= 1;
		}
	}
}

// Bullet declaration

GAME.model.bullet = {};

GAME.model.bullet.Constructor = function(px, py, velocity, angle) {
	this.px = px;
	this.py = py;
	this.velocity = velocity;
	this.angle = angle;
	this.next = null;
}

GAME.model.bullet.createBullet = function(px, py, velocity, angle) {
	var bullet = new GAME.model.bullet.Constructor(px, py, velocity, angle);
	GAME.model.bullet.bulletList.add(bullet);
}

GAME.model.bullet.refresh = function() {
	var bullets = GAME.model.bullet.bulletList;
	var currentNode = bullets.head;
	var count = 0;
	while (count < bullets._length) {
		var bullet = currentNode;
		
		GAME.model.bullet.updatePosition(bullet);

		if ( !GAME.model.bullet.destroy(bullet, count) ) {
			count += 1;
		}

		currentNode = currentNode.next;
	}
}

GAME.model.bullet.updatePosition = function(bullet) {

	bullet.px -= bullet.velocity * Math.cos(bullet.angle);
	bullet.py -= bullet.velocity * Math.sin(bullet.angle);

}

GAME.model.bullet.destroy = function(bullet, position) {
	
	if (bullet.px < 0 || bullet.px > GAME.widthSize || bullet.py < 0 || bullet.py > GAME.heightSize) {
		GAME.model.bullet.bulletList.remove(position);
		return true;
	}
	return false;
}

GAME.model.bullet.checkCollision = function() {
	var bullets = GAME.model.bullet.bulletList;

	var asteroids = GAME.model.as.asteroidList;
	var currentAsteroid = asteroids.head;
	var asteroidCount = 0;


	while (asteroidCount < asteroids._length) {
		var asteroid = currentAsteroid;

		// Trying player collision with asteroid here 
		var player = GAME.model.player;

		if (player.px > asteroid.px - asteroid.aSize && player.px < asteroid.px + asteroid.aSize
		&& player.py > asteroid.py - asteroid.aSize && player.py < asteroid.py + asteroid.aSize) {
			console.log("collision with player !");
		}
		// end of try

		var currentBullet = bullets.head;
		var bulletCount = 0;

		while (bulletCount < bullets._length) {
			var bullet = currentBullet;

			if (bullet.px > asteroid.px - asteroid.aSize && bullet.px < asteroid.px + asteroid.aSize
			&& bullet.py > asteroid.py - asteroid.aSize && bullet.py < asteroid.py + asteroid.aSize) {
				GAME.model.bullet.collision(bulletCount, asteroid, asteroidCount);
				return true;
			}
			currentBullet = currentBullet.next;
			bulletCount++;
		}

		currentAsteroid = currentAsteroid.next;
		asteroidCount++;
	}
}

GAME.model.bullet.collision = function(bulletCount, asteroid, asteroidCount) {
	GAME.model.bullet.bulletList.remove(bulletCount);

	var aSize = asteroid.aSize;
	GAME.model.as.asteroidList.remove(asteroidCount);
	if (aSize > 20) {
		for (var i = 0; i < 3; i++) {
			GAME.model.as.createAsteroid(asteroid.px, asteroid.py, aSize / 2);
		}
	}
}


// LinkedList Declaration, add function, remove function


GAME.model.SinglyList = function() {
	this._length = 0;
	this.head = null;
}

GAME.model.SinglyList.prototype.add = function(value) {
	var node = value;
	currentNode = this.head;

	if (!currentNode) {
		this.head = node;
		//node.previous = this.head;
		this._length++;

		return node;
	}

	while (currentNode.next) {
		currentNode = currentNode.next;
	}

	currentNode.next = node;
	//node.previous = currentNode;

	this._length++;

	return node;
}

GAME.model.SinglyList.prototype.remove = function(position) {
	var currentNode = this.head;
	var length = this._length;
	var beforeNode = null;
	var count = 0;

	// if (position < 0 || position > length) {
	// 	throw new Error("error ! invalid bullet node selected");
	// }

	if (position === 0) {
		this.head = currentNode.next;
		currentNode = null;
		this._length--;
		return true;
	}

	while (count < position) {
		beforeNode = currentNode;

		currentNode = currentNode.next;
		count++;
	}

	//  Set the next item to null if current node is the last item of the list
	if (currentNode.next) {
		beforeNode.next = currentNode.next;
	} else {
		beforeNode.next = null;
	}
	currentNode = null;
	this._length--;


}

GAME.model.bullet.bulletList = new GAME.model.SinglyList();

GAME.model.as.asteroidList = new GAME.model.SinglyList();






