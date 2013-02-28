if (!navigator.vibrate) {
	//alert("Does your browser accept navigator.vibrate ? " + (navigator.vibrate ? "Yes" : "No"));
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
	startVibrate([100, 100, 300, 0, 300, 0, 300, 0, 300, 0, 300]);
}