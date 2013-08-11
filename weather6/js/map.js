function showMap(lat, lng) {
	console.log(lat)
	console.log(lng)
	var myLatLng = new google.maps.LatLng(lat, lng)
	var mapOptions = {
		zoom: 7,
	    center: myLatLng,
	    mapTypeId: google.maps.MapTypeId.HYBRID
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      //title: 'Hello World!'
	});
}
