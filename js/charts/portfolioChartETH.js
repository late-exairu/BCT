/*---------------------------------------------------*/
/* js-portfolio diagram */
/*---------------------------------------------------*/

var portfolioChartETHData = null;
var portfolioChartETHObj = null;
var portfolioChartETHCurrentRange = 4;
var portfolioChartETHOptions = {
    chart: {
        type: 'areaspline',
        backgroundColor: '#ffffff',
        marginTop: portfolioChartMarginTop,
        marginBottom: portfolioChartMarginBottom,
        marginRight: 0,
        marginLeft: 0
    },
    xAxis: [{
        gridLineColor: '#e6e6e6',
        lineColor: '#ccd6eb',
        dateTimeLabelFormats: {
            day: '%b - %e',
            hour: '%H:%M',
            day: '%b %e',
            //week: '%e. --- %b',
            month: "%b '%y",
            year: '%Y'
        },
        crosshair: {
            width: 1,
            //dashStyle: 'LongDash'
        },
        type: 'datetime',
        tickLength: 0,
        tickAmount: 9,
        gridLineWidth: 0,
        labels: {
            enabled: false,
            step: 1,
            style: {
                color: '#666666',
                fontSize: '8px',
            }
        },
    }],
    rangeSelector: {
        selected: portfolioChartCurrentRange,
        inputEnabled: false,
        labelStyle: {
            visibility: 'hidden'
        },
        buttons: [{
                type: 'day',
                count: 1,
            },
            {
                type: 'week',
                count: 1,
            },
            {
                type: 'month',
                count: 1,
            }, {
                type: 'year',
                count: 1,
            },
            {
                type: 'all',
            }
        ],
        buttonTheme: {
            visibility: 'hidden'
        }
    },
    scrollbar: {
        enabled: false
    },
    title: null,
    legend: {
        enabled: false
    },
    yAxis: {
        gridLineColor: '#e6e6e6',
        gridLineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
        tickAmount: 10,
        minorTickLength: 0,
        // max: 225,
    },
    navigator: {
        enabled: false
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
        split: false,
        style: {
            color: '#ffffff',
            fontSize: 8
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
            var TooltipValue = (this.y * 45).toFixed(2);
            TooltipValue = TooltipValue.slice(0, 1) + ',' + TooltipValue.slice(1);
            return '<div class="tooltip blackColor font10">' +
                '<div class="textCenter font12 bold">' + TooltipValue + ' <span class="light">USD</span></div>' + dayName + ', ' + month + ' ' + date.getDate() + ',' + year +
                '</div>';
        },
        positioner: function (labelWidth, labelHeight, point, ) {
            var graphWidth = $(portfolioChartObj.container).width();
            var xPos = point.plotX - (labelWidth / 2);
            // right side fix
            if ((point.plotX + labelWidth / 2) > graphWidth) {
                xPos = graphWidth - labelWidth - 5;
            }
            // left side fix
            else if (point.plotX < 80) {
                xPos = 5;
            }
            return {
                x: xPos,
                y: 50
            };
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            lineWidth: 3,
            color: '#707cb9',
            fillColor: {
                linearGradient: [0, 0, 0, $('.js-account-stats').height() - 60],
                stops: [
                    [0, Highcharts.Color('#707cb9').setOpacity(0.4).get('rgba')],
                    [1, Highcharts.Color('#707cb9').setOpacity(0).get('rgba')]
                ]
            },
            marker: {
				enabled: false,
                fillColor: '#FFFFFF',
                lineWidth: 1,
                lineColor: null,
                symbol: 'circle',
                radius: 3,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
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
        name: 'Graph 1',
        data: portfolioChartData,
    }]
};

$.getJSON(location.href.substring(0, location.href.lastIndexOf("/") + 1) + 'data/exampleData.json', function (data) {
    portfolioChartData = data;
    portfolioChartBTCData = data;
    portfolioChartETHData = data;
    portfolioChartOptions.series[0].data = portfolioChartData;
    portfolioChartBTCOptions.series[0].data = portfolioChartBTCData;
    portfolioChartETHOptions.series[0].data = portfolioChartETHData;
});