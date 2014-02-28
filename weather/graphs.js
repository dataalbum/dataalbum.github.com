		function showObservation(dataset,errors){

			console.log(dataset)
			
			var width = 1280,
    			height = 200;
			
			var arrData = dataset.locations;
			console.log(arrData)
			
			//t2m,ws_10min,wg_10min,wd_10min,rh,td,r_1h,ri_10min,snow_aws,p_sea,vis
			//var last = d3.max(dataset.locations[0].data.t2m.timeValuePairs, function(d) { return d.time = d3.time.format("%a %H:%M")(new Date(d.time)); });
			//console.log(last)

			var svg = d3.select('#observation').append('svg')
			    .attr('width', width)
			    .attr('height', height);

			var data = svg.selectAll("g")
				.data(arrData)
				.enter().append("g")  
				.attr('transform', function(d, i){return 'translate('+(i*50)+', 40)';});
			
			var content = data.selectAll("content")
				.data(function(d) { return d3.nest().key(function(d) { 
					return d.time; }).entries(d.data.t2m.timeValuePairs.concat(
						d.data.ws_10min.timeValuePairs,
						d.data.wg_10min.timeValuePairs,
						d.data.wd_10min.timeValuePairs,
						d.data.rh.timeValuePairs,
						d.data.td.timeValuePairs,
						d.data.r_1h.timeValuePairs,
						d.data.ri_10min.timeValuePairs,
						d.data.snow_aws.timeValuePairs,
						d.data.p_sea.timeValuePairs,
						d.data.vis.timeValuePairs));})
				.enter().append("text")
				.text(function(d, i){
					return d.values[0].time = d3.time.format("%a %H:%M")(new Date(d.values[0].time)) + " | " + 
					d3.format('.0f')(d.values[0].value) + "°C" + " | " + 
					d.values[3].value + "° " +
					d3.format('.0f')(d.values[1].value) + " m/s";})
				.attr("dx", 0)
				.attr('dy', function(d, i){return (i+1)*20;});	
/*
			var header = svg.selectAll(".header")
				.data(arrData)
				.enter().append("g")  
				.attr('transform', function(d, i){return 'translate('+(i*50)+', 40)';})
				
			header.append("text")
				.attr("dx", 0)
				.attr("dy", 20)
				.text(function(d, i){ 
					return d.data.t2m.property.label + " | " +
						d.data.ws_10min.property.label + " | " +
						d.data.wg_10min.property.label + " | " +
						d.data.wd_10min.property.label + " | " +
						d.data.rh.property.label + " | " +
						d.data.td.property.label + " | " +
						d.data.r_1h.property.label + " | " +
						d.data.ri_10min.property.label + " | " +
						d.data.snow_aws.property.label + " | " +
						d.data.p_sea.property.label + " | " +
						d.data.vis.property.label; });
*/
			var info = svg.selectAll(".info")
				.data(arrData)
				.enter().append("g")  
				.attr('transform', function(d, i){return 'translate('+(i*50)+', 0)';})
				
			info.append("text")
				.attr("dx", 0)
				.attr("dy", 30)
				.style("font-size", "150%")
				.text(function(d, i){ return "Observations | " + d.info.name; });

		};
		function showForecast(dataset,errors){

			console.log(dataset)
    					
			var width = 1280,
    			height = 300;
			
			var arrData = dataset.locations;


			var shiftedTemp = dataset.locations[0].data.Temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			var shiftedWindS = dataset.locations[0].data.WindSpeedMS.timeValuePairs.shift();
			var shiftedWindD = dataset.locations[0].data.WindDirection.timeValuePairs.shift();
			
			console.log(arrData)

			var svg = d3.select('#forecast').append('svg')
			    .attr('width', width)
			    .attr('height', height);

			var data = svg.selectAll("g")
				.data(arrData)
				.enter().append("g")  
				.attr('transform', function(d, i){return 'translate('+(i*50)+', 40)';});
			
			var content = data.selectAll("content")
				.data(function(d) { return d3.nest().key(function(d) { 
					return d.time; }).entries(d.data.Temperature.timeValuePairs.concat(d.data.pressure.timeValuePairs,d.data.weathersymbol3.timeValuePairs,d.data.WindSpeedMS.timeValuePairs,d.data.WindDirection.timeValuePairs));})
				.enter().append("text")
				.text(function(d, i){
					return d.values[0].time = d3.time.format("%a %H:%M")(new Date(d.values[0].time)) + " | " + 
					d3.format('.0f')(d.values[0].value) + "°C" + " | " + symbolMap[d.values[2].value] + " | " + 
					d.values[4].value + "° " +
					d3.format('.0f')(d.values[3].value) + " m/s";})
				.attr("dx", 0)
				.attr('dy', function(d, i){return (i+1)*20;});		

			var info = svg.selectAll("info")
				.data(["Forecast | Next 12 hours"])
				.enter().append("text")
				.attr("dx", 0)
				.attr("dy", 30)
				.style("font-size", "150%")
				.text(function(d) { return d;});
		};

		function showForecastHeader(dataset,errors){

			console.log(dataset)
			
			var width = 1280,
    			height = 120;
			
			var arrData = dataset.locations;
			console.log(arrData)

			var shiftedTemp = dataset.locations[0].data.Temperature.timeValuePairs.shift();
			var shiftedPress = dataset.locations[0].data.pressure.timeValuePairs.shift();
			var shiftedSymb = dataset.locations[0].data.weathersymbol3.timeValuePairs.shift();
			
			console.log(shiftedSymb)
			
			var svg = d3.select('#forecastHeader').append('svg')
			    .attr('width', width)
			    .attr('height', height);

			var data = svg.selectAll("g")
				.data(arrData)
				.enter().append("g")  
			
			var info = svg.selectAll("info")
				.data(arrData)
				.enter();

			info.append("text")
				.attr("dx", 0)
				.attr("dy", 30)
				.style("font-size", "250%")
				.text(function(d){ return d.info.name; });

			info.append("text")
				.attr("dx", 0)
				.attr("dy", 80)
				.style("font-size", "250%")
				.text(function(d){ return d3.format('.0f')(d.data.Temperature.timeValuePairs[0].value) + "°C | " + symbolMap[d.data.weathersymbol3.timeValuePairs[0].value]; });

			info.append("text")
				.attr("dx", 0)
				.attr("dy", 110)
				.text(function(d){ return d.data.Temperature.timeValuePairs[0].time = d3.time.format("%A %d.%m.%Y %H:%M")(new Date(d.data.Temperature.timeValuePairs[0].time)); });
		};
