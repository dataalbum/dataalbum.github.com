		var weatherSymbols = [
				{"icon":1,"name":"selkeää","symbol":"sun"},
				{"icon":2,"name":"puolipilvistä","symbol":"cloud sun"},
				{"icon":21,"name":"heikkoja sadekuuroja","symbol":"drizzle sun"},
				{"icon":22,"name":"sadekuuroja","symbol":"showers sun"},
				{"icon":23,"name":"voimakkaita sadekuuroja","symbol":"rain sun"},
				{"icon":3,"name":"pilvistä","symbol":"cloud"},
				{"icon":31,"name":"heikkoa vesisadetta","symbol":"drizzle"},
				{"icon":32,"name":"vesisadetta","symbol":"rain"},
				{"icon":33,"name":"voimakasta vesisadetta","symbol":"downpour"},
				{"icon":41,"name":"heikkoja lumikuuroja","symbol":"snow sun"},
				{"icon":42,"name":"lumikuuroja","symbol":"flurries sun"},
				{"icon":43,"name":"voimakkaita lumikuuroja","symbol":"snow flurries"},
				{"icon":51,"name":"heikkoa lumisadetta","symbol":"snow"},
				{"icon":52,"name":"lumisadetta","symbol":"snow"},
				{"icon":53,"name":"voimakasta lumisadetta","symbol":"snow"},
				{"icon":61,"name":"ukkoskuuroja","symbol":"lightning sun"},
				{"icon":62,"name":"voimakkaita ukkoskuuroja","symbol":"lightning sun"},
				{"icon":63,"name":"ukkosta","symbol":"lightning"},
				{"icon":64,"name":"voimakasta ukkosta","symbol":"lightning"},
				{"icon":71,"name":"heikkoja räntäkuuroja","symbol":"sleet sun"},
				{"icon":72,"name":"räntäkuuroja","symbol":"sleet sun"},
				{"icon":73,"name":"voimakkaita räntäkuuroja","symbol":"sleet sun"},
				{"icon":81,"name":"heikkoa räntäsadetta","symbol":"sleet"},
				{"icon":82,"name":"räntäsadetta","symbol":"sleet"},
				{"icon":83,"name":"voimakasta räntäsadetta","symbol":"sleet"},
				{"icon":91,"name":"utua","symbol":"haze"},
				{"icon":92,"name":"sumua","symbol":"fog"}
		];
		//map symbol id to web font
		var symbolMap = {};
			weatherSymbols.forEach(function(d, i) {
			//console.log(d)
			symbolMap[d.id] = d.symbol;
		});

		//map symbol id to name
		var symbolNameMap = {};
			weatherSymbols.forEach(function(d, i) {
			//console.log(d)
			symbolNameMap[d.id] = d.name;
		});

