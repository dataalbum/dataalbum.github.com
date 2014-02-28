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

			var info = svg.selectAll("h2")
				.data(arrData)
				.enter().append("h2")
				//.attr("text-anchor", "middle")
				.text(function(d, i){ return "Observations | " + d.info.name; });            

			var list = svg.selectAll("ul")
			    .data(lastObs)
			  .enter().append("ul")
			    .text(function(d) { return d.values[0].time });
			
			var item = list.selectAll("li")
			      .data(function(d) { return d.values; })
			    .enter().append("li")
			      .text(function(d) { return d.value })
			      .style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
						      
		};

		function showForecast(dataset,errors){

			console.log(dataset)
    					
			//var width = 1280,
    			//height = 300;
			
			//data processing
			//remove the first array/current hour
			dataset.locations[0].data.Temperature.timeValuePairs.shift();
			dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			dataset.locations[0].data.WindSpeedMS.timeValuePairs.shift();
			dataset.locations[0].data.WindDirection.timeValuePairs.shift();
			
			//shifted parameters
			var shiftedTemperature = dataset.locations[0].data.Temperature.timeValuePairs;
			var shiftedWeatherSymbol3 = dataset.locations[0].data.weathersymbol3.timeValuePairs;
			var shiftedWindDirection = dataset.locations[0].data.WindDirection.timeValuePairs;
			var shiftedWindSpeend = dataset.locations[0].data.WindSpeedMS.timeValuePairs;			

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
		    
		    var info = svg.append("h2")
		    	//attr("text-anchor", "middle")
		    	.text("Forecast | Next 12 hours"); 
		    
		    var table = svg.append("table")
		    		.attr("style", "margin-left: 40px"),
		        thead = table.append("thead"),
		        tbody = table.append("tbody");

/*		
		    // append the header row
		    thead.append("tr")
		        .selectAll("th")
		        .data(columns)
		        .enter()
		        .append("th")
		            .text(function(column) { return column; });
*/		
		    // create a row for each object in the data
		    var rows = tbody.selectAll("tr")
		        .data(nestedData)
		        .enter()
		        .append("tr")
		        .style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
		
		    // create a cell in each row for each column
		    var cells = rows.selectAll("td")
		        .data(function(row) {
		            return columns.map(function(column) {
		                return {column: column, value: row[column]};
		            });
		        })
		        .enter()
		        .append("td")
		            .text(function(d) { return console.log(d.value),d.value; });
		    
		    return table;
		}

		
		function showForecastHeader(dataset,errors){

			console.log(dataset)
			
			//var width = 960,
    			//height = 120;
			
			//data processing
			var arrData = dataset.locations;
			console.log(arrData)

			var shiftedTemp = dataset.locations[0].data.Temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			
			//create header
			var svg = d3.select('#forecastHeader');
			    //.attr('width', width)
			    //.attr('height', height);
			
			var info = svg.selectAll("h1")
				.data(arrData)
				.enter();

			info.append("h1")
				//.attr("dx", 0)
				//.attr("dy", 30)
				.style("font-size", "70px")
				//.attr("text-anchor", "middle")
				.text(function(d){ return d.info.name; });

			info.append("h1")
				//.attr("dx", 0)
				//.attr("dy", 80)
				.style("font-size", "70px")
				//.attr("text-anchor", "middle")
				.text(function(d){ return d3.format('.0f')(d.data.Temperature.timeValuePairs[0].value) + "°C | " + symbolMap[d.data.weathersymbol3.timeValuePairs[0].value]; });

			info.append("p")
				//.attr("dx", 0)
				//.attr("dy", 110)
				//.attr("text-anchor", "middle")
				.text(function(d){ return d.data.Temperature.timeValuePairs[0].time = d3.time.format("%A %d.%m.%Y %H:%M")(new Date(d.data.Temperature.timeValuePairs[0].time)); });
		};
