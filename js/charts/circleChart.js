/*---------------------------------------------------*/
/* js-circle diagram */
/*---------------------------------------------------*/

var circleChartTooltipData = {
    Bitcoin: {
        price: '$6,140.13',
        value: '1 BTC',
        percent: '75'
    },
    Ethereum: {
        price: '$219.37',
        value: '0.5 ETH',
        percent: '25'
    }
}

var pieChartSize = null;
var centerX = null;
var centerY = null;

// add hover effects for circleChart only when cursor inside the circle
$('.accounts-diagram-wrap').mousemove(function (e) {
    var parentOffset = $('.accounts-diagram').offset();
    var relX = e.pageX - parentOffset.left - 20;
    var relY = e.pageY - parentOffset.top - 20;
    var r = pieChartSize / 2;
    var InCircle = Math.sqrt((relX - centerX) * (relX - centerX) + (relY - centerY) * (relY - centerY)) < r;
    if (InCircle){
        $(this).addClass('hover');
    }else{
        $(this).removeClass('hover');
    }
});

var circleChartObj = null;
var circleChartOptions = {
    chart: {
        type: 'pie',
        spacingLeft: 0,
        spacingTop: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        marginLeft: 0
    },
    title: null,
    plotOptions: {
        pie: {
            innerSize: '85%',
            borderWidth: 0,
            startAngle: 0,
            size: pieChartSize,
            center: [centerX, centerY],
            events: {
                mouseOver: function () {
                    console.log('IN');
                },
/*                 mouseOut: function (e) {
                      $('.accounts-diagram').offset();
                      var relX = e.pageX - parentOffset.left;
                      var relY = e.pageY - parentOffset.top;
                     console.log('OUT', centerX, centerY, relX,relY);
                } */
            }
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
                if ($(this).find('.basic-table__col').text().indexOf(currency) != -1) {
                    svgString = $(this).find('.basic-table__col svg').clone();
                    return false;
                }
            });

            return '<div class="tooltipCircle">' + svgString[0].outerHTML +
                '<div class="currency">' + currency + '</div>' +
                '<div class="price"><span>' + circleChartTooltipData[currency]['price'] + '</span></div>' +
                '</div>';
        }
    },
    series: [{
        name: 'Percent',
        data: [
            ['Ethereum', 25],
            ['Bitcoin', 75],
        ],
        zones: [{
            value: 26,
            color: '#707CB9'
        }, {
            value: 76,
            color: '#F6921E'
        }]
    }]
};

// change circle chart size on window resize
$(window).resize(drawCircleChart);

function drawCircleChart() {
    pieChartSize = $('#circleChart').width() - 20 - 28;
    centerX = $('#circleChart').width() / 2 - 20;
    centerY = $('#circleChart').height() / 2 - 20;
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

drawCircleChart();