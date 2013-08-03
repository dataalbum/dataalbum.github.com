		var weatherSymbols = [
				{"id":1,"name":"selkeää"},
				{"id":2,"name":"puolipilvistä"},
				{"id":21,"name":"heikkoja sadekuuroja"},
				{"id":22,"name":"sadekuuroja"},
				{"id":23,"name":"voimakkaita sadekuuroja"},
				{"id":3,"name":"pilvistä"},
				{"id":31,"name":"heikkoa vesisadetta"},
				{"id":32,"name":"vesisadetta"},
				{"id":33,"name":"voimakasta vesisadetta"},
				{"id":41,"name":"heikkoja lumikuuroja"},
				{"id":42,"name":"lumikuuroja"},
				{"id":43,"name":"voimakkaita lumikuuroja"},
				{"id":51,"name":"heikkoa lumisadetta"},
				{"id":52,"name":"lumisadetta"},
				{"id":53,"name":"voimakasta lumisadetta"},
				{"id":61,"name":"ukkoskuuroja"},
				{"id":62,"name":"voimakkaita ukkoskuuroja"},
				{"id":63,"name":"ukkosta"},
				{"id":64,"name":"voimakasta ukkosta"},
				{"id":71,"name":"heikkoja räntäkuuroja"},
				{"id":72,"name":"räntäkuuroja"},
				{"id":73,"name":"voimakkaita räntäkuuroja"},
				{"id":81,"name":"heikkoa räntäsadetta"},
				{"id":82,"name":"räntäsadetta"},
				{"id":83,"name":"voimakasta räntäsadetta"},
				{"id":91,"name":"utua"},
				{"id":92,"name":"sumua"}
		];
		//map symbol id to name
		var symbolMap = {};
			weatherSymbols.forEach(function(d, i) {
			//console.log(d)
			symbolMap[d.id] = d.name;
		});
