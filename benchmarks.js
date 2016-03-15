function TestPerformance(){

  // Literal (static) object approach
  var StartDateTime = new Date();
  var allAsteroid = [];
  var max = 1000;

  for (var i = 0; i < max; i++) {
    allAsteroid.push( new Asteroid() );
  }
  for (var j = 0; j < max; j++) {
    for (var k = 0; k < max; k++) allAsteroid[j].tic();
  }

  var EndDateTime = new Date();

  // Process the times
  var constructorTime = EndDateTime.getTime() - StartDateTime.getTime();

  // Display the results
  alert("Constructor time: " + constructorTime);
}

TestPerformance();
