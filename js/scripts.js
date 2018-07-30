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
	/* functions for Update styles in Charts */
	/*---------------------------------------------------*/

	function changeChartStylesOptions(newStyles, oldStyles) {
		var keys = getDeepKeys(newStyles);
		keys.map(function (path) {
			var deepValue = getDeepVal(newStyles, path);
			if (typeof deepValue != 'object') {
				setDeepValue(oldStyles, deepValue, path);
			}
		});
	}

	function getDeepKeys(obj) {
		var keys = [];
		for (var key in obj) {
			keys.push(key);
			if (typeof obj[key] === "object") {
				var subkeys = getDeepKeys(obj[key]);
				keys = keys.concat(subkeys.map(function (subkey) {
					return key + "." + subkey;
				}));
			}
		}
		return keys;
	}

	function getDeepVal(obj, path) {
		var paths = path.split('.'),
			current = obj,
			i;

		for (i = 0; i < paths.length; ++i) {
			if (current[paths[i]] == undefined) {
				return undefined;
			} else {
				current = current[paths[i]];
			}
		}
		return current;
	}

	function setDeepValue(obj, value, path) {
		var i;
		path = path.split('.');
		for (i = 0; i < path.length - 1; i++)
			obj = obj[path[i]];

		obj[path[i]] = value;
	}

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
		//var dataName = $(this).attr('data-name');
		var newCurr = $(this).children().clone();
		//newCurr[1].textContent = dataName;
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
	})

	/*---------------------------------------------------*/
	/* Charts*/
	/*---------------------------------------------------*/

	var mainChartObj = Highcharts.chart('mainChart', {
		legend: {
			enabled: false
		},
		chart: {
			marginBottom: 40
		},
		title: null,
		tooltip: {
			enabled: false
		},
		plotOptions: {
			series: {
				pointWidth: 6.5,
				pointPadding: 0,
				borderWidth: 0,
				groupPadding: 0,
				lineWidth: 0.6,
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: false
						}
					}
				}
			},
			areaspline: {
				color: '#BFC0C0',
				fillColor: {
					linearGradient: [0, 0, 0, 1],
					stops: [
						[0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba')],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				states: {
					hover: {
						lineWidth: 3,
					}
				},
				events: {
					mouseOver: function (event) {
						this.update({
							fillColor: {
								linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
								stops: [
									[0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba')],
									[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
								]
							},
							color: '#0576B9'
						}, )
					},
					mouseOut: function (event) {
						this.update({
							fillColor: {
								linearGradient: [0, 0, 0, 1],
								stops: [
									[0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba')],
									[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
								]
							},
							color: $('.dark-theme').length ? '#4F6C82' : '#BFC0C0'
						}, )
					}
				},
			}
		},
		xAxis: {
			categories: [
				'Jun 17 2018', 'Jun 17 2018', 'Jun 17 2018', 'Jun 17 2018', 'Jun 17 2018',
				'Jun 19 2018', 'Jun 19 2018', 'Jun 19 2018', 'Jun 19 2018', 'Jun 19 2018',
				'Jun 21 2018', 'Jun 21 2018', 'Jun 21 2018', 'Jun 21 2018', 'Jun 21 2018',
				'Jun 23 2018', 'Jun 23 2018', 'Jun 23 2018', 'Jun 23 2018', 'Jun 23 2018',
				'Jun 25 2018', 'Jun 25 2018', 'Jun 25 2018', 'Jun 25 2018', 'Jun 25 2018',
				'Jun 27 2018', 'Jun 27 2018', 'Jun 27 2018', 'Jun 27 2018', 'Jun 27 2018',
				'Jun 29 2018', 'Jun 29 2018', 'Jun 29 2018', 'Jun 29 2018', 'Jun 29 2018',
				'Jul 1 2018', 'Jul 1 2018', 'Jul 1 2018', 'Jul 1 2018', 'Jul 1 2018',
				'Jul 3 2018', 'Jul 3 2018', 'Jul 3 2018', 'Jul 3 2018', 'Jul 3 2018',
				'Jul 5 2018', 'Jul 5 2018', 'Jul 5 2018', 'Jul 5 2018', 'Jul 5 2018',
				'Jul 7 2018', 'Jul 7 2018', 'Jul 7 2018', 'Jul 7 2018', 'Jul 7 2018',
			],
			labels: {
				step: 5,
				style: {
					width: '50px'
				},
				x: 50
			},
			tickLength: 0,
			tickInterval: 2.5,
			gridLineWidth: 1
		},
		yAxis: {
			title: {
				text: ''
			},
			opposite: true,
			showLastLabel: false,
			showFirstLabel: false,
			labels: {
				align: 'right',
				x: -20,
				y: -20,
				step: 2,
				formatter: function () {
					return this.value + '.00';
				}
			},
			tickInterval: 7,
			max: 150
		},
		stickyTracking: false,
		series: [{
				type: 'areaspline',
				data: [30, 40, 35, 45, 60, 70, 72, 77, 79, 62,
					44, 50, 50, 55, 57, 52, 38, 27, 60, 64,
					70, 75, 79, 87, 94, 103, 102, 53, 107, 62,
					64, 66, 66, 68, 100, 112, 98, 97, 95, 68,
					77, 79, 80, 82, 87, 85, 83, 87, 82, 88,
					77, 80, 90, 87, 84,
				],
				name: "Series 1"
			},
			{
				type: 'areaspline',
				data: [20, 24, 24, 26, 25, 27, 24, 28, 32, 34,
					37, 39, 31, 36, 38, 82, 85, 79, 80, 70,
					97, 94, 85, 56, 34, 66, 75, 77, 44, 36,
					38, 40, 44, 46, 45, 47, 44, 48, 52, 54,
					57, 59, 61, 66, 68, 70, 75, 79, 80, 80,
					87, 84, 85, 86, 84,
				],
				name: "Series 2"
			},
			{
				type: 'areaspline',
				data: [30, 37, 38, 32, 32, 37, 34, 38, 32, 34,
					37, 19, 13, 22, 18, 27, 29, 32, 20, 12,
					49, 58, 50, 58, 57, 58, 62, 42, 47, 44,
					25, 27, 28, 22, 42, 87, 84, 98, 102, 104,
					97, 99, 83, 42, 48, 47, 49, 62, 70, 72,
					79, 78, 70, 78, 77,
				],
				name: "Series 3"
			},
			{
				type: 'areaspline',
				data: [60, 66, 69, 77, 4, 3, 22, 13, 27, 22,
					17, 19, 11, 16, 18, 20, 25, 29, 30, 20,
					35, 75, 8, 2, 12, 27, 14, 18, 2, 4,
					27, 24, 25, 26, 14, 6, 5, 7, 4, 30,
					54, 59, 60, 75, 77, 82, 83, 87, 82, 95,
					117, 119, 111, 116, 118,
				],
				name: "Series 4"
			},
			{
				type: 'column',
				color: '#0382bb',
				data: [12, 11, 8, 12, 6, 7, 5, 7, 7, 2,
					7, 9, 11, 6, 8, 2, 5, 9, 3, 2,
					5, 5, 8, 9, 2, 7, 22, 8, 2, 4,
					7, 4, 5, 6, 4, 6, 5, 7, 4, 3,
					4, 9, 6, 5, 7, 8, 8, 8, 8, 9,
					11, 19, 11, 16, 18,
				],
				name: "Series 5"
			},
			{
				type: 'column',
				color: '#ce5056',
				data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
					6, 12, 9, 7, 5, 8, 7, 5, 9, 6,
					8, 9, 6, 8, 12, 5, 12, 12, 12, 14,
					17, 14, 8, 3, 5, 8, 9, 3, 7, 8,
					14, 11, 5, 12, 17, 8, 16, 14, 8, 31,
					13, 7, 6, 4, 8,
				],
				name: "Series 6"
			},
			{
				type: 'column',
				color: '#0382bb',
				data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
					6, 12, 9, 7, 5, 8, 17, 5, 9, 6,
					8, 9, 16, 18, 12, 15, 12, 12, 12, 14,
					17, 14, 8, 3, 25, 8, 9, 3, 37, 8,
					14, 11, 5, 12, 17, 8, 6, 4, 8, 11,
					13, 7, 6, 4, 8,
				],
				name: "Series 7"
			},
			{
				type: 'column',
				color: '#ce5056',
				data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
					6, 12, 9, 7, 5, 8, 7, 15, 9, 6,
					8, 9, 6, 18, 12, 5, 12, 12, 12, 14,
					17, 14, 8, 3, 5, 8, 9, 23, 27, 8,
					14, 11, 15, 12, 17, 8, 6, 4, 8, 11,
					13, 7, 6, 4, 8,
				],
				name: "Series 8"
			}
		]
	});


	/*---------------------------------------------------*/
	/* js-graph-prices-toggle */
	/*---------------------------------------------------*/

	$('#js-graph-prices-toggle').click(function () {
		$('.graph-prices').toggleClass('open');
		$(this).toggleClass('open');
		if ($('#js-graph-prices').hasClass('open')) {
			mainChartObj.setSize($('.b-graph').width() - 280 - 45, mainChartObj.chartHeight, false);
			$('.b-graph__chart').css('width', $('.b-graph').width() - 280 );
		} else {
			mainChartObj.setSize($('.b-graph__chart').width() + 280 - 45, mainChartObj.chartHeight, false);
			$('.b-graph__chart').css('width', $('.b-graph').width());
		}
	});

	/*---------------------------------------------------*/
	/* js-circle diagram */
	/*---------------------------------------------------*/

	var circleChartObj = null;
	var circleChartOptions = {
		chart: {
			type: 'pie',
			spacingLeft: 0,
			spacingTop: 0,
			backgroundColor: '#ffffff'
		},
		title: null,
		plotOptions: {
			pie: {
				innerSize: '85%',
				borderWidth: 0
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
		tooltip: {
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: '#000000',
			borderWidth: 0,
			padding: 0,
			color: '#000000',
			useHTML: true,
			shadow: false,
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
				return '<div class="circle">' + resultString + '</div>';
			}
		},
		series: [{
			name: 'Percent',
			data: [
				['Ethereum', 20, 999],
				['Bitcoin', 80],
			],
			zones: [{
				value: 21,
				color: '#707CB9'
			}, {
				value: 81,
				color: '#F6921E'
			}]
		}]
	};

	function addCircleChartText(chart) {
		$("#circleChartText").html('');
		var textX = chart.plotLeft + (chart.plotWidth * 0.5);
		var textY = chart.plotTop + (chart.plotHeight * 0.5);

		var span = '<p id="pieChartInfoText" style="position:absolute; text-align:center;">';
		span += '<span style="font-size: 16px;color:black;">Total balance</span><br>';
		span += '<span style="font-size: 48px;color:black;"><span>$</span>6,359 <span>.50</span></span><br>';
		span += '<span style="font-size: 16px">(+4%) over the last 30 days</span>';
		span += '</p>';

		$("#circleChartText").append(span);
		span = $('#pieChartInfoText');
		span.css('width', '230px');
		span.find('span span').css({
			'font-size': '31px',
			'line-height': '50px',
			'vertical-align': 'top',
		});
		span.css('left', textX + (span.width() * -0.5));
		span.css('top', textY + (span.height() * -0.65));
	};

	circleChartObj = Highcharts.chart('circleChart', circleChartOptions);
	addCircleChartText(circleChartObj);

	/*---------------------------------------------------*/
	/* js-portfolio diagram */
	/*---------------------------------------------------*/

	var portfolioChartObj = null;
	var portfolioChartOptions = {
		chart: {
			type: 'areaspline',
			backgroundColor: '#ffffff'
		},
		rangeSelector: {
			allButtonsEnabled: true,
			selected: 2
		},
		title: null,
		legend: {
			enabled: false
		},
		xAxis: {
			gridLineColor: '#e6e6e6',
			lineColor: '#ccd6eb',
			crosshair: {
				label: {
					enabled: true,
					format: '{value:%b %d, %Y}',
					backgroundColor: '#ffffff',
					borderColor: '#5a5a5a',
					borderWidth: 1,
					borderRadius: 5,
					shape: "box",
					style: {
						color: '#000000'
					},
				}
			},
			type: 'datetime',
			dateTimeLabelFormats: {
				day: '%b %e'
			},
			tickLength: 0,
			tickInterval: 0,
			gridLineWidth: 1,
			labels: {
				step: 2,
				style: {
					color: '#666666'
				}
			},
		},
		yAxis: {
			gridLineColor: '#e6e6e6',
			labels: {
				enabled: false,
			},
			title: {
				enabled: false,
			},
			tickAmount: 10,
			minorTickLength: 0,
			max: 11000,
		},
		tooltip: {
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: 'rgba(0,0,0,0)',
			borderRadius: 0,
			padding: 0,
			shared: true,
			shadow: false,
			useHTML: true,
			shape: "box",
			style: {
				color: '#ffffff',
				fontSize: 16
			},
			headerFormat: '<table class="portfolio">',
			pointFormat: "<tr><td>${point.y}</td></tr>",
			footerFormat: '</table>',
			positioner: function (labelWidth, labelHeight, point, ) {
				return {
					x: point.plotX - 45,
					y: point.plotY - 10
				};
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				color: '#0576B9',
				fillColor: {
					linearGradient: [0, 0, 0, 300],
					stops: [
						[0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba')],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					enabled: false,
					fillColor: '',
					lineWidth: 0,
					lineColor: null,
					symbol: 'url(' + location.href + 'img/svg/circle.svg)',
					states: {
						hover: {
							enabled: true
						}
					}
				},
			}
		},
		series: [{
			name: 'Graph 1',
			data: [
				[8983.20], 8784.45, 8983.34, 8285.23, 8884.67, 8188.45, 8986.78,
				8586.87, 8084.73, 8686.37, 8988.76, 8587.24, 8188.61, 8986.45,
				8983.12, 8784.65, 8983.79, 8285.34, 8884.78, 8188.12, 8986.34,
				8586.74, 8084.78, 8686.12, 8988.09, 8587.12, 8188.87, 8986.67
			],
			pointStart: Date.UTC(2018, 5, 17),
			pointInterval: 24 * 3600 * 1000
		}]
	};

	/*---------------------------------------------------*/
	/* js-select */
	/*---------------------------------------------------*/

	$('.js-select').click(function () {
		$(this).toggleClass('open');
	});

	/*---------------------------------------------------*/
	/* js-liquidity diagram */
	/*---------------------------------------------------*/

	var countForLiquidLabels = 76701;

	var liquidityChartObj = null;
	var liquidityChartOptions = {
		chart: {
			type: 'area'
		},
		title: null,
		legend: {
			enabled: false
		},
		xAxis: {
			crosshair: {
				label: {
					enabled: true,
					format: '{value:%b %d, %Y}',
					backgroundColor: '#ffffff',
					borderColor: '#5a5a5a',
					borderWidth: 1,
					borderRadius: 5,
					shape: "box",
					style: {
						color: '#000000'
					},
				}
			},
			type: 'datetime',
			dateTimeLabelFormats: {
				day: '%b %e'
			},
			tickLength: 0,
			tickInterval: 0,
			gridLineWidth: 1,
			labels: {
				formatter: function () {
					var label = 'B0.0' + countForLiquidLabels;
					countForLiquidLabels += 253;
					return label;
				},
				step: 2,
				style: {
					color: '#666666'
				}
			},
		},
		yAxis: [{
			labels: {
				enabled: true,
				step: 4,
				overflow: 'justify',
				style: {
					color: '#666666'
				}
			},
			title: {
				enabled: false,
			},
			tickAmount: 10,
			minorTickLength: 0,
			max: 1600,
		}, {
			labels: {
				enabled: true,
				step: 4,
				overflow: 'justify',
				style: {
					color: '#666666'
				}
			},
			title: {
				enabled: false,
			},
			tickAmount: 10,
			minorTickLength: 0,
			max: 1600,
			linkedTo: 0,
			opposite: true
		}],
		tooltip: {
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: 'rgba(0,0,0,0)',
			borderRadius: 0,
			padding: 0,
			shared: true,
			shadow: false,
			useHTML: true,
			shape: "box",
			style: {
				color: '#ffffff',
				fontSize: 16
			},
			headerFormat: '<table class="portfolio">',
			pointFormat: "<tr><td>${point.y}.00</td></tr>",
			footerFormat: '</table>',
			positioner: function (labelWidth, labelHeight, point, ) {
				return {
					x: point.plotX,
					y: point.plotY - 50
				};
			}
		},
		plotOptions: {
			area: {
				stacking: 'normal',
				step: 'center',
				marker: {
					enabled: false,
					fillColor: '',
					lineWidth: 0,
					lineColor: null,
					symbol: 'url(' + location.href + 'img/svg/circle.svg)',
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [{
			name: "Graph 1",
			data: [1580, 1500, 1400, 1300, 1200, 1000, 600, 500, 400, 300, 300, 150, 100, 0,
				null, null, null, null, null, null, null, null, null, null, null, null, null, null
			],
			pointStart: Date.UTC(2018, 5, 17),
			pointInterval: 24 * 3600 * 1000,
			fillColor: {
				linearGradient: [0, 0, 0, 300],
				stops: [
					[0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.4).get('rgba')],
					[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
				]
			}
		}, {
			name: "Graph 2",
			data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null,
				0, 100, 200, 300, 400, 500, 600, 700, 800, 960, 1000, 1200, 1400, 1560
			],
			pointStart: Date.UTC(2018, 5, 17),
			pointInterval: 24 * 3600 * 1000,
			fillColor: {
				linearGradient: [0, 0, 0, 300],
				stops: [
					[0, Highcharts.Color('#e05475').setOpacity(0.4).get('rgba')],
					[1, Highcharts.Color('#e05475').setOpacity(0).get('rgba')]
				]
			},
			color: '#e05475'
		}]
	};

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
			mainChartObj.series.map(function (item) {
				if (item.type == 'areaspline')
					item.setOptions({
						color: lineColor
					});
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