/*---------------------------------------------------*/
/* js-circle diagram */
/*---------------------------------------------------*/

var circleChartTooltipData = {
    Bitcoin: {
        price: '$6,140.13',
        value: '1 BTC',
        percent: '80'
    },
    Ethereum: {
        price: '$219.37',
        value: '0.5 ETH',
        percent: '20'
    }
}

var pieChartSize = $('#circleChart').width() - 20;
var centerX = $('#circleChart').width() / 2 - 20;
var centerY = $('#circleChart').height() / 2 - 20;

var circleChartObj = null;
var circleChartOptions = {
    chart: {
        type: 'pie',
        spacingLeft: 0,
        spacingTop: 0,
        backgroundColor: '#ffffff',
        marginLeft: 0
    },
    title: null,
    plotOptions: {
        pie: {
            innerSize: '85%',
            borderWidth: 0,
            startAngle: 20,
            size: pieChartSize,
            center: [centerX, centerY],
        },
        series: {
            dataLabels: {
                enabled: false,
            },
            states: {
                hover: {
                    enabled: false
                }
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#000000',
        borderWidth: 0,
        padding: 0,
        color: '#000000',
        useHTML: true,
        shadow: false,
        formatter: function () {
            var currency = this.key;
            var svgString = '';
            $('#panel-funds-wallet .basic-table__row').each(function () {
                if ($(this).find('.w-20').text().indexOf(currency) != -1) {
                    svgString = $(this).find('.w-20 svg').clone();
                    return false;
                }
            });

            return '<div class="tooltipCircle">' + svgString[0].outerHTML +
                '<div class="mainInfo">' +
                '<div class="currency">' + currency + '</div>' +
                '<div class="values">' + circleChartTooltipData[currency]['price'] + ' | ' + circleChartTooltipData[currency]['value'] + '</div>' +
                '</div>' +
                '<div class="percent"><span>' + circleChartTooltipData[currency]['percent'] + '</span>%</div>' +
                '</div>';
        }
    },
    series: [{
        name: 'Percent',
        data: [
            ['Ethereum', 20],
            ['Bitcoin', 80],
        ],
        zones: [{
            value: 21,
            color: '#707CB9'
        }, {
            value: 81,
            color: '#F6921E'
        }]
    }]
};

/* function positionCircleChartText(chart) {
    var textY = chart.plotTop + (chart.plotHeight * 0.5);
    span = $('#pieChartInfoText');
    span.css('width', '162px');
    span.css('left','0');
    span.css('top', textY + (span.height() * -0.6));
}; */


// change circle chart size on window resize
$(window).resize(drawCircleChart);

function drawCircleChart() {
    var pieChartSize = $('#circleChart').width() - 20;
    var centerX = $('#circleChart').width() / 2 - 20;
    var centerY = $('#circleChart').height() / 2 - 20;
    circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
    circleChartObj.update({
        plotOptions: {
            pie: {
                size: pieChartSize,
                center: [centerX, centerY],
            }
        }
    });
}