/*
 * Get location 
 */
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
		$('#city').append(city);
		getForecast(lat,lng);
		
	});
} //Get location end 

/*
 * Get Forecast
 * Call Forecast API
 * https://api.forecast.io/forecast/4bbca72ee6a5c85729d0fe28c53e68a4/LATITUDE,LONGITUDE
 */

function getForecast(lat,lng) {
	console.log(lat, lng)
	$.ajax({
		url: 'https://api.forecast.io/forecast/4bbca72ee6a5c85729d0fe28c53e68a4/' + lat + "," + lng,
		dataType: "jsonp",
		jsonp: "callback",
		success: function (data,errors) {
			resultHandler(data,errors);
			forecastTable(data,errors);		
		}
	});
} //Get Forecast end

/*
 * ResultHandler
 */

function resultHandler(data,errors) {
	console.log(data)
	console.log(data.currently)
	var results = jQuery("#forecast");
	results.append("<h2>Forecast</h2>");
	if (data) {
		results.append("<h3>Data object</h3>");
		recursiveBrowse(results, data, "");
	}
	if (errors) {
		results.append("<h3>Errors object</h3>");
		recursiveBrowse(results, errors, "");
	}
} //Result handler end

/*
 * Recursive Browse
 * Shows Array data
 */	
function recursiveBrowse(container, data, indentStr) {
	if (_.isArray(data) || _.isObject(data)) {
		// Browse all the child items of the array or object.
		indentStr += ">";
		_.each(data, function(value, key) {
			container.append("<br>" + indentStr + " [" + key + "]");
			recursiveBrowse(container, value, indentStr);
		});

	} else {
		// This is a leaf. So, just append it after its container array or object.
		container.append(" > " + data);
	}
}

function forecastTable(data,errors) {

	// Init Skycons.
	var icons = new Skycons({"color": "white"});
	var tr;
	// Date locale
	moment.lang('fi');
	for (var i = 0; i < data.hourly.data.length; i++) {
		tr = $('<tr/>');
		tr.append("<td>" + moment.unix(data.hourly.data[i].time).format('dd HH:mm') + "</td>");
		tr.append("<td><canvas id='ICON" + i + "' width='32' height='32'></canvas></td>");
		tr.append("<td>" + Math.round((data.hourly.data[i].apparentTemperature -32 ) * 5 / 9) + "°C</td>");
		tr.append("<td class='" + windArrowMap[Math.round(data.hourly.data[i].windBearing / 10) * 10] + "'></td>");
		tr.append("<td>" + Math.round(data.hourly.data[i].windSpeed * 0.44704) + " m/s</td>");
		$('#forecasttable').append(tr);
	}
	
	for(var i = 0; i < data.hourly.data.length; i++) {
		icons.add("ICON" + i, data.hourly.data[i].icon);
	}
	icons.play();
}
