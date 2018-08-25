$(function () {

	if (localStorage.getItem('telegramAuth') == 'true') {
		$('.message-bar__login').addClass('hidden');
	}

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
	/* 	function redrawOtherCharts() {
			if (circleChartObj) circleChartObj.reflow();
			if (portfolioChartObj) portfolioChartObj.reflow();
			if (liquidityChartObj) liquidityChartObj.reflow();
		} */

	/*---------------------------------------------------*/
	/* js-dropdown */
	/*---------------------------------------------------*/

	$('.js-dropdown-toggle, .menu-dropdown__item').click(function (e) {
		e.stopPropagation();
		var wrap = $(this).closest('.js-dropdown-wrap');
		var drop = wrap.find('.js-dropdown');

		if (drop.hasClass('open')) {
			drop.removeClass('open');
		} else {
			wrap.find('.js-dropdown').removeClass('open')
			drop.addClass('open');
		}
	});

	$('.main-cols__right-top .exch-dropdown').hover(function name() {
		$(this).addClass('open');
	});

	$('.main-cols__right-top .exch-dropdown').mouseleave(function name() {
		$(this).removeClass('open');
	});

	/*---------------------------------------------------*/

	$('input[placeholder], textarea[placeholder]').placeholder();

	/*---------------------------------------------------*/
	/* js-select currency*/
	/*---------------------------------------------------*/

	$('.exch-dropdown__list .exch-dropdown__item').click(function () {
		var currencyName = $(this).attr('data-name');
		var telegramGroupName = $(this).attr('data-telegram');
		var realCurrencyName = currencyName.slice(6).toLowerCase();

		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).text(currencyName);
		var currDropdown = $(this).closest('.exch-dropdown');
		currDropdown.find('.exch-dropdown__item').removeClass('current');
		$(this).addClass('current');
		$(currDropdown).find('.exch-dropdown__current > svg, .exch-dropdown__current > p').remove();
		$(newCurr).insertBefore($(currDropdown).find('.exch-dropdown__hangle'));
		var firstColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(0).css('fill');
		var secondColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(1).css('fill');
		$(".exch-head").get(0).style.setProperty("--color-one", firstColor);
		$(".exch-head").get(0).style.setProperty("--color-two", secondColor);

		// first currency
		if (telegramGroupName) {
			$('.chat-head__name').text(telegramGroupName);
			$('.chat-head__curr').remove();
			$('.chat-head').prepend('<svg class="chat-head__curr clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
			$('.exch-form__send .exch-form__coin').remove();
			$('.exch-form__send').append('<svg class="exch-form__coin clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
			$('.graph-info__title').first().text('1 ' + telegramGroupName.slice(0, 3) + ' = ' + $(this).attr('data-course') + ' USD');
			$('.chat-head__name').css('color', firstColor);
		}
		// second currency
		else {
			$('.exch-form__get .exch-form__coin').remove();
			$('.exch-form__get').append('<svg class="exch-form__coin clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
		}

	});

	/*---------------------------------------------------*/
	/* js-scrollbar-outer */
	/*---------------------------------------------------*/

	$('.scrollbar-right').scrollbar();
	$('.scrollbar-left').scrollbar();
	$('.scrollbar-arrows').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true
	});

	$('#user-btn').on('click', function () {
		$('body').toggleClass('menubar-in');
	});

	/*---------------------------------------------------*/
	/* js-graph-prices-toggle */
	/*---------------------------------------------------*/

	$('#js-graph-prices-toggle').click(function () {
		$('.graph-prices').toggleClass('open');
		$(this).toggleClass('open');
		$('.b-graph__controls').toggleClass('shifted');
		redrawMainChart();
	});

	$('.advanced .b-graph').mousemove(function (e) {
		var x = e.pageX - $('.b-graph').offset().left;
		if ($('.b-graph').width() - x < 10) {
			if (!$('.graph-prices').hasClass('open')) {
				$('.graph-prices').addClass('open');
				$('.b-graph__controls').addClass('shifted');
				redrawMainChart();
			}
		} else {
			if ($('.b-graph').width() - x > 200) {
				if ($('.graph-prices').hasClass('open')) {
					$('.graph-prices').removeClass('open');
					$('.b-graph__controls').removeClass('shifted');
					redrawMainChart();
				}
			}
		}
	});

	$('.advanced .b-graph').mouseleave(function (e) {
		var x = e.pageX - $('.b-graph').offset().left;
		if (x < $('.b-graph').width() - 5) {
			if ($('.graph-prices').hasClass('open')) {
				$('.graph-prices').removeClass('open');
				$('.b-graph__controls').removeClass('shifted');
				redrawMainChart();
			}
		} else {
			$('.graph-prices').addClass('open');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
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


	// function initializeSliderCharts() {
	// 	$('.portfolioChartParent').slick({
	// 		arrows: false,
	// 		dots: false,
	// 		infinite: false,
	// 		fade: true
	// 	});
	// 	portfolioChartObj = Highcharts.stockChart('portfolioChartGeneral', portfolioChartOptions);
	// 	portfolioChartBTCObj = Highcharts.stockChart('portfolioChartBTC', portfolioChartBTCOptions);
	// 	portfolioChartETHObj = Highcharts.stockChart('portfolioChartETH', portfolioChartETHOptions);

	// 	$('.portfolioChartParent').mousewheel(function (e) {
	// 		e.preventDefault();

	// 		if (e.deltaY < 0) {
	// 			$(this).slick('slickNext');
	// 		} else {
	// 			$(this).slick('slickPrev');
	// 		}
	// 	});

	// }


	/*---------------------------------------------------*/
	/* BASIC account-js-menu */
	/*---------------------------------------------------*/

	$('.accounts-diagram-wrap').click(function () {
		$('.js-tabs-panel').removeClass('active');
		$('#panel-funds-portfolio').addClass('active');
		$('.main-cols__right-bottom .portfolio-menu__item').eq(1).trigger('click');
		//initializeSliderCharts();
		if (!portfolioChartObj)
			portfolioChartObj = Highcharts.stockChart('portfolioChartGeneral', portfolioChartOptions);

	});

	$('.portfolio-back').click(function () {
		$('.js-tabs-panel').removeClass('active');
		$('#panel-funds-wallet').addClass('active');
		drawCircleChart();
	});


	/*---------------------------------------------------*/
	/* ADVANCED account-js-menu */
	/*---------------------------------------------------*/

	$('.advanced .js-account-stats .portfolio-drop .menu-dropdown__item').on('click', function () {
		$('.js-account-stats .portfolio-drop .menu-dropdown__item').removeClass('active');
		$(this).addClass('active');

		$('.js-tabs-panel').removeClass('active');
		$('.js-tabs-panel').eq($(this).index()).addClass('active');

		// Global liquidity
		if ($(this).index() == 0) {
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		}

		// Wallet tab
		if ($(this).index() == 2) {
			drawCircleChart();
		}
	});

	/*---------------------------------------------------*/
	/* functions for change theme */
	/*---------------------------------------------------*/

	$('#switch-theme').change(function () {
		var darkTheme = $('#switch-theme:checked').length;
		if (darkTheme) {
			$('body').addClass('dark-theme');
		} else {
			$('body').removeClass('dark-theme');
		}
		changeTheme();
	});

	function changeTheme() {
		if ($('body').hasClass('dark-theme')) {
			var backColor = '#18202d';
			var gridColor = '#24425b';
			var labelColor = '#9BA6B2';
			var lineColor = '#4F6C82';
		} else {
			var backColor = '#ffffff';
			var gridColor = '#ccd6eb';
			var labelColor = '#666666';
			var lineColor = '#BFC0C0';
		}
		changeChartsColors(backColor, gridColor, labelColor, lineColor);
	}

	/*---------------------------------------------------*/
	/* change colors in all charts */
	/*---------------------------------------------------*/
	function changeChartsColors(backColor, gridColor, labelColor, lineColor) {

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
		/* 		changeChartStylesOptions(stylesForPortfolioChart, portfolioChartBTCOptions);
				changeChartStylesOptions(stylesForPortfolioChart, portfolioChartETHOptions); */

		if (portfolioChartObj) portfolioChartObj.update(stylesForPortfolioChart);
		/* 		if (portfolioChartBTCObj) portfolioChartBTCObj.update(stylesForPortfolioChart);
				if (portfolioChartETHObj) portfolioChartETHObj.update(stylesForPortfolioChart); */

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
				/* 				areaspline: {
									color: lineColor
								} */
			}
		};

		if (mainChartObj) {
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					// add fill color on theme change 
					if (index == mainGraphHighlighted - 1) {
						item.setOptions({
							fillColor: {
								linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
								stops: gradientColor
							},
							id: item.options.id,
							lineWidth: item.options.lineWidth,
							color: item.options.color,
							enableMouseTracking: item.options.enableMouseTracking
						});
					} else {
						item.setOptions({
							color: lineColor,
							lineWidth: item.options.lineWidth,
							id: item.options.id,
							enableMouseTracking: item.options.enableMouseTracking
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

	$('.basic-table').on('click', '.basic-table__row:not(.head)', function () {
		$(this).parent().find('.basic-table__row').removeClass('active');
		$(this).addClass('active');

		// show order form
		if ($(this).parents('#orderBook').length) {
			$('#orders').css('display', 'flex');
			$('.btn-table-toggle').addClass('open');
		}

		// select value in exch-dropdown
		if ($(this).parents('#panel-funds-wallet').length) {
			var icon = $(this).find('svg').eq(0)[0].childNodes[1].getAttribute('xlink:href');
			$('.exch-head__get .exch-dropdown__list .exch-dropdown__item').each(function () {
				if (icon == $(this).find('svg').eq(0)[0].childNodes[1].getAttribute('xlink:href')) {
					$(this).trigger('click');
					$('.exch-dropdown').removeClass('open');
					return false;
				}
			});
		}

		if ($(this).parents('#panel-funds-history').length) {
			$.fancybox.open({
				src: '#exchange-step_2'
			});
		}

	});

	/*---------------------------------------------------*/
	/* change range on Portfolio Chart */
	/*---------------------------------------------------*/

	/* 	$('.portfolio-period .portfolio-period__item').click(function () {
			$('.portfolio-period .portfolio-period__item').removeClass('current');
			$(this).addClass('current');
			portfolioChartCurrentRange = $(this).index();
			portfolioChartObj.rangeSelector.clickButton(portfolioChartCurrentRange, {}, true);

			portfolioChartBTCCurrentRange = $(this).index();
			portfolioChartBTCObj.rangeSelector.clickButton(portfolioChartBTCCurrentRange, {}, true);

			portfolioChartETHCurrentRange = $(this).index();
			portfolioChartETHObj.rangeSelector.clickButton(portfolioChartETHCurrentRange, {}, true);

			updatePortfolioStats();
		});

		function updatePortfolioStats(currencyChange) {
			var currentSlide = $('.portfolioChartParent').slick('slickCurrentSlide');
			var currentPeriod = $('.portfolio-period .portfolio-period__item.current').index();
			if (currencyChange) {
				if (currentSlide == 0) {
					$('.portfolio-stats__amount-tip').text('Portfolio value');
					circleChartSmallObj = Highcharts.chart('circleChartSmall', circleChartSmallOptions);
				} else if (currentSlide == 1) {
					$('.portfolio-stats__amount-tip').text('Bitcoin');
					$('.portfolio-stats__currency').html('').append('<svg class="chat-head__curr clr-bitcoin" style="display: block;" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-bitcoin" > < /use> </svg>');
				} else if (currentSlide == 2) {
					$('.portfolio-stats__amount-tip').text('Ethereum');
					$('.portfolio-stats__currency').html('').append('<svg class="chat-head__curr clr-ethereum" style="display: block;" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-ethereum" > < /use> </svg>');
				}
			}
			$('.portfolio-stats__dinamic').text(portfolioChartArrChanges[currentSlide][currentPeriod][0]);
			$('.portfolio-stats__amount-value').text(portfolioChartArrChanges[currentSlide][currentPeriod][1]);
			$('.portfolio-stats__amount-cent').text(portfolioChartArrChanges[currentSlide][currentPeriod][2]);
		} */

	/*---------------------------------------------------*/
	/* Graph prices list */
	/*---------------------------------------------------*/

	var mainChartFirstColor = '#2B569A';
	var mainChartSecondColor = '#dbdbdb';

	if ($('body').hasClass('dark-theme')) {
		mainChartFirstColor = '#2B569A';
		mainChartSecondColor = '#4F6C82';
	}

	$('.graph-prices .graph-prices__list .graph-prices__item').click(function () {
		$('.graph-prices__list .graph-prices__item').removeClass('active');
		$(this).addClass('active');
		var currentDataId = $(this).attr('data-id');
		mainChartObj.series.map(function (item, index) {
			if (item.type == 'areaspline') {
				item.update({
					color: mainChartSecondColor,
					fillColor: {
						linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
						stops: [
							[0, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')],
							[1, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')]
						]
					},
					lineWidth: 1,
					enableMouseTracking: false,
					zIndex: 1
				});
			}
		});

		mainChartObj.series[currentDataId - 1].update({
			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: gradientColor
			},
			color: mainChartFirstColor,
			lineWidth: 3,
			enableMouseTracking: true,
			trackByArea: true,
			zIndex: 10
		});

		mainGraphHighlighted = currentDataId;
	});

	/* 	$('.graph-prices .graph-prices__list .graph-prices__item').hover(function () {
			var currentDataId = $(this).attr('data-id');
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					if (item.options.lineWidth > 1) {
						item.update({
							lineWidth: 1,
							color: mainChartSecondColor
						});
					}
					if (item.options.id == currentDataId) {
						item.update({
							lineWidth: 3,
							color: mainChartFirstColor
						});
					}
				}
			});
		}); */

	/* 	$('.graph-prices__list').mouseleave(function () {
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					item.update({
						lineWidth: 1,
						color: mainChartSecondColor,
						enableMouseTracking: false,
						zIndex: 1
					});
					if (item.options.id == mainGraphHighlighted) {
						item.update({
							lineWidth: 3,
							color: mainChartFirstColor,
							enableMouseTracking: true,
							trackByArea: true,
							zIndex: 10
						});
					}
				}
			});
		}); */


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

	/*---------------------------------------------------*/
	/* Currency switch */
	/*---------------------------------------------------*/

	$('.exch-head__switch').click(function () {
		var firstCurr = $('.exch-head__get .exch-dropdown__current .exch-dropdown__title').text();
		var secondCurr = $('.exch-head__send .exch-dropdown__current .exch-dropdown__title').text();
		$('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-name="' + firstCurr + '"]').trigger('click');
		$('.exch-head__get .exch-dropdown__list .exch-dropdown__item[data-name="' + secondCurr + '"]').trigger('click');
		$('.exch-dropdown').removeClass('open');
	});

	/*---------------------------------------------------*/
	/* Table column sorted */
	/*---------------------------------------------------*/

	$('.basic-table__row.head > div').click(function () {
		if ($(this).hasClass('sorted-down')) {
			$(this).closest('.basic-table__row.head').find(' > div').removeClass('sorted-down');
			$(this).addClass('sorted-up');
		} else {
			$(this).closest('.basic-table__row.head').find(' > div').removeClass('sorted-up sorted-down');
			$(this).addClass('sorted-down');
		}
	});

	/*---------------------------------------------------*/
	/* Fancybox popup */
	/*---------------------------------------------------*/

	$('data-fancybox').fancybox({
		keyboard: false,
		arrows: false,
		infobar: false,
		touch: false
	});

	/*---------------------------------------------------*/
	/* Chat Search toggle */
	/*---------------------------------------------------*/

	$('.js-chat-search-toggle').click(function () {
		$(this).closest('.chat-head').find('.chat-head__search').toggleClass('open');
	});

	/*---------------------------------------------------*/
	/* Open orders click */
	/*---------------------------------------------------*/

	$('.js-open-orders input').change(function () {
		if ($('#switch-trading-real:checked').length) {
			$('.main-cols__right-bottom .js-tabs-panel').removeClass('active');
			$('#panel-funds-orders').addClass('active');
		} else {
			$('.main-cols__right-bottom .js-tabs-panel').removeClass('active');
			$('#panel-funds-history').addClass('active');
		}
	});

	/*---------------------------------------------------*/
	/* first popUp layer close */
	/*---------------------------------------------------*/

	$('.exch-head__btn').click(function () {
		// basic
		if (!$('body').hasClass('advanced')) {
			$('.js-tabs-panel').removeClass('active');
			$('#panel-funds-history').addClass('active');
		}
		//advanced
		else {
			$('.main-cols__right-bottom .portfolio-menu__item').eq(3).trigger('click');
		}
	});

	// On before slide change
	$('.portfolioChartParent').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		updatePortfolioStats(true);
	});

	// convert/confirm buttons
	$('.exch-head__btn, .exch-form__btn').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('exch-form__btn')) {
			$('.exch-form').addClass('progress');
			setTimeout(() => {
				$('.exch-form').removeClass('progress');
				$.fancybox.open({
					src: '#exchange-step_2'
				});
				$(this).closest('.exch-head').toggleClass('open');
			}, 1000);
		} else {
			$(this).closest('.exch-head').toggleClass('open');
		}
	});

	/*---------------------------------------------------*/
	/* JS for ADVANCED page */
	/*---------------------------------------------------*/

	if ($('body').hasClass('advanced')) {
		changeTheme();
		liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);

		var rowForMove = null;
		var min = 500,
			max = 1000;

		function updateTable1() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body .basic-table__row').first().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body').append(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable1, rand);
		}

		function updateTable2() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).find('.basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).prepend(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable2, rand);
		}

		function updateTable3() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body .basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body').prepend(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable3, rand);
		}
		updateTable1();
		updateTable2();
		updateTable3();


		$('.btn-table-toggle').click(function () {
			$(this).toggleClass('open');
			if ($(this).hasClass('open')) {
				$('#orders').css('display', 'flex');
			} else {
				$('#orders').css('display', 'none');

			}
		});
	}

	/*---------------------------------------------------*/
	/* Tippy Tooltip */
	/*---------------------------------------------------*/

	tippy('.tippy-convert', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	tippy('.tippy-done', {
		html: '#ttpDone', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	tippy('.tippy-convert-advanced', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct-advanced'
	})

	tippy('.tippy-done-advanced', {
		html: '#ttpDone', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct-advanced'
	})

	tippy('.tippy-adv-mode', {
		html: '#ttpAdvMode', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		placement: 'bottom',
		theme: 'bct'
	})

	tippy('.tippy-basic-mode', {
		html: '#ttpBasicMode', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		placement: 'bottom',
		theme: 'bct-advanced'
	})

	/*---------------------------------------------------*/
	/* Graph range select */
	/*---------------------------------------------------*/
	var allOptions = $("ul.graph-range__list").children('li.graph-range__item');
	var minDate = Date.UTC(2018, 5, 17);
	var maxDate = Date.UTC(2018, 7, 05);
	$("ul.graph-range__list").on("click", "li.graph-range__item", function () {
		allOptions.removeClass('active');
		$(this).addClass('active');
		$(".graph-range__current").html($(this).html());

		switch ($(".graph-range__current").html()) {
			case "1H":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(0, {}, true);
				var HOUR = 1000 * 60 * 60;
				mainChartObj.xAxis[0].setExtremes(maxDate - HOUR, maxDate);
				break;
			case "1D":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(1, {}, true);
				var DAY = 1000 * 60 * 60 * 24;
				mainChartObj.xAxis[0].setExtremes(maxDate - DAY, maxDate);
				break;
			case "1W":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(2, {}, true);
				var WEEK = 1000 * 60 * 60 * 24 * 7;
				mainChartObj.xAxis[0].setExtremes(maxDate - WEEK, maxDate);
				break;
			case "1M":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(3, {}, true);
				var d = new Date(maxDate);
				d.setMonth(d.getMonth() - 1);
				mainChartObj.xAxis[0].setExtremes(d.getTime(), maxDate);
				break;
			case "ALL":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(4, {}, true);
				mainChartObj.xAxis[0].setExtremes(minDate, maxDate);
				break;
		}
		redrawMainChart();
	});

});