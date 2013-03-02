/**
 * @author Mobilitat BDigital
 *
 * Origin Destination Map code
 *
 */

$(document).ready( function() { // When body is ready!

	var s = document.querySelector('#status');

	var lat_origin = document.querySelector('#lat_origin');
	var lon_origin = document.querySelector('#lon_origin');

	var lat_dest = document.querySelector('#lat_dest');
	var lon_dest = document.querySelector('#lon_dest');

	var map;

	var markersArray = [];

	function success(position) {
		if (s.className == 'success') {
			// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back
			return;
		}
		s.innerHTML = "found!";
		s.className = 'success';

		lat_origin.value =   position.coords.latitude;
		lon_origin.value =   position.coords.longitude;

		lat_dest.value = position.coords.latitude;
		lon_dest.value = position.coords.longitude;

		var mapcanvas = document.createElement('div');
		mapcanvas.id = 'mapcanvas';
		mapcanvas.style.height = '400px';
		mapcanvas.style.width = '100%';

		document.querySelector('article').appendChild(mapcanvas);

		var latlng_origin = new google.maps.LatLng(lat_origin.value, lon_origin.value);
		var latlng_dest = new google.maps.LatLng(lat_dest.value, lon_dest.value);

		var myOptions = {
			zoom: 14,
			center: latlng_origin,
			mapTypeControl: false,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

		var marker = new google.maps.Marker({
			position: latlng_origin,
			map: map,
			title:"Origin!"
		});

		var marker2 = new google.maps.Marker({
			position:latlng_dest,
			map:map,
			title: "Destination!"
		});

		//markersArray.push(marker);
		markersArray.push(marker2);

		google.maps.event.addListener(map, 'click', function(event) {
			addMarker(event.latLng);
		});
	}

	function addMarker(location) {

		var coords = String(location).split(',');

		var lat = coords[0].trim();
		lat = String(lat).slice(1);
		var lon = coords[1].trim();
		lon = String(lon).slice(0, -1);

		deleteOverlays();

		marker = new google.maps.Marker({
			position: location,
			map: map
		});

		lat_dest.value = lat;
		lon_dest.value = lon;

		markersArray.push(marker);
	}

	// Deletes all markers in the array by removing references to them
	function deleteOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}
	}

	function error(msg) {
		var s = document.querySelector('#status');
		s.innerHTML = typeof msg == 'string' ? msg : "failed";
		s.className = 'fail';
		// console.log(arguments);
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		error('Geolocation not supported');
	}

});