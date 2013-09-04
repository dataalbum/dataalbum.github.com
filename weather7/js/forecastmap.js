	  
function cityForecastMap(dataset) {
	
	console.log(dataset)
	
	console.log(lat,lng)
	
	// The SVG container
	var width  = 960,
    	height = 550;
	
	var projection = d3.geo.transverseMercator()
	    .rotate([-25, 0, 0])
	    .center([lng - 25, lat])
	    .scale(14000)
	    //.translate([width / 2, height / 2 - 110])
	    ;

	//var coords = projection([lat, lng]); //Oulu: 65.016667, 25.466667
	
	//console.log(coords)
	
	var path = d3.geo.path()
    	.projection(projection);

	var svg = d3.select("#map").append("svg")
	    .attr("viewBox", "0 0 " + width + " " + height )
        .attr("preserveAspectRatio", "xMidYMin meet")
	    //.attr("width", width)
	    //.attr("height", height)
	    .call(d3.behavior.zoom()
	    .on("zoom", redraw))
	    .append("g");

	function redraw() {
	    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

	d3.json("finland_topo.json", function(error, fi) {

	  svg.selectAll("map")
	      .data(topojson.object(fi, fi.objects.finland).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", "grey");

  	svg.selectAll("circle")
  	    .data(dataset.locations)
       .enter()
       .append("circle")
		.attr('cx', function(d) { return projection([d.info.position[1], d.info.position[0]])[0] ;})
	   	.attr('cy', function(d) { return projection([d.info.position[1], d.info.position[0]])[1] ;})
       	.attr("r", 3)
       	.style("fill", "red")
       	.style("fill-opacity", 1);
	
  	svg.selectAll("city")
  	    .data(dataset.locations)
       .enter()
       .append("text")
		.attr('x', function(d) { return projection([d.info.position[1], d.info.position[0]])[0] ;})
	   	.attr('y', function(d) { return projection([d.info.position[1], d.info.position[0]])[1] - 6 ;})
       	.style("fill", "white")
       	.style("text-anchor", "middle")
       	.text(function(d) { return d.info.name + " | " + d3.format(',.0f')(d.data.temperature.timeValuePairs[1].value) + "°C" + " | " + d3.time.format("%H:%M")(new Date(d.data.temperature.timeValuePairs[1].time)); });
	});
	
  }