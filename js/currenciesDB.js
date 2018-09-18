const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var currentWallet;
var ownWallet;

var wallets = {
    ownWallet: {
        'BTC': 0.00,
        'ETH': 0.00,
        'USD': 100000.00,
        'BCH': 0.00,
        'LTC': 0.00,
        'RPL': 0.00,
        'XMR': 0.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    },
/*     joeJonsonWallet: {
        'BTC': 1.50,
        'ETH': 15.50,
        'USD': 30000.00,
        'BCH': 10.00,
        'LTC': 0.00,
        'RPL': 0.00,
        'XMR': 0.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    },
    haykMinasaynWallet: {
        'BTC': 0.00,
        'ETH': 260.50,
        'USD': 12000.00,
        'BCH': 0.00,
        'LTC': 0.00,
        'RPL': 0.00,
        'XMR': 0.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    },
    ranNerWallet: {
        'BTC': 3.00,
        'ETH': 5.50,
        'USD': 3000.00,
        'BCH': 0.00,
        'LTC': 400.00,
        'RPL': 0.00,
        'XMR': 0.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    },
    annaPetersonWallet: {
        'BTC': 0.50,
        'ETH': 5.00,
        'USD': 91000.00,
        'BCH': 0.00,
        'LTC': 0.00,
        'RPL': 0.00,
        'XMR': 300.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    },
    sofiaPetrosianWallet: {
        'BTC': 10.00,
        'ETH': 12.00,
        'USD': 0.00,
        'BCH': 0.00,
        'LTC': 0.00,
        'RPL': 0.00,
        'XMR': 0.00,
        'MKR': 0.00,
        'DASH': 0.00,
        'XRP': 0.00,
    } */
}

var currenciesPrice = {
    'USD': 1,
    'BTC': 6465.98,
    'ETH': 228.61,
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
var totalBalance;

ownWallet = wallets['ownWallet'];
currentWallet = wallets['ownWallet'];
updateWalletData();

function updateWalletData() {
    totalBalance = 0;
    for (const key in currentWallet) {
        eachBalance[key] = currentWallet[key] * currenciesPrice[key];
        eachBalance[key] = +eachBalance[key].toFixed(2);
        totalBalance += eachBalance[key];

        if (currentWallet[key] != 0) {
            if ($('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').hasClass('disabled')) {
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').removeClass('disabled');
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').detach().insertBefore('#panel-funds-wallet .basic-table__row.disabled:first');
            }
        }
        if (currentWallet[key] == 0) {
            if (!$('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').hasClass('disabled')) {
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').addClass('disabled');
                $('#panel-funds-wallet .basic-table__row[data-currency="' + key + '"]').detach().insertBefore('#panel-funds-wallet .basic-table__row.disabled:first');

            }
        }

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
    $('.pricePerCoinBCH').html('$' + numberWithCommas(currenciesPrice['BCH']));
    $('.pricePerCoinLTC').html('$' + numberWithCommas(currenciesPrice['LTC']));
    $('.pricePerCoinRPL').html('$' + numberWithCommas(currenciesPrice['RPL']));
    $('.pricePerCoinXMR').html('$' + numberWithCommas(currenciesPrice['XMR']));
    $('.pricePerCoinMKR').html('$' + numberWithCommas(currenciesPrice['MKR']));
    $('.pricePerCoinDASH').html('$' + numberWithCommas(currenciesPrice['DASH']));
    $('.pricePerCoinXRP').html('$' + numberWithCommas(currenciesPrice['XRP']));

    $('.walletBTC').html(numberWithCommas(currentWallet['BTC'].toFixed(2)) + '&nbsp;');
    $('.walletETH').html(numberWithCommas(currentWallet['ETH'].toFixed(2)) + '&nbsp;');
    $('.walletUSD').html(numberWithCommas(currentWallet['USD'].toFixed(2)) + '&nbsp;');
    $('.walletBCH').html(numberWithCommas(currentWallet['BCH'].toFixed(2)) + '&nbsp;');
    $('.walletLTC').html(numberWithCommas(currentWallet['LTC'].toFixed(2)) + '&nbsp;');
    $('.walletRPL').html(numberWithCommas(currentWallet['RPL'].toFixed(2)) + '&nbsp;');
    $('.walletXMR').html(numberWithCommas(currentWallet['XMR'].toFixed(2)) + '&nbsp;');
    $('.walletMKR').html(numberWithCommas(currentWallet['MKR'].toFixed(2)) + '&nbsp;');
    $('.walletDASH').html(numberWithCommas(currentWallet['DASH'].toFixed(2)) + '&nbsp;');
    $('.walletXRP').html(numberWithCommas(currentWallet['XRP'].toFixed(2)) + '&nbsp;');


    /*     $('.walletBTCPercent').html(eachPercent['BTC'].toFixed(0) + '%');
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
        }); */
}