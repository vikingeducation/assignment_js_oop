Asteroids

Model
  main model file
  initializes the game board and other objects
  communicates with the controller

  init()

  checkCollisions()
    iterates through the asteroids
      iterates through all the other asteroids
        if they overlap ( d <= r1 + r2 )
          they split
      iterates through bullets
        if the bullet is within the asteroid's radius
          the asteroid splits
          the bullet is destroyed
      checks collision with the ship
        if ship is within radius
          the ship dies

SpaceObject
  size (radius)
  position (x and y) (center)
  velocity (x and y) (or vector?)
  move()
    change position a certain amount/time based on velocity

Ship
  prototype SpaceObject
  accelerate(x, y) (or using vectors?)
    change velocity a certain amount / unit time elapsed
  shoot()
    creates a new bullet with direction same as ship and velocity (Vship + extra)
  die()
    if hit by an asteroid, destroyed, lose a life


Bullet
  prototype SpaceObject
  all the same size

Asteroid
  prototype SpaceObject
  split()
    if size < threshold
      does not split but is simply destroyed
    else
      creates two new ones each with half the size (circle area?)
      send them off in random directions
    destroys itself


Other things...
  vectorToComponents(magnitude,direction)
  componentsToVector(x,y)
