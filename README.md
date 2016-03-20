# assignment_js_oop
Objectify! Construct! Prototype!  Win.
[A JavaScript project using objects, constructors and prototypes from the Viking Code School](http://www.vikingcodeschool.com)


//

Models

//Asteroid Model
  -Likely going to use a constructor with prototypical inheritance to allow all the asteroids access to methods
  -Asteroids need to have a x, y, radius, vx, vy (--constant by which you modify the location in each gameLoop)for direction and speed) (using canvas)

//SpaceShip Model
  -Only one--have x, y, shape and size
    -vx and vy will change depending on user input (arrow keys)
  -Need to have direction, speed?, firing status

//Bullet Model
--Likely going to use a constructor with prototypical inheritance to allow all the bullet access to methods
-makebullet method--bullets have constant size
-bullets have x, y and vx, vy

Game Model
-array of asteroids, array of bullets, spaceship

Controller
-init
/render board
/randomly place asteroids--they can be on top of each other, just not on top of the ship
/Place ship in canvas

//GameLoop
-on a loop, update the location of all elements
-time = 1
  -update x,y based on vx and vy
  -new x = x + vx etc
