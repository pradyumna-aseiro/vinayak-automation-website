/**
*
* -----------------------------------------------------------------------------
*
* Template : Brickx -Construction HTML Template
* Author : rs-theme
* Author URI : http://www.rstheme.com/
*
* -----------------------------------------------------------------------------
*
**/

// gmap init
function initialize() {
 "use strict";
  var mapOptions = {
	zoom: 13,
	scrollwheel: true,
	center: new google.maps.LatLng(41.157838, -80.088670)
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
	  mapOptions);


  var marker = new google.maps.Marker({
	position: map.getCenter(),
	animation:google.maps.Animation.BOUNCE,
	icon: 'images/map-marker.png',
	map: map
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
