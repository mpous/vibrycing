/**
 * WIPJam FirefoxOS Hackathon
 * @author Marc Planagumà
 * @author Marc Pous
 * 
 * Route calculation with Google maps
 */

function calculateRoute() 
{
	var lat_origin = $('#lat_origin').val();
	var lon_origin = $('#lon_origin').val();

	var lat_dest = $('#lat_dest').val();
	var lon_dest = $('#lon_dest').val();

	var t = document.getElementById('title');
	t.parentNode.removeChild( t );

	var b = document.getElementById('button_go');
	b.parentNode.removeChild( b );

	//startVibrate(100);

	/*

 	* busquem el JSON amb la driving/walking route que ens torna Google
 	* convertim el JSON en un objecte ruta amb steps
 	* agafem el 1er step i el comparem amb la latitud i longituds actuals
 	* si estem arribant al nextStep --> vibrar dreta o esquerra
 	* seguim amb el bucle fins al final

 	*/

	var google_maps_api_url = "http://maps.googleapis.com/maps/api/";
	var route;

	$.ajax({
		url: google_maps_api_url + "directions/json",
		data: {
			sensor: "false",
			origin: lat_origin + "," + lon_origin ,
			destination: lat_dest + "," + lon_dest ,
			mode: "walking"
		},
		success: function(data, textStatus) {
			
			// Draw Route in the map!
			calcRoute();

			// Fix on Firefox! "data" response is not a Object is a string
			if (!($.isPlainObject(data))) {
				data = $.parseJSON(data);
			}

			if(data.status == "OK") {
				renderRoute(data);

			} else {
				alert("NO Route available: " + data.status);
			}

		},
		error: function(data) {
			alert("Google Maps Route Error: " + data);
		}
	}).done( function() {
	});
}