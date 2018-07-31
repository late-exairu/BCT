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
	/* js-dropdown */
	/*---------------------------------------------------*/

	$('.js-dropdown-toggle, .menu-dropdown__item').click(function () {
		var wrap = $(this).closest('.js-dropdown-wrap');
		var item = $(this).closest('.js-dropdown-item');
		var drop = item.find('.js-dropdown');

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
		var newCurr = $(this).children().clone();
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
		if ($('#js-graph-prices').hasClass('open')) {
			mainChartObj.setSize($('.b-graph').width() - 280 - 45, mainChartObj.chartHeight, false);
			$('.b-graph__chart').css('width', $('.b-graph').width() - 280);
		} else {
			mainChartObj.setSize($('.b-graph__chart').width() + 280 - 45, mainChartObj.chartHeight, false);
			$('.b-graph__chart').css('width', $('.b-graph').width());
		}
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
	/* account-js-simple-tabs */
	/*---------------------------------------------------*/

	$('.account-stats .menu-dropdown__item').on('click', function () {
		if ($(this).attr('id')) {
			var panelId = '#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel');
			if ($(panelId).length != 0) {
				var btnText = $(this).find('button').text();
				$('.account-stats .c-block-head h2.c-block-head__title').text(btnText);

				$('.js-tabs__tab, .js-tabs__panel').removeClass('active');
				$(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
				$(this).focus();

				if ($(this).attr('id') == 'tab-funds-portfolio') {
					portfolioChartObj = Highcharts.chart('portfolioChart', portfolioChartOptions);
				}

				if ($(this).attr('id') == 'tab-funds-account') {
					circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
				}

			}
		}
	});

	/*---------------------------------------------------*/
	/* account-js-radio-switchers */
	/*---------------------------------------------------*/

	$('.account-stats .menu-dropdown__item input[type=radio]').on('click', function () {
		var switchBtnId = $(this).attr('id');
		if (switchBtnId == 'switch-dashboard-advanced') {
			showAdvancedView();
		} else if (switchBtnId == 'switch-dashboard-basic') {
			showBasicView();
		} else if (switchBtnId == 'switch-theme-light' || switchBtnId == 'switch-theme-dark') {
			changeTheme();
		}
	});


	/*---------------------------------------------------*/
	/* functions for change view between Basic and Advanced */
	/*---------------------------------------------------*/

	function showAdvancedView() {
		$('.account-stats .c-block-head ul.c-head-menu li:nth-child(2) button').prop('disabled', true);
		$('.basic').css('display', 'none');
		$('.advanced').css('display', 'flex');
		$('#panel-dashboard-liquidity').addClass('active');
		liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		$('.account-stats .c-block-head h2.c-block-head__title').text('Consolidated Liquidity');
	}

	function showBasicView() {
		$('.account-stats .c-block-head ul.c-head-menu li:nth-child(2) button').prop('disabled', false);
		$('.advanced').css('display', 'none');
		$('.basic').css('display', 'flex');
		circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
		portfolioChartObj = Highcharts.chart('portfolioChart', portfolioChartOptions);

		var textForTitle = $('.account-stats .c-block-head  ul.c-head-menu li:nth-child(2) ul.menu-dropdown li.active button').text();
		$('.account-stats .c-block-head h2.c-block-head__title').text(textForTitle);
	}

	/*---------------------------------------------------*/
	/* functions for change theme */
	/*---------------------------------------------------*/

	function changeTheme() {
		var darkTheme = $('#tab-dark-theme input:checked').length;
		if (darkTheme) {
			$('body').addClass('dark-theme');

			var backColor = '#18202d';
			var gridColor = '#24425b';
			var fontColor = '#9BA6B2';
			var labelColor = '#9BA6B2';
			var lineColor = '#4F6C82';

			changeChartsColors(backColor, gridColor, fontColor, labelColor, lineColor);

		} else {
			$('body').removeClass('dark-theme');

			var backColor = '#ffffff';
			var gridColor = '#ccd6eb';
			var fontColor = '#000000';
			var labelColor = '#666666';
			var lineColor = '#BFC0C0';

			changeChartsColors(backColor, gridColor, fontColor, labelColor, lineColor);
		}
	}


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
					$('.cc-accounts-table .basic-table__row').each(function () {
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
			xAxis: {
				gridLineColor: gridColor,
				lineColor: gridColor,
				crosshair: {
					label: {
						backgroundColor: backColor,
						style: {
							color: fontColor
						}
					}
				},
				labels: {
					style: {
						color: labelColor
					}
				}
			},
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
				crosshair: {
					label: {
						backgroundColor: backColor,
						style: {
							color: fontColor
						}
					}
				},
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

});