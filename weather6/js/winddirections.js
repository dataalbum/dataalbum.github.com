		var windDirections = [
				{"deg":10,"name":"pohjoisesta","symbol":"icon-arrow-down"},
				{"deg":20,"name":"pohjoisesta","symbol":"icon-arrow-down"},
				{"deg":30,"name":"koilisesta","symbol":"icon-arrow-down-left"},
				{"deg":40,"name":"koilisesta","symbol":"icon-arrow-down-left"},
				{"deg":50,"name":"koilisesta","symbol":"icon-arrow-down-left"},
				{"deg":60,"name":"koilisesta","symbol":"icon-arrow-down-left"},
				{"deg":70,"name":"idästä","symbol":"icon-arrow-left"},
				{"deg":80,"name":"idästä","symbol":"icon-arrow-left"},
				{"deg":90,"name":"idästä","symbol":"icon-arrow-left"},
				{"deg":100,"name":"idästä","symbol":"icon-arrow-left"},
				{"deg":110,"name":"idästä","symbol":"icon-arrow-left"},
				{"deg":120,"name":"kaakosta","symbol":"icon-arrow-up-left"},
				{"deg":130,"name":"kaakosta","symbol":"icon-arrow-up-left"},
				{"deg":140,"name":"kaakosta","symbol":"icon-arrow-up-left"},
				{"deg":150,"name":"kaakosta","symbol":"icon-arrow-up-left"},
				{"deg":160,"name":"etelästä","symbol":"icon-arrow-up"},
				{"deg":170,"name":"etelästä","symbol":"icon-arrow-up"},
				{"deg":180,"name":"etelästä","symbol":"icon-arrow-up"},
				{"deg":190,"name":"etelästä","symbol":"icon-arrow-up"},
				{"deg":200,"name":"etelästä","symbol":"icon-arrow-up"},
				{"deg":210,"name":"lounaasta","symbol":"icon-arrow-up-right"},
				{"deg":220,"name":"lounaasta","symbol":"icon-arrow-up-right"},
				{"deg":230,"name":"lounaasta","symbol":"icon-arrow-up-right"},
				{"deg":240,"name":"lounaasta","symbol":"icon-arrow-up-right"},
				{"deg":250,"name":"lännestä","symbol":"icon-arrow-right"},
				{"deg":260,"name":"lännestä","symbol":"icon-arrow-right"},
				{"deg":270,"name":"lännestä","symbol":"icon-arrow-right"},
				{"deg":280,"name":"lännestä","symbol":"icon-arrow-right"},
				{"deg":290,"name":"lännestä","symbol":"icon-arrow-right"},
				{"deg":300,"name":"luoteesta","symbol":"icon-arrow-down-right"},
				{"deg":310,"name":"luoteesta","symbol":"icon-arrow-down-right"},
				{"deg":320,"name":"luoteesta","symbol":"icon-arrow-down-right"},
				{"deg":330,"name":"luoteesta","symbol":"icon-arrow-down-right"},
				{"deg":340,"name":"pohjoisesta","symbol":"icon-arrow-down"},
				{"deg":350,"name":"pohjoisesta","symbol":"icon-arrow-down"},
				{"deg":360,"name":"pohjoisesta","symbol":"icon-arrow-down"}
		];
		//map degree to name
		var windDirectionMap = {};
			windDirections.forEach(function(d, i) {
			//console.log(d)
			windDirectionMap[d.deg] = d.name;
		});

		//map degree to webfont
		var windArrowMap = {};
			windDirections.forEach(function(d, i) {
			//console.log(d)
			windArrowMap[d.deg] = d.symbol;
		});
