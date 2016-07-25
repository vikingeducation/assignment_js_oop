var GAME = GAME || {};

rand = function(max, min) {
	return Math.floor( (Math.random() * max) + min)
}

GAME.widthSize = 640;
GAME.heightSize  = 480;

GAME.model = {
	hitTimer: 0
};


GAME.model.as = {};

GAME.model.player = {};

GAME.model.bullet = {};

GAME.model.updateBackground = function() {
	if (GAME.model.hitTimer > 0) {
		GAME.model.hitTimer--;

		if (GAME.model.hitTimer === 0) {
			$("#game").removeClass("been-hit");
		}
	}
}


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


GAME.model.checkCollision = function() {
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
			if (player.reborn === 0) {
				if (player.life === 1) {
					clearInterval(GAME_LOOP);
				} else {
					GAME.model.bullet.collision(asteroid, asteroidCount);
					$("#game").addClass("been-hit");
					player.reborn = 100;
					player.life--;
					GAME.model.hitTimer = 100;
				}

			}
		}
		// end of try

		var currentBullet = bullets.head;
		var bulletCount = 0;

		while (bulletCount < bullets._length) {
			var bullet = currentBullet;

			if (bullet.px > asteroid.px - asteroid.aSize && bullet.px < asteroid.px + asteroid.aSize
			&& bullet.py > asteroid.py - asteroid.aSize && bullet.py < asteroid.py + asteroid.aSize) {

				GAME.model.bullet.bulletList.remove(bulletCount);
				GAME.model.bullet.collision(asteroid, asteroidCount);
				return true;
			}
			currentBullet = currentBullet.next;
			bulletCount++;
		}

		currentAsteroid = currentAsteroid.next;
		asteroidCount++;
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
		this._length++;

		return node;
	}

	while (currentNode.next) {
		currentNode = currentNode.next;
	}

	currentNode.next = node;

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






