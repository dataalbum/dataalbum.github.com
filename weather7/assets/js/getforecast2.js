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
		getForecast(lat,lng,city);
		//getForecast2(city,myCallBack);
	});
} //Get location end 

/*
 * Get Forecast
 * Forecast.io API
 * https://api.forecast.io/forecast/4bbca72ee6a5c85729d0fe28c53e68a4/LATITUDE,LONGITUDE
 * and
 * FMI data
 * wfsrequestparser
 * 
 */

function getForecast(lat,lng,site) {
	console.log(lat, lng, site);
	var STORED_QUERY_FORECAST = "fmi::forecast::hirlam::surface::point::multipointcoverage";
	var url = "http://data.fmi.fi/fmi-apikey/516006c7-30ef-4474-97ea-76f7bf4ae01c/wfs";

	var loadForecast1 = $.ajax({
		url: 'https://api.forecast.io/forecast/4bbca72ee6a5c85729d0fe28c53e68a4/' + lat + "," + lng,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			forecast1 = data;
		}
	});
		
	var loadForecast2 = fi.fmi.metoclient.metolib.WfsRequestParser.getData({
		url : url,
		storedQueryId : STORED_QUERY_FORECAST,
		requestParameter : "temperature,pressure,weathersymbol3,windspeedms,winddirection,windgust,humidity,precipitation1h,totalcloudcover",
		begin : new Date(),
		//end : new Date((new Date()).getTime() + 23 * 60 * 60 * 1000),
		end : new Date((new Date()).getTime() + 24 * 60 * 60 * 1000),
		timestep : 60 * 60 * 1000,
		sites : [site],
		callback : function(data) {
			// Handle the data and errors object in a way you choose.
			console.log(data);
			forecast2 = data;
			// Here, we delegate the content for a separate handler function.
			// See parser documentation from source code comments for more details.
			//handleCallback(data, errors, "Forecast Oulu temperature");
			//handleForecastCallback(data, errors);
		}
	});
	$.when(loadForecast1,loadForecast2).done(function() {
		console.log(forecast1);
		console.log(forecast2);
		forecastTable(forecast1, forecast2);
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

function forecastTable(data1,data2) {

	// Init Skycons.
	var icons = new Skycons({"color": "white"});
	var tr;
	// Date locale
	moment.lang('fi');
	for (var i = 0; i < data2.locations[0].data.weathersymbol3.timeValuePairs.length; i++) {
		tr = $('<tr/>');
		
		//forecast1 data
		//tr.append("<td><canvas id='ICON" + i + "' width='32' height='32'></canvas> " + Math.round((data1.hourly.data[i].apparentTemperature -32 ) * 5 / 9) + "°C</td>");
		tr.append("<td class='climacon " + iconSymbolMap[data1.hourly.data[i].icon] + "'> " + Math.round((data1.hourly.data[i].apparentTemperature -32 ) * 5 / 9) + "°C</td>");
		//tr.append("<td>" + Math.round((data1.hourly.data[i].apparentTemperature -32 ) * 5 / 9) + "°C</td>");
		//tr.append("<td class='" + windArrowMap[Math.round(data1.hourly.data[i].windBearing / 10) * 10] + "'></td>");
		//tr.append("<td>" + Math.round(data1.hourly.data[i].windSpeed * 0.44704) + " m/s</td>");
		
		//time
		console.log(data1.hourly.data[i].time, data2.locations[0].data.weathersymbol3.timeValuePairs[i].time);
		if (data1.hourly.data[i].time * 1000 == data2.locations[0].data.weathersymbol3.timeValuePairs[i].time) {
			tr.append("<td class=column-time>" + moment.unix(data1.hourly.data[i].time).format('dd HH:mm') + "</td>");
		}
		else {
			tr.append("<td>:(</td>");
		}
		
		//forecast2 data
		tr.append("<td class='climacon " + symbolMap[data2.locations[0].data.weathersymbol3.timeValuePairs[i].value] + "'> " + Math.round(data2.locations[0].data.Temperature.timeValuePairs[i].value) + "°C</td>");
		//tr.append("<td>" + Math.round(data2.locations[0].data.Temperature.timeValuePairs[i].value) + "°C</td>");
		
		//"climacon " + symbolMap[d.value]
		$('#forecasttable').append(tr);
	}
	
	for(var i = 0; i < data1.hourly.data.length; i++) {
		icons.add("ICON" + i, data1.hourly.data[i].icon);
	}
	icons.play();
}
