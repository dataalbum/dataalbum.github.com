	function handleForecastCallback(dataset) {
		var forecastChartData = dataset;
		var forecastMainData = dataset;
		var forecastTableData = dataset;
		
		//var weatherData = dataset.locations[0].data;
			for (parameter in dataset.locations[0].data) {
			console.log(parameter)
			dataset.locations[0].data[parameter].timeValuePairs.shift()//inside of parameter		
		}

		
		showForecastChart(forecastChartData);
		showForecastTable(forecastTableData);
		showForecastMain(forecastMainData);
	}

	function handleObservationCallback(dataset) {
		showObservationChart(dataset);
		showObservationList(dataset);
	}
	
	function showForecastChart(dataset) {
		
		console.log(dataset)
		
		//dataset.locations[0].data.temperature.timeValuePairs.shift();
		//dataset.locations[0].data.precipitation1h.timeValuePairs.shift();
		
		/*
		 * Forecast
		 * Data: Temperature, Precipitation
		 */
		
		var forecastData = [
		{
			"key": "Sademäärä",
			"type": "bar",
			"values": dataset.locations[0].data.precipitation1h.timeValuePairs,
			"yAxis": 2
		},
		{
			"key": "Lämpötila",
			"type": "line",
			"values": dataset.locations[0].data.temperature.timeValuePairs,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});

		console.log(forecastData)
		
		/*
		 * Data: wind, wind cust
		 */
		
		var windForecastData = [
		{
			"key": "Tuuli",
			"type": "line",
			"values": dataset.locations[0].data.windspeedms.timeValuePairs,
			"yAxis": 1
		},
		{
			"key": "Puuska",
			"type": "line",
			"values": dataset.locations[0].data.windgust.timeValuePairs,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(windForecastData)

		/*
		 * Data: humidity
		 */
		
		var humidityForecastData = [
		{
			"key": "Kosteus",
			"type": "line",
			"values": dataset.locations[0].data.humidity.timeValuePairs,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(humidityForecastData)


		/*
		 * Data: pressure
		 */
		
		var pressureForecastData = [
		{
			"key": "Paine",
			"type": "line",
			"values": dataset.locations[0].data.pressure.timeValuePairs,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(pressureForecastData)

		
		/*
		 * Forecast line + bar chart
		 */
		
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "°C" })
		        .showMaxMin(false);
		
		    chart.yAxis2
		        .tickFormat(function(d) { return d3.format(',.1f')(d) + "mm" })
		        .showMaxMin(false);
		    //chart.bars1.forceY([0]);
		
		    d3.select('#forecastChart2 svg')
		        .datum(forecastData)
		      .transition().duration(500).call(chart);

			//hide bar if precipitation = 0
			d3.selectAll("#forecastChart2 .bars2Wrap .nv-series-0")
				.style("display", function(d){ 
					return d3.sum(dataset.locations[0].data.precipitation1h.timeValuePairs, function(d) { 
						return d.value }) == 0 ? "none" : "";});
			
			//hide y2 axis labels if precipitation = 0
			d3.selectAll("#forecastChart2 .y2.axis text")
				.style("display", function(d){ 
					return d3.sum(dataset.locations[0].data.precipitation1h.timeValuePairs, function(d) { 
						return d.value }) == 0 ? "none" : "";});
			
			nv.utils.windowResize(chart.update);
			
			forecastChart2 = chart;
		    
		    return chart;
		});
		
		/*
		 * Wind multi line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "m/s" })

		    d3.select('#windForecastChart svg')
		        .datum(windForecastData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			windForecastChart = chart;
		    
		    return chart;
		});

		/*
		 * Humidity line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "%" })

		    d3.select('#humidityForecastChart svg')
		        .datum(humidityForecastData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			humidityForecastChart = chart;
		    
		    return chart;
		});

		/*
		 * Pressure line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.1f')(d) + "hPa" })

		    d3.select('#pressureForecastChart svg')
		        .datum(pressureForecastData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			humidityForecastChart = chart;
		    
		    return chart;
		});

	}

	/*
	 * Observation chart
	 */
	function showObservationChart(dataset) {
		
		console.log(dataset)
		
		var temperature = dataset.locations[0].data.t2m.timeValuePairs;
		var windSpeed = dataset.locations[0].data.ws_10min.timeValuePairs;
		var windGust = dataset.locations[0].data.wg_10min.timeValuePairs;
		var windDirection = dataset.locations[0].data.wd_10min.timeValuePairs;
		var humidity = dataset.locations[0].data.rh.timeValuePairs;
		var td = dataset.locations[0].data.td.timeValuePairs;
		var r_1h = dataset.locations[0].data.r_1h.timeValuePairs;
		var r_10min = dataset.locations[0].data.ri_10min.timeValuePairs;
		var snow = dataset.locations[0].data.snow_aws.timeValuePairs;
		var pressure = dataset.locations[0].data.p_sea.timeValuePairs;
		var visibility = dataset.locations[0].data.vis.timeValuePairs;
		var location = dataset.locations[0].info;
		
		
		/*
		 * Observation
		 * Data: Temperature, Precipitation
		 */
		
		var observationData = [
		{
			"key": "Sademäärä",
			"type": "bar",
			"values": r_1h,
			"yAxis": 2
		},
		{
			"key": "Lämpötila",
			"type": "line",
			"values": temperature,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});

		console.log(observationData)

		/*
		 * Data: wind, wind cust
		 */
		
		var windObservationData = [
		{
			"key": "Tuuli",
			"type": "line",
			"values": windSpeed,
			"yAxis": 1
		},
		{
			"key": "Puuska",
			"type": "line",
			"values": windGust,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(windObservationData)

		/*
		 * Data: humidity
		 */
		
		var humidityObservationData = [
		{
			"key": "Kosteus",
			"type": "line",
			"values": humidity,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(humidityObservationData)


		/*
		 * Data: pressure
		 */
		
		var pressureObservationData = [
		{
			"key": "Paine",
			"type": "line",
			"values": pressure,
			"yAxis": 1
		}
		]
		.map(function(series) {
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || 0 } });
			return series;
		});
		
		console.log(pressureObservationData)

		
		
		/*
		 * Observation line + bar chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H:%M')(new Date(d)) })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "°C" })
		        .showMaxMin(false);
		
		    chart.yAxis2
		        .tickFormat(function(d) { return d3.format(',.1f')(d) + "mm" })
		        .showMaxMin(false);
		    
		    //chart.bars2.forceY([0]);
		    
		    d3.select('#observationChart2 svg')
		        .datum(observationData)
		      .transition().duration(500).call(chart);

			//hide bar if precipitation = 0
			d3.selectAll("#observationChart2 .bars2Wrap .nv-series-0")
				.style("display", function(d){ 
					return d3.sum(r_1h, function(d) { 
						return d.value }) == 0 ? "none" : "";});
/*
			//hide line2 ("#forecastChart2 .lines2Wrap .nv-series-0") if precipitation = 0
			d3.selectAll("#observationChart2 .stack2Wrap .nv-series-0")
				.style("display", function(d){ 
					return d3.sum(r_1h, function(d) { 
						return d.value }) == 0 ? "none" : "";});
*/			
			//hide y2 axis labels if precipitation = 0
			d3.selectAll("#observationChart2 .y2.axis text")
				//.style("display", "none");
				.style("display", function(d){ 
					return d3.sum(r_1h, function(d) { 
						return d.value }) == 0 ? "none" : "";});
			
			nv.utils.windowResize(chart.update);
			
			observation2 = chart;
		    
		    return chart;
		});

		/*
		 * Wind multi line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "m/s" })

		    d3.select('#windObservationChart svg')
		        .datum(windObservationData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			windObservationChart = chart;
		    
		    return chart;
		});

		/*
		 * Humidity line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "%" })

		    d3.select('#humidityObservationChart svg')
		        .datum(humidityObservationData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			humidityObservationChart = chart;
		    
		    return chart;
		});

		/*
		 * Pressure line chart
		 */
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range())
			
			chart.showLegend(true);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false);
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.1f')(d) + "hPa" })

		    d3.select('#pressureObservationChart svg')
		        .datum(pressureObservationData)
		      .transition().duration(500).call(chart);

			nv.utils.windowResize(chart.update);
			
			humidityObservationChart = chart;
		    
		    return chart;
		});

	}
		function showForecastMain(dataset,errors){

			console.log(dataset)
			/*
			//data processing
			var shiftedTemp = dataset.locations[0].data.temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			*/
			var header = d3.selectAll("#forecastMain");
			
			function update(data) {
				

				//header place
				var textPlace = header.selectAll("h2")
					.data(data);
				
				textPlace.enter().append("h2");
				textPlace.text(function(d){ return d.info.name; });

				//textPlace.enter().append("h1");
				//textPlace.text(function(d){ return d3.format('.0f')(d.data.temperature.timeValuePairs[0].value) + "°C"; });

				//header weather & temperature
				//add tooltip
				var weatherSymbolTemp = header.selectAll("h1")
				    .data(data);
				weatherSymbolTemp.enter().append("h1");
				weatherSymbolTemp.attr("class", function(d) { return "climacon " + symbolMap[d.data.weathersymbol3.timeValuePairs[0].value] ; });
				weatherSymbolTemp.text(function(d){ 
					return " " + d3.format('.0f')(d.data.temperature.timeValuePairs[0].value) + "°C "; });				

				//header timedate
				var textTime = header.selectAll("p")
					.data(data);

				textTime.enter().append("p").attr("class", "lead");
				textTime.text(function(d){ return d.data.temperature.timeValuePairs[0].time = d3.time.format("%d.%m.%Y %H:%M")(new Date(d.data.temperature.timeValuePairs[0].time)); });				

				textPlace.exit().remove();
				weatherSymbolTemp.exit().remove();
				textTime.exit().remove();
			}
						
			update(dataset.locations);
		}
		
		function showForecastTable(dataset,errors){

			console.log(dataset)

			//data processing
			var arrData = dataset.locations;
			
			//remove the first array/current hour
			/*dataset.locations[0].data.temperature.timeValuePairs.shift();
			dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			dataset.locations[0].data.windspeedms.timeValuePairs.shift();
			dataset.locations[0].data.winddirection.timeValuePairs.shift();
			*/
			//shifted parameters
			var temperature = dataset.locations[0].data.temperature.timeValuePairs;
			var weatherSymbol3 = dataset.locations[0].data.weathersymbol3.timeValuePairs;
			var windDirection = dataset.locations[0].data.winddirection.timeValuePairs;
			var windSpeend = dataset.locations[0].data.windspeedms.timeValuePairs;			

			//merge parameters
			var concatedData = temperature.concat(
					weatherSymbol3,
					windDirection,
					windSpeend);

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
                d.value1 = d.values[1].value;//symbolNameMap[d.values[1].value];
                d.value2 = d.values[2].value;//windDirectionMap[d.values[2].value];
                d.value3 = d3.format('.0f')(d.values[3].value) + " m/s";
			});
			console.log(nestedData)

			

			//create table
			var columns = ["time0", "value1", "value0", "value2", "value3"];

		    var forecastTable = d3.select("#forecastTable");
		    
			function update(infoData, forecastData) {
				
				console.log(infoData, forecastData)
				
				var info = forecastTable.selectAll("h2")
					.data(infoData);
				info.enter().append("h2")
				info.text(function(d){ return "12 tunnin ennuste | " + d.info.name; });   
				
			    forecastTable.selectAll('table').data(forecastData).enter().append('table');
			    var table = forecastTable.select("table");
			    
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
				cells.attr("class", function(d) { 
					if (d.column == "value1") { return "climacon " + symbolMap[d.value] ;}
            		else if (d.column == "value2") { return windArrowMap[d.value] ;}
            		else { return "" ; } 
				;});
				
				cells.text(function(d) { 
					if (d.column == "value1") {return "" ;}
					else if (d.column == "value2") {return "" ;}
					else { return d.value ;} 
				;});
				cells.exit().remove();
				
				return table;
				 
				}		    
		    update(arrData, nestedData);
		    
		}

		function showObservationList(dataset,errors){

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


			//create list
			var svg = d3.select("#observationList");
			
			function update(infoData, obsData) {
					
				var info = svg.selectAll("h2")
					.data(infoData);
				info.enter().append("h2")
				info.text(function(d, i){ return "Säähavainnot | " + d.info.name ; });            

				var info = svg.selectAll("p")
					.data(obsData);
				info.enter().append("p")
				info.text(function(d, i){ return d.values[0].time ; });            

	
				var list = svg.selectAll("ul")
				    .data(obsData);
				list.enter().append("ul")
				    .attr("style", "margin-left: -40px");
				//list.text(function(d) { return d.values[0].time });
				
				var item = list.selectAll("li")
				      .data(function(d) { return d.values; });
				item.enter().append("li");
				item.text(function(d) { return d.value });
				      //.style("background-color", function(d, i) { return i % 2 ? "" : "#ddd"; });
			}				      
			update(arrData, lastObs);
		}

