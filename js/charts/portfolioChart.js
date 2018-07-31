/*---------------------------------------------------*/
/* js-portfolio diagram */
/*---------------------------------------------------*/

var portfolioChartObj = null;
var portfolioChartOptions = {
    chart: {
        type: 'areaspline',
        backgroundColor: '#ffffff'
    },
    rangeSelector: {
        allButtonsEnabled: true,
        selected: 2
    },
    title: null,
    legend: {
        enabled: false
    },
    xAxis: {
        gridLineColor: '#e6e6e6',
        lineColor: '#ccd6eb',
        crosshair: {
            label: {
                enabled: true,
                format: '{value:%b %d, %Y}',
                backgroundColor: '#ffffff',
                borderColor: '#5a5a5a',
                borderWidth: 1,
                borderRadius: 5,
                shape: "box",
                style: {
                    color: '#000000'
                },
            }
        },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%b %e'
        },
        tickLength: 0,
        tickInterval: 0,
        gridLineWidth: 1,
        labels: {
            step: 2,
            style: {
                color: '#666666'
            }
        },
    },
    yAxis: {
        gridLineColor: '#e6e6e6',
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
        minorTickLength: 0,
        max: 11000,
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 0,
        padding: 0,
        shared: true,
        shadow: false,
        useHTML: true,
        shape: "box",
        style: {
            color: '#ffffff',
            fontSize: 16
        },
        headerFormat: '<table class="portfolio">',
        pointFormat: "<tr><td>${point.y}</td></tr>",
        footerFormat: '</table>',
        positioner: function (labelWidth, labelHeight, point, ) {
            return {
                x: point.plotX - 45,
                y: point.plotY - 10
            };
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            color: '#0576B9',
            fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba')],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                enabled: false,
                fillColor: '',
                lineWidth: 0,
                lineColor: null,
                symbol: 'url(' + location.href + 'img/svg/circle.svg)',
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
        }
    },
    series: [{
        name: 'Graph 1',
        data: [
            [8983.20], 8784.45, 8983.34, 8285.23, 8884.67, 8188.45, 8986.78,
            8586.87, 8084.73, 8686.37, 8988.76, 8587.24, 8188.61, 8986.45,
            8983.12, 8784.65, 8983.79, 8285.34, 8884.78, 8188.12, 8986.34,
            8586.74, 8084.78, 8686.12, 8988.09, 8587.12, 8188.87, 8986.67
        ],
        pointStart: Date.UTC(2018, 5, 17),
        pointInterval: 24 * 3600 * 1000
    }]
};
