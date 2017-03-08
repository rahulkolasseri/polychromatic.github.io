// The CameraVideoPageController is a class that controls the camera 
// video page.  This class provides a some useful methods you will
// need to call:
//     cameraVideoPage.displayMessage(message, timeout):
//         Causes a short message string to be displayed on the
//         page for a brief period.  Useful for showing quick
//         notifications to the user.  message is a plain string.
//         timeout is option and denotes the length of time in msec
//         to show the message for.
//     cameraVideoPage.setHeadsUpDisplayHTML(html):
//         This will set or update the heads-up-display with the
//         text given in the html argument.  Usually this should 
//         just be a string with text and line breaks (<br />).

// Initialise the camera video page and callback to our 
// cameraVideoPageInitialised() function when ready.
var cameraVideoPage = new CameraVideoPageController(
        cameraVideoPageInitialised);

// You may need to create variables to store state.
    
// This function will be called when the camera video page
// is intialised and ready to be used.
function cameraVideoPageInitialised()
{
    // Step 1: Check for and intialise deviceMotion
}
    
// This function is called by a button to set the height of phone from the
// ground, in metres.
function setCameraHeightValue()
{
    // Step 3: Set camera height
    // check if input is a number and is positive
    // display on screen using the displayMessage method
}
    
// This function is called by a button to set the angle to the base of
// the object being measured.  It uses the current smoothed tilt angle.
function setBaseTiltAngle()
{
    // Step 4: Record tilt angle 
    // display on screen using the displayMessage method
}

// This function is called by a button to set the angle to the apex of
// the object being measured.  It uses the current smoothed tilt angle.
function setApexTiltAngle()
{
    // Step 4: Record tilt angle 
    // display on screen using the displayMessage method
}

// You may need to write several other functions.
var LR;
var FB;
var DIR;

// Value for low pass filter
var alpha = 0.8;

var smoothGX = 0;
var smoothGY = 0;
var smoothGZ = 0;

var smoothLR = 0;
var smoothFB = 0;
var smoothDIR = 0;

var degtorad = Math.PI / 180;

function compassHeading( alpha, beta, gamma ) {

  var _x = beta  ? beta  * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
}

function deviceOrientationUpdate(e)
{
	// if(e.gamma==null && e.beta==null && e.alpha==null)
	// {
 //        $('.compassValue').hide();
 //        $('.webkitCompassValue').hide();
 //        $('.compassError').show();
 //        return;
 //    }
 //    $('.compassValue').show();
 //    $('.compassError').hide();

    //Low Pass Filter
    smoothDIR = e.alpha * alpha + (smoothDIR * (1.0 - alpha));
    smoothFB = e.beta * alpha + (smoothFB * (1.0 - alpha));
    smoothLR = e.gamma * alpha + (smoothLR * (1.0 - alpha));

    var absolute = e.absolute ? "true" : "false";
    if (e.absolute)
    {
        var heading = compassHeading(smoothDIR, smoothFB, smoothLR);
        // document.getElementById("headingValue").innerHTML = Number(heading).toFixed(2);
    }
    // else
    // {
    //     document.getElementById("headingValue").innerHTML = "???";
    // }
    
    document.getElementById("x-value").innerHTML = Number(smoothDIR).toFixed(2);
    document.getElementById("y-value").innerHTML = Number(smoothFB).toFixed(2);
    document.getElementById("z-value").innerHTML = Number(smoothLR).toFixed(2);
    document.getElementById("absoluteValue").innerHTML = absolute;
    
    // if (e.webkitCompassHeading != undefined)
    // {
    //     $('.webkitCompassValue').show();
    //     document.getElementById("webkitHeadingValue").innerHTML = Number(e.webkitCompassHeading).toFixed(2);
    //     document.getElementById("webkitAccuracyValue").innerHTML = Number(e.webkitCompassAccuracy).toFixed(2);
    // }
    // else
    // {
    //     $('.webkitCompassValue').hide();
    // }
}
if (window.DeviceOrientationEvent) 
{
    // $('.compassError').hide();
    window.addEventListener('deviceorientation', deviceOrientationUpdate);
}
// else
// {
//     // $('.compassValue').hide();
// }

