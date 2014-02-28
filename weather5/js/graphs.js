		function showObservation(dataset,errors){

			console.log(dataset)
			
			//var width = 1280,
    			//height = 200;
			
			//data processing
			var arrData = dataset.locations;
			console.log(arrData)
			
			/* Missing:
			 * if (!isNaN(station.WW_AWS))
                html += makeObservationDataRow(translate("Weather"), 
				resolveWawaCode(Number(station.WW_AWS)), ""); 
			 */
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
			/* Example:
			 * m-fmi-fi/saa/js/weather_ui.js
			 *  if (!isNaN(station.Temperature))
			 * 		html += makeObservationDataRow(translate("Temperature"), 
                    formatNumber(station.Temperature), 
                    "&deg;C");
			 */
			lastObs.forEach(function(d) {
				d.key = +d.key;
                d.values[0].time = d3.time.format("%d.%m.%Y %H:%M")(new Date(d.values[0].time));
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

			//Idea: if multiple observation stations: bootstrap carousel template
			
			//create list
			var svg = d3.select("#observation");
			
			function update(infoData, obsData) {
				/*
				 * var textPlace = header.selectAll("h2")
					.data(data);
				
				textPlace.enter().append("h2");
				textPlace.text(function(d){ return d.info.name; });
				 */
					
				var info = svg.selectAll("h3")
					.data(infoData);
				info.enter().append("h3")
				info.text(function(d, i){ return "Säähavainnot | " + d.info.name; });            
	
				var list = svg.selectAll("ul")
				    .data(obsData);
				list.enter().append("ul")
				    .attr("style", "margin-left: -30px");
				list.text(function(d) { return d.values[0].time });
				
				var item = list.selectAll("li")
				      .data(function(d) { return d.values; });
				item.enter().append("li");
				item.text(function(d) { return d.value });
				      //.style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
			}				      
			update(arrData, lastObs);
		};

		function showForecast(dataset,errors){

			console.log(dataset)

			//data processing
			var arrData = dataset.locations;
			
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
                d.value2 = windDirectionMap[d.values[2].value];
                d.value3 = d3.format('.0f')(d.values[3].value) + " m/s";
			});
			console.log(nestedData)

			

			//create table
			var columns = ["time0", "value1", "value0", "value2", "value3"];

		    var svg = d3.select("#forecast");
		    
			function update(infoData, forecastData) {
				
				var info = svg.selectAll("h3")
					.data(infoData);
				info.enter().append("h3")
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
			    rows.enter().append("tr");
			    //.style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
			    
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

			var shiftedTemp = dataset.locations[0].data.Temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			console.log(dataset.locations[0].info.position[0])
			console.log(dataset.locations[0].info.position[1])
			
			//forecast location longitude and latitude
			var lat = dataset.locations[0].info.position[0],
				lng = dataset.locations[0].info.position[1];
			
			console.log(lng)
			console.log(lat)
			
			//create header
			
			//remove exiting svg, if any
			//remove headerForecast
			d3.select("svg").remove();
			//remove map
			d3.select("svg").remove();
			
			//svg area
			var width = 350,
				height = 350;
			
			//map projection
			var projection = d3.geo.transverseMercator()
			    .rotate([-25, 0])
			    .center([20, 61.5])
			    .scale(1800);		
			
			//place coordinates to projection
			var coords = projection([lng, lat]); //Oulu: 65.016667, 25.466667
			console.log(coords)
			
			//svg path
			var path = d3.geo.path()
		    	.projection(projection);
			
			//selection and svg
			var svgHeaderForecast = d3.select("#headerForecast").append("svg")
				.attr("width", width)
    			.attr("height", height);
			
			//selection and svg
			var svgMap = d3.select("#map").append("svg")
				.attr("width", width)
    			.attr("height", height);
			
			function update(data) {

				//map
				d3.json("data/finland_topo.json", function(error, fi) {
			
					svgMap.selectAll("map")
						.data(topojson.object(fi, fi.objects.finland).geometries)
					    .enter().append("path")
					    //.attr("class", function(d) { return "subunit " + d.id; })
						.attr("d", path)
						.style("fill", "white")
					
					svgMap.append("circle")
						.attr('cx', coords[0])
					   	.attr('cy', coords[1])
				       	.attr("r", 5)
				       	.style("fill", "red");
	/*	
					svg.selectAll("p")
		      			.data(address)
		    			.enter().append("text")
						.attr("x", 0)
						.attr("y", 24)
		      			.attr("dy", ".35em")
		      			.style("text-anchor", "start")
		      			.style("fill", "white")
		      			.text(function(d) { return d.formatted_address; });
	*/	      			 
				});
				
				//header place
				var textPlace = svgHeaderForecast.selectAll("place")
					.data(data);
				
				textPlace.enter().append("text")
					.style("font-size", 63)
					.style("fill", "white")
					.style("text-anchor", "middle")
					.attr("x", width / 2)
					.attr("y", 60);
					
				textPlace.text(function(d){ return d.info.name; });


				//header weather symbol				
				var weatherSymbol = svgHeaderForecast.selectAll("symbol")
					.data(data);
    				
				weatherSymbol.enter().append("image")
					.attr("width", width)
    				.attr("height", height);
								    			
    			weatherSymbol.attr("xlink:href", function(d) { return "img/SVG/" + d.data.weathersymbol3.timeValuePairs[0].value + ".svg" ; });
				
				//header temperature
				var textTemperature = svgHeaderForecast.selectAll("temp")
					.data(data);
				
				textTemperature.enter().append("text")
					.style("font-size", 63)
					.style("fill", "white")
					.style("text-anchor", "middle")
					.attr("x", width / 2)
					.attr("y", height -40);

				textTemperature.text(function(d){ 
					return d3.format('.0f')(d.data.Temperature.timeValuePairs[0].value) + "°C "; });
				

				//header timedate
				var textTime = svgHeaderForecast.selectAll("time")
					.data(data);

				textTime.enter().append("text")
					//.style("font-size", 63)
					.style("fill", "white")
					.style("text-anchor", "middle")
					.attr("x", width / 2)
					.attr("y", height);

				textTime.text(function(d){ return d.data.Temperature.timeValuePairs[0].time = d3.time.format("%d.%m.%Y %H:%M")(new Date(d.data.Temperature.timeValuePairs[0].time)); });				

				
			};
						
			update(arrData);
		};
		
