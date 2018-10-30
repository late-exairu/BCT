var range_options = [
	{
	 label: '1H',
	 endpoint: 'histominute',
	 aggregate: 1,
	 limit: 120,
	 interval: 60000
	},
	{
	 label: '1D',
	 endpoint: 'histominute',
	 aggregate: 12,
	 limit: 120,
	 interval: 720000
	},
	{
	 label: '1W',
	 endpoint: 'histohour',
	 aggregate: 2,
	 limit: 110,
	 interval: 7200000
	},
	{
	 label: '1M',
	 endpoint: 'histohour',
	 aggregate: 6,
	 limit: 124,
	 interval: 21600000
	},
	{
	 label: '1Y',
	 endpoint: 'histoday',
	 aggregate: 3,
	 limit: 122,
	 interval: 259200000
	},
]

var range_index = 4; // default graph - 1 Year.

var date50 = new Date(Date.now() - range_options[range_index].interval * range_options[range_index].limit);
var start_point = Date.UTC(date50.getFullYear(), date50.getMonth(), date50.getDate());

// variables for range slider
var gDataTwoHour = new Array(),
	gDataDay = new Array(),
	gDataWeek = new Array(),
	gDataMonth = new Array(),
	gDataYear = new Array()
// ======================

function redrawMainChart() {
	mainChartObj.reflow();
}

// var mainChartMarginLeft = 0;
var mainChartSpacingTop = 90;
var lineColor = '#01B067';
var blueColor = '#01B067';
var redColor = '#CE2424';
var mainChartMarginLeft = 0;

// color for highlight graphs on hover
var gradientColor = [
	[0, Highcharts.Color(lineColor).setOpacity(0.4).get('rgba')],
	[1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
];

// id of graph for highlight
var mainGraphHighlighted = 1;
var mainGraphHover = null;

var hightChartUpdateOptions = {
	legend: {
		enabled: false
	},
	chart: {
		marginLeft: mainChartMarginLeft,
		marginBottom: 0,
		marginRight: 0,
		spacingTop: mainChartSpacingTop
	},
	title: null,
	rangeSelector: {
		enabled: false,
		inputEnabled: false,
		labelStyle: {
			visibility: 'hidden'
		},

	},
	navigator: {
		enabled: false
	},
	scrollbar: {
		enabled: false
	},
	plotOptions: {
		series: {
			turboThreshold: 10000,
			pointWidth: $('.b-graph #mainChart').width() > 800 ? 5 : 4,
			pointPadding: 0,
			pointStart: start_point,
			pointInterval: range_options[range_index].interval,
			pointPlacement: 'on',
			borderWidth: 0,
			groupPadding: 0,
			lineWidth: 0.6,
			stickyTracking: false,
			trackByArea: true,
			marker: {
				enabled: false,
				fillColor: '#FFFFFF',
				lineWidth: 1,
				lineColor: null,
				symbol: 'circle',
				radius: 3,
				/* 				fillColor: '',
								lineWidth: 0,
								width: 0,
								lineColor: null,
								symbol: 'url(' + location.href.substring(0, location.href.lastIndexOf("/") + 1) + 'img/svg/circle.svg)', */
				states: {
					hover: {
						enabled: false
					}
				}
			},
			states: {
				hover: {
					halo: {
						opacity: 0
					}
				}
			},

			dataGrouping: {
				approximation: function (currentGroup) {
					var sum = 0;
					for (var i = 0; i < currentGroup.length; i++) {
						sum += currentGroup[i]; //don't forget to add the base
					}
					var avg = (sum / currentGroup.length);

					return avg;
				},
				forced: true,
				units: [
					[
						'minute',
						[1, 12]
					],
					[
						'hour',
						[2, 6]
					],
					[
						'day',
						[3]
					]
				],
			}
		},
		areaspline: {
			color: '#BFC0C0',
			lineWidth: 1,
			fillColor: {
				linearGradient: [0, 0, 0, 1],
				stops: gradientColor
			},
			states: {
				hover: {
					enabled: true,
					lineWidth: 3
				}
			},
			enableMouseTracking: false,
			trackByArea: false,
		},
		column: {
			pointPadding: 0,
			borderWidth: 0,
			groupPadding: 0
		}
	},
	xAxis: {
		type: 'datetime',
		dateTimeLabelFormats: {
			month: '%e. %b',
			year: '%b'
		},
		crosshair: {
			width: 0,
			color: '#2B569A'
		},
		labels: {
			enabled: false,
			step: 5,
			style: {
				width: '35px',
				fontSize: '10px'
			},
			x: 50
		},
		tickLength: 0,
		gridLineWidth: 0,
		minPadding: 0,
		maxPadding: 0
	},
	yAxis: {
		min: 0,
		endOnTick: false,
		tickLength: 0,
		gridLineWidth: 0,
		labels: {
			enabled: false,
		},
	},

	tooltip: {
		animation: false,
		hideDelay: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		borderColor: 'rgba(0,0,0,0)',
		borderRadius: 0,
		padding: 0,
		shared: true,
		split: false,
		shadow: false,
		useHTML: true,
		shape: "box",
		style: {
			color: '#ffffff',
			fontSize: 8
		},
		formatter: function () {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

			var date = new Date(this.x);
			var month = months[date.getMonth()];
			var dayName = days[date.getDay()];
			var year = date.getFullYear();
			var TooltipValue = this.y.toFixed(5);
			var arrowDirection = 'bottom';

			var lineForMainChartX = this.points[0].point.plotX + $('#mainChart').offset().left + mainChartMarginLeft;
			var lineForMainChartY = $('#mainChart').offset().top + mainChartSpacingTop + 10 + 35 - 50;
			var lineForMainChartHeight = this.points[0].point.plotY - 24 - 35 + 50;
			var lineForPortfolioChartY = this.points[0].point.plotY - 44 + 50;

			// right side fix
			if (lineForMainChartX > $('#mainChart').offset().left + $('#mainChart').width()) {
				lineForMainChartX = -9999;
			}

			if (this.points[0].point.plotX < 100) {
				arrowDirection = 'left';
				lineForMainChartY -= 24;
				lineForMainChartHeight += 24;
				lineForPortfolioChartY += 24;
			} else if (this.points[0].point.plotX + mainChartMarginLeft + 82 + 10 > $('#mainChart').width()) {
				arrowDirection = 'right';
				lineForMainChartY -= 24;
				lineForMainChartHeight += 24;
				lineForPortfolioChartY += 24;
			}

			$('.lineForMainChart').css({
				'left': lineForMainChartX,
				'top': lineForMainChartY,
			});

			$('.lineForMainChart .circle').css({
				'top': lineForPortfolioChartY,
			});

			$('.lineForMainChart .line').css({
				'height': lineForMainChartHeight,
			});

			var currency_send = $('.exch-dropdown__current > p > span')[0].innerText;
			var currency_get = $('.exch-dropdown__current > p > span')[1].innerText;
			var current_trader = '';
			if ($('.graph-prices__list .graph-prices__item.active .graph-prices__trader').length > 0) {
				current_trader = $('.graph-prices__list .graph-prices__item.active .graph-prices__trader').html().trim();
				current_trader = ' (' + current_trader + ')';
			}

			return '<div class="tooltip font10 arrow_box mainTooltip ' + arrowDirection + '">' +
				'<div class=\'textCenter\'><span class=\'currencies font12 bold\'>' + currency_send + '/' + currency_get + '</span> : <span class=\'value font12 bold\'>' + TooltipValue + '</span></div> <div class="gray">' +
				dayName + ', ' + month + ' ' + date.getDate() + ',' + year + ',' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + current_trader + ' </div></div > ';
		},
		positioner: function (labelWidth, labelHeight, point, ) {
			var graphWidth = $(mainChartObj.container).width();
			var xPos = point.plotX - (labelWidth / 2) + mainChartMarginLeft;
			// right side fix
			if ((point.plotX + (labelWidth / 2) + mainChartMarginLeft + 10) > graphWidth) {
				xPos -= labelWidth / 2 + 10;
			}
			// left side fix
			else if (point.plotX < 100) {
				xPos += labelWidth / 2 + 10;
			}
			return {
				x: xPos,
				y: 10 + mainChartSpacingTop - 50
			};
		}
	},
	series: [{
			type: 'areaspline',
			//data: [],
			name: 'Series Spline',
			lineWidth: 2,
			color: lineColor,
			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: gradientColor
			},
			id: 1,
			enableMouseTracking: true,
			trackByArea: true,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 2',
			id: 2,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 3',
			id: 3,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 4',
			id: 4,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 5',
			id: 5,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 6',
			id: 6,
		},
		{
			type: 'areaspline',
			name: 'Series Spline 7',
			id: 7,
		},
		{
			type: 'column',
			//data: [],
			name: 'Series Column',
			id: 8,
			enableMouseTracking: false,
			trackByArea: false,
			zIndex: 11,
			dataGrouping: {
				approximation: function (currentGroup) {
					var sum = 0;
					for (var i = 0; i < currentGroup.length; i++) {
						sum += currentGroup[i]; //don't forget to add the base
					}
					var avg = (sum / currentGroup.length);

					// set green color by default
					this.dataGroupInfo.options = {
						color: '#01b067'
					};
					// set red color
					if (avg < 0) {
						this.dataGroupInfo.options = {
							color: redColor
						};
						avg *= -1;
					}

					var current_range = $('.graph-info__range__current').html();

					var gData;
					switch (current_range) {
						case '1H':
							gData = gDataTwoHour;
							break;
						case '1D':
							gData = gDataDay;
							break;
						case '1W':
							gData = gDataWeek;
							break;
						case '1M':
							gData = gDataMonth;
							break;
						case '1Y':
							gData = gDataYear;
							break;
					}

					var exchanger = mainGraphHighlighted - 1

					var y_min = gData[exchanger].min - (gData[exchanger].max - gData[exchanger].min) * 0.3;
					if (y_min < 0) y_min = 0;
					var y_max = gData[exchanger].max + (gData[exchanger].max - gData[exchanger].min) * 0.15;
					var diff = y_min + (y_max - y_min) * 0.25 * avg / gData[exchanger].diffs_max;

					return diff;
				},
				forced: true,
				units: [
					[
						'minute',
						[1, 12]
					],
					[
						'hour',
						[2, 6]
					],
					[
						'day',
						[3]
					]
				],
			},
		},
	]
}

var mainChartObj = Highcharts.stockChart('mainChart', hightChartUpdateOptions);

$('#mainChart').mouseleave(function () {
	$('.lineForMainChart').css(
		'left', '-9999px',
	);
	$(this).find('.mainTooltip').hide();
});
$('#mainChart .highcharts-series').mouseleave(function () {
	$('#mainChart').find('.mainTooltip').css("visibility", "visible");
});

$(window).resize(
	throttle(() => {
		$('.lineForMainChart').css(
			'left', '-9999px',
		);
		if ($('body').hasClass('advanced') && $(window).height() > 900) {
			mainChartObj.update({
				plotOptions: {
					series: {
						pointWidth: $('.b-graph #mainChart').width() > 800 ? 5 : 4
					}
				}
			});
		} else if ($('body').hasClass('advanced')) {
			mainChartObj.update({
				plotOptions: {
					series: {
						pointWidth: $('.b-graph #mainChart').width() > 800 ? 5 : 4
					}
				}
			});
		}
	}, 100)
);

function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
