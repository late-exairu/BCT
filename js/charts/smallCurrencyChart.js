/*---------------------------------------------------*/
/* template for small currency charts */
/*---------------------------------------------------*/

var smallCurrencyChartOptions = {
    legend: {
        enabled: false
    },
    chart: {
        marginLeft: 0,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
        spacingTop: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.0)'
    },
    title: null,
    plotOptions: {
        series: {
            borderWidth: 0,
            groupPadding: 0,
            lineWidth: 0.6,
            stickyTracking: false,
            trackByArea: false,
            animation: false,
            marker: {
                enabled: false,
            },
            states: {
                hover: {
                    halo: {
                        opacity: 0
                    }
                }
            }
        },
        areaspline: {
            states: {
                hover: {
                    enabled: false,
                }
            },
        },
    },
    xAxis: {
        tickLength: 0,
        gridLineWidth: 0,
        labels: {
            enabled: false,
        }
    },
    yAxis: {
        tickLength: 0,
        gridLineWidth: 0,
        labels: {
            enabled: false,
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        type: 'areaspline',
        //data: [],
        lineWidth: 1,
        color: '#707cb9',
        fillColor: {
            linearGradient: [0, 0, 0, 30],
            stops: [
                [0, Highcharts.Color('#707cb9').setOpacity(0.2).get('rgba')],
                [1, Highcharts.Color('#707cb9').setOpacity(0).get('rgba')]
            ]
        },
    }, ]
}
