        //get location
        function geoLocation() {

  			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(codeLatLng, errorFunction);
			} 
			
			function errorFunction(){
			    alert("Geocoder failed");
			}
		};
			function codeLatLng(position) {
				console.log(position)
			    var lat = position.coords.latitude;
			    var lng = position.coords.longitude;
				geoCode(position.coords.latitude, position.coords.longitude);				
			};
			function geoCode(lat, lng) {
			    
				var geocoder = new google.maps.Geocoder();
			    var latlng = new google.maps.LatLng(lat, lng);
			    geocoder.geocode({'latLng': latlng}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {
			      console.log(results)
			        if (results[1]) {
			         	//2nd address component
						city = results[0].address_components[2].long_name;
						address = [results[0]];
						console.log(address)
         				console.log(city)
						getForecastObservation(city);
			        } else {
			          alert("No results found");
			        }
			      } else {
			        alert("Geocoder failed due to: " + status);
			      }
				});
				
				//initial map
		  		/*
		  		// replace "toner" here with "terrain" or "watercolor"
				var layer = "watercolor";
				var map = new google.maps.Map(document.getElementById("map"), {
    				center: new google.maps.LatLng(lat, lng),
    				zoom: 6,
    				//mapTypeId: layer,
			        mapTypeId: 'terrain'
    				/*mapTypeControlOptions: {
        				mapTypeIds: [layer]
    				}*/
				/*
				});
				//map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
				
				var marker = new google.maps.Marker({
					position: latlng,
      				map: map,
      				//title: results[1].formatted_address
				});*/
		  	
		  	};
        
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
