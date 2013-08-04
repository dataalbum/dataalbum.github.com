		var windDirections = [
				{"deg":10,"name":"pohjoisesta"},
				{"deg":20,"name":"pohjoisesta"},
				{"deg":30,"name":"koilisesta"},
				{"deg":40,"name":"koilisesta"},
				{"deg":50,"name":"koilisesta"},
				{"deg":60,"name":"koilisesta"},
				{"deg":70,"name":"idästä"},
				{"deg":80,"name":"idästä"},
				{"deg":90,"name":"idästä"},
				{"deg":100,"name":"idästä"},
				{"deg":110,"name":"idästä"},
				{"deg":120,"name":"kaakosta"},
				{"deg":130,"name":"kaakosta"},
				{"deg":140,"name":"kaakosta"},
				{"deg":150,"name":"kaakosta"},
				{"deg":160,"name":"etelästä"},
				{"deg":170,"name":"etelästä"},
				{"deg":180,"name":"etelästä"},
				{"deg":190,"name":"etelästä"},
				{"deg":200,"name":"etelästä"},
				{"deg":210,"name":"lounaasta"},
				{"deg":220,"name":"lounaasta"},
				{"deg":230,"name":"lounaasta"},
				{"deg":240,"name":"lounaasta"},
				{"deg":250,"name":"lännestä"},
				{"deg":260,"name":"lännestä"},
				{"deg":270,"name":"lännestä"},
				{"deg":280,"name":"lännestä"},
				{"deg":290,"name":"lännestä"},
				{"deg":300,"name":"luoteesta"},
				{"deg":310,"name":"luoteesta"},
				{"deg":320,"name":"luoteesta"},
				{"deg":330,"name":"luoteesta"},
				{"deg":340,"name":"pohjoisesta"},
				{"deg":350,"name":"pohjoisesta"},
				{"deg":360,"name":"pohjoisesta"}
		];
		//map degree name
		var windDirectionMap = {};
			windDirections.forEach(function(d, i) {
			//console.log(d)
			windDirectionMap[d.deg] = d.name;
		});
