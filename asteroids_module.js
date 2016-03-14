var Sprite = function Sprite (x, y, x_vel, y_vel, size) {
  this.x = x;
  this.y = y;
  this.x_vel = x_vel;
  this.y_vel = y_vel;
  this.turnSpeed = 0;
  this.renderedObject = null;
  this.box = null;

  this.otherTic = function() {};
  this.tic = function() {
    this.otherTic();
    this.x = ((this.x + this.x_vel + this.board.boardX) % this.board.boardX);
    this.y = ((this.y + this.y_vel + this.board.boardY) % this.board.boardY);
    this.direction += this.turnSpeed;
    this.renderedObject = null;
    this.box = null;
  };

  this.asteroidHit =  function(asteroid) {
    var that = this;
    for (var i = 0; i < 8; ++i) {
      var particle = new Particle(this.x + Math.random() * 8, this.y + Math.random() * 8, Math.random() * 2 - 1, Math.random() * 2 - 1);
      particle.board = this.board;
      this.board.addParticle(particle);
    }

    if (that instanceof Bullet) {
      console.log(this.board.asteroidCollection.length);
      var bulletIndex = that.board.bullets.indexOf(that);
      that.board.bullets.splice(bulletIndex, 1);
    };

    if (that instanceof Asteroid) {
      var thatIndex = that.board.asteroidCollection.indexOf(that);
      that.board.asteroidCollection.splice(thatIndex, 1);
    };
    var asteroidIndex = that.board.asteroidCollection.indexOf(asteroid);
    that.board.asteroidCollection.splice(asteroidIndex, 1);

    if (that.size > 1) {
      babySize = Math.floor(asteroid.size / 2);
      baby1 = new Asteroid(asteroid.x + babySize * 15, asteroid.y + babySize, asteroid.x_vel * -1, asteroid.y_vel, babySize);
      baby1.board = asteroid.board;

      baby2 = new Asteroid(asteroid.x - babySize * 15, asteroid.y - babySize, asteroid.x_vel, asteroid.y_vel * -1, babySize);
      baby2.board = asteroid.board;

      that.board.asteroidCollection.push(baby1);
      that.board.asteroidCollection.push(baby2);
    };

  };

  this.boundingBox = function() {
    if (this.box) {
      return this.box;
    }

    var renderedObject;
    if (this.renderedObject) {
      renderedObject = this.renderedObject;
    } else {
      renderedObject = this.render();
      this.renderedObject = renderedObject;
    }
    var box = renderedObject.getBoundingClientRect();
    this.box = box;
    return box;
  }

  this.collision = function(object2) {
    boundary1 = this.boundingBox();
    boundary2 = object2.boundingBox();

    return !(boundary2.left > boundary1.right ||
        boundary2.right < boundary1.left ||
        boundary2.top > boundary1.bottom ||
        boundary2.bottom < boundary1.top);
  }
}
