/*---------------------------------------------------*/
/* js-portfolio diagram */
/*---------------------------------------------------*/

var portfolioChartArrChanges = [
    [
        ['-1.24% Since last hour', '6,709', '.93'],
        ['-10.93% Since Yesterday', '6,709', '.93'],
        ['-15.47% Since last month', '6,709', '.93'],
        ['-23.71% Since last year', '6,709', '.93'],
        ['-30.58% Since inception', '6,709', '.93'],
    ],
    [
        ['-1.18% Since last hour', '6,314', '.72'],
        ['-11.43% Since Yesterday', '6,314', '.72'],
        ['-16.23% Since last month', '6,314', '.72'],
        ['-26.63% Since last year', '6,314', '.72'],
        ['-32.17% Since inception', '6,314', '.72'],
    ],
    [
        ['-1.32% Since last hour', '395', '.21'],
        ['-12.34% Since Yesterday', '395', '.21'],
        ['-13.51% Since last month', '395', '.21'],
        ['-27.16% Since last year', '395', '.21'],
        ['-29.10% Since inception', '395', '.21'],
    ]
];
var portfolioChartData = null;
var portfolioChartObj = null;
var portfolioChartCurrentRange = 4;

var portfolioChartMarginTop = 40;
var portfolioChartMarginBottom = 100;

if($('body').hasClass('advanced')){
    portfolioChartMarginTop = 10;
    portfolioChartMarginBottom = 130;
}

var portfolioChartOptions = {
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
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var date = new Date(this.x);
            var month = months[date.getMonth()];
            var dayName = date.toString().split(' ')[0];
            var TooltipValue = (this.y * 45).toFixed(2);
            TooltipValue = TooltipValue.slice(0, 1) + ',' + TooltipValue.slice(1);
            return '<div class="tooltip">' +
                "<span>" + TooltipValue + '</span> ' + dayName + ', ' + month + ' ' + date.getDate() +
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
            else if (point.plotX < 50) {
                xPos = 5;
            }
            return {
                x: point.plotX - 60,
                //y: point.plotY - 45
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
            color: '#2B569A',
            fillColor: {
                linearGradient: [0, 0, 0, $('.js-account-stats').height() - 60],
                stops: [
                    [0, Highcharts.Color('#2B569A').setOpacity(0.4).get('rgba')],
                    [1, Highcharts.Color('#2B569A').setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                enabled: false,
                fillColor: '',
                lineWidth: 0,
                width: 0,
                lineColor: null,
                symbol: 'url(' + location.href.substring(0, location.href.lastIndexOf("/") + 1) + 'img/svg/circle.svg)',
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