/**
 * WIPJam FirefoxOS Hackathon
 * @author Marc Planagumà
 * @author Marc Pous
 */

function renderRoute(route) {

	var min_dist = 0.05; // 50m
	var distance = route.routes[0].legs[0].distance;
	var duration = route.routes[0].legs[0].duration;
	var steps = route.routes[0].legs[0].steps;

	var index = 0;
	var actual_step = steps[index];
	console.log("Steps: " + steps.length);

	
	function errorGPS(msg) {
		alert("GPS ERROR!! w00t!");
	}

	function successGPS(position) {
		
		
		lat_now = position.coords.latitude;
		lon_now = position.coords.longitude;

		//lat_end = actual_step.end_location.lat;
		//lon_end = actual_step.end_location.lng;

		lat_end = lat_now;
		lon_end = lon_now;
		
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
	
				if (direction.indexOf("dreta") >= 0 || direction.indexOf("right") >= 0) {
					alert("Dreta [Step "+index+"] ->");
					console.log("Dreta [Step "+index+"] ->");
					vibrateRight();
					
				} else if (direction.indexOf("esquerra") >= 0 || direction.indexOf("left") >= 0) {
					alert("<- Esquerra [Step "+index+"]");
					console.log("<- Esquerra [Step "+index+"]");
					vibrateLeft();
					
				} else {
					alert("<- Random ->  [Step "+index+"]");
					console.log("<- Random ->  [Step "+index+"]");
				}
	
				index++;
				actual_step = steps[index];
				console.log('Step completed! Next step: ' + index);
				
				
			} else {
				console.log('The step '+index+' is far away yet!');
			}
		
		}else{
			alert("The End!");
			console.log("The End!");
			clearInterval(refreshIntervalId);
		}

	}

	var refreshIntervalId = setInterval( function() {
		navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
	},5000);
	
}
