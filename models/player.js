GAME.model.player = {
	px: GAME.widthSize / 2,
	py: GAME.heightSize / 2,
	rotation: Math.PI / 2,
	life: 3,
	reborn: 0,
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

GAME.model.player.checkHit = function() {
	if (GAME.model.player.reborn > 0) {
		GAME.model.player.reborn--;
	}
}