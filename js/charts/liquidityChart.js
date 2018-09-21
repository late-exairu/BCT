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
        marginLeft: 0,
        marginRight: 0
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
            width: 0,
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
        max: 1535118447475,
        min: 1532859152524
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
        max: null,
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
        max: null,
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
            var arrowClasses = 'arrow_box bottom';
            // edit value to ~8k
            var TooltipValue = (this.y).toFixed(2);

            var lineForPortfolioChartX = this.points[0].point.plotX + $('#liquidityChart').offset().left;
            var lineForPortfolioChartY = $('#liquidityChart').offset().top + (this.points[0].point.plotY + 20);
            var lineForPortfolioChartHeight = $('#liquidityChart').height() - (this.points[0].point.plotY + 26);
            var circleForPortfolioChartY = 20;

            // right side fix
            if (lineForPortfolioChartX > $('#liquidityChart').offset().left + $('#liquidityChart').width()) {
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

            if (this.points[0].point.plotX < 100 || this.points[0].point.plotX > $('#liquidityChart').width() - 100) {
                arrowClasses = '';
            }

            return '<div class="tooltip font10 liquidityTooltip ' + arrowClasses + '">' +
                "<div class='font12 textCenter bold'>$" + TooltipValue + '</div> <div class="gray">' +
                dayName + ', ' + month + ' ' + date.getDate() +', ' +year +
                '</div></div>';
        },
        positioner: function (labelWidth, labelHeight, point ) {
            var graphWidth = $(liquidityChartObj.container).width();
            var xPos = point.plotX - (labelWidth / 2);
            // right side fix
            if ((point.plotX + labelWidth / 2) > graphWidth) {
                xPos = graphWidth - labelWidth + 5;
            }
            // left side fix
            else if (point.plotX < 100) {
                xPos = 30;
            }
            return {
                x: xPos,
                y: ((point.plotY - 20) > 20 ) ? point.plotY - 20 : 20
            };
        }
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            step: 'center',
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
        data: [
            13190, 13010, 12882, 12730, 12400, 10300, 10100, 9976, 9900, 9353, 9300, 7006, 6960, 6860,
            5740, 5700, 5643, 5550, 4800, 4680, 4510, 4000, 3899, 3788, 3600, 3500, 3430, 3300,
            3160, 3000, 2899, 2800, 2610, 2540, 2430, 2300, 2200, 2000, 1850, 1720, 1650, 1600,
            1580, 1500, 1400, 1300, 1200, 1000, 600, 500, 400, 300, 300, 150, 100, 0,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
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
        data: [
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            0, 100, 200, 300, 400, 500, 600, 700, 800, 960, 1000, 1200, 1400, 1560,
            1600, 1680, 1810, 1970, 2120, 2200, 2330, 2420, 2550, 2750, 2798, 2950, 3000, 3058,
            3100, 3199, 3431, 3550, 3639, 3770, 3830, 3900, 3960, 5111, 5231, 5420, 5545, 5630,
            5699, 6722, 6899, 7086, 7123, 7300, 7376, 7454, 7573, 7844, 7970, 9105, 9239, 9320
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

$('#liquidityChart').mouseleave(function () {
	$('.lineForPortfolioChart').css(
		'left', '-9999px',
	);
});