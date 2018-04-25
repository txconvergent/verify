function rotateBase64Image90deg(base64Image, isClockwise) {
	  // create an off-screen canvas
	  var offScreenCanvas = document.createElement('canvas');
	  offScreenCanvasCtx = offScreenCanvas.getContext('2d');

	  // cteate Image
	  var img = new Image();
	  img.src = base64Image;

	  // set its dimension to rotated size
	  offScreenCanvas.height = img.width;
	  offScreenCanvas.width = img.height;

	  // rotate and draw source image into the off-screen canvas:
	  if (isClockwise) {
		  offScreenCanvasCtx.rotate(90 * Math.PI / 180);
		  offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
	  } else {
		  offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
		  offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
	  }
	  offScreenCanvasCtx.drawImage(img, 0, 0);

	  // encode image to data-uri with base64
	  return offScreenCanvas.toDataURL("image/jpeg", 100);
}

$(document).ready(function() {
	$("img").attr("src", rotateBase64Image90deg($("img").attr("src"), true));
})
