// For a points 1 and 2 on an arc, with point 1's coords known and the angle between them known, what is the x coord of point 2
function arcX(centerX, radius, angle) {
  return centerX + radius * Math.cos(angle);
};

// For a points 1 and 2 on an arc, with point 1's coords known and the angle between them known, what is the y coord of point 2
function arcY(centerY, radius, angle){
  return centerY + radius * Math.sin(angle);
};

function getTheta(angle){
  return (angle * 2 * Math.PI) / 360;
};
