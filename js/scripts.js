$(function () {

	/*---------------------------------------------------*/
	/* Range Slider */
	/*---------------------------------------------------*/

	var $exchangeSlider = $(".js-exchange-slider");

	$exchangeSlider.ionRangeSlider({
		type: "single",
		hide_min_max: true,
		grid: false
	});

	$exchangeSlider.on("change", function () {
		var $this = $(this),
			value = $this.prop("value").split(";");
		console.log(value[0] + " - " + value[1]);
	});

	/* - - - */

	var $cubicSlider = $(".js-cubic-slider");

	$cubicSlider.ionRangeSlider({
		type: "single",
		hide_min_max: true,
		grid: true,
		from: 50,
		grid_snap: false
	});

	/*---------------------------------------------------*/
	/* redraw Charts after resize */
	/*---------------------------------------------------*/
	function redrawOtherCharts() {
		if (circleChartObj) circleChartObj.reflow();
		if (portfolioChartObj) portfolioChartObj.reflow();
		if (liquidityChartObj) liquidityChartObj.reflow();
	}

	/*---------------------------------------------------*/
	/* js-dropdown */
	/*---------------------------------------------------*/

	$('.js-dropdown-toggle, .menu-dropdown__item').click(function () {
		var wrap = $(this).closest('.js-dropdown-wrap');
		var drop = wrap.find('.js-dropdown');

		if (drop.hasClass('open')) {
			drop.removeClass('open');
		} else {
			wrap.find('.js-dropdown').removeClass('open')
			drop.addClass('open');
		}
	});

	/*---------------------------------------------------*/

	$('input[placeholder], textarea[placeholder]').placeholder();

	/*---------------------------------------------------*/
	/* js-select currency*/
	/*---------------------------------------------------*/

	$('.exch-dropdown__list .exch-dropdown__item').click(function () {
		var currencyName = $(this).attr('data-name');
		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).text(currencyName);
		var currDropdown = $(this).closest('.exch-dropdown');
		currDropdown.find('.exch-dropdown__item').removeClass('current');
		$(this).addClass('current');
		$(currDropdown).find('.exch-dropdown__current > svg, .exch-dropdown__current > p').remove();
		$(newCurr).insertBefore($(currDropdown).find('.exch-dropdown__hangle'));
	});

	/*---------------------------------------------------*/
	/* js-scrollbar-outer */
	/*---------------------------------------------------*/

	$('.scrollbar-outer').scrollbar();
	$('.scrollbar-inner').scrollbar();

	$('#user-btn').on('click', function () {
		$('body').toggleClass('menubar-in');
	});

	/*---------------------------------------------------*/
	/* js-graph-prices-toggle */
	/*---------------------------------------------------*/

	$('#js-graph-prices-toggle').click(function () {
		$('.graph-prices').toggleClass('open');
		$(this).toggleClass('open');
		redrawMainChart();
	});

	/*---------------------------------------------------*/
	/* js-select */
	/*---------------------------------------------------*/

	$('.js-select').click(function () {
		$(this).toggleClass('open');
	});

	/*---------------------------------------------------*/
	/* js-orders-switch */
	/*---------------------------------------------------*/

	$('#orders .c-block-head ul li').click(function (params) {
		$('#orders .c-block-head ul li').removeClass('current');
		$(this).addClass('current');
		var currentIndex = $(this).index();
		$('#orders .forms-wrap').removeClass('current');
		$('#orders .forms-wrap').eq(currentIndex).addClass('current');
	});

	/*---------------------------------------------------*/
	/* account-js-menu */
	/*---------------------------------------------------*/

	$('.account-stats .menu-dropdown__item').on('click', function () {
		if ($(this).attr('id')) {
			var panelId = '#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel');
			if ($(panelId).length != 0) {
				var btnText = $(this).find('button').text();
				var accountStatsHeader = $('.account-stats .c-block-head h2.c-block-head__title');
				var svgFromHeader = $(accountStatsHeader).find('svg').clone();
				accountStatsHeader.text(btnText + ' ').append(svgFromHeader);

				$('.account-stats .js-tabs__tab, .account-stats .js-tabs__panel').removeClass('active');
				$(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
				$(this).focus();

				if ($(this).attr('id') == 'tab-funds-portfolio') {
					portfolioChartOptions.series = [{
						data: portfolioChartData
					}];
					portfolioChartOptions.rangeSelector.selected = portfolioChartCurrentRange;
					portfolioChartObj = Highcharts.stockChart('portfolioChart', portfolioChartOptions);
				}

				if ($(this).attr('id') == 'tab-funds-account') {
					circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
				}

				if ($(this).attr('id') == 'tab-dashboard-liquidity') {
					liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
				}

			}
		}
	});

	/*---------------------------------------------------*/
	/* account-js-checkbox-switchers */
	/*---------------------------------------------------*/

	$('.account-stats input[type=checkbox]').on('click', function () {
		// for future Real trading option
	});


	/*---------------------------------------------------*/
	/* Left column menu */
	/*---------------------------------------------------*/

	$('.col-left .menu-dropdown__item').on('click', function () {
		if ($(this).hasClass('switch-orderBook')) {
			$('#telegram').addClass('hidden');
			$('#orderBook').removeClass('hidden');
		} else if ($(this).hasClass('switch-telegram')) {
			$('#orderBook').addClass('hidden');
			$('#telegram').removeClass('hidden');
		}
		redrawMainChart();
		redrawOtherCharts();
	});

	/*---------------------------------------------------*/
	/* functions for change theme */
	/*---------------------------------------------------*/

	$('#switch-theme').change(function () {
		var darkTheme = $('#switch-theme:checked').length;
		if (darkTheme) {
			$('body').addClass('dark-theme');

			var backColor = '#18202d';
			var gridColor = '#24425b';
			var fontColor = '#9BA6B2';
			var labelColor = '#9BA6B2';
			var lineColor = '#4F6C82';
		} else {
			$('body').removeClass('dark-theme');

			var backColor = '#ffffff';
			var gridColor = '#ccd6eb';
			var fontColor = '#000000';
			var labelColor = '#666666';
			var lineColor = '#BFC0C0';
		}
		changeChartsColors(backColor, gridColor, fontColor, labelColor, lineColor);
	});

	/*---------------------------------------------------*/
	/* change colors in all charts */
	/*---------------------------------------------------*/
	function changeChartsColors(backColor, gridColor, fontColor, labelColor, lineColor) {

		// circleChart
		var stylesForCircleChart = {
			chart: {
				backgroundColor: backColor,
			},
			tooltip: {
				formatter: function () {
					var currency = this.key;
					var resultString = '';
					$('#panel-funds-account .basic-table__row').each(function () {
						if ($(this).find('.w-27').text().indexOf(currency) != -1) {
							resultString = $(this).find('.w-27').html();
							resultString += $(this).find('.w-20').eq(0).text().replace('000', '');
							return false;
						}
					});
					var lightResult = '<div class="circle">' + resultString + '</div>';
					var darkResult = '<div class="circle dark">' + resultString + '</div>';
					return $('.dark-theme').length ? darkResult : lightResult;
				}
			}
		};

		changeChartStylesOptions(stylesForCircleChart, circleChartOptions);

		if (circleChartObj)
			circleChartObj.update(stylesForCircleChart);
		$('#pieChartInfoText *').css('color', fontColor);

		// portfolioChart
		var stylesForPortfolioChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: [{
				gridLineColor: gridColor,
				lineColor: gridColor,
/* 				crosshair: {
 					label: {
						backgroundColor: backColor,
						style: {
							color: fontColor
						}
					} 
				}, */
				labels: {
					style: {
						color: labelColor
					}
				}
			}],
			yAxis: {
				gridLineColor: gridColor
			}
		};
		changeChartStylesOptions(stylesForPortfolioChart, portfolioChartOptions);

		if (portfolioChartObj)
			portfolioChartObj.update(stylesForPortfolioChart);

		$('#portfolioChartText div p,#portfolioChartRange span').css('color', fontColor);

		// liquidityChart
		var stylesForLiquidityChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: {
				gridLineColor: gridColor,
				lineColor: gridColor,
/* 				crosshair: {
					label: {
						backgroundColor: backColor,
						style: {
							color: fontColor
						}
					}
				}, */
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			yAxis: [{
					gridLineColor: gridColor,
					labels: {
						style: {
							color: gridColor
						}
					}
				},
				{
					gridLineColor: gridColor,
					labels: {
						style: {
							color: labelColor
						}
					}
				}
			]
		};

		changeChartStylesOptions(stylesForLiquidityChart, liquidityChartOptions);

		if (liquidityChartObj)
			liquidityChartObj.update(stylesForLiquidityChart);

		$('.liquidityText').css('color', fontColor);
		$('.liquidityText svg').css('fill', fontColor);
		$('#panel-dashboard-liquidity .liquidityText .separator').css('background', fontColor);

		// MainChart
		var stylesForMainChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: {
				gridLineColor: gridColor,
				lineColor: gridColor,
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			yAxis: {
				gridLineColor: gridColor,
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			plotOptions: {
				areaspline: {
					color: lineColor
				}
			}
		};

		if (mainChartObj) {
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					item.setOptions({
						color: lineColor,
						id: item.options.id
					});
					// add fill color on theme change 
					if (index == mainGraphHighlighted - 1) {
						item.setOptions({
							fillColor: {
								linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
								stops: gradientColor
							},
							id: item.options.id
						});
					}
				}

			});
			mainChartObj.update(stylesForMainChart);
		}
	}

	/*---------------------------------------------------*/
	/* show Orders form */
	/*---------------------------------------------------*/

	$('.col-left .basic-table__row').click(function () {
		$('.col-left .basic-table__row').removeClass('active');
		$(this).addClass('active');
		$('#orders').css('display', 'flex');
	});

	/*---------------------------------------------------*/
	/* change range on Portfolio Chart */
	/*---------------------------------------------------*/

	$('#portfolioChartRange span').click(function () {
		$('#portfolioChartRange span').removeClass('active');
		$(this).addClass('active');
		portfolioChartCurrentRange = $(this).index();
		portfolioChartObj.rangeSelector.clickButton(portfolioChartCurrentRange, {}, true);
	});


	/*---------------------------------------------------*/
	/* Graph prices list */
	/*---------------------------------------------------*/
	$('.graph-prices .graph-prices__list .graph-prices__item').click(function () {
		$('.graph-prices__list .graph-prices__item').removeClass('active');
		$(this).addClass('active');
	});

	/*---------------------------------------------------*/
	/* Graph prices select */
	/*---------------------------------------------------*/
	$('.graph-prices .select-dropdown__list .select-dropdown__item').click(function () {
		$('.graph-prices .select-dropdown__list .select-dropdown__item').removeClass('active');
		$(this).addClass('active');
		$('.graph-prices .select-dropdown__selected').text($(this).text());
	});

});