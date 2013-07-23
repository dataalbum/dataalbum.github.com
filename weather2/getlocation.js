        //get location
        function getLocation() {
        	
  			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(codeLatLng, errorFunction);
			} 
			
			function errorFunction(){
			    alert("Geocoder failed");
			}
			
			function codeLatLng(position) {
			    var lat = position.coords.latitude;
			    var lng = position.coords.longitude;
			    
				var geocoder = new google.maps.Geocoder();
			    var latlng = new google.maps.LatLng(lat, lng);
			    geocoder.geocode({'latLng': latlng}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {
			      console.log(results)
			        if (results[1]) {
			         	//2nd address component
						city = results[0].address_components[2].long_name;
						address = results[0].formatted_address;
						console.log(address)
         				console.log(city)
						localForecastHeader(server_url, city);
						localForecast(server_url, city);
						localObservation(server_url, city);
			        } else {
			          alert("No results found");
			        }
			      } else {
			        alert("Geocoder failed due to: " + status);
			      }
				});
		  	}
        }
