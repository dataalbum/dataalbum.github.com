
1 selkeää
2 puolipilvistä
21 heikkoja sadekuuroja
22 sadekuuroja
23 voimakkaita sadekuuroja
3 pilvistä
31 heikkoa vesisadetta
32 vesisadetta
33 voimakasta vesisadetta
41 heikkoja lumikuuroja
42 lumikuuroja
43 voimakkaita lumikuuroja
51 heikkoa lumisadetta
52 lumisadetta
53 voimakasta lumisadetta
61 ukkoskuuroja
62 voimakkaita ukkoskuuroja
63 ukkosta
64 voimakasta ukkosta
71 heikkoja räntäkuuroja
72 räntäkuuroja
73 voimakkaita räntäkuuroja
81 heikkoa räntäsadetta
82 räntäsadetta
83 voimakasta räntäsadetta
91 utua
92 sumua

http://stackoverflow.com/questions/16102505/d3-js-how-to-apply-multiple-classes-when-using-a-function

var circle = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d) {
            var c = "";
            if (d["Set"] == 1)
            {
                c = "set-1";
            }
            if (d["Set"] == 2)
            {
                c = "set-2";
            }
            if (d["Year"] == 2012)
            {
                c += " 2012";
            }
            if (d["Year"] == 2013)
            {
                c += " 2013;
            }
            return c;
        });