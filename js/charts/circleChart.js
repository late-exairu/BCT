/*---------------------------------------------------*/
/* js-circle diagram */
/*---------------------------------------------------*/

var pieChartSize = null;
var centerX = null;
var centerY = null;

// add hover effects for circleChart only when cursor inside the circle
// $('.advanced .accounts-diagram-wrap').mousemove(function (e) {
//     var parentOffset = $('.accounts-diagram').offset();
//     var relX = e.pageX - parentOffset.left - 20;
//     var relY = e.pageY - parentOffset.top - 20;
//     var r = pieChartSize / 2;
//     var InCircle = Math.sqrt((relX - centerX) * (relX - centerX) + (relY - centerY) * (relY - centerY)) < r;
//     if (InCircle) {
//         $(this).addClass('hover');
//     } else {
//         $(this).removeClass('hover');
//     }
// });

var circleChartObj = null;
var circleChartOptions = null;

// change circle chart size on window resize
$(window).resize(drawCircleChart);

function drawCircleChart(e,noAnimation) {
    var animation = noAnimation ? false : true;
    if ($('body').hasClass('advanced')) {
        pieChartSize = $('#circleChart').width() - 20 - 38;
    } else {
        pieChartSize = $('#circleChart').width() - 28;
    }

    centerX = $('#circleChart').width() / 2 - 20;
    centerY = $('#circleChart').height() / 2 - 20;

    var circleChartArr = [];
    var circleChartColors = [];

    var circleChartTooltipData = {};

    for (const key in eachPercent) {
        var tempArr = [];
        var currencyName = $('.exch-dropdown__item[data-currency="' + key + '"]').eq(0).attr('data-name');
        var currencyColor = $('.exch-dropdown__item[data-currency="' + key + '"] svg').eq(0).css('fill');
        tempArr.push(currencyName);
        tempArr.push(eachPercent[key]);
        if (eachPercent[key] > 0) circleChartArr.push(tempArr);

        circleChartTooltipData[currencyName] = {
            price: '$' + eachBalance[key]
        }
        circleChartColors.push(currencyColor);
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
                innerSize: '86%',
                borderColor: 'var(--clr-block)',
                borderWidth: 2,
                startAngle: 0,
                size: pieChartSize,
                center: [centerX, centerY],
                colors: circleChartColors,
                animation:animation
            },
            series: {
                dataLabels: {
                    enabled: false,
                },
                states: {
                    hover: {
                        enabled: false
                    //    animation:{
                    //        duration: 1250
                    //    }
                    }
                },
                events: {
                    click: function (event) {
                        var currencyName  = event.point.name;
                        $('.exch-head__send .exch-dropdown__item[data-name="'+currencyName+'"]').eq(0).trigger('click');
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
                    '<div class="price"><span>' + numberWithCommas(circleChartTooltipData[currency]['price']) + '</span></div>' +
                    '</div>';
            }
        },
        series: [{
            name: 'Percent',
            data: circleChartArr,
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