function Asteroid(velocity, coordinates){

  this.velocity = velocity
  this.coordinates = coordinates
  // this.tic = function(){
  //   this.coordinates[0] += this.velocity[0]
  //   this.coordinates[1] += this.velocity[1]
  // }

}

Asteroid.prototype.tic = function(){

  this.coordinates[0] += this.velocity[0]
  this.coordinates[1] += this.velocity[1]

}

var asteroidSim = function(){
  asteroids = []
  for (var i = 0; i < 10000; i++){
    v1 = Math.floor(Math.random() * 100)
    v2 = Math.floor(Math.random() * 100)
    c1 = Math.floor(Math.random() * 100)
    c2 = Math.floor(Math.random() * 100)
    asteroids.push(new Asteroid([v1, v2], [c1, c2]))
  }

  start = Date.now()

  for (var i = 0; i < asteroids.length; i++){
    for (var j = 0; j < 10000; j++){
      asteroids[i].tic()
    }
  }

  console.log(Date.now() - start)

}