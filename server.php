<?php

$file = realpath(__DIR__ . urldecode($_GET['file']));

if (file_exists($file)) {
  $fsize = filesize($file);
  $shortlen = $fsize - 1;
  $track2play = 'asdf';
  $etag = 'asdf';

  header("Pragma: public");
  header("Expires: 0"); 
  header("Content-Type: audio/mp3");
  header('Content-Length: ' . $fsize);
  header('Content-Disposition: inline; filename="' . $track2play . '"');
  header('Content-Range: bytes 0-'.$shortlen.'/'.$fsize); 
  header('Accept-Ranges: bytes');
  header('X-Pad: avoid browser bug');
  header('Cache-Control: no-cache');
  header('Etag: ' . $etag);
  
  echo readfile($file);
} else {
  echo "BAD";
}


