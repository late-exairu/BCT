const numberWithCommas = (x) => {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var read = new XMLHttpRequest();
read.open('GET', 'coins_list.txt', false);
read.send();

var allCurrenciesRaw = read.responseText;
var allCurrenciesArr = allCurrenciesRaw.split('\n');
var allCurrenciesHtmlFirstColumn = '';
var allCurrenciesHtmlSecondColumn = '';

var currenciesPrice = {};

// get prices for all currencies
// for(var i = 1; i < 6; i++){
//     var tempArr = allCurrenciesArr.slice((i-1)*60, i *60);
//     var tempString = '';
//     tempArr.map(item => {
//         var coinShort = item.split('-')[1].trim();
//         tempString += coinShort + ',';
//     });
//     $.ajax({
//         url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + tempString + '&tsyms=USD',
//         async: false,
//         success: function (data) {
//             for (const key in data) {
//                 currenciesPrice[key] = data[key]['USD'];
//             }
//         },
//     });
// }

$.ajax({
    url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,USDT&tsyms=USD',
    async: false,
    success: function (data) {
        for (const key in data) {
            currenciesPrice[key] = data[key]['USD'];
        }
    },
});

var currentWallet;
var ownWallet;

var wallets = {
    ownWallet: {
        'BTC': 1000.00,
        'USDT': 0.00,
        'ETH': 0.00,
        'LTC': 0.00,
    },
    allCurrencies: {
        'BTC': 0,
        'USDT': 0,
        'ETH': 0,
        'LTC': 0,
    }
}

allCurrenciesArr.map(item => {
    var coinTitle = item.split('-')[0].trim();
    var coinShort = item.split('-')[1].trim();
    var coinLowerCaseShort = item.split('-')[1].trim().toLowerCase();

    allCurrenciesHtmlFirstColumn +=
        '<div class="exch-dropdown__item" data-name="' + coinTitle + '" data-telegram="' + coinShort + ' ' + coinTitle + ' Room" data-currency="' + coinShort + '">' +
        '<svg class="exch-dropdown__icon clr-coin-' + coinLowerCaseShort + '" role="img" aria-hidden="true">' +
        '<use xmlns: xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#coin-' + coinLowerCaseShort + '"></use>' +
        '</svg> <p class="exch-dropdown__title"><b>' + coinShort + '</b> - ' + coinTitle + '</p>' +
        '</div >';

    allCurrenciesHtmlSecondColumn +=
        '<div class="exch-dropdown__item" data-name="' + coinTitle + '" data-currency="' + coinShort + '">' +
        '<svg class="exch-dropdown__icon clr-coin-' + coinLowerCaseShort + '" role="img" aria-hidden="true">' +
        '<use xmlns: xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#coin-' + coinLowerCaseShort + '"></use>' +
        '</svg> <p class="exch-dropdown__title"><b>' + coinShort + '</b> - ' + coinTitle + '</p>' +
        '</div >';

    // add row to wallet
    if (!$('#panel-funds-wallet .basic-table__row[data-currency="' + coinShort + '"]').length) {
        var newRow = '<div class="basic-table__row disabled" data-currency="' + coinShort + '">' +
            '<div class="basic-table__col w-37">' +
            '<svg class="basic-table__curr icon-curr clr-coin-ltc" role="img" aria-hidden="true">' +
            '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#coin-' + coinLowerCaseShort + '"></use>' +
            '</svg>' +
            '<div class="d-flex-col">' +
            '<span class="bigger"><span class="bold wallet' + coinShort + '"></span> ' + coinShort + ' </span><span class="smaller">' + coinTitle + '</span>' +
            '</div></div>' +
            '<div class="basic-table__col w-40">' +
            '<div class="smallCurrencyChart" id="smallChart' + coinShort + '"></div>' +
            '<div class="bigger smallChartInfo d-flex-col"></div></div>' +
            '<div class="basic-table__col w-22"><button class="basic-table__btn fix-width clickable" transaction-fancybox><svg class="sprite-icon qr-code" role="img" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#qr-code"></use></svg><span class="bigger">' + coinShort + '</span></button></div>' +
            '</div>';
        $('#panel-funds-wallet .basic-table').append(newRow);
        // add value to all currencies
        wallets['allCurrencies'][coinShort] = 0;
    }
});

$('.exch-dropdown__scroll').eq(0).append(allCurrenciesHtmlFirstColumn);
$('.exch-dropdown__scroll').eq(1).append(allCurrenciesHtmlSecondColumn);


var eachBalance = {};
var eachPercent = {};
var totalBalance;

ownWallet = wallets['ownWallet'];
currentWallet = wallets['ownWallet'];
allCurrenciesWallet = wallets['allCurrencies'];

var smallChartObjs = new Object();

initSmallCharts();
updateWalletData(true);

function updateWalletData(redrawSmallCharts) {
    totalBalance = 0;
    for (const key in currentWallet) {
        eachBalance[key] = currentWallet[key] * currenciesPrice[key];
        eachBalance[key] = +eachBalance[key].toFixed(2);
        if (eachBalance[key])
            totalBalance += eachBalance[key];

        if (currentWallet[key].toFixed(2) != 0) {
            if ($('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').hasClass('disabled')) {
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').removeClass('disabled');
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').detach().insertBefore('#panel-funds-wallet .basic-table .basic-table .basic-table__row:first');
            }
        }
        if (currentWallet[key].toFixed(2) == 0) {
            if (!$('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').hasClass('disabled')) {
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').addClass('disabled');
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').detach().insertBefore('#panel-funds-wallet .basic-table .basic-table .basic-table__row.disabled:first');
            }
        }

        $('.pricePerCoin' + key).html('$' + numberWithCommas(currenciesPrice[key]));
        $('.wallet' + key).html(numberWithCommas(currentWallet[key].toFixed(2)));
    }
    totalBalance = totalBalance.toFixed(2);

    for (const key in eachBalance) {
        eachPercent[key] = eachBalance[key] / totalBalance;
        eachPercent[key] = eachPercent[key].toFixed(2) * 100; // percent view
    }

    var totalBalanceTrunc = Math.trunc(totalBalance);
    var totalBalanceFraction = (totalBalance - Math.trunc(totalBalance)).toFixed(2).substr(1);

    $('.totalBalanceTrunc').html(numberWithCommas(totalBalanceTrunc));
    $('.totalBalanceFraction').html(totalBalanceFraction);

    $('.clearPricePerCoinBTC').html(numberWithCommas(currenciesPrice['BTC']));

    if (redrawSmallCharts) updateSmallCharts();

}

function initSmallCharts() {
    var counter = 0;
    for (const key in allCurrenciesWallet) {
        if (counter < 4) {
            if ($('#smallChart' + key).length) {
                var smallChartObj = Highcharts.chart('smallChart' + key, smallCurrencyChartOptions);
                smallChartObjs[key] = smallChartObj;
            }
        }
        counter++;
    }
}

function updateSmallCharts() {
    var chartRange = $('.graph-info__range__current').text();
    var ajaxUrl = '';
    var api_calls = new Array();
    var key_array = new Array();
    var counter = 0;
    for (const key in allCurrenciesWallet) {
        if (counter < 4) {
            switch (chartRange) {
                case '1H':
                    ajaxUrl = 'https://min-api.cryptocompare.com/data/histominute?fsym=' + key + '&tsym=USD&aggregate=3&limit=40';
                    break;
                case '1D':
                    ajaxUrl = 'https://min-api.cryptocompare.com/data/histominute?fsym=' + key + '&tsym=USD&aggregate=36&limit=40';
                    break;
                case '1W':
                    ajaxUrl = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + key + '&tsym=USD&aggregate=4&limit=42';
                    break;
                case '1M':
                    ajaxUrl = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + key + '&tsym=USD&aggregate=19&limit=39';
                    break;
                case '1Y':
                    ajaxUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + key + '&tsym=USD&aggregate=9&limit=41';
                    break;
                default:
                    break;
            }
            api_calls.push($.ajax(ajaxUrl));
            key_array.push(key);
            // draw small Chart 
            // $.ajax({
            //     url: ajaxUrl,
            //     async: false,
            //     success: function (data) {
            //         var graphArr = data.Data.map(s => (s.open + s.close) / 2);
            //         if (!graphArr.length) {
            //             for (let i = 0; i < 25; i++) {
            //                 graphArr.push(1);
            //             };
            //         };
            //         var min = Math.min(...graphArr);
            //         var max = Math.max(...graphArr);
            //         var changeInPercent = (-1 + (graphArr[graphArr.length - 1] / graphArr[0])) * 100;
                    
            //         // green color by default
            //         var classColor = 'clr-green';
            //         var sign = '+';
            //         var lineColor = '#01B067';

            //         // red color
            //         if (changeInPercent < 0) {
            //             classColor = 'clr-darkRed';
            //             sign = '-';
            //             lineColor = '#CE2424';
            //         }

            //         var smallChartInfoString = '<div>$' + numberWithCommas(currenciesPrice[key].toFixed(2)) + '<br><span class="smaller ' + classColor + '">' + sign + Math.abs(changeInPercent.toFixed(2)) + '%</span></div>';

            //         var cloneOptions = Object.assign({}, smallCurrencyChartOptions);
            //         cloneOptions.series[0].data = graphArr;
            //         cloneOptions.series[0].color = lineColor;
            //         cloneOptions.yAxis.min = min;
            //         cloneOptions.yAxis.max = max;
            //         if ($('#smallChart' + key).length)
            //             Highcharts.chart('smallChart' + key, cloneOptions);
            //         $('#smallChart' + key).parent().find('.smallChartInfo').attr('data-chart-start', graphArr[0]);
            //         $('#smallChart' + key).parent().find('.smallChartInfo').attr('data-chart-end', graphArr[graphArr.length - 1]);
            //         $('#smallChart' + key).parent().find('.smallChartInfo').html(smallChartInfoString);
            //     },
            // });
        }
        counter++;
    }
    $.when(...api_calls).done(function(...response) {
        console.log('response', response);
        for (let i = 0; i < response.length; i++) {
            var graphArr = response[i][0].Data.map(s => (s.open + s.close) / 2);
            if (!graphArr.length) {
                for (let i = 0; i < 25; i++) {
                    graphArr.push(1);
                };
            };
            var min = Math.min(...graphArr);
            var max = Math.max(...graphArr);
            var changeInPercent = (-1 + (graphArr[graphArr.length - 1] / graphArr[0])) * 100;
            
            // green color by default
            var classColor = 'clr-green';
            var sign = '+';
            var lineColor = '#01B067';

            // red color
            if (changeInPercent < 0) {
                classColor = 'clr-darkRed';
                sign = '-';
                lineColor = '#CE2424';
            }

            var smallChartInfoString = '<div>$' + numberWithCommas(currenciesPrice[key_array[i]].toFixed(2)) + '<br><span class="smaller ' + classColor + '">' + sign + Math.abs(changeInPercent.toFixed(2)) + '%</span></div>';

            // var cloneOptions = Object.assign({}, smallCurrencyChartOptions);
            // cloneOptions.series[0].data = graphArr;
            // cloneOptions.series[0].color = lineColor;
            // cloneOptions.yAxis.min = min;
            // cloneOptions.yAxis.max = max;
            // if ($('#smallChart' + key).length)
            //     Highcharts.chart('smallChart' + key, cloneOptions);
            smallChartObjs[key_array[i]].yAxis[0].setExtremes(min, max);
            smallChartObjs[key_array[i]].series[0].setData(graphArr);
            smallChartObjs[key_array[i]].series[0].update({
                color: lineColor
            });
            $('#smallChart' + key_array[i]).parent().find('.smallChartInfo').attr('data-chart-start', graphArr[0]);
            $('#smallChart' + key_array[i]).parent().find('.smallChartInfo').attr('data-chart-end', graphArr[graphArr.length - 1]);
            $('#smallChart' + key_array[i]).parent().find('.smallChartInfo').html(smallChartInfoString);
        }
    });
    //         // draw small Chart 
    //         $.ajax({
    //             url: ajaxUrl,
    //             success: function (data) {
    //                 console.log('Data', data);
    //                 var graphArr = data.Data.map(s => (s.open + s.close) / 2);
    //                 if (!graphArr.length) {
    //                     for (let i = 0; i < 25; i++) {
    //                         graphArr.push(1);
    //                     };
    //                 };
    //                 var min = Math.min(...graphArr);
    //                 var max = Math.max(...graphArr);
    //                 var changeInPercent = (-1 + (graphArr[graphArr.length - 1] / graphArr[0])) * 100;
    //                 var smallChartInfoString;
    //                 var lineColor;

    //                 // blue color
    //                 if (changeInPercent > 0) {
    //                     smallChartInfoString = '<div>$' + currenciesPrice[key].toFixed(2) + '<br><span class="smaller clr-green">+' + Math.abs(changeInPercent.toFixed(2)) + '%</span></div>';
    //                     lineColor = '#01B067';
    //                     gradientColor = {
    //                         linearGradient: [0, 0, 0, 30],
    //                         stops: [
    //                             [0, Highcharts.Color('#01B067').setOpacity(0.2).get('rgba')],
    //                             [1, Highcharts.Color('#01B067').setOpacity(0).get('rgba')]
    //                         ]
    //                     };
    //                 }
    //                 // red color
    //                 else {
    //                     smallChartInfoString = '<div>$' + currenciesPrice[key].toFixed(2) + '<br><span class="smaller clr-darkRed">-' + Math.abs(changeInPercent.toFixed(2)) + '%</span></div>';
    //                     lineColor = '#CE2424';
    //                 }

    //                 // var cloneOptions = Object.assign({}, smallCurrencyChartOptions);
    //                 // cloneOptions.series[0].data = graphArr;
    //                 // cloneOptions.series[0].color = lineColor;
    //                 // cloneOptions.yAxis.min = min;
    //                 // cloneOptions.yAxis.max = max;
    //                 // if ($('#smallChart' + key).length)
    //                 //     Highcharts.chart('smallChart' + key, cloneOptions);

    //                 smallChartObjs[key].yAxis[0].setExtremes(min, max);
    //                 smallChartObjs[key].series[0].setData(graphArr);
    //                 smallChartObjs[key].series[0].update({
    //                     color: lineColor
    //                 });

    //                 $('#smallChart' + key).parent().find('.smallChartInfo').html(smallChartInfoString);
    //                 api_calls ++;
    //                 if (api_calls == 4) $('.graph-info__range__current').trigger('responsed');
    //             },
    //         });
    //     }
    //     // create copy of existing small charts
    //     // else {
    //     //     var copyOfChart = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallCurrencyChart > div').clone();
    //     //     var copyOfInfo = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallChartInfo > div').clone();
    //     //     $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallCurrencyChart').html(copyOfChart);
    //     //     $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallChartInfo').html(copyOfInfo);
    //     // }
    //     counter++;
    // }
}
$('.graph-info__range__current').on('responsed', () => {
    var counter = 0;
    for (const key in allCurrenciesWallet) {
        if (counter >= 4) {
            var copyOfChart = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallCurrencyChart > div').clone();
            var copyOfInfo = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallChartInfo > div').clone();
            var copyOfDataStart = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallChartInfo').attr('data-chart-start');
            var copyOfDataEnd = $('#panel-funds-wallet .basic-table__row').eq(counter % 4).find('.smallChartInfo').attr('data-chart-end');
            $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallCurrencyChart').html(copyOfChart);
            $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallChartInfo').html(copyOfInfo);
            $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallChartInfo').attr('data-chart-start', copyOfDataStart);
            $('#panel-funds-wallet .basic-table__row').eq(counter).find('.smallChartInfo').attr('data-chart-end', copyOfDataEnd);

        }
        counter++;
    }
});

function updateRecent() {
    for (const key in currentWallet) {
        if (currentWallet[key].toFixed(2) != 0) {
            // add to recent
            if ($('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + key + '"]').length == 1) {
                var newElem = $('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + key + '"]').eq(0).clone();
                $(newElem).insertBefore('.exch-head__send .exch-dropdown__list .exch-dropdown__list-title:last');
            }
        }
        if (currentWallet[key].toFixed(2) == 0) {
            // remove from recent
            if ($('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + key + '"]').length == 2) {
                $('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + key + '"]').eq(0).remove();
            }
        }
    }
}