		var weatherSymbols = [
				{"id":1,"name":"selkeää"},
				{"id":2,"name":"puolipilvistä"},
				{"id":21,"name":"heikkojasadekuuroja"},
				{"id":22,"name":"sadekuuroja"},
				{"id":23,"name":"voimakkaitasadekuuroja"},
				{"id":3,"name":"pilvistä"},
				{"id":31,"name":"heikkoavesisadetta"},
				{"id":32,"name":"vesisadetta"},
				{"id":33,"name":"voimakastavesisadetta"},
				{"id":41,"name":"heikkojalumikuuroja"},
				{"id":42,"name":"lumikuuroja"},
				{"id":43,"name":"voimakkaitalumikuuroja"},
				{"id":51,"name":"heikkoalumisadetta"},
				{"id":52,"name":"lumisadetta"},
				{"id":53,"name":"voimakastalumisadetta"},
				{"id":61,"name":"ukkoskuuroja"},
				{"id":62,"name":"voimakkaitaukkoskuuroja"},
				{"id":63,"name":"ukkosta"},
				{"id":64,"name":"voimakastaukkosta"},
				{"id":71,"name":"heikkojaräntäkuuroja"},
				{"id":72,"name":"räntäkuuroja"},
				{"id":73,"name":"voimakkaitaräntäkuuroja"},
				{"id":81,"name":"heikkoaräntäsadetta"},
				{"id":82,"name":"räntäsadetta"},
				{"id":83,"name":"voimakastaräntäsadetta"},
				{"id":91,"name":"utua"},
				{"id":92,"name":"sumua"}
		];
		//map symbol id to name
		var symbolMap = {};
			weatherSymbols.forEach(function(d, i) {
			//console.log(d)
			symbolMap[d.id] = d.name;
		});
