        // Stored query ids.
        var STORED_QUERY_OBSERVATION = "fmi::observations::weather::multipointcoverage";
        var STORED_QUERY_FORECAST = "fmi::forecast::hirlam::surface::point::multipointcoverage";
        
        function localForecastHeader(url, sites) {
        	console.log(sites)
            // See API documentation and comments from parser source code of
            // fi.fmi.metoclient.metolib.WfsRequestParser.getData function for the description
            // of function options parameter object and for the callback parameters objects structures.
            fi.fmi.metoclient.metolib.WfsRequestParser.getData({
                url : url,
                storedQueryId : STORED_QUERY_FORECAST,
                requestParameter : "temperature,pressure,weathersymbol3",
                begin : new Date(),
                end : new Date((new Date()).getTime() + 1 * 60 * 60 * 1000),
                timestep : 60 * 60 * 1000,
                sites : [sites],
                callback : function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    console.log(data)
                    // Here, we delegate the content for a separate handler function.
                    // See parser documentation from source code comments for more details.
                    //handleCallback(data, errors, "Forecast Oulu temperature");
                    showForecastMain(data, errors);
                }
            });
        };

        function localForecast(url, sites) {
            // See API documentation and comments from parser source code of
            // fi.fmi.metoclient.metolib.WfsRequestParser.getData function for the description
            // of function options parameter object and for the callback parameters objects structures.
            fi.fmi.metoclient.metolib.WfsRequestParser.getData({
                url : url,
                storedQueryId : STORED_QUERY_FORECAST,
                requestParameter : "temperature,pressure,weathersymbol3,windspeedms,winddirection",
                begin : new Date(),
                end : new Date((new Date()).getTime() + 44 * 60 * 60 * 1000),
                timestep : 60 * 60 * 1000,
                sites : [sites],
                callback : function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    console.log(data)
                    // Here, we delegate the content for a separate handler function.
                    // See parser documentation from source code comments for more details.
                    //handleCallback(data, errors, "Forecast Oulu temperature");
                    showForecast(data, errors);
                }
            });
        };

        function localForecastChart(url, sites) {
            // See API documentation and comments from parser source code of
            // fi.fmi.metoclient.metolib.WfsRequestParser.getData function for the description
            // of function options parameter object and for the callback parameters objects structures.
            fi.fmi.metoclient.metolib.WfsRequestParser.getData({
                url : url,
                storedQueryId : STORED_QUERY_FORECAST,
                requestParameter : "temperature,pressure,weathersymbol3,windspeedms,winddirection,precipitation1h",
                begin : new Date(),
                end : new Date((new Date()).getTime() + 47 * 60 * 60 * 1000),
                timestep : 60 * 60 * 1000,
                sites : [sites],
                callback : function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    console.log(data)
                    // Here, we delegate the content for a separate handler function.
                    // See parser documentation from source code comments for more details.
                    //handleCallback(data, errors, "Forecast Oulu temperature");
                    showForecastChart(data, errors);
                }
            });
        };
        
		function localObservationChart(url, sites) {
            // See API documentation and comments from parser source code of
            // fi.fmi.metoclient.metolib.WfsRequestParser.getData function for the description
            // of function options parameter object and for the callback parameters objects structures.
            fi.fmi.metoclient.metolib.WfsRequestParser.getData({
                url : url,
                storedQueryId : STORED_QUERY_OBSERVATION,
                requestParameter : "t2m,ws_10min,wg_10min,wd_10min,rh,td,r_1h,ri_10min,snow_aws,p_sea,vis",
                // Integer values are used to init dates for older browsers.
                // (new Date("2013-05-10T08:00:00Z")).getTime()
                // (new Date("2013-05-12T10:00:00Z")).getTime()
                begin : new Date((new Date()).getTime() - 12 * 60 * 60 * 1000),
                end : new Date(),
                timestep : 10 * 60 * 1000,
                sites : sites,
                callback : function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    console.log(data)
                    // Here, we delegate the content for a separate handler function.
                    // See parser documentation from source code comments for more details.
                    showObservationChart(data, errors);
                    //showObservationTable(data, errors);
                }
            });
        };
