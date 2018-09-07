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

var mainChartMarginLeft = -42;
var lineColor = '#00AAF8';
var blueColor = '#2190EA';
var redColor = '#CA0000';

if ($('body').hasClass('advanced')) {
	mainChartMarginLeft = 15;
	lineColor = '#00AAF8';
	blueColor = '#0082AF';
	redColor = '#750000';
}

// color for highlight graphs on hover
var gradientColor = [
	[0, Highcharts.Color(lineColor).setOpacity(0.4).get('rgba')],
	[1, Highcharts.Color(lineColor).setOpacity(0).get('rgba')]
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
		marginRight: -42,
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
			// pointWidth: $('#mainChart').width() / 110, // fixed A pixel value specifying
			pointPadding: 0,
			pointStart: Date.UTC(2018, 5, 17),
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
				symbol:'circle',
				radius:3,
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
		title: {
			text: ''
		},
		opposite: true,
		showLastLabel: false,
		showFirstLabel: false,
		labels: {
			enabled: false,
			align: 'right',
			x: -20,
			y: -20,
			step: 2,
			style: {
				fontSize: '10px'
			},
			formatter: function () {
				return (this.value + 8100) + '.00';
			}
		},
		tickInterval: 7,
		gridLineWidth: 0,
		max: 150
	},

	tooltip: {
		animation:false,
		hideDelay:0,
		backgroundColor: 'rgba(0,0,0,0)',
		borderColor: 'rgba(0,0,0,0)',
		borderRadius: 0,
		padding: 0,
		shared: true,
		shadow: false,
		useHTML: true,
		//shape: "box",
		//split: false,
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
			var TooltipValue = (this.y * 90).toFixed(2);
			var arrowDirection = 'right';
			TooltipValue = TooltipValue.slice(0, 1) + ',' + TooltipValue.slice(1);

 			var lineForMainChartX = this.points[0].point.plotX + $('#mainChart').offset().left + mainChartMarginLeft;
			var lineForMainChartY = this.points[0].point.plotY + $('#mainChart').offset().top;
			var lineForMainChartHeight = $('#mainChart').height() - this.points[0].point.plotY - 6;

			// right side fix
			if (lineForMainChartX > $('#mainChart').offset().left + $('#mainChart').width()){
				lineForMainChartX = -9999;
			}

			$('.lineForMainChart').css({
				'left': lineForMainChartX,
				'top': lineForMainChartY,
			});

			$('.lineForMainChart .line').css({
				'height': lineForMainChartHeight,
			});
			
			if (this.points[0].point.plotX < 220) {
				arrowDirection = 'left';
			}
			return '<div class="tooltip arrow_box mainTooltip ' + arrowDirection + '">' +
				"<div><span class='currencies bold'>ETH/USDT</span> (Binance): <span class='value bold'>" + TooltipValue + '</span></div>' +
				dayName + ', ' + month + ' ' + date.getDate() + ',' + year + ',04:02' + '</div>';
		},
		positioner: function (labelWidth, labelHeight, point, ) {
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
			data: [5, 20, 15, 35, 32, 14, 42, 57, 39, 42,
				14, 25, 10, 35, 47, 12, 28, 15, 55, 14,
				56, 46, 63, 78, 82, 92, 105, 78, 97, 48,
				66, 62, 55, 57, 90, 101, 98, 62, 85, 75,
				49, 52, 63, 71, 53, 59, 68, 47, 35, 63,
			],
			name: "Series 1",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 1,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [10, 12, 15, 25, 10, 20, 15, 37, 29, 34,
				24, 36, 41, 52, 51, 58, 39, 17, 33, 24,
				40, 25, 69, 47, 54, 73, 62, 43, 72, 64,
				74, 62, 61, 78, 80, 101, 93, 91, 86, 78,
				67, 61, 50, 42, 57, 65, 73, 82, 87, 81,
			],
			name: "Series 2",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 2,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [60, 55, 45, 38, 30, 40, 27, 31, 39, 45,
				34, 20, 15, 11, 17, 22, 18, 7, 10, 17,
				27, 35, 19, 17, 24, 33, 42, 33, 28, 22,
				30, 36, 29, 38, 40, 52, 48, 27, 55, 68,
				71, 52, 40, 42, 57, 26, 33, 37, 42, 38,
			],
			name: "Series 3",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 3,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [20, 24, 24, 26, 25, 27, 24, 28, 32, 34,
				37, 39, 31, 36, 38, 82, 85, 79, 80, 70,
				97, 94, 85, 56, 34, 66, 75, 77, 44, 36,
				38, 40, 44, 46, 45, 47, 44, 48, 52, 54,
				57, 59, 61, 66, 68, 70, 75, 79, 80, 80,
			],
			name: "Series 4",
			lineWidth: 3,
			color: lineColor,
 			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: gradientColor
			}, 
			id: 4,
			enableMouseTracking: true,
			trackByArea: true,
			zIndex: 10
		},
		{
			type: 'areaspline',
			data: [70, 75, 81, 85, 91, 90, 92, 87, 79, 82,
				94, 90, 108, 105, 101, 107, 108, 97, 109, 94,
				105, 115, 109, 107, 104, 113, 122, 113, 117, 102,
				94, 106, 116, 118, 120, 132, 118, 107, 95, 98,
				107, 109, 100, 97, 92, 95, 89, 87, 92, 94,
			],
			name: "Series 5",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 5,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [82, 80, 85, 85, 80, 79, 82, 87, 89, 91,
				83, 80, 78, 105, 117, 122, 131, 127, 106, 123,
				107, 115, 109, 127, 134, 123, 131, 140, 137, 122,
				119, 126, 128, 124, 130, 121, 124, 137, 135, 129,
				120, 129, 123, 122, 125, 125, 123, 132, 121, 128,
			],
			name: "Series 6",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 6,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [35, 42, 45, 65, 72, 75, 82, 87, 89, 92,
				94, 90, 90, 95, 87, 92, 98, 97, 100, 104,
				102, 105, 109, 107, 104, 113, 112, 113, 101, 112,
				104, 106, 106, 108, 110, 110, 108, 107, 105, 112,
				107, 109, 108, 102, 107, 115, 103, 107, 112, 108,
			],
			name: "Series 7",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 7,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [50, 60, 65, 71, 70, 73, 78, 87, 73, 72,
				64, 60, 60, 61, 64, 62, 68, 57, 50, 54,
				50, 52, 59, 57, 64, 63, 62, 58, 57, 53,
				64, 56, 52, 58, 63, 72, 68, 57, 61, 62,
				67, 62, 60, 72, 57, 56, 63, 67, 71, 73,
			],
			name: "Series 8",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 8,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [38, 40, 35, 45, 60, 70, 72, 77, 79, 62,
				44, 50, 50, 55, 57, 52, 38, 27, 60, 64,
				70, 75, 79, 87, 94, 103, 102, 53, 107, 62,
				64, 66, 66, 68, 100, 112, 98, 97, 95, 68,
				77, 79, 80, 82, 87, 85, 83, 87, 82, 88,
			],
			name: "Series 9",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 9,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [30, 37, 38, 32, 32, 37, 34, 38, 32, 34,
				37, 19, 13, 22, 18, 27, 29, 32, 20, 12,
				49, 58, 50, 58, 57, 58, 62, 42, 47, 44,
				25, 27, 28, 22, 42, 87, 84, 98, 102, 104,
				97, 99, 83, 42, 48, 47, 49, 62, 70, 72,
			],
			name: "Series 10",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 10,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [	64, 66, 66, 68, 100, 112, 98, 97, 95, 68,
				77, 79, 80, 82, 87, 85, 83, 87, 82, 88,
				83, 80, 78, 105, 117, 122, 131, 127, 106, 123,
				27, 24, 25, 26, 14, 55, 57, 52, 38, 27,
				54, 59, 60, 75, 77, 82, 83, 87, 82, 95,
			],
			name: "Series 11",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 11,
			enableMouseTracking: false,
		}, 
		{
			type: 'areaspline',
			data: [18, 20, 25, 29, 30, 20, 24, 25, 26, 14, 
				18, 27, 29, 32, 20, 42, 87, 84, 98, 22,
				25, 27, 28, 22, 42, 87, 84, 98, 102, 104,
				24, 36, 41, 52, 51, 58, 39, 17, 33, 24,
				40, 25, 69, 47, 54, 73, 62, 43, 72, 64,
			],
			name: "Series 12",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 12,
			enableMouseTracking: false,
		},
		{
			type: 'areaspline',
			data: [94, 106, 116, 118, 120, 132, 118, 107, 95, 98,
				107, 109, 100, 97, 92, 95, 89, 87, 92, 94,
				37, 49, 50, 52, 57, 65, 53, 67, 72, 58,
				107, 109, 100, 97, 92, 95, 89, 87, 92, 94,
				74, 62, 61, 78, 80, 101, 93, 91, 86, 78,
			],
			name: "Series 13",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 13,
			enableMouseTracking: false,
		},
		{
		type: 'areaspline',
			data: [22, 27, 15, 5, 12, 23, 32, 17, 32, 22,
				15, 21, 33, 15, 27, 42, 58, 37, 40, 44,
				50, 45, 39, 27, 24, 23, 32, 43, 17, 22,
				34, 46, 51, 48, 60, 72, 61, 57, 62, 48,
				37, 49, 50, 52, 57, 65, 53, 67, 72, 58,
			],
			name: "Series 14",
			lineWidth: 0.5,
			color: '#dbdbdb',
			id: 14,
			enableMouseTracking: false,
		},
		{
			type: 'column',
			color: blueColor,
			data: [12, 11, 8, 12, 6, 7, 5, 7, 7, 2,
				7, 9, 11, 6, 8, 2, 5, 9, 3, 2,
				5, 5, 8, 9, 2, 7, 22, 8, 2, 4,
				7, 4, 5, 6, 4, 6, 5, 7, 4, 3,
				4, 9, 13, 5, 14, 8, 19, 8, 14, 9,
			],
			name: "Series 5",
			id: 5,
			enableMouseTracking: false,
		},
		{
			type: 'column',
			color: redColor,
			data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
				6, 12, 9, 7, 5, 8, 7, 5, 9, 6,
				8, 9, 6, 8, 12, 5, 12, 12, 12, 14,
				17, 14, 8, 20, 21, 19, 19, 17, 23, 18,
				17, 21, 25, 22, 21, 19, 17, 14, 12, 16,
			],
			name: "Series 6",
			id: 6,
			enableMouseTracking: false,
		}
	]
});

$('#mainChart,#portfolioChartGeneral').mouseleave(function () {
 	$('.lineForMainChart').css(
		'left', '-9999px',
	);
});

$(window).resize(function () {
	$('.lineForMainChart').css(
		'left', '-9999px',
	);
});