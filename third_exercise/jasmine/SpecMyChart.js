describe("Dummy test just to check out jasmine setup - A suite", function () {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});

describe("Chart", function () {

    it("must have a proper container to display the chart", function () {
        var chartContainer = document.createElement('div');
        chartContainer.id = "chart_id";
        expect(chartContainer.id).toBeDefined();
    });

    it("must have the google object defined including packages to use", function () {
        expect(google).toBeDefined();
    });

    it("VISUAL - must add and display a couple of (stochastic) points on the chart", function () {
        createChartContainer();
        loadGoogleCharts();
        google.charts.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            //var points = [1, 10];
            var points = [
                    ['1-1-2013', 5],
                    ['1-1-2013', 6]
                ];

            addData(data, points);
            var chart = new google.visualization.LineChart(document.getElementById('chart_id'));
            chart.draw(data, null);
        });
        // Checking visually
        expect(true).toBe(true);
    });

});

describe("File", function () {

    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    /*
     Important: as defined in beforeEach, there are 10 seconds to select
     the file 'data.csv', after that the tests resolves.
     */
    it("must read the data from the file - (checking the header)", function (done) {
        var inputDiv = document.createElement("input");
        inputDiv.id = "input";
        inputDiv.type = "file";
        document.getElementsByTagName('body')[0].appendChild(inputDiv);
        readFile(
            function (val) {
                expect(val[0]).toContain('DATE');
                done();
            }
        );
    });

    xit("must extract the information to use in the chart", function (done) {
        var inputDiv = document.createElement("input");
        inputDiv.id = "input";
        inputDiv.type = "file";
        document.getElementsByTagName('body')[0].appendChild(inputDiv);
        readFile(
            function (val) {
                var points = [];
                for (var i = 1; i < val.length; i++) {
                    console.log("val[i][2]: " + val[i][2]);
                    if (val[i][2].indexOf('yes') !== -1) {
                        points.push([val[i][0], val[i][1]]);
                        console.log("ahora");
                    }
                    console.log("points: " + points);
                    if (i === val.length - 1) {
                        expect(points[0]).toContain('1-1-2013');
                        done();
                    }
                }
            }
        );
    });

    it("must order the array to show, excluding yes values", function (done) {
        var inputDiv = document.createElement("input");
        inputDiv.id = "input";
        inputDiv.type = "file";
        document.getElementsByTagName('body')[0].appendChild(inputDiv);
        readFile(
            function (val) {
                var points = [];
                for (var i = 1; i < val.length; i++) {
                    if (val[i][2].indexOf('yes') !== -1) {
                        points.push([val[i][0], val[i][1]]);
                        if (i === val.length - 2) {
                            expect(points[0].length).toEqual(2);
                            done();
                        }
                    }
                }
            }
        );
    });
});

describe("Chart and File", function () {

    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it("must send the data to the chart", function (done) {
        var inputDiv = document.createElement("input");
        inputDiv.id = "input";
        inputDiv.type = "file";
        document.getElementsByTagName('body')[0].appendChild(inputDiv);
        createChartContainer();
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
                                chart.draw(data, null);
                                // Checking visually
                                expect(true).toBe(true);
                                done()
                            });
                        }
                    }
                }
            }
        );
    });

});

