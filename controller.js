var GAME = GAME || {};

GAME.speed = 10;

GAME.controller = {};

GAME.controller.keyState = {};

GAME.controller.init = function() {
	for (var i = 0; i < 5; i++) {
		GAME.model.as.createAsteroid();
	}
	GAME.controller.keyInput();
	GAME.controller.gameLoop();
}

GAME.controller.gameLoop = function() {
	setInterval(function() {
		GAME.controller.refreshScreen();
	}, GAME.speed);
}

GAME.controller.refreshScreen = function() {
	GAME.model.as.refresh();
	GAME.view.updateAsteroid();
	GAME.model.updatePosition( GAME.model.player );
	GAME.view.printPlayer();
	GAME.controller.playerControl();

	if (GAME.model.bullet.bulletList._length > 0) {
		GAME.model.bullet.refresh();
		GAME.view.printBullet();
	}

	if (GAME.model.bullet.wait > 0) {
		GAME.model.bullet.wait--;
	}

	GAME.model.checkCollision();
}

GAME.controller.keyInput = function() {
	$(document).on("keydown", function(event) {
		GAME.controller.keyState[event.which] = true;
	});

	$(document).on("keyup", function(event) {
		GAME.controller.keyState[event.which] = false;
	});
}

GAME.controller.playerControl = function() {
	var keyState = GAME.controller.keyState;

	var keyNames = {
		"LEFT": keyState[37],
		"RIGHT": keyState[39],
		"UP": keyState[38],
		"DOWN": keyState[40],
		"SPACE": keyState[32],
	}

	if (keyNames.LEFT || keyNames.RIGHT) {
		GAME.model.player.updateRotation(keyNames.LEFT, keyNames.RIGHT);
	}

	if (keyNames.UP || keyNames.DOWN) {
		GAME.model.player.updateVelocity(keyNames.UP, keyNames.DOWN);
	}

	if (keyNames.SPACE) {
		var player = GAME.model.player;
		if (GAME.model.bullet.wait === 0) {
			GAME.model.bullet.createBullet(player.px - 15, player.py - 5, 10, player.rotation);
			GAME.model.bullet.wait += 15;
		}
	}

	if (!keyNames.UP && !keyNames.DOWN) {
		var velocity = GAME.model.player.velocity;
		if (velocity > 0) {
			GAME.model.player.velocity -= 0.3;
		} else if (velocity < 0) {
			GAME.model.player.velocity += 0.3;
		}
	}
}
