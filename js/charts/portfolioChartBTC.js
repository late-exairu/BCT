/*---------------------------------------------------*/
/* js-portfolio diagram */
/*---------------------------------------------------*/

/* var portfolioChartArrChanges = [
    ['Change since last day', '10', '.34'],
    // ['Change since last month','709','.93'],
    // ['Change since last year','3,122','.18'],
    ['Change since inception', '6,709', '.93'],
]; */
var portfolioChartBTCData = null;
var portfolioChartBTCObj = null;
var portfolioChartBTCCurrentRange = 1;
var portfolioChartBTCOptions = {
    chart: {
        type: 'areaspline',
        backgroundColor: '#ffffff',
        marginBottom: 100,
        marginTop: -40,
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
                y: point.plotY
            };
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            lineWidth: 3,
            color: '#F6921E',
            fillColor: {
                linearGradient: [0, 0, 0, $('.js-account-stats').height() - 60],
                stops: [
                    [0, Highcharts.Color('#F6921E').setOpacity(0.6).get('rgba')],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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