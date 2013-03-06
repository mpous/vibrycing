/**
 * WIPJam FirefoxOS Hackathon
 * @author Marc Planagumà
 * @author Marc Pous
 *
 * Origin Destination Map code
 */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var markersArray = [];
var currentPosition = [];

function success(position) {

	var s = document.querySelector('#status');

	var lat_origin = document.querySelector('#lat_origin');
	var lon_origin = document.querySelector('#lon_origin');

	var lat_dest = document.querySelector('#lat_dest');
	var lon_dest = document.querySelector('#lon_dest');

	if (s.className == 'success') {
		// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back
		return;
	}
	s.innerHTML = "found!";
	s.className = 'success';

	var d = document.getElementById( 'status' );
	d.parentNode.removeChild( d );

	lat_origin.value =   position.coords.latitude;
	lon_origin.value =   position.coords.longitude;

	lat_dest.value = position.coords.latitude;
	lon_dest.value = position.coords.longitude;

	var mapcanvas = document.createElement('div');
	mapcanvas.id = 'mapcanvas';
	mapcanvas.style.height = '300px';
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
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);

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

function calcRoute() {

	var lat_origin = document.querySelector('#lat_origin');
	var lon_origin = document.querySelector('#lon_origin');

	var lat_dest = document.querySelector('#lat_dest');
	var lon_dest = document.querySelector('#lon_dest');

	var latlng_origin = new google.maps.LatLng(lat_origin.value, lon_origin.value);
	var latlng_dest = new google.maps.LatLng(lat_dest.value, lon_dest.value);

	var request = {
		origin:latlng_origin,
		destination:latlng_dest,
		travelMode: google.maps.TravelMode.WALKING
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
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
		//icon: 'img/bike.png',
		map: map
	});

	lat_dest.value = lat;
	lon_dest.value = lon;

	markersArray.push(marker);
}

function addCurrentPositionMarker(location) {

	var coords = String(location).split(',');

	var lat = coords[0].trim();
	lat = String(lat).slice(1);
	var lon = coords[1].trim();
	lon = String(lon).slice(0, -1);

	deleteCurrentPositionOverlays();

	marker = new google.maps.Marker({
		position: location,
		icon: 'img/bicycle.png',
		map: map
	});

	lat_dest.value = lat;
	lon_dest.value = lon;

	currentPosition.push(marker);
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

function deleteCurrentPositionOverlays() {
	if (currentPosition) {
		for (i in currentPosition) {
			currentPosition[i].setMap(null);
		}
		currentPosition.length = 0;
	}
}

function error(msg) {
	var s = $('#status');
	s.innerHTML = typeof msg == 'string' ? msg : "failed";
	s.className = 'fail';
	// console.log(arguments);
}

$(document).ready( function() { // When body is ready!

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		error('Geolocation not supported');
	}

});