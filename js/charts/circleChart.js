/*---------------------------------------------------*/
/* js-circle diagram */
/*---------------------------------------------------*/

var circleChartObj = null;
var circleChartOptions = {
    chart: {
        type: 'pie',
        spacingLeft: 0,
        spacingTop: 0,
        backgroundColor: '#ffffff'
    },
    title: null,
    plotOptions: {
        pie: {
            innerSize: '85%',
            borderWidth: 0,
            startAngle: 20
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
            var resultString = '';
            $('#panel-funds-account .basic-table__row').each(function () {
                if ($(this).find('.w-30').text().indexOf(currency) != -1) {
                    resultString = $(this).find('.w-30').html();
                    return false;
                }
            });
            return '<div class="tooltip">' + resultString + '</div>';
        }
    },
    series: [{
        name: 'Percent',
        data: [
            ['Ethereum', 20, 999],
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

function positionCircleChartText(chart) {
    var textX = chart.plotLeft + (chart.plotWidth * 0.5);
    var textY = chart.plotTop + (chart.plotHeight * 0.5);
    span = $('#pieChartInfoText');
    span.css('width', '120px');
    span.css('left', textX + (span.width() * -0.5));
    span.css('top', textY + (span.height() * -0.7));
};