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
		
		/*
1 selkeää/clear
2 puolipilvistä/partly cloudy 
21 heikkoja sadekuuroja/light rain showers 
22 sadekuuroja/rain showers
23 voimakkaita sadekuuroja/heavy rain showers 
3 pilvistä/cloudy 
31 heikkoa vesisadetta/light rain 
32 vesisadetta/rain
33 voimakasta vesisadetta/heavy rain 
41 heikkoja lumikuuroja/light snow showers
42 lumikuuroja/snow showers
43 voimakkaita lumikuuroja/heavy snow showers 
51 heikkoa lumisadetta/light snowfall 
52 lumisadetta/snowfall 
53 voimakasta lumisadetta/heavy snowfall 
61 ukkoskuuroja/thundershowers 
62 voimakkaita ukkoskuuroja/stron thundershowers 
63 ukkosta/thunder 
64 voimakasta ukkosta/heavy thunder 
71 heikkoja räntäkuuroja/light sleet showers 
72 räntäkuuroja/sleet showers 
73 voimakkaita räntäkuuroja/heavy sleet showers 
81 heikkoa räntäsadetta/light sleet 
82 räntäsadetta/sleet 
83 voimakasta räntäsadetta/heavy sleet 
91 utua/ 
92 sumua/fog
		 */
