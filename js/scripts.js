$(function () {

	/* Cubic slider for Orders */

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

	$('.js-account-stats .menu-dropdown__item').on('click', function () {
		if ($(this).attr('id')) {
			var panelId = '#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel');
			if ($(panelId).length != 0) {
				var btnText = $(this).find('button').text();
				var accountStatsHeader = $('.js-account-stats .c-block-head h2.c-block-head__title');
				var svgFromHeader = $(accountStatsHeader).find('svg').clone();
				accountStatsHeader.text(btnText + ' ').append(svgFromHeader);

				$('.js-account-stats .js-tabs-tab, .js-account-stats .js-tabs-panel').removeClass('active');
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
					positionCircleChartText(circleChartObj);
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

	$('.js-account-stats input[type=checkbox]').on('click', function () {
		// for future Real trading option
	});


	/*---------------------------------------------------*/
	/* Left column menu */
	/*---------------------------------------------------*/

	$('.main-cols__left .menu-dropdown__item').on('click', function () {
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
			var labelColor = '#9BA6B2';
			var lineColor = '#4F6C82';
		} else {
			$('body').removeClass('dark-theme');

			var backColor = '#ffffff';
			var gridColor = '#ccd6eb';
			var labelColor = '#666666';
			var lineColor = '#BFC0C0';
		}
		changeChartsColors(backColor, gridColor, labelColor, lineColor);
	});

	/*---------------------------------------------------*/
	/* change colors in all charts */
	/*---------------------------------------------------*/
	function changeChartsColors(backColor, gridColor, labelColor, lineColor) {

		// circleChart
		var stylesForCircleChart = {
			chart: {
				backgroundColor: backColor,
			}
		};

		changeChartStylesOptions(stylesForCircleChart, circleChartOptions);

		if (circleChartObj)
			circleChartObj.update(stylesForCircleChart);

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
							color: labelColor
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
						lineWidth: item.options.lineWidth,
						id: item.options.id
					});
					// add fill color on theme change 
					if (index == mainGraphHighlighted - 1) {
						item.setOptions({
							fillColor: {
								linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
								stops: gradientColor
							},
							id: item.options.id,
							lineWidth: item.options.lineWidth,
							color: item.options.color
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

	$('.main-cols__left .basic-table__row').click(function () {
		$('.main-cols__left .basic-table__row').removeClass('active');
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
	$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').click(function () {
		$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').removeClass('active');
		$(this).addClass('active');
		$('.graph-prices .labeled-dropdown__selected').text($(this).text());
	});

	/*---------------------------------------------------*/
	/* Main graph size change */
	/*---------------------------------------------------*/

	$('#js-graph-size-toggle').click(function () {
		if ($('.b-graph.fullScreen').length) {
			$('.b-graph').removeClass('fullScreen');
		} else {
			$('.b-graph').addClass('fullScreen');
		}
		redrawMainChart();
	});

});