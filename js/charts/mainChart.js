
	function redrawMainChart(correction) {
		var chartParent = $('.b-graph__chart');
		$(chartParent).css('width','100%');
		var chartParentWidth = parseInt($(chartParent).width());
		if ($('#js-graph-prices').hasClass('open')) {
			chartParentWidth -= 280;
		}
		$(chartParent).css('width', chartParentWidth);
		mainChartObj.setSize(chartParentWidth - 45, mainChartObj.chartHeight, false);
	}

	// color for highlight graphs on hover
	var gradientColor = [
	    [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.8).get('rgba')],
	    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	];

	// id of graph for highlight
	var mainGraphHighlighted = 2;
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
	            pointWidth: 5,
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
	                stops: gradientColor
	            },
	            states: {
	                hover: {
	                    lineWidth: 3,
	                }
	            },
	            events: {
	                mouseOver: function (event) {
	                    if (this.type == 'areaspline') {
	                        // find highlighted chart and remove highlight
	                        mainChartObj.series.map(function (graph) {
	                            if (graph.type == 'areaspline') {
	                                if (graph.options.fillColor.linearGradient.y2 > 5) {
	                                    graph.update({
	                                        fillColor: {
	                                            linearGradient: [0, 0, 0, 1],
	                                        },
	                                        color: $('.dark-theme').length ? '#4F6C82' : '#BFC0C0'
	                                    });
	                                }
	                            }
	                        });
	                        // highlight hover graph
	                        this.update({
	                            fillColor: {
	                                linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
	                            },
	                            color: '#0576B9'
	                        }, );
	                        // set id of current graph ( for change theme)
	                        mainGraphHighlighted = this.options.id;
	                    }
	                },
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
	            name: "Series 1",
	            id: 1
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
	            name: "Series 2",
	            fillColor: {
	                linearGradient: [0, 0, 0, $('#mainChart').height() - 100],
	                stops: [
	                    [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.8).get('rgba')],
	                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                ]
	            },
	            id: 2
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
	            name: "Series 3",
	            id: 3
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
	            name: "Series 4",
	            id: 4
	        },
	        {
	            type: 'column',
	            color: '#0089CB',
	            data: [12, 11, 8, 12, 6, 7, 5, 7, 7, 2,
	                7, 9, 11, 6, 8, 2, 5, 9, 3, 2,
	                5, 5, 8, 9, 2, 7, 22, 8, 2, 4,
	                7, 4, 5, 6, 4, 6, 5, 7, 4, 3,
	                4, 9, 26, 5, 27, 8, 38, 8, 28, 9,
	                11, 19, 11, 16, 18,
	            ],
	            name: "Series 5",
	            id: 5
	        },
	        {
	            type: 'column',
	            color: '#0089CB',
	            data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
	                6, 12, 9, 7, 5, 8, 7, 5, 9, 6,
	                8, 9, 6, 8, 12, 5, 12, 12, 12, 14,
	                17, 14, 8, 30, 25, 28, 19, 33, 47, 18,
	                34, 21, 35, 22, 37, 28, 36, 24, 18, 31,
	                13, 7, 6, 4, 8,
	            ],
	            name: "Series 6",
	            id: 6
	        },
	        {
	            type: 'column',
	            color: '#E05475',
	            data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
	                6, 12, 9, 7, 5, 8, 17, 5, 9, 6,
	                8, 9, 16, 18, 12, 15, 12, 12, 12, 14,
	                17, 14, 8, 3, 25, 40, 35, 30, 37, 45,
	                40, 46, 44, 52, 47, 60, 6, 4, 8, 11,
	                13, 7, 6, 4, 8,
	            ],
	            name: "Series 7",
	            id: 7
	        },
	        {
	            type: 'column',
	            color: '#E05475',
	            data: [8, 7, 6, 11, 16, 17, 9, 8, 9, 12,
	                6, 12, 9, 7, 5, 8, 7, 15, 9, 6,
	                8, 9, 6, 18, 12, 15, 12, 12, 12, 14,
	                17, 14, 8, 3, 15, 28, 29, 33, 27, 38,
	                14, 31, 25, 42, 27, 18, 16, 14, 8, 11,
	                13, 7, 6, 24, 10,
	            ],
	            name: "Series 8",
	            id: 8
	        }
	    ]
	});