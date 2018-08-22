/*---------------------------------------------------*/
/* js-circle diagram small */
/*---------------------------------------------------*/

var circleChartSmallObj = null;
var circleChartSmallOptions = {
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
            size: 32,
            center: [-4, -4],
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
    tooltip:{
        enabled:false
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

circleChartSmallObj = Highcharts.chart('circleChartSmall', circleChartSmallOptions);
