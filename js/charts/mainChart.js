var date50 = new Date(Date.now() - 365 * 24 * 3600 * 1000);
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

var mainChartMarginLeft = 0;
var lineColor = '#01B067';
var blueColor = '#01B067';
var redColor = '#CE2424';

if ($('body').hasClass('advanced')) {
	mainChartMarginLeft = 15;
	lineColor = '#01B067';
	blueColor = '#01B067';
	redColor = '#CE2424';
}

// color for highlight graphs on hover
var gradientColor = [
	[0, Highcharts.Color(lineColor).setOpacity(0.4).get('rgba')],
	[1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
];

// series column data
var columnData = [
	[12, 11, 8, 12, 6, 7, 5, 7, 7, 2,
		7, 9, 11, 6, 8, 2, 5, 9, 3, 2,
		5, 5, 8, 9, 2, 7, 22, 8, 2, 4,
		7, 4, 5, 6, 4, 6, 5, 7, 4, 3,
		4, 9, 13, 5, 14, 8, 19, 8, 14, 9],
	[8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
		6, 12, 9, 7, 5, 8, 7, 5, 9, 6,
		8, 9, 6, 8, 12, 5, 12, 12, 12, 14,
		17, 14, 8, 20, 21, 19, 19, 17, 23, 18,
		17, 21, 25, 22, 21, 19, 17, 14, 12, 16],
	[18, 5, 21, 5, 6, 9, 15, 17, 17, 12,
		17, 19, 1, 16, 18, 12, 15, 19, 13, 12,
		15, 15, 18, 19, 12, 17, 2, 18, 12, 14,
		17, 14, 15, 16, 4, 6, 15, 7, 14, 3,
		4, 9, 13, 15, 14, 18, 19, 8, 4, 19],
	[5, 9, 16, 1, 6, 7, 19, 18, 19, 2,
		3, 9, 19, 17, 15, 13, 17, 15, 9, 6,
		18, 19, 16, 18, 2, 15, 2, 2, 2, 4,
		7, 4, 18, 10, 11, 9, 9, 7, 13, 8,
		17, 20, 14, 20, 21, 9, 7, 4, 2, 6],
	[15, 14, 11, 15, 9, 10, 8, 10, 10, 5,
		11, 13, 14, 9, 12, 6, 9, 12, 7, 6,
		4, 4, 7, 8, 1, 6, 21, 7, 1, 3,
		8, 5, 6, 7, 5, 7, 6, 9, 5, 4,
		6, 11, 15, 7, 12, 6, 17, 6, 12, 7],
	[5, 4, 3, 8, 13, 14, 6, 5, 6, 9,
		10, 16, 14, 11, 9, 12, 11, 9, 13, 10,
		15, 16, 13, 15, 19, 12, 19, 19, 19, 21,
		16, 13, 9, 19, 22, 18, 20, 16, 22, 17,
		15, 19, 23, 20, 25, 9, 15, 12, 10, 14],
	[24, 21, 17, 5, 8, 5, 11, 23, 19, 11,
		28, 16, 18, 21, 8, 28, 19, 24, 11, 13,
		11, 26, 9, 26, 12, 12, 4, 10, 7, 8,
		5, 13, 23, 29, 26, 3, 11, 13, 29, 18,
		12, 16, 16, 16, 19, 12, 23, 19, 5, 20],
	[9, 6, 13, 1, 10, 13, 17, 7, 21, 2,
		5, 15, 13, 10, 23, 9, 8, 22, 30, 22,
		15, 16, 10, 2, 13, 10, 25, 22, 1, 29,
		16, 27, 7, 6, 1, 20, 18, 12, 5, 13,
		22, 20, 5, 25, 4, 19, 20, 3, 15, 9],
	[5, 30, 4, 11, 13, 9, 28, 24, 14, 6,
		30, 22, 10, 26, 12, 24, 13, 15, 9, 14,
		24, 25, 26, 25, 5, 29, 25, 26, 18, 12,
		12, 10, 2, 10, 4, 5, 25, 20, 13, 2,
		14, 27, 16, 20, 2, 10, 6, 7, 27, 3],
	[30, 12, 10, 14, 20, 9, 14, 30, 26, 6,
		28, 13, 30, 29, 20, 21, 29, 15, 1, 29,
		27, 26, 23, 4, 19, 30, 12, 10, 19, 25,
		12, 28, 7, 10, 15, 6, 13, 7, 8, 12,
		28, 7, 16, 5, 3, 28, 13, 14, 9, 16],
	[4, 23, 17, 13, 21, 22, 14, 24, 6, 5,
		25, 8, 7, 10, 8, 1, 12, 5, 22, 20,
		14, 13, 7, 10, 5, 9, 15, 16, 8, 16,
		15, 14, 11, 11, 13, 23, 5, 25, 4, 16,
		11, 22, 9, 20, 6, 5, 14, 7, 24, 4],
	[24, 5, 1, 19, 17, 17, 9, 15, 25, 6,
		6, 11, 19, 7, 18, 6, 5, 25, 25, 10,
		2, 22, 22, 6, 4, 10, 21, 20, 20, 20,
		11, 24, 6, 25, 3, 2, 18, 7, 2, 10,
		5, 20, 24, 5, 1, 20, 25, 3, 24, 13],
	[1, 9, 11, 1, 15, 8, 5, 2, 16, 7,
		22, 11, 16, 5, 9, 13, 17, 16, 11, 7,
		25, 18, 2, 7, 19, 24, 9, 5, 7, 5,
		6, 9, 6, 2, 18, 25, 8, 24, 4, 9,
		18, 24, 12, 16, 24, 4, 7, 20, 18, 16],
	[6, 21, 19, 18, 14, 22, 25, 2, 5, 21,
		2, 17, 19, 9, 12, 19, 11, 11, 19, 10,
		21, 13, 4, 6, 24, 17, 17, 6, 3, 13,
		16, 15, 15, 18, 1, 12, 17, 18, 22, 17,
		6, 3, 18, 4, 3, 15, 4, 13, 4, 24],
	[9, 22, 15, 10, 6, 8, 13, 2, 5, 1,
		11, 13, 8, 8, 16, 22, 8, 14, 21, 11,
		4, 25, 4, 19, 7, 13, 11, 11, 21, 20,
		11, 15, 4, 25, 8, 5, 17, 6, 19, 20,
		6, 3, 23, 9, 3, 18, 9, 25, 4, 17],
	[7, 17, 18, 16, 10, 6, 19, 16, 18, 12,
		18, 6, 4, 18, 15, 19, 11, 18, 14, 13,
		18, 7, 14, 20, 16, 1, 2, 8, 20, 16,
		3, 1, 10, 12, 11, 12, 21, 20, 18, 15,
		24, 4, 9, 21, 9, 8, 17, 8, 17, 19]
];

// id of graph for highlight
var mainGraphHighlighted = 4;
var mainGraphHover = null;

var mainChartObj = Highcharts.chart('mainChart', {
	legend: {
		enabled: false
	},
	chart: {
		marginLeft: mainChartMarginLeft,
		marginBottom: 0,
		marginRight: -45,
		spacingTop: 0,
		spacingLeft: -22,
		spacingRight: -22,
		spacingBottom: 0,
		events: {
			/* 			click: function (event) {
							mainGraphHighlighted = mainGraphHover;
						} */
		}
	},
	title: null,
	plotOptions: {
		series: {
			//pointWidth: $('#mainChart').width() / 110, // fixed A pixel value specifying
			pointPadding: 0,
			pointStart: start_point,
			pointInterval: 24 * 3600 * 1000, // one day
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
			}
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
		gridLineWidth: 0
	},
	yAxis: {
		min: 0,
		endOnTick: false
	},

	tooltip: {
		animation: false,
		hideDelay: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		borderColor: 'rgba(0,0,0,0)',
		borderRadius: 0,
		padding: 0,
		shared: true,
		// split: true,
		shadow: false,
		useHTML: true,
		style: {
			color: '#ffffff',
			fontSize: 8
		},
		formatter: function () {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

			var date;
			if (!$('body').hasClass('advanced')) {
				date = new Date(this.x);
			}
			else {
				date = new Date(this.x + start_point);
			}
			var month = months[date.getMonth()];
			var dayName = days[date.getDay()];
			var year = date.getFullYear();
			var TooltipValue = this.y.toFixed(5);
			var arrowDirection = 'right';

			var lineForMainChartX = this.points[0].point.plotX + $('#mainChart').offset().left + mainChartMarginLeft;
			var lineForMainChartY = this.points[0].point.plotY + $('#mainChart').offset().top;
			var lineForMainChartHeight = $('#mainChart').height() - this.points[0].point.plotY - 6;

			// right side fix
			if (lineForMainChartX > $('#mainChart').offset().left + $('#mainChart').width()) {
				lineForMainChartX = -9999;
			}

			$('.lineForMainChart').css({
				'left': lineForMainChartX,
				'top': lineForMainChartY,
			});

			$('.lineForMainChart .line').css({
				'height': lineForMainChartHeight,
			});

			if (this.points[0].point.plotX < 205) {
				arrowDirection = 'left';
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
				 dayName + ', ' + month + ' ' + date.getDate() + ',' + year + ',04:02' + current_trader + '</div></div>';
		},
		positioner: function (labelWidth, labelHeight, point,) {
			//var graphWidth = $(mainChartObj.container).width();
			var xPos = point.plotX - labelWidth + mainChartMarginLeft - 15;
			// left side fix
			if (point.plotX < labelWidth + 40) {
				xPos = point.plotX + mainChartMarginLeft + 15;
			}
			return {
				x: xPos,
				y: point.plotY - 18
			};
		}
	},
	series: [{
		type: 'areaspline',
		//data: [0.00014209999999999998, 0.00014365, 0.0001516, 0.00015874999999999998, 0.00015455, 0.00016525, 0.00016544999999999998, 0.00015945, 0.00016865, 0.0001624, 0.0001596, 0.00015735, 0.0001476, 0.0001602, 0.00015405, 0.00016525, 0.00015434999999999998, 0.00015895, 0.0001537, 0.00015005, 0.00014994999999999999, 0.0001496, 0.0001436, 0.00014104999999999999, 0.00014340000000000002, 0.00014380000000000003, 0.00014350000000000002, 0.00013745, 0.000138, 0.00013875, 0.00013769999999999999, 0.0001594, 0.00015095, 0.0001602, 0.00016635, 0.00016125, 0.0001587, 0.00016375, 0.00015925, 0.00014565, 0.00015465, 0.0001496, 0.0001544, 0.0001663, 0.000154, 0.00015690000000000002, 0.00015015, 0.00014365, 0.00015045, 0.00014780000000000001, 0.0001529],
		name: 'Series 4',
		lineWidth: 3,
		color: lineColor,
		fillColor: {
			linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
			stops: gradientColor
		},
		id: 4,
		enableMouseTracking: true,
		trackByArea: true,
	}]
});

$('#mainChart').mouseleave(function () {
	$('.lineForMainChart').css(
		'left', '-9999px',
	);
	$(this).find('.mainTooltip').hide();
});

$(window).resize(function () {
	$('.lineForMainChart').css(
		'left', '-9999px',
	);
});
