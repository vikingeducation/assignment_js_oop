var GAME = GAME || {};

GAME.view = {};

GAME.view.updateAsteroid = function() {
	GAME.view.resetView();
	var asteroids = GAME.model.as.asteroidList;
	var currentNode = asteroids.head;
	var count = 0;
	while (count < asteroids._length) {
		var asteroid = currentNode;
		
		GAME.view.printAsteroid(asteroid);

		currentNode = currentNode.next;
		count++;
	}
}

GAME.view.printLife = function() {
	var lifes  = GAME.model.player.life;
	var canvas = GAME.view.getCanvas();
	var posX = 10;
	var posY = 10;
	for (var i = 0; i < lifes; i++) {
		canvas.fillStyle = "Crimson";

		canvas.fillRect(posX + i * 30, posY, 10, 10);

	}
	canvas.fillStyle = "black";
}

GAME.view.getCanvas = function() {
	return document.getElementById("game").getContext("2d");
}

GAME.view.resetView = function() {
	var canvas = GAME.view.getCanvas();
	canvas.clearRect(0, 0, GAME.widthSize, GAME.heightSize);
}

GAME.view.printAsteroid = function(asteroid) {
	var canvas = GAME.view.getCanvas();
	canvas.beginPath();

	canvas.strokeStyle = "LightGreen";
	canvas.lineWidth = 3;
	canvas.arc(asteroid.px, asteroid.py, asteroid.aSize, 0, 2*Math.PI);
	canvas.stroke();
	canvas.closePath();

}

GAME.view.updatePlayer = function() {

}

GAME.view.printPlayer = function() {
	var player = GAME.model.player;
	player.px -= player.velocity * Math.cos(player.rotation);
	player.py -= player.velocity * Math.sin(player.rotation);
	var canvas = GAME.view.getCanvas();
	canvas.save();
	canvas.beginPath();
	canvas.translate(player.px - 10, player.py - 10);
	canvas.rotate(player.rotation - (Math.PI / 2));
	canvas.translate(- player.px - 15, - player.py - 5);

	canvas.moveTo(player.px + 15, player.py - 30);
	canvas.lineTo(player.px + 30, player.py + 20);
	canvas.lineTo(player.px, player.py + 20);
	canvas.fill();
	canvas.closePath();

	// canvas.fillRect(player.px, player.py, 50, 20);
	canvas.restore();
}

GAME.view.printBullet = function() {
	var bullets = GAME.model.bullet.bulletList;
	var currentNode = bullets.head;
	var count = 0;
	var canvas = GAME.view.getCanvas();

	while (count < bullets._length) {
		var bullet = currentNode;
		canvas.fillRect(bullet.px, bullet.py, 5, 5);

		currentNode = currentNode.next;
		count++;
	}
}