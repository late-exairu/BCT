/*---------------------------------------------------*/
/* js-liquidity diagram */
/*---------------------------------------------------*/

var countForLiquidLabels = 76701;

var liquidityChartObj = null;
var liquidityChartOptions = {
    chart: {
        type: 'area',
        marginBottom:0,
        marginTop:40,
        marginLeft:-10,
        marginRight:-10
    },
    title: null,
    legend: {
        enabled: false
    },
    xAxis: {
        crosshair: {
            /*             label: {
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
                        } */
            width: 1,
            //dashStyle: 'LongDash'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%b %e'
        },
        tickLength: 0,
        tickInterval: 0,
        gridLineWidth: 0,
        labels: {
            enabled:false,
            formatter: function () {
                var label = 'B0.0' + countForLiquidLabels;
                countForLiquidLabels += 253;
                return label;
            },
            step: 2,
            style: {
                color: '#666666',
                fontSize: '10px'
            }
        },
    },
    yAxis: [{
        gridLineWidth: 0,
        labels: {
            x: 0,
            y: -3,
            enabled: false,
            padding:0,
            step: 4,
            overflow: 'justify',
            style: {
                color: '#666666',
                fontSize: '10px',
                whiteSpace: 'nowrap'
            }
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
        tickLength: 0,
        tickWidth: 0,
        //minorTickLength: 0,
        max: 1600,
    }, {
        gridLineWidth: 0,
        labels: {
            x: 0,
            y: -3,
            enabled: false,
            step: 4,
            overflow: 'justify',
            style: {
                color: '#666666',
                fontSize: '10px',
                whiteSpace: 'nowrap'
            }
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
       // minorTickLength: 0,
        max: 1600,
        linkedTo: 0,
        opposite: true,
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
        formatter: function () {
            var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var date = new Date(this.x);
            var month = months[date.getMonth()];
            var dayName = days[date.getDay()];
			var year = date.getFullYear();            
            // edit value to ~8k
            var TooltipValue = (this.y).toFixed(2);
            return '<div class="tooltip font10">' +
                "<div class='font12 textCenter bold'>$" + TooltipValue + '</div> <div class="gray">' +
                dayName + ', ' + month + ' ' + date.getDate() +', ' +year +
                '</div></div>';
        },
        positioner: function (labelWidth, labelHeight, point ) {
            var graphWidth = $(liquidityChartObj.container).width();
            var xPos = point.plotX - (labelWidth / 2);
            // right side fix
            if ((point.plotX + 80) > graphWidth) {
                xPos = graphWidth - labelWidth - 10;
            }
            // left side fix
            else if (point.plotX < 80) {
                xPos = 25;
            }
            return {
                x: xPos - 10,
                y: 20
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
                symbol: 'url(' + location.href.substring(0, location.href.lastIndexOf("/") + 1) + 'img/svg/circle.svg)',
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
        series: {
            states: {
                hover: {
                    halo: {
                        opacity: 0
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
            linearGradient: [0, 0, 0, $('.js-account-stats').height() - 90],
            stops: [
                [0, Highcharts.Color(lineColor).setOpacity(0.4).get('rgba')],
                [1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
            ]
        },
        color: lineColor
    }, {
        name: "Graph 2",
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            0, 100, 200, 300, 400, 500, 600, 700, 800, 960, 1000, 1200, 1400, 1560
        ],
        pointStart: Date.UTC(2018, 5, 17),
        pointInterval: 24 * 3600 * 1000,
        fillColor: {
            linearGradient: [0, 0, 0, $('.js-account-stats').height() - 90],
            stops: [
                [0, Highcharts.Color(redColor).setOpacity(0.4).get('rgba')],
                [1, Highcharts.Color(redColor).setOpacity(0).get('rgba')]
            ]
        },
        color: redColor
    }]
};