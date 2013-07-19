		var windDirections = [
				{"id":10,"name":"pohjoisesta"},
				{"id":20,"name":"pohjoisesta"},
				{"id":30,"name":"koilisesta"},
				{"id":40,"name":"koilisesta"},
				{"id":50,"name":"koilisesta"},
				{"id":60,"name":"koilisesta"},
				{"id":70,"name":"idästä"},
				{"id":80,"name":"idästä"},
				{"id":90,"name":"idästä"},
				{"id":100,"name":"idästä"},
				{"id":110,"name":"idästä"},
				{"id":120,"name":"idästä"},
				{"id":130,"name":"kaakosta"},
				{"id":140,"name":"kaakosta"},
				{"id":150,"name":"kaakosta"},
				{"id":160,"name":"kaakosta"},
				{"id":170,"name":"etelästä"},
				{"id":180,"name":"etelästä"},
				{"id":190,"name":"etelästä"},
				{"id":200,"name":"etelästä"},
				{"id":210,"name":"etelästä"},
				{"id":220,"name":"voimakkaitaräntäkuuroja"},
				{"id":230,"name":"heikkoaräntäsadetta"},
				{"id":240,"name":"räntäsadetta"},
				{"id":250,"name":"voimakastaräntäsadetta"},
				{"id":260,"name":"utua"},
				{"id":270,"name":"sumua"}
				{"id":280,"name":"voimakkaitaräntäkuuroja"},
				{"id":290,"name":"heikkoaräntäsadetta"},
				{"id":300,"name":"räntäsadetta"},
				{"id":310,"name":"voimakastaräntäsadetta"},
				{"id":320,"name":"utua"},
				{"id":330,"name":"sumua"}
				{"id":340,"name":"voimakastaräntäsadetta"},
				{"id":350,"name":"utua"},
				{"id":360,"name":"sumua"}
		];
		//map symbol id to name
		var symbolMap = {};
			weatherSymbols.forEach(function(d, i) {
			//console.log(d)
			symbolMap[d.id] = d.name;
		});
