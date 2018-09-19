/*---------------------------------------------------*/
/* js-circle diagram */
/*---------------------------------------------------*/

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
    if (InCircle) {
        $(this).addClass('hover');
    } else {
        $(this).removeClass('hover');
    }
});

var circleChartObj = null;
var circleChartOptions = null;

// change circle chart size on window resize
$(window).resize(drawCircleChart);

function drawCircleChart() {
    if ($('body').hasClass('advanced')) {
        pieChartSize = $('#circleChart').width() - 20 - 28;
    } else {
        pieChartSize = $('#circleChart').width() - 28;
    }

    centerX = $('#circleChart').width() / 2 - 20;
    centerY = $('#circleChart').height() / 2 - 20;

    var circleChartTooltipData = {
        Bitcoin: {
            price: '$' + eachBalance['BTC'],
        },
        Ethereum: {
            price: '$' + eachBalance['ETH'],
        },
        Tether: {
            price: '$' + eachBalance['USDT'],
        },
        'Bitcoin Cash': {
            price: '$' + eachBalance['BCH'],
        },
        Litecoin: {
            price: '$' + eachBalance['LTC'],
        },
        Ripple: {
            price: '$' + eachBalance['RPL'],
        },
        Monero: {
            price: '$' + eachBalance['XMR'],
        },
        Maker: {
            price: '$' + eachBalance['MKR'],
        },
        Dash: {
            price: '$' + eachBalance['DASH'],
        },
        XRP: {
            price: '$' + eachBalance['XRP'],
        },

    }

    circleChartOptions = {
        chart: {
            type: 'pie',
            spacingLeft: 0,
            spacingTop: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            marginLeft: 0,
        },
        title: null,
        plotOptions: {
            pie: {
                innerSize: '88%',
                borderWidth: 0,
                startAngle: 0,
                size: pieChartSize,
                center: [centerX, centerY],
                colors: ['#707CB9', '#F6921E', '#2a3e81', '#83c55f', '#b1b0b0', '#438bca', '#f60', '#1abc9c', '#008ce7', '#23292f']
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
                ['Ethereum', eachPercent['ETH']],
                ['Bitcoin', eachPercent['BTC']],
                ['Tether', eachPercent['USDT']],
                ['Bitcoin Cash', eachPercent['BCH']],
                ['Litecoin', eachPercent['LTC']],
                ['Ripple', eachPercent['RPL']],
                ['Monero', eachPercent['XMR']],
                ['Maker', eachPercent['MKR']],
                ['Dash', eachPercent['DASH']],
                ['XRP', eachPercent['XRP']],
            ],
        }]
    };


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