/**
 *
 */

function renderRoute(route) {

	var min_dist = 0.05; // 50m
	var distance = route.routes[0].legs[0].distance;
	var duration = route.routes[0].legs[0].duration;
	var steps = route.routes[0].legs[0].steps;
	
	var near = false;

	/*
 	* {
 	"distance" : {
 	"text" : "0,2 km",
 	"value" : 232
 	},
 	"duration" : {
 	"text" : "3 minuts",
 	"value" : 169
 	},
 	"end_location" : {
 	"lat" : 41.358090,
 	"lng" : 2.133660
 	},
 	"html_instructions" : "Gireu a la \u003cb\u003edreta\u003c/b\u003e per \u003cb\u003eCarrer l'Alumini\u003c/b\u003e",
 	"polyline" : {
 	"points" : "ukl{F{~_LkHfF_Af@"
 	},
 	"start_location" : {
 	"lat" : 41.356270,
 	"lng" : 2.135020
 	},
 	"travel_mode" : "WALKING"
 	}
 	*/
 	
 	function isNear(actual_step){
 		
 			function errorGPS(msg){
				alert("GPS ERROR!! w00t!");
			}
			
			function successGPS(position){
				lat_now = position.coords.latitude;
				lon_now = position.coords.longitude;
				
				//lat_end = actual_step.end_location.lat;
				//lon_end = actual_step.end_location.lng;
				
				lat_end = lat_now;
				lon_end = lon_now;
				
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
				
				if (d <= min_dist){
					
						direction = actual_step.html_instructions;
				
						if (direction.indexOf("dreta") >= 0 || direction.indexOf("right") >= 0){
							alert("dreta");
						}
						else if (direction.indexOf("esquerra") >= 0 || direction.indexOf("left") >= 0){
							alert("esquerra");
						}else{
							alert("random!")
						}
					
					near = true;
					
					return true
				}else{
					return false
				}
				
			}

			setInterval(function(){
				navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
				},5000);
			


	}	

	for (var i=0;i<steps.length;i++) {
		var lat_now;
		var lon_now;

		actual_step = steps[i];

		do{
			near = false;
			isNear(actual_step);
			
		} while (near);
		
		if(i==steps.length){
			alert("The END!")
		}

	}
	
	

}
