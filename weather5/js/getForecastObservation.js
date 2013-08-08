function getForecastObservation(city) {
	console.log(city)
	var forecastHeaderData = localForecastHeader(server_url, city);
	var forecastData = localForecast(server_url, city);
	var observationData = localObservation(server_url, city);
	
	//showForecastHeader(forecastHeaderData);
	//showForecast(forecastData);
	//showObservation(observationData);
};
/*
function getManualForecastObservation(sites) {
	
	var forecastData = localForecast(server_url, sites);
	var observationData = localObservation(server_url, sites);
	
	reShowForecastHeader(forecastData);
	reShowForecast(forecastData);
	reShowObservation(observationData);
};
*/