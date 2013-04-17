/**
 * WIPJam FirefoxOS Hackathon
 * @author Marc Planagumà
 * @author Marc Pous
 * 
 * Route calculation
 */

function renderRoute(route) {

	var min_dist = 0.05; // 50m
	var gps_period = 5000; // 5 seg
	
	// Route Object 
	var distance = route.routes[0].legs[0].distance;
	var duration = route.routes[0].legs[0].duration;
	var steps = route.routes[0].legs[0].steps;

	// Iterator
	var index = 0;
	var actual_step = steps[index];
	console.log("Steps: " + steps.length);

	
	function errorGPS(msg) {
		alert("GPS ERROR!! w00t!");
	}

	function successGPS(position) {
		
		lat_now = position.coords.latitude;
		lon_now = position.coords.longitude;

		lat_end = actual_step.end_location.lat;
		lon_end = actual_step.end_location.lng;
		
		console.log("successGPS: " + "[" +lat_now+ ", " +lon_now+ "] [" +lat_end+ ", " +lon_end+ "]");

		// Mock to test
		//lat_end = lat_now; // Mock
		//lon_end = lon_now; // Mock

		// ToDo: show at the map the real-time position of the user
		var current_position = new google.maps.LatLng(lat_now, lon_now);
		addCurrentPositionMarker(current_position);
		
		if(index < steps.length){  // is last step ?

			/** Converts numeric degrees to radians */
			if (typeof(Number.prototype.toRad) === "undefined") {
				Number.prototype.toRad = function() {
					return this * Math.PI / 180;
				}
			}
	
			// Calculate distance
			var R = 6371; // km
			var dLat = (lat_end-lat_now).toRad();
			var dLon = (lon_end-lon_now).toRad();
			var lat1 = lat_now.toRad();
			var lat2 = lat_end.toRad();
	
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c;
	
			if (d <= min_dist) { // is near ?
	
				var direction = actual_step.html_instructions;
	
				if (direction.indexOf("dreta") >= 0 || direction.indexOf("derecha") >= 0 || direction.indexOf("right") >= 0) {
					console.log("-> Dreta [Step "+index+"]");
					vibrateRight();
					
				} else if (direction.indexOf("esquerra") >= 0 || direction.indexOf("izquierda") >= 0 || direction.indexOf("left") >= 0) {
					console.log("<- Esquerra [Step "+index+"]");
					vibrateLeft();
					
				} else if (direction.indexOf("endavant") >= 0 || direction.indexOf("Continúa") >= 0 || direction.indexOf("Continue") >= 0) {
					console.log("| Endavant [Step "+index+"]");

				} else {
					//we cant get if we should go left or right
					console.log("<-> Random [Step "+index+"] == "+direction);

					if (direction.indexOf("oest") >= 0 || direction.indexOf("oeste") >= 0 || direction.indexOf("west") >= 0)
					{
						console.log("<<-> Random Oest [Step "+index+"]");
						vibrateLeft();
					}
					else if (direction.indexOf("est") >= 0 || direction.indexOf("este") >= 0 || direction.indexOf("east") >= 0)
					{
						console.log("<->> Random Est [Step "+index+"]");
						vibrateRight();
					}
					else 
					{
						var rndnum = Math.floor(Math.random()*2);
						if (rndnum == 0){
							console.log("<<-> Random Left [Step "+index+"]");
							vibrateLeft();
						}
						else{
							console.log("<->> Random Right [Step "+index+"]");
							vibrateRight();
						}
					}

				}
	
				index++;
				actual_step = steps[index];
				console.log('Step completed! Next step: ' + index);

			} else {
				console.log('The step '+index+' is far away yet!');
			}
		
		}else{
			console.log("The End!");

			vibrateEnd();

			clearInterval(refreshIntervalId);
		}

	}

	var refreshIntervalId = setInterval( function() {
		navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
	},gps_period);
	
}
