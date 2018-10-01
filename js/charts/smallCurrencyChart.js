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
            color: '#707cb9',
            fillColor: {
                linearGradient: [0, 0, 0, 1],
                stops: [
                    [0, Highcharts.Color('#707cb9').setOpacity(0.4).get('rgba')],
                    [1, Highcharts.Color('#707cb9').setOpacity(0).get('rgba')]
                ]
            },
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


$.ajax({
    url: 'https://min-api.cryptocompare.com/data/histohour?fsym=USDT&tsym=USD&limit=24',
    success: function (data) {
        var graphArr = data.Data.map(s => (s.open + s.close) / 2);
        if (!graphArr.length) {
            for (let i = 0; i < 25; i++) {
                graphArr.push(1);
            };
        };
        var min = Math.min(...graphArr);
        var max = Math.max(...graphArr);
        //console.log(graphArr[0], graphArr[graphArr.length - 1]);
        var changeInPercent = (-1 + (graphArr[graphArr.length - 1] / graphArr[0])) * 100;
        //console.log(changeInPercent);
        smallCurrencyChartOptions.series[0].data = graphArr;
        smallCurrencyChartOptions.yAxis.min = min;
        smallCurrencyChartOptions.yAxis.max = max;
        var smallCurrencyChartObj = Highcharts.chart('smallChartUSDT', smallCurrencyChartOptions);
        $('<p>$' + currenciesPrice['USDT'].toFixed(2) + ' <span class="smaller clr-blue">' + changeInPercent.toFixed(2) + '%</span></p>').insertAfter('#smallChartUSDT');
    },
});