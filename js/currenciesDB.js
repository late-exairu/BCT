const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var ownWallet = {
    'BTC': 1.00,
    'ETH': 7.50,
    'USD': 0.00,
    'BCH': 0.00,
    'LTC': 0.00,
    'RPL': 0.00,
    'XMR': 0.00,
    'MKR': 0.00,
    'DASH': 0.00,
    'XRP': 0.00,
}
var currenciesPrice = {
    'BTC': 6465.98,
    'ETH': 228.61,
    'USD': 1,
    'BCH': 508.43,
    'LTC': 55.73,
    'RPL': 0.29,
    'XMR': 114.81,
    'MKR': 391.68,
    'DASH': 172.90,
    'XRP': 0.29,
}

var eachBalance = {};
var eachPercent = {};

var totalBalance = 0;
for (const key in ownWallet) {
    eachBalance[key] = ownWallet[key] * currenciesPrice[key];
    eachBalance[key] = +eachBalance[key].toFixed(2);
    totalBalance += eachBalance[key];
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

$('.pricePerCoinBTC').html('$' + numberWithCommas(currenciesPrice['BTC']));
$('.clearPricePerCoinBTC').html(numberWithCommas(currenciesPrice['BTC']));
$('.pricePerCoinETH').html('$' + numberWithCommas(currenciesPrice['ETH']));

$('.walletBTC').html(ownWallet['BTC'].toFixed(2) + '&nbsp;');
$('.walletETH').html(ownWallet['ETH'].toFixed(2) + '&nbsp;');

$('.walletBTCPercent').html(eachPercent['BTC'].toFixed(0) + '%');
$('.walletETHPercent').html(eachPercent['ETH'].toFixed(0) + '%');

$('.btc-width').css({
    'width': eachPercent['BTC'].toFixed(0) + '%',
    'min-width': eachPercent['BTC'].toFixed(0) + '%',
    'max-width': eachPercent['BTC'].toFixed(0) + '%'
});
$('.eth-width').css({
    'width': eachPercent['ETH'].toFixed(0) + '%',
    'min-width': eachPercent['ETH'].toFixed(0) + '%',
    'max-width': eachPercent['ETH'].toFixed(0) + '%'
});