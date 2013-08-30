	function showForecastChart(dataset) {
		
		console.log(dataset)
		
		dataset.locations[0].data.temperature.timeValuePairs.shift();
		dataset.locations[0].data.precipitation1h.timeValuePairs.shift();
		
		/*
		 * Forecast multi line chart
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
		
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range());
			
			chart.showLegend(false);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
		        .showMaxMin(false)
		        .axisLabel('Aika');
		
		    chart.yAxis1
		        .tickFormat(function(d) { return d3.format(',.0f')(d) + "°C" })
		        .showMaxMin(false)
		        .axisLabel('Lämpötila');
		
		    chart.yAxis2
		        .tickFormat(function(d) { return d3.format(',.1f')(d) + "mm" })
		        .showMaxMin(false)
		        .axisLabel('Sademäärä');
		    
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
		var rh = dataset.locations[0].data.rh.timeValuePairs;
		var td = dataset.locations[0].data.td.timeValuePairs;
		var r_1h = dataset.locations[0].data.r_1h.timeValuePairs;
		var r_10min = dataset.locations[0].data.ri_10min.timeValuePairs;
		var snow = dataset.locations[0].data.snow_aws.timeValuePairs;
		var pressure = dataset.locations[0].data.p_sea.timeValuePairs;
		var visibility = dataset.locations[0].data.vis.timeValuePairs;
		var location = dataset.locations[0].info;
		
		
		/*
		 * Observation multi chart
		 * Data: Temperature, Precipitation
		 */
		
		var observationData = [
		{
			"key": "Sademäärä",
			"type": "area",
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
			series.values = series.values.map(function(d) { return {x: d.time, y: d.value = d.value || null } });
			return series;
		});

		console.log(observationData)
		
		nv.addGraph(function() {
		    var chart = nv.models.multiChart()
		        .margin({top: 30, right: 60, bottom: 50, left: 70})
		        //.x(function(d) { return d })
		        .color(d3.scale.category10().range());
			
			chart.showLegend(false);
		    
		    chart.xAxis
		        .tickFormat(function (d) { return d3.time.format('%H')(new Date(d)) + ":00" })
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

			//hide line2 ("#forecastChart2 .lines2Wrap .nv-series-0") if precipitation = 0
			d3.selectAll("#observationChart2 .stack2Wrap .nv-series-0")
				.style("display", function(d){ 
					return d3.sum(r_1h, function(d) { 
						return d.value }) == 0 ? "none" : "";});
			
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
	}
		function showForecastMain(dataset,errors){

			console.log(dataset)

			//data processing
			var shiftedTemp = dataset.locations[0].data.temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			
			//create header
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
