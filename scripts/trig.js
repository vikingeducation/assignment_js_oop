// For a given center, radius, and angle, return the x coord of the point on the circle
function arcX(centerX, radius, angle) {
  return centerX + radius * Math.cos(angle);
}

// For a given center, radius, and angle, return the y coord of the point on the circle
function arcY(centerY, radius, angle){
  return centerY + radius * Math.sin(angle);
}

function getTheta(angle){
  return (angle * 2 * Math.PI) / 360;
}

function getDistanceBetween(circleA, circleB){
  var distX = circleA.x - circleB.x;
  var distY = circleA.y - circleB.y;
  return Math.sqrt((distX * distX) + (distY * distY));
}
