/**
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */

 $(document).ready(function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var asteroidImg = document.getElementByClassName('asteroid');
  var spaceshipImg = document.getElementById('spaceship');
  context.drawImage(asteroidImg, 10, 10);
  context.drawImage(spaceshipImg, 100, 100);
 })

function isPixelCollision( first, x, y, other, x2, y2, isCentred ) {
  // we need to avoid using floats, as were doing array lookups
  x  = Math.round( x );
  y  = Math.round( y );
  x2 = Math.round( x2 );
  y2 = Math.round( y2 );

  var w  = first.width,
      h  = first.height,
      w2 = other.width,
      h2 = other.height;

  // deal with the image being centred
  if ( isCentred ) {
      // fast rounding, but positive only
    x  -= ( w/2 + 0.5) << 0
    y  -= ( h/2 + 0.5) << 0
    x2 -= (w2/2 + 0.5) << 0
    y2 -= (h2/2 + 0.5) << 0
  }

  // Next we need to work out the area within the two images that overlaps. To do this we work out the top-left corner, held in xMin and yMin, and the bottom right corner, held in xMax and yMax. If xMin is greater then xMax, or yMin is greater then yMax, then there is not an overlapping area and no collision has occurred. This means we can leave the function early.

  // find the top left and bottom right corners of overlapping area
  var xMin = Math.max( x, x2 ),
      yMin = Math.max( y, y2 ),
      xMax = Math.min( x+w, x2+w2 ),
      yMax = Math.min( y+h, y2+h2 );

// Sanity collision check, we ensure that the top-left corner is both
// above and to the left of the bottom-right corner.
  if ( xMin >= xMax || yMin >= yMax ) {
      return false;
  }
  // At this stage we can prepare for the actual per-pixel collision checks. We work out the size of this overlapping area, which is a simple matter of subtracting the larger value from the smaller one, and get the pixel data out from the ImageData objects.

  var xDiff = xMax - xMin,
      yDiff = yMax - yMin;

  // get the pixels out from the images
  var pixels  = first.data,
      pixels2 = other.data;


  for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
      for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
          if (
                  (pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0) &&
                  (pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0)
          ) {
              return true;
          }
      }
  }

  return false;

}



