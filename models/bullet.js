GAME.model.bullet.wait = 0;

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


GAME.model.bullet.collision = function(asteroid, asteroidCount) {

	var aSize = asteroid.aSize;
	GAME.model.as.asteroidList.remove(asteroidCount);
	if (aSize > 20) {
		for (var i = 0; i < 3; i++) {
			GAME.model.as.createAsteroid(asteroid.px, asteroid.py, aSize / 2);
		}
	}
}