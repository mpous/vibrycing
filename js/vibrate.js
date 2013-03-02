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
	startVibrate([1500, 100, 1000]);
}

function vibrateRight() {
	startVibrate([100, 0, 0, 0, 100, 300, 0, 300, 0, 300, 0, 300, 0, 300]);
}

function vibrateEnd(){
	startVibrate([10, 0, 0, 10, 10, 10]);
}