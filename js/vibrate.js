/**
*
* https://developer.mozilla.org/en-US/docs/DOM/window.navigator.vibrate
*/

/*
navigator.vibrate = ( function () {
  return  navigator.vibrate       || 
          navigator.mozVibrate    || 
          navigator.webkitVibrate || 
          navigator.oVibrate      || 
          navigator.msVibrate     || 
          function(params) {
            doVibrate(params);
          };
})();
*/

if (!navigator.vibrate) {
	//alert("Does your browser accept navigator.vibrate ? " + (navigator.vibrate ? "Yes" : "No"));
	alert("The browser does not use the vibration API.");
	console.log("The browser does not use the vibration API.");
}
//alert("navigator.webkitVibrate?  " + (navigator.webkitVibrate ? "Yes" : "No"));
//alert("navigator.oVibrate?  " + (navigator.oVibrate ? "Yes" : "No"));

function startVibrate(level) {
	navigator.vibrate(level);
}

var vibrateInterval;
function startPeristentVibrate(level, interval) {
	vibrateInterval = setInterval( function() {
		startVibrate(level);
	}, interval);
}

function stopVibrate() {
	if(vibrateInterval)
		clearInterval(vibrateInterval);
	navigator.vibrate(0);
}

function vibrateLeft() {
	stopVibrate();
	startVibrate([1500, 200, 200, 200]);
}

function vibrateRight() {
	stopVibrate();
	startVibrate([100, 200, 300, 400, 500, 600]);
}

function vibrateEnd(){
	stopVibrate();
	startVibrate([500, 500, 400, 300, 200, 100, 500, 500]);
}