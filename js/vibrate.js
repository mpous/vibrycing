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
	startVibrate([1500, 1, 1, 1, 1, 100, 1, 1, 1, 1, 1000]);
	//startPeristentVibrate(100, 3);
}

function vibrateRight() {
	startVibrate([100, 1, 1, 1, 80, 1, 1, 1, 1, 300, 1, 1, 1, 1, 1, 300]);
	//startPeristentVibrate(200, 4);
}

function vibrateEnd(){
	startVibrate([10, 1, 1, 10, 1, 1, 1, 1, 10, 1, 1, 1, 1, 10]);
}