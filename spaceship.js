var APP = APP || {};

APP.Spaceship = function Spaceship (x,y,degrees, velocity) {
  this.coordX = x;
  this.coordY = y;
  this.degrees = degrees || 90;
  this.velocity = velocity || 1;
};

APP.Spaceship.prototype.shoot = function (keyPress) {
  if (keyPress === 40) {

  }
};

APP.Spaceship.prototype.move = function (keyPress) {
  moveArr = calcVelocity(this.degrees, this.velocity);
  if (keyPress === 38) {//up
    this.coordX += moveArr[0];
    this.coordY += moveArr[1];
  }
  else if (keyPress === 40) {//down
    this.coordX -= moveArr[0];
    this.coordY -= moveArr[1];
  }
};

APP.Spaceship.prototype.turn = function (keyPress) {
  // degrees starts off at 3 o clock and moves counterclickwise
  if (keyPress === 37) {
    this.degrees += 10;
  }
  else if (keyPress === 39) {
    this.degrees -= 10;
  } else {
  }
  // validations
  if (Math.floor(this.degrees) >= 360) {
    this.degrees = Math.floor(this.degrees) - 360;
  }
};

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// calculates how many x units and y units u
// need to move if you are moving in 0-360 degrees direction
function calcVelocity(angle, velocity) {
   // handling in between
  //   /|
  // v/ | y
  // /o |
  // ____
  //  x
  // x = cos (o) * v
  // y = sin (o) * v

  var newAngle = toRadians(angle);
  console.log(newAngle);
  var x = Math.cos(newAngle) * velocity;
  var y = Math.sin(newAngle) * velocity;
  return [x,y];
}
