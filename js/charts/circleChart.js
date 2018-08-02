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
                if ($(this).find('.w-27').text().indexOf(currency) != -1) {
                    resultString = $(this).find('.w-27').html();
                    //resultString += $(this).find('.w-20').eq(0).text().replace('000', '');
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

function addCircleChartText(chart) {
    $("#circleChartText").html('');
    var textX = chart.plotLeft + (chart.plotWidth * 0.5);
    var textY = chart.plotTop + (chart.plotHeight * 0.5);

    var span = '<p id="pieChartInfoText" style="position:absolute; text-align:center;">';
    span += '<span style="font-size: 16px;color:black;">Total balance</span><br>';
    span += '<span style="font-size: 48px;color:black;"><span>$</span>6,359 <span>.50</span></span><br>';
    span += '<span style="font-size: 16px">(+4%) over the last 30 days</span>';
    span += '</p>';

    $("#circleChartText").append(span);
    span = $('#pieChartInfoText');
    span.css('width', '230px');
    span.find('span span').css({
        'font-size': '31px',
        'line-height': '50px',
        'vertical-align': 'top',
    });
    span.css('left', textX + (span.width() * -0.5));
    span.css('top', textY + (span.height() * -0.65));
};

circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
addCircleChartText(circleChartObj);