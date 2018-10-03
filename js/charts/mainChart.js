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

// var mainChartMarginLeft = 0;
var mainChartSpacingTop = 40;
var lineColor = '#01B067';
var blueColor = '#01B067';
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
var mainGraphHighlighted = 4;
var mainGraphHover = null;

var mainChartObj = Highcharts.stockChart('mainChart', {
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
			turboThreshold : 10000,
			//pointWidth: $('#mainChart').width() / 110, // fixed A pixel value specifying
			pointPadding: 0.05,
			pointStart: start_point,
			//pointInterval: 24 * 3600 * 1000, // one day
			pointInterval: 3600 * 1000, // one hour
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
			fillColor: {
				linearGradient: [0, 0, 0, 1],
				stops: gradientColor
			},
			states: {
				hover: {
					enabled: true,
					lineWidth: 2
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
			},
			pointPadding: 0.05,
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

			var date = new Date(this.x);
			var month = months[date.getMonth()];
			var dayName = days[date.getDay()];
			var year = date.getFullYear();
			var TooltipValue = this.y.toFixed(5);
			var arrowDirection = 'right';

			var lineForMainChartX = this.points[0].point.plotX + $('#mainChart').offset().left;
			var lineForMainChartY = this.points[0].point.plotY + $('#mainChart').offset().top + mainChartSpacingTop;
			var lineForMainChartHeight = $('#mainChart').height() - this.points[0].point.plotY - 6 - mainChartSpacingTop;

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
				dayName + ', ' + month + ' ' + date.getDate() + ',' + year + ',' + ("0" + date.getHours()).slice(-2) + ':00 ' + current_trader + ' </div></div > ';
		},
		positioner: function (labelWidth, labelHeight, point, ) {
			//var graphWidth = $(mainChartObj.container).width();
			var xPos = point.plotX - labelWidth - 15;
			// left side fix
			if (point.plotX <= 205) {
				xPos = point.plotX + 15;
				$('.mainTooltip').removeClass('right').addClass('left');
			}
			return {
				x: xPos,
				y: point.plotY - 18 + mainChartSpacingTop
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
			id: 4,
			enableMouseTracking: true,
			trackByArea: true,
		},
		{
			type: 'column',
			//data: [0.00014209999999999998, 0.00014365, 0.0001516, 0.00015874999999999998, 0.00015455, 0.00016525, 0.00016544999999999998, 0.00015945, 0.00016865, 0.0001624, 0.0001596, 0.00015735, 0.0001476, 0.0001602, 0.00015405, 0.00016525, 0.00015434999999999998, 0.00015895, 0.0001537, 0.00015005, 0.00014994999999999999, 0.0001496, 0.0001436, 0.00014104999999999999, 0.00014340000000000002, 0.00014380000000000003, 0.00014350000000000002, 0.00013745, 0.000138, 0.00013875, 0.00013769999999999999, 0.0001594, 0.00015095, 0.0001602, 0.00016635, 0.00016125, 0.0001587, 0.00016375, 0.00015925, 0.00014565, 0.00015465, 0.0001496, 0.0001544, 0.0001663, 0.000154, 0.00015690000000000002, 0.00015015, 0.00014365, 0.00015045, 0.00014780000000000001, 0.0001529],
			name: 'Series Column',
			id: 5,
			enableMouseTracking: false,
			trackByArea: false,
		}
	]
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