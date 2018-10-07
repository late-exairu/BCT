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

/* var portfolioChartMarginTop = -20;
var portfolioChartMarginBottom = 180;

if ($('body').hasClass('advanced')) {
    portfolioChartMarginTop = -20;
    portfolioChartMarginBottom = 200;
} */

var portfolioChartOptions = {
    chart: {
        type: 'areaspline',
        backgroundColor: '#ffffff',
        spacingTop: 0,
        marginTop: 0,
        marginBottom: 0,
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
            width: 0,
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
                type: 'hour',
                count: 1,
            },
            {
                type: 'day',
                count: 1,
            },
            {
                type: 'week',
                count: 1,
            }, {
                type: 'month',
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
        animation: false,
        hideDelay: 0,
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
            var arrowClasses = 'arrow_box bottom';
            TooltipValue = TooltipValue.slice(0, 1) + ',' + TooltipValue.slice(1);


            var lineForPortfolioChartX = this.points[0].point.plotX + $('#portfolioChartGeneral').offset().left;
            var lineForPortfolioChartY = $('#portfolioChartGeneral').offset().top + 52;
            var lineForPortfolioChartHeight = $('#portfolioChartGeneral').height() - 58;
            var circleForPortfolioChartY = this.points[0].point.plotY - 16;

            // right side fix
            if (lineForPortfolioChartX > $('#portfolioChartGeneral').offset().left + $('#portfolioChartGeneral').width()) {
                lineForPortfolioChartX = -9999;
            }

            $('.lineForPortfolioChart').css({
                'left': lineForPortfolioChartX,
                'top': lineForPortfolioChartY,
            });

            $('.lineForPortfolioChart .circle').css({                
                'top': circleForPortfolioChartY,
            });

            $('.lineForPortfolioChart .line').css({
                'height': lineForPortfolioChartHeight,
            });

            if (this.points[0].point.plotX < 100 || this.points[0].point.plotX > $('#portfolioChartGeneral').width() - 100) {
                arrowClasses = '';
            }

            return '<div class="tooltip blackColor font10 '+ arrowClasses + '">' +
                '<div class="textCenter font12 bold">' + TooltipValue + ' <span class="light">USD</span></div>' + '<span class="bold">' + dayName + ', ' + month + ' ' + date.getDate() + ',' + year + '</span>' +
                '</div>';
        },
        positioner: function (labelWidth, labelHeight, point, ) {
            var graphWidth = $(portfolioChartObj.container).width();
            var xPos = point.plotX - (labelWidth / 2);
            // right side fix
            if ((point.plotX + labelWidth / 2) > graphWidth) {
                xPos = graphWidth - labelWidth - 12;
            }
            // left side fix
            else if (point.plotX < 100) {
                xPos = 12;
            }
            return {
                x: xPos,
                y: 10
            };
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            lineWidth: 3,
            color: '#01b067',
            fillColor: {
                linearGradient: [0, 0, 0, $('#portfolioChartGeneral').height() + 50],
                stops: [
                    [0, Highcharts.Color('#01b067').setOpacity(0.2).get('rgba')],
                    [1, Highcharts.Color('#01b067').setOpacity(0).get('rgba')]
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
                        enabled: false
                    }
                }
            },
            events:{
/*                 mouseOut: function (event) {
                     	$('.lineForMainChart').css(
                     	    'left', '-9999px',
                         );
                } */
            }
        },
        series: {
            stickyTracking: false,
            trackByArea: true,
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
    portfolioChartOptions.series[0].data = portfolioChartData;
});

$('#portfolioChartGeneral').mouseleave(function () {
	$('.lineForPortfolioChart').css(
		'left', '-9999px',
	);
});