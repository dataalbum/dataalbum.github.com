		function showObservation(dataset,errors){

			console.log(dataset)
			
			//var width = 1280,
    			//height = 200;
			
			//data processing
			var arrData = dataset.locations;
			console.log(arrData)
						
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
			
			var concatedData = temperature.concat(
						windSpeed, //tuulen nopeus, m/s
						windGust, //gust speed/puuska, m/s
						windDirection, //tuulensuunta, deg
						rh, //relative humidity/kosteus, %
						td, //dew-point temperature/kosteuspiste
						r_1h, //sademäärä,mm
						r_10min, //precipitation intensity, mm/h
						snow, //snow depth, cm
						pressure, //hPa 
						visibility); //näkyvyys, m
			console.log(concatedData)
			
			var nestedData = d3.nest()
						.key(function(d) { return d.time; })
						.entries(concatedData);
			console.log(nestedData)
			
			var lastObs  = [nestedData.pop()];
			console.log(lastObs)

			lastObs.forEach(function(d) {
				d.key = +d.key;
                d.values[0].time = d3.time.format("%A %d.%m.%Y %H:%M")(new Date(d.values[0].time));
                d.values[0].value = "Lämpötila: " + d.values[0].value + "°C";
                d.values[1].value = "Tuulen nopeus: " + d3.format('.0f')(d.values[1].value) + " m/s";
                d.values[2].value = "Puuska: " + d3.format('.0f')(d.values[2].value) + " m/s";
                d.values[3].value = "Tuulen suunta: " + d.values[3].value + "°";
                d.values[4].value = "Kosteus: " + d.values[4].value + "%";
                d.values[5].value = "Kastepiste: " + d.values[5].value + "°C";
                d.values[6].value = "Sademäärä: " + d.values[6].value + " mm";
                d.values[7].value = "Sateen intensiteetti: " + d.values[7].value + " mm/h";
                d.values[8].value = "Lumen syvyys: " + d.values[8].value + " cm";
                d.values[9].value = "Paine: " + d.values[9].value + " hPa";
                d.values[10].value = "Näkyvyys: " + d3.format('.0f')(d.values[10].value / 1000) + " km";
			});
			console.log(lastObs)


			//create list
			var svg = d3.select("#observation");
			
			function update(infoData, obsData) {
				/*
				 * var textPlace = header.selectAll("h2")
					.data(data);
				
				textPlace.enter().append("h2");
				textPlace.text(function(d){ return d.info.name; });
				 */
					
				var info = svg.selectAll("h2")
					.data(infoData);
				info.enter().append("h2")
				info.text(function(d, i){ return "Säähavainnot | " + d.info.name; });            
	
				var list = svg.selectAll("ul")
				    .data(obsData);
				list.enter().append("ul")
				    .attr("style", "margin-left: 0px");
				list.text(function(d) { return d.values[0].time });
				
				var item = list.selectAll("li")
				      .data(function(d) { return d.values; });
				item.enter().append("li");
				item.text(function(d) { return d.value })
				      .style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
			}				      
			update(arrData, lastObs);
		};

		function showForecast(dataset,errors){

			console.log(dataset)

			//data processing
			var arrData = dataset.locations;
			
			//remove the first array/current hour
			dataset.locations[0].data.temperature.timeValuePairs.shift();
			dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			dataset.locations[0].data.windspeedms.timeValuePairs.shift();
			dataset.locations[0].data.winddirection.timeValuePairs.shift();
			
			//shifted parameters
			var shiftedTemperature = dataset.locations[0].data.temperature.timeValuePairs;
			var shiftedWeatherSymbol3 = dataset.locations[0].data.weathersymbol3.timeValuePairs;
			var shiftedWindDirection = dataset.locations[0].data.winddirection.timeValuePairs;
			var shiftedWindSpeend = dataset.locations[0].data.windspeedms.timeValuePairs;			

			//merge parameters
			var concatedData = shiftedTemperature.concat(
					shiftedWeatherSymbol3,
					shiftedWindDirection,
					shiftedWindSpeend);

			console.log(concatedData)
			
			var nestedData = d3.nest()
				.key(function(d) { return d.time; })
				.entries(concatedData);
			console.log(nestedData)
			
			nestedData.forEach(function(d) {
				d.key = +d.key;
                d.time0 = d3.time.format("%H:%M")(new Date(d.values[0].time));
                d.value0 = d3.format('.0f')(d.values[0].value) + "°C";
                d.time1 = d3.time.format("%H:%M")(new Date(d.values[1].time));
                d.value1 = symbolMap[d.values[1].value];
                d.value2 = d.values[2].value + "°";
                d.value3 = d3.format('.0f')(d.values[3].value) + " m/s";
			});
			console.log(nestedData)

			

			//create table
			var columns = ["time0", "value0", "value1", "value2", "value3"];

		    var svg = d3.select("#forecast");
		    
			function update(infoData, forecastData) {
				
				var info = svg.selectAll("h2")
					.data(infoData);
				info.enter().append("h2")
				info.text(function(d, i){ return "12 tunnin ennuste | " + d.info.name; });   
				
			    svg.selectAll('table').data(forecastData).enter().append('table');
			    var table = svg.select("table");
			    
			    //table.selectAll('thead').data(data).enter();//.append('thead');
			    //var thead = table.append("thead");
			    //table.exit().remove();
			    
			    table.selectAll('tbody').data(forecastData).enter().append('tbody');
			    var tbody = table.select("tbody");
				
				//tbody.exit().remove();
				
			    // create a row for each object in the data
			    var rows = tbody.selectAll("tr").data(forecastData);
			    rows.enter().append("tr")
			    .style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
			    
			    rows.exit().remove(); 
			
			    // create a cell in each row for each column
			    var cells = rows.selectAll("td")
			        .data(function(row) {
			            return columns.map(function(column) {
			                return {column: column, value: row[column]};
			            });
			        });
				cells.enter().append("td");
				cells.text(function(d) { return console.log(d.value),d.value; });
				
				cells.exit().remove();
				
				return table;
				 
				}		    
		    update(arrData, nestedData);
		    
		}

		
		function showForecastHeader(dataset,errors){

			console.log(dataset)
			
			//var width = 960,
    			//height = 120;
			
			//data processing
			var arrData = dataset.locations;
			console.log(arrData)

			var shiftedTemp = dataset.locations[0].data.temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			
			//create header
			var header = d3.selectAll(".jumbotron");
			
			function update(data) {
								
				//header place
				var textPlace = header.selectAll("h2")
					.data(data);
				
				textPlace.enter().append("h2");
				textPlace.text(function(d){ return d.info.name; });

				//textPlace.enter().append("h1");
				//textPlace.text(function(d){ return d3.format('.0f')(d.data.temperature.timeValuePairs[0].value) + "°C"; });

				//header temperature
				var textTemperature = header.selectAll("h1")
					.data(data);
				
				textTemperature.enter().append("h1");
				textTemperature.text(function(d){ 
					return symbolMap[d.data.weathersymbol3.timeValuePairs[0].value] + " | " + 
					d3.format('.0f')(d.data.temperature.timeValuePairs[0].value) + "°C "; });
/*
				//header weather
				var textWeather = header.selectAll("h3")
					.data(data);
				
				textWeather.enter().append("h3");
				textWeather.text(function(d){ return symbolMap[d.data.weathersymbol3.timeValuePairs[0].value]; });
*/
				//header timedate
				var textTime = header.selectAll("p")
					.data(data);

				textTime.enter().append("p").attr("class", "lead");
				textTime.text(function(d){ return d.data.temperature.timeValuePairs[0].time = d3.time.format("%A %d.%m.%Y %H:%M")(new Date(d.data.temperature.timeValuePairs[0].time)); });				

				textPlace.exit().remove();
				textTemperature.exit().remove();
				textTime.exit().remove();
			};
						
			update(arrData);
		};

		function showAddress(address){
			
		
		};