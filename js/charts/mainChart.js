// var date50 = new Date(Date.now() - 365 * 24 * 3600 * 1000);
// var start_point = Date.UTC(date50.getFullYear(), date50.getMonth(), date50.getDate());
var range_intervals = [
	60 * 1000,
	5 * 60 * 1000,
	15 * 60 * 1000,
	3600 * 1000,
	6 * 3600 * 1000,
	24 * 3600 * 1000
]
var limit = 140;

var date50 = new Date(Date.now() - limit * range_intervals[3]);
var start_point = Date.UTC(date50.getFullYear(), date50.getMonth(), date50.getDate());

function redrawMainChart() {
	/* 	 	 var chartParent = $('.b-graph__controls');
			 $(chartParent).css('width', '100%');
		 	 var chartParentWidth = parseInt($(chartParent).width());
		 	 if ($('#js-graph-prices').hasClass('open')) {
		 	 	chartParentWidth -= 160;
		 	 }
		 	$(chartParent).css('width', chartParentWidth);  */
	mainChartObj.reflow();
}

// var mainChartMarginLeft = 0;
var mainChartSpacingTop = 90;
var lineColor = '#00A9F7';
var blueColor = '#00A9F7';
var redColor = '#CE2424';

if ($('body').hasClass('advanced')) {
	// mainChartMarginLeft = 15;
	lineColor = '#01B067';
	blueColor = '#01B067';
	redColor = '#CE2424';
}

// color for highlight graphs on hover
var gradientColor = [
	[0, Highcharts.Color(lineColor).setOpacity(0.4).get('rgba')],
	[1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
];

// id of graph for highlight
var mainGraphHighlighted = 1;
var mainGraphHover = null;

var hightChartUpdateOptions = {
	//	var mainChartObj = Highcharts.chart('mainChart', {
	legend: {
		enabled: false
	},
	chart: {
		marginLeft: 0,
		marginBottom: 0,
		marginRight: 0,
		marginLeft: 0,
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
			//pointWidth: $('#mainChart').width() / 110, // fixed A pixel value specifying
			pointPadding: 0.15,
			pointStart: start_point,
			pointInterval: range_intervals[3], // one hour
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
			events: {
				mouseOver: function (event) {
					// if (this.type == 'areaspline') {
					// 	mainChartObj.series.map(function (graph) {
					// 		if (graph.type == 'areaspline') {
					// 			if (graph.options.fillColor.linearGradient.y2 > 5) {
					// 				graph.update({
					// 					fillColor: {
					// 						linearGradient: [0, 0, 0, 1],
					// 					},
					// 					color: $('.dark-theme').length ? '#4F6C82' : '#BFC0C0'
					// 				});
					// 			}
					// 		}
					// 	});
					// 	// highlight hover graph
					// 	this.update({
					// 		fillColor: {
					// 			linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
					// 		},
					// 		color: '#0576B9',
					// 		lineWidth: this.options.lineWidth,
					// 	}, );
					// 	// set id of current graph ( for change theme)
					// 	mainGraphHover = this.options.id;
					// }
				},
				click: function (event) {
					//mainGraphHighlighted = this.options.id;
				},
				mouseOut: function (event) {
					// if (this.type == 'areaspline') {
					// 	// find highlighted chart and remove highlight
					// 	mainChartObj.series.map(function (graph) {
					// 		if (graph.type == 'areaspline') {
					// 			if (graph.options.fillColor.linearGradient.y2 > 5) {
					// 				graph.update({
					// 					fillColor: {
					// 						linearGradient: [0, 0, 0, 1],
					// 					},
					// 					color: $('.dark-theme').length ? '#4F6C82' : '#BFC0C0'
					// 				});
					// 			}
					// 			if (graph.options.id == mainGraphHighlighted) {
					// 				graph.update({
					// 					fillColor: {
					// 						linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
					// 					},
					// 					color: '#0576B9'
					// 				});
					// 			}
					// 		}
					// 	});
					// }
				},
			},
		},
		column: {
			events: {
				mouseOver: function (event) {
					//console.log('column over',event);
				},
				mouseOut: function (event) {
					//console.log('column out');
				}
			},
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

			var lineForMainChartX = this.points[0].point.plotX + $('#mainChart').offset().left;
			var lineForMainChartY = $('#mainChart').offset().top + mainChartSpacingTop + 10 + 35 - 50;
			var lineForMainChartHeight = this.points[0].point.plotY - 24 - 35 + 50;
			var lineForPortfolioChartY = this.points[0].point.plotY - 44 + 50;

			// right side fix
			if (lineForMainChartX > $('#mainChart').offset().left + $('#mainChart').width()) {
				lineForMainChartX = -9999;
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

			// if (this.points[0].point.plotX < 205) {
			// 	arrowDirection = 'left';
			// }

			if (this.points[0].point.plotX < 100 || this.points[0].point.plotX > $('#mainChart').width() - 110) {
				arrowDirection = '';
			}

			var currency_send = $('.exch-dropdown__current > p > span')[0].innerText;
			var currency_get = $('.exch-dropdown__current > p > span')[1].innerText;
			var current_trader = '';
			if ($('.graph-prices__list .graph-prices__item.active .graph-prices__trader').length > 0) {
				current_trader = $('.graph-prices__list .graph-prices__item.active .graph-prices__trader').html().trim();
				current_trader = ' (' + current_trader + ')';
			}

			return '<div class="tooltip font10 arrow_box mainTooltip ' + arrowDirection + '">' +
				'<div class=\'textCenter\'><span class=\'currencies font12 bold\'>' + currency_send + '/' + currency_get + '</span> : <span class=\'value font12 bold\'>' + TooltipValue + '</span></div> <div class="gray">' +
				dayName + ', ' + month + ' ' + date.getDate() + ',' + year + ',' + ("0" + date.getHours()).slice(-2) + ':00 ' + current_trader + ' </div></div > ';
		},
		positioner: function (labelWidth, labelHeight, point, ) {
			var graphWidth = $(mainChartObj.container).width();
			var xPos = point.plotX - (labelWidth / 2);
			// right side fix
			if ((point.plotX + labelWidth / 2 + 10) > graphWidth) {
				xPos = graphWidth - labelWidth - 20;
			}
			// left side fix
			else if (point.plotX < 100) {
				xPos = 12;
			}
			return {
				x: xPos,
				y: 10 + mainChartSpacingTop - 50
			};
		}
	},
	series: [{
			type: 'areaspline',
			//data: [0.00014209999999999998, 0.00014365, 0.0001516, 0.00015874999999999998, 0.00015455, 0.00016525, 0.00016544999999999998, 0.00015945, 0.00016865, 0.0001624, 0.0001596, 0.00015735, 0.0001476, 0.0001602, 0.00015405, 0.00016525, 0.00015434999999999998, 0.00015895, 0.0001537, 0.00015005, 0.00014994999999999999, 0.0001496, 0.0001436, 0.00014104999999999999, 0.00014340000000000002, 0.00014380000000000003, 0.00014350000000000002, 0.00013745, 0.000138, 0.00013875, 0.00013769999999999999, 0.0001594, 0.00015095, 0.0001602, 0.00016635, 0.00016125, 0.0001587, 0.00016375, 0.00015925, 0.00014565, 0.00015465, 0.0001496, 0.0001544, 0.0001663, 0.000154, 0.00015690000000000002, 0.00015015, 0.00014365, 0.00015045, 0.00014780000000000001, 0.0001529],
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
			//data: [0.00014209999999999998, 0.00014365, 0.0001516, 0.00015874999999999998, 0.00015455, 0.00016525, 0.00016544999999999998, 0.00015945, 0.00016865, 0.0001624, 0.0001596, 0.00015735, 0.0001476, 0.0001602, 0.00015405, 0.00016525, 0.00015434999999999998, 0.00015895, 0.0001537, 0.00015005, 0.00014994999999999999, 0.0001496, 0.0001436, 0.00014104999999999999, 0.00014340000000000002, 0.00014380000000000003, 0.00014350000000000002, 0.00013745, 0.000138, 0.00013875, 0.00013769999999999999, 0.0001594, 0.00015095, 0.0001602, 0.00016635, 0.00016125, 0.0001587, 0.00016375, 0.00015925, 0.00014565, 0.00015465, 0.0001496, 0.0001544, 0.0001663, 0.000154, 0.00015690000000000002, 0.00015015, 0.00014365, 0.00015045, 0.00014780000000000001, 0.0001529],
			name: 'Series Column',
			id: 8,
			enableMouseTracking: false,
			trackByArea: false,
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
					var correctIndexes = [50,15,15,4,1,0.5];
					return avg * 20 * correctIndexes[$('.graph-range-slider__control').val()]
				},
				forced: true,
				units: [
					[
						'minute',
						[1, 5, 15]
					], [
						'hour',
						[1, 6]
					], [
						'day',
						[1]
					], [
						'week',
						[1]
					]
				]
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

$(window).resize(function () {
	$('.lineForMainChart').css(
		'left', '-9999px',
	);
});