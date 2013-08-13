/*
function showMap(lat, lng) {
	console.log(lat)
	console.log(lng)
	//var myLatLng = new google.maps.LatLng(lat, lng);
	// replace "toner" here with "terrain" or "watercolor"
	var layer = "toner";
	var map = new google.maps.Map(document.getElementById("map"), {
    	center: latlng,
    	zoom: 7,
    	mapTypeId: layer,
    	mapTypeControlOptions: {
        	mapTypeIds: [layer]
    	}
	});
	map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
					
	var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      //title: 'Hello World!'
	});
}

        function getPlace(address) {
		  //var address = document.getElementById('address').value;
		  var geocoder = new google.maps.Geocoder();
		  geocoder.geocode( { 'address': address}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		    	console.log(results[0].geometry.location)
		      geoCode(results[0].geometry.location.jb, results[0].geometry.location.kb);
		  }
		});
		};

*/