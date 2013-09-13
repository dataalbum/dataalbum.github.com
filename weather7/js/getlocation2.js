        //get location
        function geoLocation() {

  			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(codeLatLng, errorFunction);
			} 
			
			function errorFunction(){
			    alert("Geocoder failed");
			}
		}
		function codeLatLng(position) {
			console.log(position)
		    lat = position.coords.latitude;
		    lng = position.coords.longitude;
			geoCode(position.coords.latitude, position.coords.longitude);				
		}

		function getPlace(address) {

			//var geocode = 'http://open.mapquestapi.com/nominatim/v1/search?format=json&q=' + address;
			//http://nominatim.openstreetmap.org/search/
			var geocode = 'http://nominatim.openstreetmap.org/search?format=json&q=' + address;
			$.getJSON(geocode, function(data) {
				console.log(data)
				var lat = data[0].lat;
				var lng = data[0].lon;
				console.log(lat, lng)
				geoCode(lat, lng)			 
			});
		}
		
		function geoCode(lat,lng) {
			var geocode = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + "&lon=" + lng;
			console.log(lat, lng)
			console.log(geocode)
			$.getJSON(geocode, function(data) {
				console.log(data)
				console.log(data.address.city)
				var city = data.address.city;
				localForecastChart(server_url, city);
				localObservationChart(server_url, city);
			});
		}