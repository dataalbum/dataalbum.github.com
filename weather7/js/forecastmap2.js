function showForecastMap(dataset) {
	
	console.log(dataset)
	
	console.log(lat,lng)
	
	var map = L.map('map').setView([lat, lng], 7);
	
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    	maxZoom: 18
	}).addTo(map);

	for (i = 0; i < dataset.locations.length; i++){
  		L.marker([dataset.locations[i].info.position[0], dataset.locations[i].info.position[1]]).addTo(map)
  			.bindPopup(dataset.locations[i].info.name + "</br>" + Math.round(dataset.locations[i].data.temperature.timeValuePairs[1].value) + "°C");
  			
	};

}