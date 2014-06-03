/*
 * Meteo data
 */

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
		localForecast(server_url, city);
		localObservation(server_url, city);
	});
} //Get location end 

/*
 * Handle Forecast Callback  
 */
function handleForecastCallback(dataset) {
	//var weatherData = dataset.locations[0].data;
	for (parameter in dataset.locations[0].data) {
		console.log(parameter)
		dataset.locations[0].data[parameter].timeValuePairs.shift()//inside of parameter		
	}
	console.log(dataset);
	var forecastChartData = dataset;
	var forecastMainData = dataset;
	var forecastTableData = dataset;
		
	showForecastChart(forecastChartData);
	showForecastTable(forecastTableData);
	showForecastMain(forecastMainData);
}

/*
 * Handle Observation Callback  
 */
function handleObservationCallback(dataset) {
	showObservationCard(dataset);
	showObservationList(dataset);
}

/*
 * Show Observation data in card
 */

function showObservationCard(dataset) {
		
	//data processing
	var locationData = dataset.locations;
	console.log(locationData)
					
	var temperature = dataset.locations[0].data.t2m.timeValuePairs;
	var windSpeed = dataset.locations[0].data.ws_10min.timeValuePairs;
	var windGust = dataset.locations[0].data.wg_10min.timeValuePairs;
	var windDirection = dataset.locations[0].data.wd_10min.timeValuePairs;
	var rh = dataset.locations[0].data.rh.timeValuePairs;
	var td = dataset.locations[0].data.td.timeValuePairs;
	var r_1h = dataset.locations[0].data.r_1h.timeValuePairs;
	var r_10min = dataset.locations[0].data.ri_10min.timeValuePairs;
	var snow = dataset.locations[0].data.snow_aws.timeValuePairs;
	var pressure = dataset.locations[0].data.p_sea.timeValuePairs;
	var visibility = dataset.locations[0].data.vis.timeValuePairs;			
			
	//observation header
	var header = d3.selectAll("#observationCard");
	    
	function update(data) {
		//header place
		var textPlace = header.selectAll("h2")
			.data(data);
				
			textPlace.enter().append("h2");
			textPlace.text(function(d){ return d.info.name; });

		var weatherSymbolTemp = header.selectAll("h1")
				.data(data);
			weatherSymbolTemp.enter().append("h1");
//			weatherSymbolTemp.attr("class", function(d) { return "climacon " + symbolMap[d.data.weathersymbol3.timeValuePairs[0].value] ; });
			weatherSymbolTemp.text(function(d){ 
				return " " + d3.format('.0f')(temperature[0].value) + "°C "; });				

		//header timedate
		var textTime = header.selectAll("p")
			.data(data);

			textTime.enter().append("p").attr("class", "lead");
			textTime.text(function(d){ return temperature[0].time = d3.time.format("%d.%m.%Y %H:%M")(new Date(temperature[0].time)); });				

			textPlace.exit().remove();
			weatherSymbolTemp.exit().remove();
			textTime.exit().remove();
	}
						
	update(dataset.locations);
} // showObservationCard end

/*
 * Clock
 */
function clock(){
	
	var formatTimeHour = d3.time.format("%H");
	var formatTimeMin = d3.time.format("%M");
	var formatTimeSec = d3.time.format("%S");
	
	var clock = d3.selectAll("#clock");
	
	var hour = clock.append("h1");
	var min = clock.append("h1");
	var sec = clock.append("h1");
	
	(function tick() {
		var now = new Date;
		hour.text(formatTimeHour(new Date(d3.time.second(now))));
		min.text(formatTimeMin(new Date(d3.time.second(now))));
		sec.text(formatTimeSec(new Date(d3.time.second(now))));
		setTimeout(tick, 1000 - now % 1000);
	})();
}