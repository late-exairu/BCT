/*---------------------------------------------------*/
/* js-liquidity diagram */
/*---------------------------------------------------*/

var countForLiquidLabels = 76701;

var liquidityChartObj = null;
var liquidityChartOptions = {
    chart: {
        type: 'area'
    },
    title: null,
    legend: {
        enabled: false
    },
    xAxis: {
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
            formatter: function () {
                var label = 'B0.0' + countForLiquidLabels;
                countForLiquidLabels += 253;
                return label;
            },
            step: 2,
            style: {
                color: '#666666'
            }
        },
    },
    yAxis: [{
        labels: {
            enabled: true,
            step: 4,
            overflow: 'justify',
            style: {
                color: '#666666'
            }
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
        minorTickLength: 0,
        max: 1600,
    }, {
        labels: {
            enabled: true,
            step: 4,
            overflow: 'justify',
            style: {
                color: '#666666'
            }
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
        minorTickLength: 0,
        max: 1600,
        linkedTo: 0,
        opposite: true
    }],
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
        pointFormat: "<tr><td>${point.y}.00</td></tr>",
        footerFormat: '</table>',
        positioner: function (labelWidth, labelHeight, point, ) {
            return {
                x: point.plotX,
                y: point.plotY - 50
            };
        }
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            step: 'center',
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
            }
        }
    },
    series: [{
        name: "Graph 1",
        data: [1580, 1500, 1400, 1300, 1200, 1000, 600, 500, 400, 300, 300, 150, 100, 0,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null
        ],
        pointStart: Date.UTC(2018, 5, 17),
        pointInterval: 24 * 3600 * 1000,
        fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
                [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.4).get('rgba')],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        }
    }, {
        name: "Graph 2",
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            0, 100, 200, 300, 400, 500, 600, 700, 800, 960, 1000, 1200, 1400, 1560
        ],
        pointStart: Date.UTC(2018, 5, 17),
        pointInterval: 24 * 3600 * 1000,
        fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
                [0, Highcharts.Color('#e05475').setOpacity(0.4).get('rgba')],
                [1, Highcharts.Color('#e05475').setOpacity(0).get('rgba')]
            ]
        },
        color: '#e05475'
    }]
};
