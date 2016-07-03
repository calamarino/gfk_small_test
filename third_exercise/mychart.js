// vanilla onready like
//(function () {

    function createChartContainer() {
        'use strict';
        var chartContainer = document.createElement('div');
        chartContainer.id = "chart_id";
        document.getElementsByTagName('body')[0].appendChild(chartContainer);
    }

    function createFileInputDialog() {
        'use strict';
        var inputDiv = document.createElement("input");
        inputDiv.id = "input";
        inputDiv.type = "file";
        document.getElementsByTagName('body')[0].appendChild(inputDiv);
    }

    function loadGoogleCharts() {
        'use strict';
        google.charts.load('current', {packages: ['corechart', 'line']});
    }

    // used for testing - then moved (refactored) to readFile()
    function drawChart() {
        'use strict';
        // Define the chart to be drawn.
        var data = new google.visualization.DataTable();
        var points = [
            ['Nitrogen', 0.3],
            ['Oxygen', 0.21],
            ['Other', 0.01]
        ];
        addData(data, points); // by reference
        var chart = new google.visualization.PieChart(document.getElementById('chart_id'));
        chart.draw(data, null);
    }

    function addData(data, points) {
        'use strict';
        data.addColumn('string', 'Date');
        data.addColumn('number', 'yes');
        data.addRows(points);
    }

    function readFile(callback) {
        'use strict';
        var inputElement = document.getElementById("input");
        inputElement.addEventListener("change", function (e) {
                var displayZone = document.getElementById("displayZone");
                var file = inputElement.files[0];
                var textType = /text.*/;
                var content;
                var res = [];
                var ary = [];

                if (file.type.match(textType)) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        content = reader.result;
                        res = content.split('\n');
                        // line 0 are headers
                        for (var i = 0; i < res.length; i++) {
                            ary[i] = res[i].split(';');
                            if(i === res.length - 1) {
                                callback(ary);
                            }
                        }
                    };
                    reader.readAsText(file);
                }
                else {
                    displayZone.innerText = "Unable to read file, check extension."
                }
            },
            false
        );
    }

    function init() {
        'use strict';
        createChartContainer();
        createFileInputDialog();
        loadGoogleCharts();
        readFile(
            function (val) {
                var points = [];
                for (var i = 1; i < val.length; i ++) {
                    if (val[i][2].indexOf('yes') !== -1) {
                        points.push([val[i][0], parseInt(val[i][1])]);
                        // cuidado con este dos
                        if(i === val.length - 2) {
                            google.charts.setOnLoadCallback(function () {
                                var data = new google.visualization.DataTable();
                                addData(data, points);
                                var chart = new google.visualization.LineChart(document.getElementById('chart_id'));
                                //var chart = new google.charts.Line(document.getElementById('chart_id'));
                                var options = {
                                    'title': 'GFK - test',
                                    'legend': 'right',
                                    //'width':400,
                                    'height':400,
                                    //colors:['red','#004411'],
                                    colors:['blue'],
                                    hAxis: {
                                        title: 'Date'
                                    },
                                    vAxis: {
                                        title: 'Percentage %'
                                        //ticks: []
                                    },
                                    //crosshair: { focused: { color: '#3bc', opacity: 0.8 } }
                                    pointSize: 5 // the highlighted 'dots'
                                };
                                chart.draw(data, options);
                            });
                        }
                    }
                }
            }
        );
    }

    init();

//})();