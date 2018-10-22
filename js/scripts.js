$(function () {

	// add 1 second delay for show all charts and set right view mode
	setTimeout(() => {
		$('body').addClass('loaded');
	}, 1000);

	var svgArrowTemplate = '<svg class="basic-table__arrow-conv" role="img" aria-hidden="true"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#arrow-right-2"></use> </svg>';
	const minDate = Date.UTC(date50.getFullYear(), date50.getMonth(), date50.getDate());
	const maxDate = Date.now();
	$("#try_password_challenge").click((e) => {
		e.preventDefault()
		if ($("#bctpassword").val() == "octoberlive!") {
			$("#login_overlay").hide()
			setCookie("logged_in", "true", "30"); //stay logged in for a month
		} else {
			alert("Wrong password. Please ask your manager for a new one")
		}
	})

	function setTelegramData() {
		if (localStorage.getItem('telegramAuth') == 'true' && localStorage.getItem('telegramFirstName') && localStorage.getItem('telegramLastName')) {
			if (document.querySelector('.telegram-login-btn'))
				document.querySelector('.telegram-login-btn').classList.add('hidden');

			if (document.querySelector('#telegramText'))
				document.querySelector('#telegramText').classList.add('hidden');

			if (document.querySelector('.chats-search')){
				document.querySelector('.chats-search').classList.remove('hidden');
				//document.querySelector('.chats-search button').classList.remove('hidden');
			}

			if (document.querySelector('.chats-list'))
				document.querySelector('.chats-list').classList.remove('hidden');

			if (document.querySelector('.chat-head__back')) {
				//document.querySelector('.chat-head__back').classList.remove('hidden');
				document.querySelector('.chat-head__desc').classList.remove('hidden');
				document.querySelector('.chat-head__btns').classList.remove('hidden');
			}
			if (document.querySelector('.chat-talk')) {
				$('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').animate({
					scrollTop: $('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').height()
				}, "rapid");
				document.querySelector('.chat-talk').classList.remove('hidden');
			}

			if (localStorage.getItem('telegramPhoto')) {
				if (document.querySelector('.message-bar__user-pic .user-pic__avatar')) {
					//document.querySelector('.user-portfolio .user-pic__avatar').setAttribute('src', localStorage.getItem('telegramPhoto'));
					document.querySelector('.message-bar__user-pic .user-pic__avatar').setAttribute('src', localStorage.getItem('telegramPhoto'));
				}
			} else {
				if (document.querySelector('.message-bar__user-pic')) {
					//document.querySelector('.user-portfolio .user-pic__avatar').classList.add('hidden');
					document.querySelector('.message-bar__user-pic .user-pic__avatar').classList.add('hidden');
					var avatarAbbr = document.createElement('div');
					avatarAbbr.classList.add('user-pic__avatar');
					avatarAbbr.textContent = localStorage.getItem('telegramFirstName')[0] + localStorage.getItem('telegramLastName')[0];
					avatarAbbr.style.borderRadius = '50%';
					avatarAbbr.style.background = '#0088cc';
					avatarAbbr.style.fontSize = '19px';
					document.querySelector('.message-bar__user-pic').appendChild(avatarAbbr);
				}
			}

			// if (localStorage.getItem('telegramFirstName') && localStorage.getItem('telegramLastName') && document.querySelector('.user-portfolio .user-portfolio__name'))
			// 	document.querySelector('.user-portfolio .user-portfolio__name').textContent = localStorage.getItem('telegramFirstName') + ' ' + localStorage.getItem('telegramLastName');

			if (localStorage.getItem('telegramFirstName') && localStorage.getItem('telegramLastName')) {
				$('button[title="USERNAME"]').attr('title', localStorage.getItem('telegramFirstName') + ' ' + localStorage.getItem('telegramLastName'));
			} else {
				$('button[title="USERNAME"]').attr('title', '');
			}

		} else {
			localStorage.removeItem('telegramAuth');
			localStorage.removeItem('telegramFirstName');
			localStorage.removeItem('telegramLastName');
		}
	}


	function getRandomNumber(low, high, isFloat = false) {
		if (isFloat)
			return Math.random() * (high - low) + low;
		else
			return Math.floor(Math.random() * (high - low + 1)) + low;
	}


	function setViewMode(mode) {
		// advanced mode
		if(mode == 'advanced'){
			$('#mainChart, .graph-top').addClass('hidden');

			$('#tradingview_1d00a, .tradingview-widget-container').css('height','100%');

			$('.tradingview-widget-container').removeClass('hidden');
			if ($(window).width() > 1900){
				$('#telegram').addClass('--short');
				$('#orderBook,.chat-head__back').removeClass('hidden');
				$('.main-cols__left').addClass('advanced-mode');
				$('#telegramMenu').removeClass('open');
			}
			else{
				$('#telegram').addClass('hidden');
				$('#orderBook').removeClass('hidden');
			}
		}
		// basic mode
		else{
			$('#mainChart, .graph-top').removeClass('hidden');
			$('.tradingview-widget-container').addClass('hidden');
			if ($(window).width() > 1900){
				$('#telegram').removeClass('--short');
				$('#orderBook,.chat-head__back').addClass('hidden');
				$('.main-cols__left').removeClass('advanced-mode');
				$('#telegramOverlay').removeClass('open');
			}
			else{
				$('#telegram').removeClass('hidden').addClass('--short');
				$('.chat-head__back').removeClass('hidden');
				$('#orderBook').addClass('hidden');
				mainChartObj.reflow();
			}
		}
	}

	setTelegramData();

	setViewMode('basic');

	// updateMainChartSplineNew(null, 'USDT', 'BTC');
	updateMainChart(null, 'BTC', 'USDT');
	/* Cubic slider for Orders */
	var $cubicSlider = $(".js-cubic-slider");

	$cubicSlider.ionRangeSlider({
		type: "single",
		hide_min_max: true,
		grid: true,
		from: 50,
		grid_snap: false
	});

	$(window).click(function () {
		if ($('ul.graph-info__range__list').hasClass('open')) {
			$('ul.graph-info__range__list').css('border-bottom', '0px');
			$('div.graph-info__range').css('border', '0px');
			$('ul.graph-info__range__list').removeClass('open');
			$('div.graph-info__range__current').removeClass('open');
			$('div.graph-info__range__current').css('border', 'solid 1px var(--clr-separatorD)');
		}
		if ($('ul.menu-dropdown').hasClass('open')) {
			$('ul.menu-dropdown').removeClass('open');
		}
	});

	$('.basic-table__row .smallCurrencyChart').hover(function (e) {
		if ($(this).parents('.disabled').length == 0) {
			if ($(this.nextElementSibling).find('> div').length == 2) {
				$(this.nextElementSibling).find(' > div').last().remove();
			}
			var chartStart = $(this.nextElementSibling).attr('data-chart-start');
			var chartEnd = $(this.nextElementSibling).attr('data-chart-end');
			var key = $(this).closest('.basic-table__row').attr('data-currency');
			var changeInDollars = (ownWallet[key] * chartEnd) - (ownWallet[key] * chartStart);

			// green color by default
			var classColor = 'clr-green';
			var sign = '+';

			// red color
			if (changeInDollars < 0) {
				classColor = 'clr-darkRed';
				sign = '-';
			}

			var smallChartInfoStringForHover = '<div class="hidden">$' + numberWithCommas(eachBalance[key].toFixed(2)) + '<br><span class="smaller ' + classColor + '">' + sign + numberWithCommas(Math.abs(changeInDollars.toFixed(2))) + ' $</span></div>';
			$(this.nextElementSibling).append(smallChartInfoStringForHover);
			$(this.nextElementSibling).find(' > div').toggleClass('hidden');
		}
	}, function () {
		if ($(this).parents('.disabled').length == 0) {
			if ($(this.nextElementSibling).find('> div').length == 2) {
				$(this.nextElementSibling).find(' > div').removeClass('hidden').last().remove();
			}
		}
	});

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

	$('.global-history-drop .menu-dropdown__item').click(function (e) {
		e.stopPropagation();
		$('.global-history-drop span').html($(this).text());
		$('.global-history-drop .menu-dropdown__item').removeClass('active');
		$(this).addClass('active');
		if ($(this).text().trim() == 'All') {
			$('#panel-funds-orders .all').removeClass('hidden');
		} else {
			$('#panel-funds-orders .all').addClass('hidden');
		}
	});

	$('.main-cols__right-top .exch-dropdown .exch-dropdown__border').click(function name() {
		$('.main-cols__right-top .exch-dropdown').removeClass('open');
		$(this).parent().addClass('open');
	});

	$('body').click(function (event) {
		$('.main-cols__right-top .exch-dropdown').removeClass('open');

		// $('ul.portfolio-graph-range__list').css('border-bottom', '0px');
		// $('div.portfolio-graph-range').css('border', '0px');
		// $('ul.portfolio-graph-range__list').removeClass('open');
		// $('div.portfolio-graph-range__current').css('border', 'solid 1px');

		$('.exch-dropdown .exch-search').addClass('hidden');
		$('.exch-dropdown .exch-dropdown__current').removeClass('hidden');
	});

	$('.exch-search .exch-dropdown__hangle').click(function (event) {
		event.stopPropagation();
		$(this.previousElementSibling).val('').trigger('keyup');
	});


	$('.main-cols__right-top .exch-dropdown').click(function (event) {
		event.stopPropagation();
		// $('ul.portfolio-graph-range__list').css('border-bottom', '0px');
		// $('div.portfolio-graph-range').css('border', '0px');
		// $('ul.portfolio-graph-range__list').removeClass('open');
		// $('div.portfolio-graph-range__current').css('border', 'solid 1px');
	});


	$('div.portfolio-graph-range').click(function (event) {
		event.stopPropagation();
		$('.main-cols__right-top .exch-dropdown').removeClass('open');
	});

	$('.exch-search__input').keyup(function () {
		var counter = 0;
		var searchString = $(this).val().toUpperCase();
		if (searchString.trim() != '') {
			$(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__list-title').addClass('hidden');
		} else {
			$(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__list-title').removeClass('hidden');
		}
		$(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__item').each(function (index, item) {
			// show all
			$(item).removeClass('hidden');
			// remove old span tags
			$(item).find('.exch-dropdown__title').text($(item).find('.exch-dropdown__title').text().replace(/<[^>]+>/g, ''));
			if (searchString.trim() != '') {
				// if item not contain searchString
				if ($(item).find('.exch-dropdown__title').text().toUpperCase().indexOf(searchString) == -1) {
					$(item).addClass('hidden');
				}
				// if contain
				else {
					counter++;
					var searchStringGlobal = new RegExp(searchString, "g");
					// add span tags for highlight
					var newTextValue = $(item).find('.exch-dropdown__title').text().toUpperCase().replace(searchStringGlobal, '<span>' + searchString + '</span>')
					$(item).find('.exch-dropdown__title').html(newTextValue);
				}
			}
		});
		if (counter < 9 && searchString.trim() != '') {
			$(this).closest('.exch-dropdown').find('.exch-dropdown__list').css('height', 'auto');
		} else {
			$(this).closest('.exch-dropdown').find('.exch-dropdown__list').css('height', '372px');
		}

	});

	$('.send-form .send-dropdown__hangle').click(function () {
		$('.send-form__line.inline, .send-form__dropdown__list').toggleClass('hidden');
	});

	var progressbar = $(".send-popup .send-popup__progressbar").progressbar({
		value: false,
		change: function () {
			//progressLabel.text( progressbar.progressbar( "value" ) + "%" );
		},
		complete: function () {
			//progressLabel.text( "Complete!" );
		}
	});

	function sendFormProgress() {
		var val = $(".send-popup .send-popup__progressbar").progressbar("value") || 0;
		$(".send-popup .send-popup__progressbar").progressbar("value", val + 0.2);
		if (val < 99.8) {
			setTimeout(sendFormProgress, 48);
		} else {
			$(".send-popup .send-popup__progressbar").trigger('completed')
		}
	}

	$('.send-form__btn').click(function () {
		$(".send-popup .send-popup__progressbar").removeClass('hidden');
		$(this).addClass('inactive');
		sendFormProgress();
	});


	$(".send-popup .send-popup__progressbar").on('completed', () => {
		$(".send-popup .send-popup__progressbar").progressbar("value", 0);
		$(".send-popup .send-popup__progressbar").addClass('hidden');
		$(".send-form__btn span.in-progress, .send-form__btn span.done").toggleClass('hidden');
		$(".send-form .send-dropdown__hangle, .send-form .send-form__check").toggleClass('hidden');
	});

	var currenciesDropDownScrollbar = $('.exch-dropdown__scroll.scrollbar-right');
	var select_item_index = 0;
	var dropdown_list;
	$('.main-cols__right-top .exch-dropdown .exch-dropdown__current').click(function () {
		$(this).addClass('hidden');
		$(this).parent().find('.exch-search').removeClass('hidden').find('input').focus();
		dropdown_list = $(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__item:not(.hidden)');
		dropdown_list.each(function name(index, item) {
			if ($(item).hasClass('current')) select_item_index = index;
			if ($(item).hasClass('select')) $(item).removeClass('select');
		});
		var current_item_pos = dropdown_list.eq(select_item_index).position().top;
		if (current_item_pos > 400 || current_item_pos < 0) {
			currenciesDropDownScrollbar.scrollTop(45 * (select_item_index + 1));
		}
	});

	$('.exch-search__input').keydown(function (e) {
		var current_item_pos = dropdown_list.eq(select_item_index).position().top;
		if (current_item_pos > 400 || current_item_pos < 0) {
			currenciesDropDownScrollbar.scrollTop(45 * (select_item_index + 1));
		}
		if (e.which === 40) {
			if (current_item_pos + 45 > 400) {
				currenciesDropDownScrollbar.animate({
					scrollTop: '+=45'
				}, 0);
				var next = dropdown_list.eq(select_item_index).next();
				if (next[0].innerHTML == "All") {
					currenciesDropDownScrollbar.animate({
						scrollTop: '+=45'
					}, 0);
				}
			}
			if (select_item_index < dropdown_list.length - 1) {
				dropdown_list.eq(select_item_index).removeClass('select');
				select_item_index++;
				liSelected = dropdown_list.eq(select_item_index).addClass('select');
			}
		} else if (e.which === 38) {
			if (current_item_pos - 45 < 0) {
				currenciesDropDownScrollbar.animate({
					scrollTop: '-=45'
				}, 0);
				var prev = dropdown_list.eq(select_item_index).prev();
				if (prev[0].innerHTML == "All") {
					currenciesDropDownScrollbar.animate({
						scrollTop: '-=45'
					}, 0);
				}
			}
			if (select_item_index > 0) {
				dropdown_list.eq(select_item_index).removeClass('select');
				select_item_index--;
				if (select_item_index < 0) {
					$(this).closest('.exch-dropdown').find('.exch-dropdown__current').removeClass('hidden');
					$(this).closest('.exch-dropdown').find('.exch-search').addClass('hidden');
					$(this).closest('.exch-dropdown').removeClass('open');
				} else {
					liSelected = dropdown_list.eq(select_item_index).addClass('select');
				}
			} else {
				dropdown_list.eq(select_item_index).removeClass('select');
				$(this).closest('.exch-dropdown').find('.exch-dropdown__current').removeClass('hidden');
				$(this).closest('.exch-dropdown').find('.exch-search').addClass('hidden');
				$(this).closest('.exch-dropdown').removeClass('open');
			}
		} else if (e.which === 13) {
			if (select_item_index) {
				dropdown_list.eq(select_item_index).trigger("click");
			} else {
				$(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__item:not(.hidden)').eq(0).trigger('click');
			}
		}
	});

	/*---------------------------------------------------*/

	$('input[placeholder], textarea[placeholder]').placeholder();

	/*---------------------------------------------------*/
	/* js-select currency */
	/*---------------------------------------------------*/

	$('.exch-dropdown__list').on('click', '.exch-dropdown__item', function (event, param) {
		var currencyName = $(this).attr('data-name');
		var telegramGroupName = $(this).attr('data-telegram');
		var currencyAbbr = $(this).attr('data-currency');

		if (!currenciesPrice[currencyAbbr]) {
			$.ajax({
				url: 'https://min-api.cryptocompare.com/data/price?fsym=' + currencyAbbr + '&tsyms=USD',
				async: false,
				success: function (data) {
					currenciesPrice[currencyAbbr] = +data['USD'].toFixed(2);
				},
			});
		}

		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).html('<span>' + currencyAbbr + '</span><br> ' + currencyName);
		var currDropdown = $(this).closest('.exch-dropdown');
		currDropdown.find('.exch-dropdown__item').removeClass('current');
		$(this).addClass('current');
		$(currDropdown).find('.exch-dropdown__current > svg, .exch-dropdown__current > p').remove();
		$(newCurr).insertBefore($(currDropdown).find('.exch-dropdown__hangle').eq(0));
		var firstColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(0).css('fill');
		var secondColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(1).css('fill');
		$(".exch-head").get(0).style.setProperty("--color-one", firstColor);
		$(".exch-head").get(0).style.setProperty("--color-two", secondColor);

		$(this).closest('.exch-dropdown').find('.exch-dropdown__current').removeClass('hidden');
		$(this).closest('.exch-dropdown').find('.exch-search').addClass('hidden');

		// first currency
		if (telegramGroupName) {
			if ($('#telegramText').hasClass('hidden') && ($(this).index() == 1 || $(this).index() == 2)) {
				$('.chat-talk').addClass('hidden');
				$('.chat-talk').eq($(this).index() - 1).removeClass('hidden');
				$('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').animate({
					scrollTop: $('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').height()
				}, "rapid");
			}
			$('.chat-head__name').text(telegramGroupName);
			$('.exch-form__send > input').attr('data-currency', currencyAbbr);
			$('.exch-form__send .exch-form__curr').html(`<p>` + currencyAbbr + `<span><br>YOU HAVE</span></p>`);
			$('.chat-head__name').css('color', firstColor);

			// change currency in Orders Form
			$('.order-form__submit.btn-green').html('BUY ' + currencyAbbr);
			$('.order-form__submit.btn-red').html('SELL ' + currencyAbbr);

			// scroll to current currency in wallet
			var positionTop = $('#panel-funds-wallet .basic-table__row[data-currency="' + currencyAbbr + '"]').position().top;
			var scrolledPosition = $('#panel-funds-wallet .basic-table .basic-table').scrollTop();
			$('#panel-funds-wallet .basic-table .basic-table').scrollTop(scrolledPosition + positionTop);

			// hide the same element in another dropdown
			$('.exch-head__get .exch-dropdown__item').removeClass('sameDropdownItem');
			$('.exch-head__get .exch-dropdown__item[data-currency="' + currencyAbbr + '"]').last().addClass('sameDropdownItem');

			// check wallet
			if (ownWallet[currencyAbbr]) {
				$('.exch-head__btn').prop('disabled', false);
			} else {
				$('.exch-head__btn').prop('disabled', true);
			}
		}
		// second currency
		else {
			$('.exch-form__get input').attr('data-currency', currencyAbbr);
			$('.exch-form__get .exch-form__curr').html(`<p>` + currencyAbbr + `<span><br>YOU GET</span></p>`);

			// hide the same element in another dropdown
			$('.exch-head__send .exch-dropdown__item').removeClass('sameDropdownItem');
			$('.exch-head__send .exch-dropdown__item[data-currency="' + currencyAbbr + '"]').last().addClass('sameDropdownItem');
		}

		$(this).closest('.exch-dropdown').removeClass('open');

		var getCurrency = $('.exch-form__get > input').attr('data-currency');
		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var exchange = $('.graph-prices .graph-prices__list .graph-prices__item.active .graph-prices__trader').text().trim();

		if ($('body').hasClass('advanced')) {
			// change the global table header
			$('.global-order').find('.basic-table__row.head .basic-table__col').eq(0).html('Price (' + getCurrency + ')');
			$('.global-order').find('.basic-table__row.head .basic-table__col').eq(4).html('Price (' + getCurrency + ')');
			$('.global-order').find('.basic-table__row.head .basic-table__col').eq(1).html('Amount (' + sendCurrency + ')');
			$('.global-order').find('.basic-table__row.head .basic-table__col').eq(5).html('Amount (' + sendCurrency + ')');
		}

		if (sendCurrency == getCurrency) {
			$('.exch-head__get .exch-dropdown__item:not([data-currency="' + sendCurrency + '"])').eq(0).trigger('click', param);
			return false;
		}
		if (param != 'noRedraw')
			updateMainChart(exchange, sendCurrency, getCurrency);
		//updateMainChartSplineNew(exchange, sendCurrency, getCurrency);

		var priceRate = currenciesPrice[getCurrency] / currenciesPrice[sendCurrency];

		var priceRateBackward = 1 / priceRate;
		var liquidityInfo = priceRateBackward.toFixed(6);
		if (priceRateBackward > 1) {
			priceRateBackward = priceRateBackward.toFixed(2);
			priceRateBackward = numberWithCommas(priceRateBackward);
		} else {
			priceRateBackward = priceRateBackward.toFixed(5);
		}
		$('.graph-info__title').first().find('span:first').html('1 ' + sendCurrency);
		$('.graph-info__title').first().find('span:last').html(' ' + priceRateBackward + ' ' + getCurrency);

		// change the median price
		$('.median-price').html(priceRateBackward + ' <span>' + getCurrency + '</span>');
		
		$('.liquidityText .centerPart .centerPart__info p').html(liquidityInfo);
		
		priceRateBackward = priceRateBackward.replace(/\,/g, "");
		// update global tables
		$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body .basic-table__row').each(function (i, row) {
			var rand = (priceRateBackward == 0) ? 0 : getRandomNumber(parseFloat(priceRateBackward), parseFloat(priceRateBackward) * 1.2, true);
			$(row).children().first().html(priceRateBackward > 1 ? numberWithCommas(rand.toFixed(2)) : rand.toFixed(5));
		});

		$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).find('.basic-table__row').each(function (i, row) {
			var rand = getRandomNumber(parseFloat(priceRateBackward) / 2, parseFloat(priceRateBackward), true);
			$(row).children().first().html(priceRateBackward > 1 ? numberWithCommas(rand.toFixed(2)) : rand.toFixed(5));
		});

		$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body .basic-table__row').each(function (i, row) {
			var rand;
			if ($(row).children().first().hasClass('clr-red')) {
				rand = (priceRateBackward == 0) ? 0 : getRandomNumber(parseFloat(priceRateBackward), parseFloat(priceRateBackward) * 1.2, true);
			} else {
				rand = getRandomNumber(parseFloat(priceRateBackward) / 2, parseFloat(priceRateBackward), true);
			}
			$(row).children().first().html(priceRateBackward > 1 ? numberWithCommas(rand.toFixed(2)) : rand.toFixed(5));
		});

		updatePriceListItem(sendCurrency, getCurrency);
	});

	/*---------------------------------------------------*/
	/* js-scrollbar-outer */
	/*---------------------------------------------------*/
	$('.scrollbar-right').scrollbar();

	$('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').animate({
		scrollTop: $('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').height()
	}, "rapid");

	$('.graph-prices  .scrollbar-right').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true,
		"onScroll": function (y, x) {
			if (y.scroll >= y.maxScroll - 10) {
				$('.graph-prices__scrollup').show();

				$('.graph-prices__scrollup__btn').show();
				$('.graph-prices__scrolldown__btn').hide();
			} else if (y.scroll > 0 && y.scroll < y.maxScroll) {
				$('.graph-prices__scrollup').show();

				$('.graph-prices__scrollup__btn').show();
				$('.graph-prices__scrolldown__btn').show();
			} else {
				$('.graph-prices__scrollup').hide();

				$('.graph-prices__scrollup__btn').hide();
				$('.graph-prices__scrolldown__btn').show();
			}
		}
	});

	$('.exch-dropdown__list .scrollbar-right').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true,
		"onScroll": function (y, x) {
			if (y.scroll > 0 && y.scroll < y.maxScroll) {
				$(this.wrapper[0].parentElement).children('.exch-dropdown__scrollup').show();
			} else {
				$(this.wrapper[0].parentElement).children('.exch-dropdown__scrollup').hide();
			}
		}
	});

	$('.circleDiagramParent .basic-table.scrollbar-right').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true,
		"onScroll": function (y, x) {
			if (y.scroll > 0 && y.scroll < y.maxScroll) {
				$('.basic-table__scrollup').show();
			} else {
				$('.basic-table__scrollup').hide();
			}
		}
	});


	$('#panel-funds-orders .basic-table__body.scrollbar-right').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true,
		"onScroll": function (y, x) {
			$('.basic-table__orders-scrollup').show();
			if (y.scroll > 0) {
				$('.basic-table__orders-scrollup').show();
			} else {
				$('.basic-table__orders-scrollup').hide();
			}
		}
	});

	$('#user-btn').on('click', function () {
		$('body').toggleClass('menubar-in');
	});


	/*---------------------------------------------------*/
	/* Scroll up/down event for graph prices */
	/*---------------------------------------------------*/
	var graphPricesScrollbar = $('.graph-prices .scroll-wrapper > .scroll-content');
	$(".graph-prices__scrollup__btn").on("click", function () {
		graphPricesScrollbar.animate({
			scrollTop: '-=200'
		}, "slow");
	});

	$(".graph-prices__scrolldown__btn").on("click", function () {
		graphPricesScrollbar.animate({
			scrollTop: '+=200'
		}, "slow");
	});


	$(".graph-prices__scrollup").on("click", function () {
		graphPricesScrollbar.animate({
			scrollTop: '0'
		}, "rapid");
	});


	$(".basic-table__scrollup").on("click", function () {
		$('.circleDiagramParent .basic-table.scrollbar-right.scroll-wrapper > .scroll-content').animate({
			scrollTop: '0'
		}, "rapid");
	});

	$(".basic-table__orders-scrollup").on("click", function () {
		$('#panel-funds-orders .basic-table__body.scrollbar-right.scroll-wrapper > .scroll-content').animate({
			scrollTop: '0'
		}, "rapid");
	});
	
	$(".exch-dropdown__scrollup").on("click", function () {
		$(this).parents('.exch-dropdown__list').find('.scrollbar-right.scroll-wrapper > .scroll-content').animate({
			scrollTop: '0'
		}, "rapid");
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

	$('.b-graph .c-block').mousemove(function (e) {
		var x = e.pageX - $('.b-graph').offset().left;
		if ($('.b-graph').width() - x < 10) {
			if (!$('.graph-prices').hasClass('open')) {
				$('.graph-prices').addClass('open');
				$('#mainChart').css('width', 'calc(100% + 6px)');
				$('.b-graph__controls').addClass('shifted');
				$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
				redrawMainChart();
			}
		} else {
			if ($('.b-graph').width() - x > 300) {
				if ($('.graph-prices').hasClass('open') && !$('.graph-prices').hasClass('noClose')) {
					$('.graph-prices').removeClass('open');
					$('#mainChart').css('width', 'calc(100% - 4px)');
					$('.b-graph__controls').removeClass('shifted');
					$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
					redrawMainChart();
					// reset prices scroll
					$('.scrollbar-arrows').scrollTop(0);
				}
			}
		}
	});


	$('body').mousemove(function (e) {
		if ((e.pageY < $('.b-graph').offset().top || e.pageY > $('.b-graph').offset().top + $('.b-graph').height()) && !$('.graph-prices').hasClass('noClose')) {
			$('.graph-prices').removeClass('open');
			$('#mainChart').css('width', 'calc(100% - 4px)');
			$('.b-graph__controls').removeClass('shifted');
			$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
			redrawMainChart();
		} else if (e.pageX > $('.b-graph').offset().left + $('.b-graph').width() && !$('.graph-prices').hasClass('noClose') && !$('.graph-prices').hasClass('open')) {
			$('.graph-prices').addClass('open');
			$('#mainChart').css('width', 'calc(100% + 6px)');
			$('.b-graph__controls').addClass('shifted');
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
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

	$('#orders .c-block-head ul li').click(function () {
		$('#orders .c-block-head ul li').removeClass('current');
		$(this).addClass('current');
		var currentIndex = $(this).index();
		$('#orders .forms-wrap').removeClass('current');
		$('#orders .forms-wrap').eq(currentIndex).addClass('current');
	});

	/*---------------------------------------------------*/
	/* ADVANCED account-js-menu */
	/*---------------------------------------------------*/

	// $('.advanced .accounts-diagram-wrap').click(function () {
	// 	$('.main-cols__right-bottom .portfolio-menu__item').eq(2).trigger('click');
	// });

	$('.advanced .js-account-stats .portfolio-drop .menu-dropdown .menu-dropdown__item').on('click', function (event) {
		event.stopPropagation();
		$('.js-account-stats .portfolio-drop .menu-dropdown .menu-dropdown__item').removeClass('active');
		$(this).addClass('active');

		$('.advanced .js-account-stats .c-block-head__title').text($(this).text());
		if ($(this).children('button').text() == 'Advanced') {
			$('.advanced .js-account-stats .portfolio-drop').css('top', '2px');
		}
		else {
			$('.advanced .js-account-stats .portfolio-drop').css('top', '14px');
		}

		$('.js-tabs-panel').removeClass('active');
		$('.js-tabs-panel').eq($(this).index()).addClass('active');

		// Wallet tab
		if ($(this).index() == 0) {
			drawCircleChart();
		}

		// Portfolio tab
		if ($(this).index() == 1) {
			if (!portfolioChartObj)
				portfolioChartObj = Highcharts.stockChart('portfolioChartGeneral', portfolioChartOptions);
		}

		// Advanced
		if ($(this).index() == 3) {
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
			setViewMode('advanced');
		} else {
			setViewMode('basic');
		}
	});


	/*---------------------------------------------------*/
	/* functions for zoomin, zoomout of liquid graph */
	/*---------------------------------------------------*/
	$('.js-tabs-panel .liquidityText .centerPart div.zoom-button').click(function () {
		var current_Xmin = liquidityChartObj.xAxis[0].min;
		var current_Xmax = liquidityChartObj.xAxis[0].max;
		var current_Xrange = current_Xmax - current_Xmin;

		var current_center = (current_Xmin + current_Xmax) / 2;
		if ($(this).index() == 2) {
			if (current_Xrange <= 24 * 3600 * 1000 * 3) return false;
			var new_Xmin = current_center - current_Xrange / 3;
			var new_Xmax = current_center + current_Xrange / 3;
			liquidityChartOptions.xAxis.min = new_Xmin;
			liquidityChartOptions.xAxis.max = new_Xmax;
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		} else if ($(this).index() == 0) {
			if (current_Xrange >= 24 * 3600 * 1000 * 90) return false;
			var new_Xmin = current_center - current_Xrange * 2 / 3;
			var new_Xmax = current_center + current_Xrange * 2 / 3;
			liquidityChartOptions.xAxis.min = new_Xmin;
			liquidityChartOptions.xAxis.max = new_Xmax;
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		}
	});

	/*---------------------------------------------------*/
	/* functions for change theme */
	/*---------------------------------------------------*/

	// $('#switch-theme').change(function () {
	// 	var darkTheme = $('#switch-theme:checked').length;
	// 	if (darkTheme) {
	// 		$('body').addClass('dark-theme');
	// 	} else {
	// 		$('body').removeClass('dark-theme');
	// 	}
	// 	changeTheme();
	// });

	function changeTheme() {
		if ($('body').hasClass('dark-theme')) {
			var backColor = '#18202d';
			var gridColor = '#24425b';
			var labelColor = '#9BA6B2';
			var lineColor = '#344756';
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

		if (portfolioChartObj) portfolioChartObj.update(stylesForPortfolioChart);

		// liquidityChart
		var stylesForLiquidityChart = {
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
						var inactiveLinecolor = index < 4 ? lineColor : 'rgba(0, 0, 0, 0)';
						item.setOptions({
							color: inactiveLinecolor,
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
	var isSelectedPrevConversion = false;

	$('.basic-table').on('click', '.basic-table__row:not(.head)', function () {
		$(this).parent().find('.basic-table__row').removeClass('active');
		$(this).addClass('active');

		var price = $(this)[0].children[0].innerText;
		price = price.replace(/,/g, '');
		var amount = $(this)[0].children[1].innerText;

		// show order form
		if ($(this).parents('#orderBook').length) {
			$('#orders').css('display', 'flex');
			$('.btn-table-toggle').addClass('open');
			calculateHeightOfFirstTable();
			$('#orders .forms-wrap .order-form__input.amount').val(amount);
			$('#orders .forms-wrap .order-form__input.price').val(price);
		}

		if ($(this).parents('#panel-funds-history').length) {
			$('.graph-prices').addClass('open');
			$('#mainChart').css('width', 'calc(100% + 6px)');
			$('.b-graph__controls').addClass('shifted');
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
			redrawMainChart();
			var convertedText = $(this).find('.basic-table__col').eq(1).html();
			convertedText = convertedText.replace(/\s\s+/g, ' ');
			var convertedArr = convertedText.split(svgArrowTemplate);
			var firstCurrency = convertedArr[0].trim().slice(-3);
			var secondCurrency = convertedArr[1].trim().slice(-3);
			$('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + firstCurrency + '"]').trigger('click');
			$('.exch-head__get .exch-dropdown__list .exch-dropdown__item[data-currency="' + secondCurrency + '"]').trigger('click');
			$('.exch-form__send > input').val(numberWithCommas(convertedArr[0].trim().slice(0, -4)));
			$('.exch-form__get > input').val(numberWithCommas(convertedArr[1].trim().slice(0, -4)));
			isSelectedPrevConversion = true;

			// show exchanges of previous conversion
			var remain_total_value = convertedArr[1].trim().slice(0, -4).replace(/,/g, '');
			// $('.icon-trader').addClass('hidden');
			$('.graph-prices__item .progress-label').css({
				'visibility': 'visible',
				'width': '102%'
			});
			$('.progressbar').removeClass('hidden');
			for (var i = 0; i < progressbar_array.length; i++) {
				var progressbar = progressbar_array[i];
				progressbar.progressbar("value", 100);
				var rand = 0;
				if (i == progressbar_array.length - 1) {
					rand = Math.floor(remain_total_value * 100) / 100;
				} else {
					var conversion_part = remain_total_value / (progressbar_array.length - i);
					rand = Math.floor(Math.random() * 2 * conversion_part * 100) / 100;
					if (remain_total_value > 0.01 && rand == 0) rand = 0.01;
					remain_total_value -= rand;
				}
				if (rand == 0) rand = "0.00";
				progressbar_labels[i].text(rand + ' ' + secondCurrency);
			}
			// end show exchanges
		}

	});

	/*---------------------------------------------------*/
	/* chat events */
	/*---------------------------------------------------*/

	// $('.chat-head__back').click(function () {
	// 	$('.main-cols__left-top .d-flex .c-block__col').toggleClass('hidden');
	// });

	$('.chats-list__item').click(function () {
		if (localStorage.getItem('telegramAuth') == 'true'){
			var chatName = $(this).find('.chats-list__name').text();
			$('.chat-head__name').text(chatName);
			$('.chat-talk').toggleClass('hidden');
			$('#telegram .scrollbar-right.scroll-wrapper > .scroll-content').eq(1).animate({
				scrollTop: $('#telegram .chat-talk:not(.hidden').eq(0).height()
			}, "rapid");
			closeTelegramMenu();

			// check show or hide input
			if ($(this).find('.chats-list__send').length) {
				$('.message-bar:not(.telegram-login-btn)').removeClass('hidden');
			} else {
				$('.message-bar:not(.telegram-login-btn)').addClass('hidden');
			}
		}
	});

	/*---------------------------------------------------*/
	/* Graph prices list */
	/*---------------------------------------------------*/

	var mainChartFirstColor = lineColor;
	var mainChartSecondColor = '#dbdbdb';
	var mainChartColorForHidden = 'rgba(0, 0, 0, 0)';

	if ($('body').hasClass('dark-theme')) {
		mainChartSecondColor = '#344756';
	}

	$('.graph-prices .graph-prices__list .graph-prices__item').click(function () {
		$('.graph-prices__list .graph-prices__item').removeClass('active');
		$(this).addClass('active');
		var currentDataId = parseInt($(this).attr('data-id'));
		updateMainChartSpline(currentDataId);
	});

	function updateMainChart(exchange, sendCurrency, getCurrency) {

		for (var i = 0; i < range_options.length; i++) {
			var url = `https://min-api.cryptocompare.com/data/${range_options[i].endpoint}?fsym=${sendCurrency}&tsym=${getCurrency}&aggregate=${range_options[i].aggregate}&limit=${range_options[i].limit}`;

			// Get Main Chart graph data with a hour interval
			$.ajax({
				url: url,
				success: function (data) {
					var grapArr = [];
					var columnArr = [];
					var fakeGraphs = [
						[],
						[],
						[],
						[],
						[],
						[]
					];
					var fakeGraphdiffs = [
						[],
						[],
						[],
						[],
						[],
						[]
					];

					var gData;
					var range_index = 4;
					var isRedraw = false;
					var current_range = $('.graph-info__range__current').html();
					if ((data.TimeTo - data.TimeFrom) * 1000 / data.Data.length <= 1.2 * range_options[0].interval) {
						gDataTwoHour = [];
						gData = gDataTwoHour;
						range_index = 0;
						if (current_range == '1H') isRedraw = true;
						//console.log('gDataTwoHour');
					} else if ((data.TimeTo - data.TimeFrom) * 1000 / data.Data.length <= 1.2 * range_options[1].interval) {
						gDataDay = [];
						gData = gDataDay;
						range_index = 1;
						if (current_range == '1D') isRedraw = true;
						//console.log('gDataDay');
					} else if ((data.TimeTo - data.TimeFrom) * 1000 / data.Data.length <= 1.2 * range_options[2].interval) {
						gDataWeek = [];
						gData = gDataWeek;
						range_index = 2;
						if (current_range == '1W') isRedraw = true;
						//console.log('gDataWeek');
					} else if ((data.TimeTo - data.TimeFrom) * 1000 / data.Data.length <= 1.2 * range_options[3].interval) {
						gDataMonth = [];
						gData = gDataMonth;
						range_index = 3;
						if (current_range == '1M') isRedraw = true;
						//console.log('gDataMonth');
					} else if ((data.TimeTo - data.TimeFrom) * 1000 / data.Data.length <= 1.2 * range_options[4].interval) {
						gDataYear = [];
						gData = gDataYear;
						range_index = 4;
						if (current_range == '1Y') isRedraw = true;
						//console.log('gDataYear');
					}

					var prev_value = [null, null, null, null, null, null];

					var initial = (data.Data[0].open + data.Data[0].close) / 2;
					var max = initial,
						min = initial,
						diff_max = 0;
					var random_maxes = [initial, initial, initial, initial, initial, initial];
					var random_mins = [initial, initial, initial, initial, initial, initial];
					var random_diff_maxes = [0, 0, 0, 0, 0, 0];

					data.Data.map(s => {
						var value = (s.open + s.close) / 2;
						var difference = s.close - s.open;
						grapArr.push(value);
						columnArr.push(difference);

						if (max < value) max = value;
						if (min > value) min = value;
						if (diff_max < Math.abs(difference)) diff_max = Math.abs(difference);

						for (var k = 0; k < 6; k++) {
							if (prev_value[k] == null) prev_value[k] = value * (Math.random() * (0.92 - 1.08) + 1.08);
							var random = Math.pow(Math.random(), 15) * Math.pow(-1, Math.floor(Math.random() * 10))
							var valueForFake = value * (1 + (0.001 + 0.002 * Math.pow(range_index, 3)) * random);
							var diff = valueForFake - prev_value[k];

							fakeGraphs[k].push(valueForFake);
							fakeGraphdiffs[k].push(diff);
							prev_value[k] = valueForFake;

							if (random_maxes[k] < valueForFake) random_maxes[k] = valueForFake;
							if (random_mins[k] > valueForFake) random_mins[k] = valueForFake;
							if (random_diff_maxes[k] < Math.abs(diff)) random_diff_maxes[k] = Math.abs(diff);
						}
					});

					if (!grapArr.length) {
						for (let i = 0; i < 366; i++) {
							grapArr.push(1);
						};
					};

					if (gData != undefined) {
						var one_graph = {
							prices: grapArr,
							diffs: columnArr,
							max: max,
							min: min,
							diffs_max: diff_max
						}
						gData.push(one_graph);
						for (var k = 0; k < 6; k++) {
							one_graph = {
								prices: fakeGraphs[k],
								diffs: fakeGraphdiffs[k],
								max: random_maxes[k],
								min: random_mins[k],
								diffs_max: random_diff_maxes[k]
							}
							gData.push(one_graph);
						}
						//console.log(gData);
						if (isRedraw) {

							mainChartObj.series[0].setData(gData[0].prices);
							for (var k = 1; k < 6; k++) {
								mainChartObj.series[k].setData(gData[k].prices);
							}

							updateMainChartSpline(mainGraphHighlighted);
							updateMainChartPercentChange();
						}
					}
				}
			});
		}
	}


	// function updateMainChartSplineNew(exchange, sendCurrency, getCurrency) {
	// 	$.ajax({
	// 		url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sendCurrency}&tsym=${getCurrency}&limit=365`,
	// 		success: function (data) {
	// 			var grapArr = [];
	// 			var columnArr = [];
	// 			var fakeGraphs = [[], [], [], [], [], []];

	// 			// create data for every hour
	// 			data.Data.map(s => {
	// 				var value = (s.open + s.close) / 2;

	// 				var tempVarForFakeArrays = [0,0,0,0,0,0];

	// 				for (var k = 0; k < 6; k++) {
	// 					var randomPercent8 = (Math.random() * (0.92 - 1.08) + 1.08);
	// 					var valueForFake = value * randomPercent8;
	// 					tempVarForFakeArrays[k] = valueForFake;
	// 				}

	// 				for (var i = 0; i < 24; i++) {
	// 					var randomPercent3 = (Math.random() * (0.97 - 1.03) + 1.03);
	// 					var valueForAdd = value * randomPercent3;
	// 					var previuosValue = grapArr[grapArr.length - 1];
	// 					if (!previuosValue) {
	// 						previuosValue = valueForAdd + (valueForAdd * randomPercent3);
	// 					}
	// 					var difference = valueForAdd - previuosValue;
	// 					grapArr.push(valueForAdd);
	// 					columnArr.push(difference);

	// 					for (var l = 0; l < 6; l++) {
	// 						randomPercent3 = (Math.random() * (0.97 - 1.03) + 1.03);
	// 						var valueForAddFake = tempVarForFakeArrays[l] * randomPercent3;
	// 						fakeGraphs[l].push(valueForAddFake);
	// 					}
	// 				}
	// 			});

	// 			if (!grapArr.length) {
	// 				for (let i = 0; i < 366; i++) {
	// 					grapArr.push(1);
	// 				};
	// 			};
	// 			mainChartObj.series[0].setData(grapArr);

	// 			for (var k = 0; k < 6; k++) {
	// 				mainChartObj.series[k+1].setData(fakeGraphs[k]);
	// 			}

	// 			if ($('body').hasClass('advanced'))
	// 				mainChartObj.series[7].setData(columnArr);
	// 			mainChartObj.series[mainGraphHighlighted - 1].update({
	// 				fillColor: {
	// 					linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
	// 					stops: gradientColor
	// 				},
	// 				color: mainChartFirstColor,
	// 				lineWidth: 3,
	// 				enableMouseTracking: true,
	// 				trackByArea: true,
	// 				zIndex: 10
	// 			});
	// 			updateMainChartPercentChange();
	// 		},
	// 	});
	// }

	function updateMainChartPercentChange() {
		var start = mainChartObj.series[0].processedYData[0];
		var end = mainChartObj.series[0].processedYData[mainChartObj.series[0].processedYData.length - 1];

		var changeInPercent = (-1 + (end / start)) * 100;
		// green color
		if (changeInPercent > 0) {
			resultString = '<p class="graph-info__title clr-green">+' + Math.abs(changeInPercent.toFixed(2)) + '%</p>';
		}
		// red color
		else {
			resultString = '<p class="graph-info__title clr-red">-' + Math.abs(changeInPercent.toFixed(2)) + '%</p>';
		}
		$('.graph-info .graph-info__item').eq(1).html(resultString);
	}


	function updateMainChartSpline(currentDataId) {
		if (currentDataId == 7) currentDataId = 5;
		mainChartObj.series.map(function (item, index) {
			if (item.type == 'areaspline') {
				var inactiveLinecolor = index < 4 ? mainChartSecondColor : mainChartColorForHidden;
				item.update({
					color: inactiveLinecolor,
					fillColor: {
						linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
						stops: [
							[0, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')],
							[1, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')]
						]
					},
					lineWidth: 0.5,
					enableMouseTracking: false,
					zIndex: 1
				});
			}
		});

		if (mainChartObj.series[currentDataId - 1] == undefined) {
			mainGraphHighlighted = currentDataId;
			return false;
		}

		mainGraphHighlighted = currentDataId;

		var gData;
		var current_range = $('.graph-info__range__current').html();
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

		var exchanger = mainGraphHighlighted - 1;

		var y_min = gData[exchanger].min - (gData[exchanger].max - gData[exchanger].min) * 0.3;
		if (y_min < 0) y_min = 0;
		var y_max = gData[exchanger].max + (gData[exchanger].max - gData[exchanger].min) * 0.15;
		mainChartObj.yAxis[0].setExtremes(y_min, y_max);

		mainChartObj.series[currentDataId - 1].update({
			color: mainChartFirstColor,
			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: [
					[0, Highcharts.Color(mainChartFirstColor).setOpacity(0.4).get('rgba')],
					[1, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')]
				]
			},
			lineWidth: 3,
			enableMouseTracking: true,
			trackByArea: true,
			zIndex: 10
		});

		if ($('body').hasClass('advanced')) {
			mainChartObj.series[7].setData(gData[currentDataId - 1].diffs);
		}
	}

	/*---------------------------------------------------*/
	/* Graph prices select */
	/*---------------------------------------------------*/
	$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').click(function () {
		$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').removeClass('active');
		$(this).addClass('active');
		$('.graph-prices .labeled-dropdown__selected').text($(this).text());
	});

	/*---------------------------------------------------*/
	/* Graph prices list show/hidden */
	/*---------------------------------------------------*/
	$('.graph-prices .graph-prices__controls__btn').click(function () {
		if ($('.graph-prices').hasClass('open') && !$('.graph-prices').hasClass('noClose')) {
			$('.graph-prices').removeClass('open');
			$('#mainChart').css('width', 'calc(100% - 4px)');
			$('.b-graph__controls').removeClass('shifted');
			$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
			redrawMainChart();
		}
	});

	/*---------------------------------------------------*/
	/* Graph prices list show/hidden */
	/*---------------------------------------------------*/
	$('.b-graph__controls .graph-prices__controls__btn__open').click(function () {
		if (!$('.graph-prices').hasClass('open')) {
			$(this).removeClass('open');
			$('.graph-prices').addClass('open');
			$('#mainChart').css('width', 'calc(100% + 6px)');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
		}
	});

	/*---------------------------------------------------*/
	/* Main graph size change */
	/*---------------------------------------------------*/

	$('#js-graph-size-toggle').click(function () {
		if ($('.b-graph.fullScreen').length) {
			$('.b-graph').removeClass('fullScreen');
			$('.exch-head').css("z-index", "100000");
		} else {
			$('.exch-head').css("z-index", "5");
			$('.b-graph').addClass('fullScreen');
		}
		redrawMainChart();
	});

	/*---------------------------------------------------*/
	/* exchange progressbar */
	/*---------------------------------------------------*/
	var progressbar_list,
		progressbar_array = new Array(),
		progressbar_labels = new Array();

	var progressbar_current = $(".graph-prices__list .graph-prices__item:first-child .progressbar:eq(0)"),
		progressbar_current_label = $(".graph-prices__list .graph-prices__item:first-child .progressbar .progress-label:eq(0)"),
		current_exchange_item = $(".graph-prices__list .graph-prices__item:first-child");

	progressbar_current.progressbar({
		value: false,
		change: function () {
			//progressLabel.text( progressbar.progressbar( "value" ) + "%" );
		},
		complete: function () {
			//progressLabel.text( "Complete!" );
		}
	});

	function updateProgressBar() {
		progressbar_list = $(".graph-prices__item .progressbar");
		progressbar_array = [];
		progressbar_labels = [];

		for (var i = 1; i < progressbar_list.length; i++) {
			var progressbar = $(".graph-prices__list .graph-prices__item .progressbar:eq(" + i + ")");
			var progressbar_label = $(".graph-prices__list .graph-prices__item .progressbar .progress-label:eq(" + i + ")");
			progressbar.progressbar({
				value: false,
				change: function () {
					//progressLabel.text( progressbar.progressbar( "value" ) + "%" );
				},
				complete: function () {
					//progressLabel.text( "Complete!" );
				}
			});
			progressbar_array.push(progressbar);
			progressbar_labels.push(progressbar_label);
		}
	}

	updateProgressBar();

	function progress(i) {
		var val = progressbar_array[i].progressbar("value") || 0;
		if (val == 30) {
			progressbar_labels[i].css('visibility', 'visible');
		}
		progressbar_array[i].progressbar("value", val + 1);
		progressbar_labels[i].css("width", (val + 1) + '%');
		if (val < 99) {
			setTimeout(progress, 28, i);
		}
		// else if (i > 1 && i % 3 == 0) {
		// 	graphPricesScrollbar.animate({
		// 		scrollTop: '+=230'
		// 	}, "slow");
		// }
	}

	var progressBarsCounter;

	function currentProgress() {
		var val = progressbar_current.progressbar("value") || 0;
		if (val >= 10) {
			progressbar_current_label.css('visibility', 'visible');
		}
		// $('.exch-form__progress__value').html(parseInt(val));
		progressbar_current.progressbar("value", val + 0.2);
		progressbar_current_label.css("width", (val + 0.2) + '%');
		if (val < 99.8) {
			setTimeout(currentProgress, 48);
		} else {
			progressbar_current.trigger('completed')
		}

		// bad copy of progress bar
		if (progressBarsCounter > 1) {
			for (var i = 1; i < progressBarsCounter; i++) {
				$('.graph-prices__item').eq(i).find('.progressbar').remove();
				$('.graph-prices__item').eq(i).append($(progressbar_current).clone().removeClass('hidden'));
			}
		}

	}

	/*---------------------------------------------------*/
	/* Currency switch */
	/*---------------------------------------------------*/

	$('.exch-head__switch').click(function () {
		$(this).toggleClass('switched');
		var firstCurr = $('.exch-form__send > input').attr('data-currency');
		var secondCurr = $('.exch-form__get > input').attr('data-currency');
		$('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + secondCurr + '"]').eq(0).trigger('click', 'noRedraw');
		$('.exch-head__get .exch-dropdown__list .exch-dropdown__item[data-currency="' + firstCurr + '"]').eq(0).trigger('click');
		$('.exch-dropdown').removeClass('open');
	});

	/*---------------------------------------------------*/
	/* transaction popup */
	/*---------------------------------------------------*/
	$('#panel-funds-wallet').on('click', 'button[transaction-fancybox]', function (e) {
		e.preventDefault();

		var currencyName = $(this).closest('.basic-table__row').attr('data-currency');
		var coin_amount_str = $(this).closest('.basic-table__row').find('span.wallet' + currencyName)[0].innerHTML;
		var USDT550Equal = 550 / currenciesPrice[currencyName];
		var coin_amount = parseFloat(coin_amount_str.replace(",", ""));

		//for later, confirmation
		window.current_wallet_session = {
			currency: currencyName,
			amount: coin_amount_str,
			deposit_address: '3HZV4FLuvJjoEgsAVbrcLAuWt691s2gSFu',
			withdraw_address: ''
		}

		$('#transaction-popup #transactionFormMinDepositAmount').eq(0).text('Minumun Deposit ' + USDT550Equal + ' ' + currencyName);
		$('#transaction-popup .tx-currency').html(currencyName)

		if (coin_amount > 0) {
			$('#transaction-popup .transaction-form__input').removeAttr('disabled')
		} else {
			$('#transaction-popup .transaction-form__input').attr('disabled', 'disabled')
		}

		var fancies_length = $('main-cols__right .fancybox-container').length;
		if (fancies_length < 1) {
			$.fancybox.open({
				src: '#transaction-popup',
				opts: {
					touch: false,
					afterShow: function (instance, current) {
						var fancybox_body = $('.fancybox-container')[0];
					//	$('.main-cols__right')[0].append(fancybox_body);
						$('.b-graph')[0].append(fancybox_body);
						// $('.main-cols__right .fancybox-container')
						// 	.css({
						// 		"width": "100%",
						// 		"height": "100%",
						// 		"display": "block",
						// 		"position": "absolute"
						// 	})
						// 	.css("display", "block");

						$('.b-graph .fancybox-container')
							.css({
								"width": "100%",
								"height": "100%",
								"display": "block",
								"position": "absolute"
							})
							.css("display", "block");

						$('#transaction-popup .transaction-form__input').keyup(function () {
							if ($(this).val() == '' || $(this).hasClass('inactive')) {
								$(this).closest('.transaction-form__line').find('.transaction-form__button').css({
									'background-color': 'var(--clr-backBT)',
									'pointer-events': 'none'
								});
							} else {
								$(this).closest('.transaction-form__line').find('.transaction-form__button').css({
									'background-color': 'var(--clr-accent)',
									'pointer-events': 'all'
								});
							}
						});
						$('#transaction-popup .transaction-form__input:last').keyup();
					},
					beforeShow: function () {
						$('.fancybox-container').css("display", "none");
					},
					beforeClose: function () {
						//$('.exch-form').removeClass('progress');
						// $('.exch-head').toggleClass('open');
						$('button[transaction-fancybox]').removeClass('active');
						$('.copy-deposit-address').removeClass('clicked');

					}
				}
			});
		}


		/***** Old transaction pop-up function:
		
		$('#transaction-popup > .c-block > .d-flex-col ').css('display', 'none');
		var currencyName = $(this).closest('.basic-table__row').attr('data-currency');
		var currencyFullName = $('.exch-dropdown__list').eq(0).find('.exch-dropdown__item[data-currency="' + currencyName + '"]').attr('data-name');

		$('#transaction-popup .popup-tabs__item').removeClass('active');
		$('#transaction-popup .popup-tabs__item').eq(0).addClass('active'); //.text('Receive ' + currencyName);


		if (!$('body').hasClass('advanced')) {
			var transaction_popup_list = '';
			$('#panel-funds-wallet .basic-table__row:not(.disabled)').each(function (index, item) {
				var coin_currencyName = $(item).attr('data-currency');
				var coin_currencyFullName = $('.exch-dropdown__list').eq(0).find('.exch-dropdown__item[data-currency="' + coin_currencyName + '"]').attr('data-name');
				var current = coin_currencyName == currencyName ? 'current' : '';
				var coin_svg_html = $(item).eq(0).find('svg.basic-table__curr')[0].outerHTML;
				var coin_amount = $(item).eq(0).find('span.wallet' + coin_currencyName)[0].innerHTML;

				transaction_popup_list += `
					<div class="coin-dropdown__item ` + current + `" data-name="`+ coin_currencyFullName + `" data-currency="` + coin_currencyName + `">`
						+ coin_svg_html + `
						<p class="coin-dropdown__title">` 
							+ coin_currencyName + ` Wallet
							<span> (` + coin_amount + `)</span>
						</p>
					</div>`;
				if (coin_currencyName == currencyName) {
					var current_item = coin_svg_html + `
						<p class="coin-dropdown__title">` 
							+ coin_currencyName + ` Wallet
						</p>`;
					var currDropdown = $('#transaction-popup .coin-dropdown');
					currDropdown.find('.coin-dropdown__current > svg, .coin-dropdown__current > p').remove();
					$(current_item).insertBefore($(currDropdown).find('.coin-dropdown__hangle'));
	
				}
			});

			$('#transaction-popup .coin-dropdown__list').html(transaction_popup_list);
			$('#transaction-popup .input-group-append span.input-group-text').eq(0).html(currencyName);


			$('#transaction-popup .coin-dropdown__list .coin-dropdown__item').click(function () {
				var currencyName = $(this).data('currency') + " Wallet";
				var newCurr = $(this).children().clone();
				$(newCurr).eq(1).html(currencyName);
				var currDropdown = $(this).closest('.coin-dropdown');
				currDropdown.find('.coin-dropdown__item').removeClass('current');
				$(this).addClass('current');
				currDropdown.find('.coin-dropdown__current > svg, .coin-dropdown__current > p').remove();
				newCurr.insertBefore($(currDropdown).find('.coin-dropdown__hangle'));

				$('#transaction-popup .input-group-append span.input-group-text').eq(0).html($(this).data('currency'));
				// close dropdown
				if (currDropdown.hasClass('open')) currDropdown.removeClass('open');
			});
		}
		
		// $('#transaction-popup .popup-tabs__item').eq(1).text('Send ' + currencyName);
		$('#transaction-popup .transaction-form__input').eq(1).val('1000.000');
		$('#transaction-popup .transaction-form__btn').text('Send ' + currencyName);
		$('#transaction-popup .transaction-form__qr-code-title').text('Your ' + currencyName + ' Address');
		//$('#transaction-popup .transaction-form__label').text('To ' + currencyFullName + ' Address:');

		$('#transaction-popup > .c-block > .d-flex-col ').eq(0).css('display', 'flex');
		*/

		$('button[transaction-fancybox]').removeClass('active');
		$(this).addClass('active');
		$('.transaction-form__to-clipdoard').removeClass('copied');
	});

	$('#transaction-popup .popup-tabs__item').click(function () {
		$('#transaction-popup .popup-tabs__item').removeClass('active');
		$(this).addClass('active');
		$('#transaction-popup > .c-block > .d-flex-col ').css('display', 'none');
		$('#transaction-popup > .c-block > .d-flex-col ').eq($(this).index()).css('display', 'flex');
	});

	$('.js-fancybox-close').click(function () {
		$.fancybox.close();
	});

	$('[send-fancybox]').click(function (e) {
		//e.stopPropagation();
		closeTelegramMenu();
		var fancies_length = $('.main-cols__right .fancybox-container').length;
		if (fancies_length > 0) return false;

		var userName = $(this).parents('.chats-list__item').find('.chats-list__name').text();
		var imgAttr = $(this).parents('.chats-list__item').find('.chats-list__avatar-wrap img').attr('src');
		$('#send-popup .avatar').attr('src', imgAttr);

		var send_popup_list = '';
		var current_coin_amount = '';
		$('#panel-funds-wallet .basic-table__row:not(.disabled)').each(function (index, item) {
			var coin_currencyName = $(item).attr('data-currency');
			var coin_currencyFullName = $('.exch-dropdown__list').eq(0).find('.exch-dropdown__item[data-currency="' + coin_currencyName + '"]').attr('data-name');
			if (coin_currencyName == 'USDT') coin_currencyFullName = 'USD Tether';
			var current = index == 0 ? 'current' : '';
			var coin_svg_html = $(item).eq(0).find('svg.basic-table__curr')[0].outerHTML;
			var coin_amount = $(item).eq(0).find('span.wallet' + coin_currencyName)[0].innerHTML;

			send_popup_list += `
				<div class="send-form__dropdown__item ` + current + `" data-name="` + coin_currencyFullName + `" data-currency="` + coin_currencyName + `" coin-amount="` + coin_amount + `">` +
				coin_svg_html + `
					<p class="send-form__dropdown__title">
						<span>` +
				coin_currencyName + ` 
						</span> - ` + coin_currencyFullName + `
					</p>
				</div>`;
			if (index == 0) {
				current_coin_amount = coin_amount
				var current_item = coin_svg_html + `
					<p class="send-form__dropdown__title">
						<span>` +
					coin_currencyName + ` 
						</span> - ` +
					coin_currencyFullName + ` 
					</p>`;
				var current_item_input = coin_svg_html + `
					<p class="send-form__dropdown__title">
						<span>` +
					coin_currencyName + ` 
						</span> <br> ` +
					coin_currencyFullName + ` 
					</p>`;

				$('#send-popup .c-block-head__title').text('Send ' + coin_currencyName + ' to ' + userName);

				var currSendForm = $('#send-popup .send-form__line');
				currSendForm.find('svg.basic-table__curr, p.send-form__dropdown__title').remove();
				//$(current_item).insertBefore(currSendForm.eq(0).find('div.send-dropdown__hangle'));

				$(current_item_input).insertBefore(currSendForm.eq(1).find('input.send-form__input'));
				currSendForm.eq(1).find('input.send-form__input').val(current_coin_amount);
				$('#send-popup .send-form__btn span.in-progress').html('SEND ' + coin_currencyFullName);
				$('#send-popup .send-form__btn span.done').html('Your ' + coin_currencyName + ' was sent');


				current_coin_amount = current_coin_amount.trim().replace(/,/g, '');
				$('.range-slider .send-form-slider__control').attr("max", parseFloat(current_coin_amount) * 10);
				var step = 100;
				$('.range-slider .send-form-slider__control').attr("step", step);
				$('.range-slider .send-form-slider__control').val(parseFloat(current_coin_amount) * 10);

				$('.range-slider .send-form-slider__control').on('input', function () {
					var value = this.value / 10;
					if (parseFloat(current_coin_amount) - value < step / 10) {
						value = parseFloat(current_coin_amount);
						$('.range-slider .send-form-slider__control').val(value * 10);
					}
					$('.send-form input.send-form__input').val(numberWithCommas(value.toFixed(2)));
				});
			}
		});

		//send_popup_list = `<div class="send-form__dropdown__list-title">COINS IN YOUR WALLET</div>` + send_popup_list;
		send_popup_list = send_popup_list;

		$('#send-popup .send-form__dropdown__list .send-form__dropdown__scroll').html(send_popup_list);

		$('#send-popup .send-form__dropdown__list .send-form__dropdown__item').click(function () {
			var currencyName = $(this).data('currency');
			var currencyFullName = $(this).data('name');
			current_coin_amount = $(this).attr('coin-amount');
			var newCurr = $(this).children().clone();
			var coin_svg_html = $(this).find('svg.basic-table__curr')[0].outerHTML;


			var current_item_input = coin_svg_html + `
			<p class="send-form__dropdown__title">
				<span>` +
				currencyName + ` 
				</span> <br> ` +
				currencyFullName + ` 
			</p>`;

			$('#send-popup .send-form__dropdown__list .send-form__dropdown__item').removeClass('current');
			$(this).addClass('current');

			$('#send-popup .c-block-head__title').text('Send ' + currencyName + ' to ' + userName);

			var currSendForm = $('#send-popup .send-form__line');
			currSendForm.find('svg.basic-table__curr, p.send-form__dropdown__title').remove();
			//newCurr.insertBefore($(currSendForm).eq(0).find('div.send-dropdown__hangle'));
			$(current_item_input).insertBefore($(currSendForm).eq(1).find('input.send-form__input'));
			currSendForm.eq(1).find('input.send-form__input').val(current_coin_amount);
			$('#send-popup .send-form__btn span.in-progress').html('SEND ' + currencyFullName);
			$('#send-popup .send-form__btn span.done').html('Your ' + currencyName + ' was sent');

			$('.send-form__line.inline, .send-form__dropdown__list').toggleClass('hidden');

			current_coin_amount = current_coin_amount.trim().replace(/,/g, '');
			$('.range-slider .send-form-slider__control').attr("max", parseFloat(current_coin_amount) * 10);
			var step = 100;
			$('.range-slider .send-form-slider__control').attr("step", step);
			$('.range-slider .send-form-slider__control').val(parseFloat(current_coin_amount) * 10);
		});

		$(".send-popup .send-popup__progressbar").progressbar("value", 0);
		$('.send-form__btn').removeClass('inactive');
		$(".send-form__btn span.in-progress").removeClass('hidden');
		$(".send-form__btn span.done").addClass('hidden');
		$(".send-form__btn .send-dropdown__hangle").removeClass('hidden');
		$(".send-form__btn .send-form__check").addClass('hidden');

		$.fancybox.open({
			src: '#send-popup',
			opts: {
				touch: false,
				afterShow: function (instance, current) {
					var fancybox_body = $('.fancybox-container')[0];
					$('.main-cols__right')[0].append(fancybox_body);
					$('.main-cols__right .fancybox-container')
						.css({
							"width": "100%",
							"height": "100%",
							"display": "block",
							"position": "absolute"
						})
						.css("display", "block");
				},
				beforeShow: function () {
					$('.fancybox-container').css("display", "none");
				},
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					// $('.exch-head').toggleClass('open');
					$('.coin-dropdown').removeClass('open');
					$('button[transaction-fancybox]').removeClass('active');
				}
			}
		});
	});

	$('.send-form input.send-form__input').keyup(function () {
		var send_amount = parseFloat($(this).val().trim().replace(/,/g, ''));
		if (send_amount)
			$('.range-slider .send-form-slider__control').val(send_amount * 10);
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
	var dynamicGetValue;
	var dynamicSendValue;

	// convert/go buttons
	$('.exch-head__btn, .exch-form__submit').click(function (e) {
		e.preventDefault();
		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var getCurrency = $('.exch-form__get > input').attr('data-currency');

		var firstValue = $('.exch-form__send > input').val().trim().replace(/,/g, '');
		var secondValue = $('.exch-form__get > input').val().trim().replace(/,/g, '');

		if ($(this).hasClass('exch-form__submit')) {
			$('.main-cols__right-bottom .menu-dropdown__item').eq(0).trigger('click');
			$('.main-cols__right-bottom .menu-dropdown').removeClass('open');
			$('.exch-form__close').addClass('hidden');
			// $('.icon-trader').addClass('hidden');
			// $('.graph-prices__item .progress-label').css('visibility', 'hidden');
			// $('.progressbar').removeClass('hidden');

			// $('.graph-prices__item:first-child .icon-trader').addClass('hidden');
			$('.graph-prices__item:first-child .progress-label').css('visibility', 'hidden');
			$('.graph-prices__item:first-child .progressbar').removeClass('hidden');

			clearInterval(dynamicGetValue);
			clearInterval(dynamicSendValue);

			firstValue = $('.exch-form__send > input').val().trim().replace(/,/g, '');
			secondValue = $('.exch-form__get > input').val().trim().replace(/,/g, '')
			var firstValuePart = firstValue / progressbar_array.length;
			var secondValuePart = secondValue / progressbar_array.length;
			var firstValueResult = 0;
			var secondValueResult = 0;

			graphPricesScrollbar.animate({
				scrollTop: 0
			}, "slow");


			var rand_fee = 40 + Math.floor(Math.random() * 41);
			$('.exch-form__progress__value').html(rand_fee);

			var remain_total_value = secondValue;

			progressbar_current_label.css('visibility', 'hidden');
			progressbar_current_label.text(remain_total_value + ' ' + getCurrency);
			progressbar_current.progressbar("value", 0);
			setTimeout(currentProgress, 1000);

			if (!ownWallet[getCurrency]) ownWallet[getCurrency] = 0;

			for (var i = 0; i < progressbar_array.length; i++) {
				// var progressbar = progressbar_array[i];
				// progressbar.progressbar("value", 0);
				// setTimeout(progress, 1000 + 800 * i, i);

				// var rand = 0;
				// if (i == progressbar_array.length - 1) {
				// 	rand = Math.floor(remain_total_value * 100) / 100;
				// } else {
				// 	var conversion_part = remain_total_value / (progressbar_array.length - i);
				// 	rand = Math.floor(Math.random() * 2 * conversion_part * 100) / 100;
				// 	if (remain_total_value > 0.01 && rand == 0) rand = 0.01;
				// 	remain_total_value -= rand;
				// }
				// if (rand == 0) rand = "0.00";
				// progressbar_labels[i].text(rand + ' ' + getCurrency);

				setTimeout(function () {
					firstValueResult += firstValuePart;
					secondValueResult += secondValuePart;

					ownWallet[sendCurrency] -= (+firstValuePart);
					ownWallet[getCurrency] += (+secondValuePart);

					updateWalletData();
					drawCircleChart(e, true);

					//$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(1).html((sendCurrency == 'USDT' ? '$' : '') + numberWithCommas(firstValueResult.toFixed(2)) + ' ' + sendCurrency + svgArrowTemplate + (getCurrency == 'USDT' ? '$' : '') + numberWithCommas(secondValueResult.toFixed(2)) + ' ' + getCurrency)

					// change the average price too
					// var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
					// var differenceMax = (currenciesPrice[sendCurrency] / currenciesPrice[getCurrency]) / 1250;
					// var differenceMin = differenceMax / 500;
					// var difference = (Math.random() * (differenceMax - differenceMin) + differenceMin) * plusOrMinus;
					// var result = (currenciesPrice[sendCurrency] / currenciesPrice[getCurrency]) + difference;
					// if (result > 1) {
					// 	result = result.toFixed(2);
					// } else {
					// 	result = result.toFixed(5);
					// }

					//$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(2).html((getCurrency == 'USDT' ? '$' + numberWithCommas(result) : result) + ' ' + getCurrency);

					// increase exchanges numbers
					//exchanges++;
					//$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(3).html(exchanges + " Exchanges");
				}, 4000 + 800 * i);
			}

			$('.exch-form').addClass('progress');
			$('.graph-prices__sort__btn').addClass('hidden');
			$('#panel-funds-history .basic-table__body .basic-table__row').removeClass('active recent');
			$('.exch-form .range-slider input[type=range]').css('pointer-events', 'none');

			if ($('body').hasClass('advanced')) {
				var newRow = '<div class="basic-table__row active recent">' +
					'<div class="basic-table__col w-20"> Just now</div>' +
					'<div class="basic-table__col w-17">' + sendCurrency + '/' + getCurrency + '</div>' +
					'<div class="basic-table__col w-12">Buy</div>' +
					'<div class="basic-table__col w-20">' + firstValue + ' ' + sendCurrency + '</div>' +
					'<div class="basic-table__col w-20">' + secondValue + ' ' + getCurrency + '</div>' +
					'<div class="basic-table__col w-10">FILLED</div>' +
					'</div >';
			}

			$('.basic-table__message').addClass('hidden');
			$('#panel-funds-history .basic-table__body .basic-table__body').prepend(newRow);

			/*			var fancies_length = $('.b-graph .c-block .fancybox-container').length;
			 			if (fancies_length < 1) {
							$.fancybox.open({
								src: '#exchange-step_2',
								opts: {
									afterShow: function (instance, current) {
										var fancybox_body = $('.fancybox-container')[0];
										$('.b-graph .c-block')[0].append(fancybox_body);
										$('.b-graph .c-block .fancybox-container')
											.css({
												"width": "100%",
												"height": "100%",
												"display": "block",
												"position": "absolute"
											})
											.css("display", "block");
									},
									beforeShow: function () {
										$('.fancybox-container').css("display", "none");
									},
									beforeClose: function () {
										$('.exch-form').removeClass('progress');
										$('.exch-head').toggleClass('open');
									}
								}
							});
						} */
		} else {
			$(this).closest('.exch-head').toggleClass('open');
			$('.exch-form__submit').prop('disabled', false);

			$('.main-cols__right-bottom .menu-dropdown__item').eq(2).trigger('click');
			$('.main-cols__right-bottom .menu-dropdown').removeClass('open');

			var send_svg = $('.exch-head__send .exch-dropdown__current > svg').clone();
			var send_curr = $('.exch-head__send .exch-dropdown__current > p.exch-dropdown__title > span').text();
			$('.exch-form').find('.exch-form__send > svg').remove();
			$(send_svg).insertBefore($('.exch-form__send > p.exch-dropdown__title').eq(0));
			$('.exch-form__send > p.exch-dropdown__title span').html(send_curr);


			var get_svg = $('.exch-head__get .exch-dropdown__current > svg').clone();
			var get_curr = $('.exch-head__get .exch-dropdown__current > p.exch-dropdown__title > span').text();
			$('.exch-form').find('.exch-form__get > svg').remove();
			$(get_svg).insertBefore($('.exch-form__get > p.exch-dropdown__title').eq(0));
			$('.exch-form__get > p.exch-dropdown__title span').html(get_curr);

			// $('.exch-form__send .exch-form__label').text('You have');
			// $('.exch-form__get .exch-form__label').text('You get');
			var firstValue, secondValue;
			// if selected previous conversion
			if (isSelectedPrevConversion) {
				firstValue = $('.exch-form__send > input').val();
				secondValue = $('.exch-form__get > input').val();
			} else {
				if (!ownWallet[sendCurrency]) {
					ownWallet[sendCurrency] = 0;
				}
				firstValue = ownWallet[sendCurrency].toFixed(2);

				if (!currenciesPrice[sendCurrency]) {
					currenciesPrice[sendCurrency] = 1;
				}
				if (!currenciesPrice[getCurrency]) {
					currenciesPrice[getCurrency] = 1;
				}

				secondValue = ((ownWallet[sendCurrency] * currenciesPrice[sendCurrency]) / currenciesPrice[getCurrency]).toFixed(2);
			}
			if (firstValue == 0) {
				$('.exch-form__submit').prop('disabled', true);
			}
			$('.range-slider .exch-form-slider__control').attr("max", firstValue * 100000);
			$('.range-slider .exch-form-slider__control').attr("step", parseInt(firstValue));
			$('.range-slider .exch-form-slider__control').val(firstValue * 100000);

			$('.range-slider .exch-form-slider__control').on('input', function () {
				var value = this.value / 100000;
				$('.exch-form__send > input').val(numberWithCommas(value.toFixed(2)));
				$('.exch-form__send input.exch-form__input').keyup();
				updateExchangeValues();
			});

			$('.exch-form__send > input').val(numberWithCommas(firstValue));
			$('.exch-form__get > input').val(numberWithCommas(secondValue));
			isSelectedPrevConversion = false;

			// run dynamic value change
			startDynamicGetValue();

			currentWallet = ownWallet;

			$('.graph-prices__item').removeClass('active');
			$('.graph-prices').addClass('open noClose');
			$('#mainChart').css('width', 'calc(100% - 4px)');
			$('.b-graph__controls').addClass('shifted');
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');


			$('.graph-prices__sort').html('1' + getCurrency + ' ≈ ');
			$('.graph-prices__price.send-prices__rate').removeClass('hidden')
			$('.graph-prices__price.get-prices__rate').addClass('hidden')

			redrawMainChart();

			updateExchangeValues();

			//updateWalletData();
			//drawCircleChart();
			//$('.user-portfolio-close').addClass('hidden');
		}
	});

	function updateExchangeValues() {
		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var getCurrency = $('.exch-form__get > input').attr('data-currency');
		var firstValue = $('.exch-form__send > input').val().trim().replace(/,/g, '');
		var ownWalletValue = ownWallet[sendCurrency];
		var secondValue = $('.exch-form__get > input').val().trim().replace(/,/g, '');
		var part = firstValue / ownWalletValue;

		switch (true) {
			case (part > 0.7):
				progressBarsCounter = 3;
				break;
			case (part > 0.4):
				progressBarsCounter = 2;
				break;
			default:
				progressBarsCounter = 1;
				break;
		}

		$(".graph-prices__list .graph-prices__item .graph-prices__amount").removeClass('hidden').html(`
				<span class="graph-prices__amount-label">Amount: </span>
				0.00 
				<span>` + getCurrency + '</span>');
		$(".graph-prices__list .graph-prices__item .graph-prices__price").addClass('hidden');

		$(".graph-prices__list .graph-prices__item").each(function (index, item) {
			if (index < progressBarsCounter) {
				current_exchange_item = $(item);
				$(item).find(".graph-prices__price.send-prices__rate").removeClass('hidden');
				$(item).find(".graph-prices__price-label").removeClass('hidden');
				$(item).find(".graph-prices__amount").removeClass('hidden').css('color', 'var(--clr-textD)');
				var num_length = parseInt(secondValue / progressBarsCounter).toString().length;
				var decimal_digits = 2;
				if (num_length > 7) {
					decimal_digits = 0;
				}
				else {
					decimal_digits = 7 - num_length;
				}
				$(item).find(".graph-prices__amount").html(`
				<span class="graph-prices__amount-label">
					Amount: 
				</span>` + numberWithCommas((secondValue / progressBarsCounter).toFixed(decimal_digits)) + ' <span>' + getCurrency + '</span>');
			}
			else{
				$(item).find(".graph-prices__amount").removeClass('hidden').css('color', 'var(--clr-backCI)');
			}
		});
	}

	progressbar_current.on('completed', function () {
		$('.exch-form').addClass('completed');
		$('.exch-form__submit > span').html('DONE');
		$('exch-form__progress__value').html('0%');
		$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(0).html('Just now');
		$('.exch-form__submit').attr("disabled", true);
		updateRecent();

		$('.exch-form__send .exch-form__label').text('Exchanged');

		setTimeout(() => {
			if ($('.exch-form').hasClass('completed')) {
				$('.exch-form').removeClass('progress');
				$('.graph-prices__sort__btn').removeClass('hidden');
				$('.exch-head').removeClass('open');
				$('.graph-prices').removeClass('noClose');
				$('.exch-form__submit').attr("disabled", false);
				$('.exch-form').removeClass('completed');
				$('.exch-form__close').removeClass('hidden');
				$('.exch-form__submit > span').html('CONFIRM');
				$('.exch-form .range-slider input[type=range]').css('pointer-events', 'all');


				$(".graph-prices__list .graph-prices__item .graph-prices__amount").addClass('hidden');
				$(".graph-prices__list .graph-prices__item .graph-prices__price.send-prices__rate").removeClass('hidden');

				current_exchange_item.find(".graph-prices__price-label").addClass('hidden');

				if (!isSelectedPrevConversion) {
					$('.graph-prices__item .progress-label').css('visibility', 'visible');
					$('.progressbar').addClass('hidden');
					for (var j = 0; j < progressbar_array.length; j++) {
						progressbar_array[j].progressbar("value", 0);
					}
				}
			}

			// basic
			if (!$('body').hasClass('advanced')) {
				$('.js-tabs-panel').removeClass('active');
				$('#panel-funds-wallet').addClass('active');
				drawCircleChart();
			}
			//advanced
			else {
				$('#tab-funds-wallet').trigger('click');
				$('.menu-dropdown').removeClass('open');
			}
		}, 500);
	});

	$('.exch-form__close').click(function (e) {
		clearInterval(dynamicGetValue);
		$(".graph-prices__list .graph-prices__item .graph-prices__amount").addClass('hidden');
		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		$('.graph-prices__sort').html('1' + sendCurrency + ' ≈ ');
		$(".graph-prices__list .graph-prices__item .graph-prices__price.get-prices__rate").removeClass('hidden');
		$(".graph-prices__list .graph-prices__item .graph-prices__price.send-prices__rate").addClass('hidden');
		$(".graph-prices__list .graph-prices__item .graph-prices__price-label").addClass('hidden');

		e.preventDefault();
		$('#js-graph-prices').removeClass('open noClose');
		$('.c-block.b-graph__controls').removeClass('shifted');
		redrawMainChart();
		$(this).closest('.exch-head').toggleClass('open');
		// basic
		if (!$('body').hasClass('advanced')) {
			$('.js-tabs-panel').removeClass('active');
			$('#panel-funds-wallet').addClass('active');
			drawCircleChart();
			//$('.user-portfolio .user-menu .user-menu__item').eq(2).trigger('click');
		}
		//advanced
		else {
			$('#tab-funds-wallet').trigger('click');
			$('.menu-dropdown').removeClass('open');
		}
	});

	$('.exch-form input').focus(function () {
		var newValue = $(this).val().replace(/[^\d.-]/g, '');
		$(this).val(newValue);
	});

	$('.exch-form input.exch-form__input').blur(function () {
		var newValue = numberWithCommas($(this).val())
		$(this).val(newValue);
	});

	$('.exch-form input.exch-form__input').keydown(function (e) {
		var key = e.charCode || e.keyCode || 0;
		// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
		// home, end, period, and numpad decimal
		return (
			key == 8 ||
			key == 9 ||
			key == 13 ||
			key == 46 ||
			key == 110 ||
			key == 190 ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57) ||
			(key >= 96 && key <= 105));
	});

	$('.exch-form input.exch-form__input').keyup(function () {
		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var getCurrency = $('.exch-form__get > input').attr('data-currency');

		if ($(this).parent().hasClass('exch-form__send')) {
			startDynamicGetValue();
			var firstValue = $(this).val().trim().replace(/,/g, '');
			if (firstValue > ownWallet[sendCurrency]) {
				firstValue = ownWallet[sendCurrency];
				$('.exch-form__send > input').val(firstValue.toFixed(2));
				startDynamicGetValue();
			}

		} else {
			startDynamicSendValue();
			var firstValue = $('.exch-form__send input').val().trim().replace(/,/g, '');
			if (firstValue > ownWallet[sendCurrency]) {
				firstValue = ownWallet[sendCurrency];
				var secondValue = ((firstValue * currenciesPrice[sendCurrency]) / currenciesPrice[getCurrency]).toFixed(2);
				$('.exch-form__send > input').val(firstValue.toFixed(2));
				$('.exch-form__get > input').val(secondValue);
				startDynamicSendValue();
			}
		}
		var send_amount = parseFloat($('.exch-form__send > input').val().trim().replace(/,/g, ''));
		if (send_amount)
			$('.range-slider .exch-form-slider__control').val(parseFloat(send_amount * 100000));
	});

	function startDynamicSendValue() {
		clearInterval(dynamicGetValue);
		clearInterval(dynamicSendValue);

		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var getCurrency = $('.exch-form__get > input').attr('data-currency');

		var secondValue = $('.exch-form__get input').val().trim().replace(/,/g, '');
		var firstValue = ((secondValue * currenciesPrice[getCurrency]) / currenciesPrice[sendCurrency]).toFixed(2);

		$('.exch-form__send input').val(numberWithCommas(firstValue));

		dynamicSendValue = setInterval(function () {
			firstValue *= (Math.random() * (101 - 99) + 99) / 100;
			if (firstValue > ownWallet[sendCurrency]) {
				firstValue = ownWallet[sendCurrency];
			}
			$('.exch-form__send input').val(numberWithCommas(firstValue.toFixed(2)));
			updateExchangeValues();
		}, 1000);
	}

	$('.exch-form__get > input').focus(startDynamicSendValue);

	function startDynamicGetValue() {
		clearInterval(dynamicSendValue);
		clearInterval(dynamicGetValue);

		var sendCurrency = $('.exch-form__send > input').attr('data-currency');
		var getCurrency = $('.exch-form__get > input').attr('data-currency');

		var firstValue = $('.exch-form__send input').val().trim().replace(/,/g, '');
		var secondValue = ((firstValue * currenciesPrice[sendCurrency]) / currenciesPrice[getCurrency]).toFixed(2);
		$('.exch-form__get input').val(numberWithCommas(secondValue));

		dynamicGetValue = setInterval(function () {
			secondValue *= (Math.random() * (101 - 99) + 99) / 100;
			$('.exch-form__get input').val(numberWithCommas(secondValue.toFixed(2)));
			updateExchangeValues();
		}, 1000);
	}

	$('.exch-form__send > input').focus(startDynamicGetValue);

	$('.transaction-form__to-clipdoard').click(function () {
		var copyText = document.querySelector(".transaction-form__input.with-copy");
		copyText.select();
		document.execCommand("copy");
		$(".transaction-form__input.with-copy").trigger('blur');
		$(this).addClass('copied');
	});

	/*---------------------------------------------------*/
	/* JS for ADVANCED page */
	/*---------------------------------------------------*/

	if ($('body').hasClass('advanced')) {
		changeTheme();
		liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);

		var rowForMove = null;

		function updateGlobalOrderHighestTable() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body .basic-table__row').first().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body').append(rowForMove);
			var rand = getRandomNumber(500, 1000);
			setTimeout(updateGlobalOrderHighestTable, rand);
		}

		function updateGlobalOrderLowerTable() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).find('.basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).prepend(rowForMove);
			var rand = getRandomNumber(500, 1000);
			setTimeout(updateGlobalOrderLowerTable, rand);
		}

		function updateGlobalRecentTable() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body .basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body').prepend(rowForMove);
			var rand = getRandomNumber(500, 1000);
			setTimeout(updateGlobalRecentTable, rand);
		}

		updateGlobalOrderHighestTable();
		updateGlobalOrderLowerTable();
		updateGlobalRecentTable();

		$('.btn-table-toggle').click(function () {
			$(this).toggleClass('open');
			if ($(this).hasClass('open')) {
				$('#orders').css('display', 'flex');
			} else {
				$('#orders').css('display', 'none');

			}
			calculateHeightOfFirstTable();
		});
	}

	function calculateHeightOfFirstTable() {
		var tableBodyHeight = $('.calculated-height-js').parent().height();
		var calculatedHeight = (Math.floor((tableBodyHeight - 23) / 2 / 22) - 1) * 22;
		// add table head height
		if ($('.calculated-height-js .basic-table__row.head')[0])
			calculatedHeight += $('.calculated-height-js .basic-table__row.head')[0].getBoundingClientRect().height;
		$('.calculated-height-js').css('min-height', calculatedHeight);
		$('.calculated-height-js').css('max-height', calculatedHeight);
	}
	calculateHeightOfFirstTable();
	$(window).resize(calculateHeightOfFirstTable);

	/*---------------------------------------------------*/
	/* conform fancybox */
	/*---------------------------------------------------*/
	$('[conform-fancybox]').click(function (e) {
		$.fancybox.close();
		e.preventDefault();
		// Open this fancybox force
		$.fancybox.open({
			src: '#conform-popup',
			opts: {
				touch: false,
				afterShow: function (instance, current) {
					var fancybox_body = $('.fancybox-container')[0];
					$('.main-cols__right')[0].append(fancybox_body);
					$('.main-cols__right .fancybox-container')
						.css({
							"width": "100%",
							"height": "100%",
							"display": "block",
							"position": "absolute"
						})
						.css("display", "block");
				},
				beforeShow: function () {
					$('.fancybox-container').css("display", "none");
				},
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					//$('.exch-head').toggleClass('open');
				}
			}
		});
	});

	/* T&C popup */
	$("#terms-link").click(function (e) {
		e.preventDefault();
		// Open this fancybox force
		$.fancybox.open({
			src: '#terms-popup',
			opts: {
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					//$('.exch-head').toggleClass('open');
				}
			}
		});
	})

	/*---------------------------------------------------*/
	/* autentificator fancybox */
	/*---------------------------------------------------*/
	$('[autentificator-fancybox]').click(function (e) {
		$.fancybox.close();
		e.preventDefault();
		// Open this fancybox force
		$.fancybox.open({
			src: '#autentificator-popup',
			opts: {
				afterShow: function (instance, current) {
					var fancybox_body = $('.fancybox-container')[0];
					$('.main-cols__right')[0].append(fancybox_body);
					$('.main-cols__right .fancybox-container')
						.css({
							"width": "100%",
							"height": "100%",
							"display": "block",
							"position": "absolute"
						})
						.css("display", "block");
				},
				beforeShow: function () {
					$('.fancybox-container').css("display", "none");
				},
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					//$('.exch-head').toggleClass('open');
				}
			}
		});
	});

	$("#open-tx-history").click((e) => {
		$(".basic-popup__overlay").addClass('open');
	})

	$("#close-tx-history").click((e) => {
		$(".basic-popup__overlay").removeClass('open');
	})

	$('.popup-nav-button').click(function (e) {
		let popupSrcDiv = $(this).attr("data-next-screen");

		$.fancybox.close();
		e.preventDefault();
		// Open this fancybox force
		$.fancybox.open({
			src: '#' + popupSrcDiv,
			opts: {
				afterShow: function (instance, current) {
					var fancybox_body = $('.fancybox-container')[0];
					$('.main-cols__right')[0].append(fancybox_body);
					$('.main-cols__right .fancybox-container')
						.css({
							"width": "100%",
							"height": "100%",
							"display": "block",
							"position": "absolute"
						})
						.css("display", "block");
					if (popupSrcDiv == "confirm-withdrawal-request") {
						console.log("populating next screen for demo!")
						try {
							window.current_wallet_session.withdraw_address = $("#withdrawal-address").val()

							$("#confirm-return-amount").html(window.current_wallet_session.amount)
							$("#confirm-return-address").html(window.current_wallet_session.withdraw_address)
							$("#confirm-return-currency").html(window.current_wallet_session.currency)

							console.log("done, data was " + JSON.stringify(window.current_wallet_session))
						} catch (x) {
							console.log("ERROR populating next screen")
						}

					}
				},
				beforeShow: function () {
					$('.fancybox-container').css("display", "none");
				},
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					//$('.exch-head').toggleClass('open');
				}
			}
		});
	});

	$(".copy-deposit-address").click(function (e) {
		$(this).addClass("clicked")
		e.preventDefault();
	})


	/*---------------------------------------------------*/
	/* Tippy Tooltip */
	/*---------------------------------------------------*/

	tippy('.tippy-convert', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	// tippy('.tippy-done', {
	// 	html: '#ttpDone', // DIRECT ELEMENT option
	// 	arrow: true,
	// 	animation: 'fade',
	// 	theme: 'bct'
	// })

	tippy('.tippy-convert-advanced', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	tippy('.tippy-done-advanced', {
		html: '#ttpDone', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
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
		theme: 'bct'
	})

	tippy('[data="tippy"]', {
		arrow: true,
		animation: 'fade',
		placement: 'right',
		theme: 'bct',
		allowTitleHTML: true,
		popperOptions: {
			modifiers: {
				preventOverflow: {
					enabled: false
				},
				hide: {
					enabled: false
				}
			}
		}
	});

	const exchangers = [
		"BITFINEX",
		"ETORO",
		"24 OPTION",
		"COINBULL",
		"LUNO",
		"PAXFOREX",
		"BINANCE",
		"COINBACE",
		"LOCALBITCOINS",
		"CEX IO",
		"CHANGELLY",
		"COINMAMA",
		"XTRADE",
		"CAPITAL.COM",
		"PAXFUL",
		"KRAKEN",
		"POLONIEX",
		"GEMINI",
		"BITHUMB",
		"XCOINS",
		"COBINHOOD",
		"COINCHECK",
		"COINEXCHANGE",
		"SHAPESHIFT",
		"BITSO",
		"INDACOIN",
		"CITYINDEX",
		"BITBAY",
		"BITSTAMP",
		"CRYPTOPIA",
		"GDAX",
		"CUCOIN"
	]

	tippy('[data="tippy-exchangers"]', {
		html: '#ttpExchagers',
		arrow: true,
		animation: 'fade',
		placement: 'right',
		theme: 'bct',
		popperOptions: {
			modifiers: {
				preventOverflow: {
					enabled: false
				},
				hide: {
					enabled: false
				}
			}
		},
		onShow: function (instance) {
			// get length and expect exchanger
			var length = instance.reference.innerText.substr(1);
			var expectExchanger = instance.reference.previousElementSibling.innerText;

			// init textContent
			instance.popper.querySelector('.tippy-content').textContent = "";
			// generate exchangers as listed
			for (let index = 0; index < exchangers.length; index++) {
				if (exchangers[index] != expectExchanger) {
					instance.popper.querySelector('.tippy-content').textContent += exchangers[index] + '\n';
					length--;

					if (length <= 0) break;
				}
			}
			// text align to left
			instance.popper.querySelector('.tippy-content').style.textAlign = "left";
			instance.popper.querySelector('.tippy-content').style['white-space'] = "pre-line";
		}
	})

	/*---------------------------------------------------*/
	/* Old Graph range select */
	/*---------------------------------------------------*/

	// var allRangeOptions = $("ul.graph-info__range__list").children('li.graph-info__range__item');
	// $("div.graph-info__range__current").on("click", function (event) {
	// 	if ($('ul.graph-info__range__list').hasClass('open')) {
	// 		$('ul.graph-info__range__list').css('border-bottom', '0px');
	// 		$('div.graph-info__range').css('border', '0px');
	// 		$('ul.graph-info__range__list').removeClass('open');
	// 		$('div.graph-info__range__current').removeClass('open');
	// 		$('div.graph-info__range__current').css('border', 'solid 1px var(--clr-separatorD)');
	// 	} else {
	// 		$('ul.graph-info__range__list').addClass('open');
	// 		$('div.graph-info__range__current').addClass('open');
	// 		$('div.graph-info__range__current').css('border', '0px');
	// 		$('ul.graph-info__range__list').css('border-top', 'solid 1px var(--clr-separatorD)');
	// 		$('div.graph-info__range').css('border', 'solid 1px var(--clr-separatorD)');
	// 	}
	// 	event.stopPropagation();
	// // });
	// $("ul.graph-info__range__list").on("click", "li.graph-info__range__item", function () {
	// 	allRangeOptions.removeClass('active');
	// 	$(this).addClass('active');
	// 	$(".graph-info__range__current").html($(this).html());

	// 	$('ul.graph-info__range__list').css('border-bottom', '0px');
	// 	$('div.graph-info__range').css('border', '0px');
	// 	$('ul.graph-info__range__list').removeClass('open');
	// 	$('div.graph-info__range__current').removeClass('open');
	// 	$('div.graph-info__range__current').css('border', 'solid 1px var(--clr-separatorD)');


	// 	var current_range = $('.graph-info__range__current').html();
	// 	var interval = range_options[4].interval;
	// 	var limit = range_options[4].limit;
	// 	var gData;
	// 	switch (current_range) {
	// 		case '1H':
	// 			gData = gDataTwoHour;
	// 			interval = range_options[0].interval;
	// 			limit = range_options[0].limit;
	// 			break;
	// 		case '1D':
	// 			gData = gDataDay;
	// 			interval = range_options[1].interval;
	// 			limit = range_options[1].limit;
	// 			break;
	// 		case '1W':
	// 			gData = gDataWeek;
	// 			interval = range_options[2].interval;
	// 			limit = range_options[2].limit;
	// 			break;
	// 		case '1M':
	// 			gData = gDataMonth;
	// 			interval = range_options[3].interval;
	// 			limit = range_options[3].limit;
	// 			break;
	// 		case '1Y':
	// 			gData = gDataYear;
	// 			interval = range_options[4].interval;
	// 			limit = range_options[4].limit;
	// 			break;
	// 	}

	// 	// $('.graph-range-slider__current').html(range_options[index].label);

	// 	mainChartObj.series.forEach(series => {
	// 		series.update({
	// 			pointStart: maxDate - interval * limit,
	// 			pointInterval: interval
	// 		})
	// 	})

	// 	var exchanger = mainGraphHighlighted - 1;

	// 	var y_min = gData[exchanger].min - (gData[exchanger].max - gData[exchanger].min) * 0.3;
	// 	if (y_min < 0) y_min = 0;
	// 	var y_max = gData[exchanger].max + (gData[exchanger].max - gData[exchanger].min) * 0.15;
	// 	mainChartObj.yAxis[0].setExtremes(y_min, y_max);

	// 	mainChartObj.series[0].setData(gData[0].prices);
	// 	if ($('body').hasClass('advanced'))
	// 		mainChartObj.series[7].setData(gData[exchanger].diffs);
	// 	for (var k = 1; k < 6; k++) {
	// 		mainChartObj.series[k].setData(gData[k].prices);
	// 	}

	// 	updateMainChartPercentChange();
	// 	updateWalletData(true);
	// });



	/*---------------------------------------------------*/
	/* New Graph range select */
	/*---------------------------------------------------*/

	var allRangeOptions = $("div.graph-info__range ul.menu-dropdown").children('li.menu-dropdown__item');
	$("div.graph-info__range ul.menu-dropdown li.menu-dropdown__item").click(function () {
		allRangeOptions.removeClass('active');
		$(this).addClass('active');
		$(".graph-info__range__current").html($(this).children('button.menu-dropdown__btn').html());

		var current_range = $('.graph-info__range__current').html();
		var interval = range_options[4].interval;
		var limit = range_options[4].limit;
		var gData;
		switch (current_range) {
			case '1H':
				gData = gDataTwoHour;
				interval = range_options[0].interval;
				limit = range_options[0].limit;
				break;
			case '1D':
				gData = gDataDay;
				interval = range_options[1].interval;
				limit = range_options[1].limit;
				break;
			case '1W':
				gData = gDataWeek;
				interval = range_options[2].interval;
				limit = range_options[2].limit;
				break;
			case '1M':
				gData = gDataMonth;
				interval = range_options[3].interval;
				limit = range_options[3].limit;
				break;
			case '1Y':
				gData = gDataYear;
				interval = range_options[4].interval;
				limit = range_options[4].limit;
				break;
		}

		// $('.graph-range-slider__current').html(range_options[index].label);

		mainChartObj.series.forEach(series => {
			series.update({
				pointStart: maxDate - interval * limit,
				pointInterval: interval
			})
		})

		var exchanger = mainGraphHighlighted - 1;

		var y_min = gData[exchanger].min - (gData[exchanger].max - gData[exchanger].min) * 0.3;
		if (y_min < 0) y_min = 0;
		var y_max = gData[exchanger].max + (gData[exchanger].max - gData[exchanger].min) * 0.15;
		mainChartObj.yAxis[0].setExtremes(y_min, y_max);

		mainChartObj.series[0].setData(gData[0].prices);
		if ($('body').hasClass('advanced'))
			mainChartObj.series[7].setData(gData[exchanger].diffs);
		for (var k = 1; k < 6; k++) {
			mainChartObj.series[k].setData(gData[k].prices);
		}

		updateMainChartPercentChange();
		updateWalletData(true);
	});


	// var allPortfolioOptions = $("ul.portfolio-graph-range__list").children('li.portfolio-graph-range__item');
	// $("div.portfolio-graph-range__current").on("click", function () {
	// 	if ($('ul.portfolio-graph-range__list').hasClass('open')) {
	// 		$('ul.portfolio-graph-range__list').css('border-bottom', '0px');
	// 		$('div.portfolio-graph-range').css('border', '0px');
	// 		$('ul.portfolio-graph-range__list').removeClass('open');
	// 		$('div.portfolio-graph-range__current').css('border', 'solid 1px');
	// 	} else {
	// 		$('ul.portfolio-graph-range__list').addClass('open');
	// 		$('div.portfolio-graph-range__current').css('border', '0px');
	// 		$('ul.portfolio-graph-range__list').css('border-bottom', 'solid 1px');
	// 		$('div.portfolio-graph-range').css('border', 'solid 1px');
	// 	}
	// });
	// $("ul.portfolio-graph-range__list").on("click", "li.portfolio-graph-range__item", function () {
	// 	allPortfolioOptions.removeClass('active');
	// 	$(this).addClass('active');
	// 	$(".portfolio-graph-range__current").html($(this).html());
	// 	console.log()

	// 	switch ($(".portfolio-graph-range__current").html()) {
	// 		case "HOUR":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(0, {}, true);
	// 			break;
	// 		case "DAY":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(1, {}, true);
	// 			break;
	// 		case "WEEK":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(2, {}, true);
	// 			break;
	// 		case "MONTH":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(3, {}, true);
	// 			break;
	// 		case "YEAR":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(4, {}, true);
	// 			break;
	// 	}

	// 	$('ul.portfolio-graph-range__list').css('border-bottom', '0px');
	// 	$('div.portfolio-graph-range').css('border', '0px');
	// 	$('ul.portfolio-graph-range__list').removeClass('open');
	// 	$('div.portfolio-graph-range__current').css('border', 'solid 1px');
	// });

	/* Portfolio graph range slider for Orders */
	var $portfolioGraphRange = $(".portfolio-graph-range__control");
	$portfolioGraphRange.on('input', function () {
		if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(this.value, {}, true);
		var range_index = parseInt(this.value);
		$('.portfolio-graph-range__current').html(range_options[range_index].label);
		redrawMainChart();
	});

	/* main graph range slider for Orders */
	var $mainGraphRange = $(".graph-range-slider__control");
	$mainGraphRange.on('input', function () {
		// $( this ).css( 'background', 'linear-gradient(to right, var(--clr-time-bar) 0%, var(--clr-time-bar) '+this.value*25 +'%, var(--clr-time-line) ' + this.value*25 + '%, var(--clr-time-line) 100%)' );

		var index = parseInt(this.value);
		var interval = range_options[index].interval;
		var gData;
		switch (index) {
			case 0:
				gData = gDataTwoHour;
				break;
			case 1:
				gData = gDataDay;
				break;
			case 2:
				gData = gDataWeek;
				break;
			case 3:
				gData = gDataMonth;
				break;
			case 4:
				gData = gDataYear;
				break;
		}

		$('.graph-range-slider__current').html(range_options[index].label);

		mainChartObj.series.forEach(series => {
			series.update({
				pointStart: maxDate - interval * range_options[index].limit,
				pointInterval: interval
			})
		})

		var exchanger = mainGraphHighlighted - 1;

		var y_min = gData[exchanger].min - (gData[exchanger].max - gData[exchanger].min) * 0.3;
		if (y_min < 0) y_min = 0;
		var y_max = gData[exchanger].max + (gData[exchanger].max - gData[exchanger].min) * 0.15;
		mainChartObj.yAxis[0].setExtremes(y_min, y_max);

		mainChartObj.series[0].setData(gData[0].prices);
		if ($('body').hasClass('advanced'))
			mainChartObj.series[7].setData(gData[exchanger].diffs);
		for (var k = 1; k < 6; k++) {
			mainChartObj.series[k].setData(gData[k].prices);
		}

		updateMainChartPercentChange();
		updateWalletData(true);
	});

	/* .coin-dropdown handler */
	$('.transaction-form .coin-dropdown .coin-dropdown__border').click(function () {
		$('.transaction-form .coin-dropdown').removeClass('open');
		$(this).parent().addClass('open');
	});

	$('.transaction-form .coin-dropdown .coin-dropdown__hangle').click(function () {
		if ($(this).hasClass('coin-dropdown__hangle')) event.stopPropagation();
		$('.transaction-form .coin-dropdown').toggleClass('open');
		$('.coin-dropdown .coin-dropdown__current').removeClass('hidden');
	});

	$('.coin-dropdown__list .coin-dropdown__item').click(function () {
		var currencyName = $(this).data('name');
		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).html(currencyName);
		var currDropdown = $(this).closest('.coin-dropdown');
		currDropdown.find('.coin-dropdown__item').removeClass('current');
		$(this).addClass('current');
		currDropdown.find('.coin-dropdown__current > svg, .coin-dropdown__current > p').remove();
		newCurr.insertBefore($(currDropdown).find('.coin-dropdown__hangle'));

		// close dropdown
		if (currDropdown.hasClass('open')) currDropdown.removeClass('open');
	});

	$('.message-bar__login').hover(function () {
		// background-image: linear-gradient(#009EE2, #218FE9);
		$('.message-bar__login-demo').css('background-image', 'linear-gradient(to right, var(--clr-accentD) 0%, var(--clr-accent) 100%);');
	}, function () {
		$('.message-bar__login-demo').css('background-image', 'linear-gradient(to right, var(--clr-accentD) 0%, var(--clr-accent) 100%);');
	});

	function updatePriceListItem(sendCurrency, getCurrency) {
		var priceRate = currenciesPrice[getCurrency] / currenciesPrice[sendCurrency];

		if (sendCurrency == getCurrency) {
			$('.graph-prices__price.send-prices__rate').each(function (index, priceItem) {
				$(this).addClass('hidden');
				$(priceItem).html(priceRate + ' <span>' + sendCurrency + '</span>');
			});
		} else {
			var rateArray = [];
			for (var i = 0; i < progressbar_array.length + 1; i++) {
				var randRate = priceRate * (Math.random() * (101 - 99) + 99) / 100;
				rateArray.push(randRate);
			}
			rateArray.sort(function (a, b) {
				return a - b
			});

			$('.graph-prices__price.send-prices__rate').each(function (index, priceItem) {
				$(this).addClass('hidden');
				var num_length = parseInt(rateArray[index]).toString().length;
				var decimal_digits = 2;
				if (num_length > 6) {
					decimal_digits = 0;
				}
				else {
					decimal_digits = 6 - num_length;
				}
				$(priceItem).html('<span class="graph-prices__price-label hidden">1 ' + getCurrency + ' = </span>' + numberWithCommas(rateArray[index].toFixed(decimal_digits)) + ' <span>' + sendCurrency + '</span>');
			});
		}

		var priceRateBackward = 1 / priceRate;
		var num_length = parseInt(priceRateBackward).toString().length;
		var decimal_digits = 2;
		if (num_length > 6) {
			decimal_digits = 0;
		}
		else {
			decimal_digits = 6 - num_length;
		}
		// if (priceRateBackward > 1) {
		// 	priceRateBackward = priceRateBackward.toFixed(2);
		// 	priceRateBackward = numberWithCommas(priceRateBackward);
		// } else {
		// 	priceRateBackward = priceRateBackward.toFixed(5);
		// }

		$('.graph-prices__price.get-prices__rate').each(function (index, priceItem) {
			$(this).removeClass('hidden');
			$(priceItem).html('<span class="graph-prices__price-label hidden">1 ' + sendCurrency + ' = </span>' + numberWithCommas(priceRateBackward.toFixed(decimal_digits)) + ' <span>' + getCurrency + '</span>');
		});

		// init sort icon
		$('.graph-prices__sort').removeClass('asc');
		$('.graph-prices__sort').removeClass('desc');

		$('.graph-prices__sort').html('1' + sendCurrency + ' ≈ ');
	}

	/** Init price list */
	updatePriceListItem('BTC', 'USDT');

	/** Graph exchanges sort */
	$('.graph-prices__sort').click(function (e) {

		if (!$('.exch-form').hasClass('progress')) {
			// chage class name by status
			if ($(this).hasClass('desc')) { // state 1
				$(this).removeClass('desc');
				$(this).addClass('asc');
			} else if ($(this).hasClass('asc')) { // state 2
				$(this).removeClass('asc');
				$(this).addClass('desc');
			} else { // default state
				$(this).addClass('asc');
			}

			var getCurrency = $('.exch-form__get > input').attr('data-currency');
			var sendCurrency = $('.exch-form__send > input').attr('data-currency');
			if ($('.graph-prices__price.send-prices__rate').hasClass('hidden')) {
				$(this).html('1' + getCurrency + ' ≈ ');
			} else {
				$(this).html('1' + sendCurrency + ' ≈ ');
			}
			$('.graph-prices__price.send-prices__rate').toggleClass('hidden')
			$('.graph-prices__price.get-prices__rate').toggleClass('hidden')
		}

		// // sort items
		// var list = $('.graph-prices__list');
		// var items = list.children();

		// var order = $(this).hasClass('asc');
		// items.sort(function(a, b){
		// 	var priceA = $(a).find('.graph-prices__price').clone().children().remove().end().text().trim();			
		// 	var priceB = $(b).find('.graph-prices__price').clone().children().remove().end().text().trim();
		// 	return order ? (parseFloat(priceA) - parseFloat(priceB)) : (parseFloat(priceB) - parseFloat(priceA));
		// });
		// list.append(items);

		// // update progressbar array
		// updateProgressBar();

		e.preventDefault();
	});

	/* Chat list filter */
	$('.chats-search__input').keyup(function () {
		var searchString = $(this).val().toUpperCase();
		$(this).closest('.c-block__col').find('.chats-list .chats-list__item').each(function (index, item) {
			// show all
			$(item).removeClass('hidden');
			// remove old span tags
			$(item).find('.chats-list__name').text($(item).find('.chats-list__name').text().replace(/<[^>]+>/g, ''));
			if (searchString.trim() != '') {
				// if item not contain searchString
				if ($(item).find('.chats-list__name').text().toUpperCase().indexOf(searchString) == -1) {
					$(item).addClass('hidden');
				}
				// if contain
				else {
					var searchStringGlobal = new RegExp(searchString, "g");
					// add span tags for highlight
					var newTextValue = $(item).find('.chats-list__name').text().toUpperCase().replace(searchStringGlobal, '<span>' + searchString + '</span>')
					$(item).find('.chats-list__name').html(newTextValue);
				}
			}
		});
	});

	/* teleram menu */
	$('#telegramOverlay').click(closeTelegramMenu);

	function closeTelegramMenu() {
		$('#telegramOverlay, #telegramMenu, #telegramSetting').removeClass('open');
	}

	$('.chat-head__back').click(function () {
		$('#telegramOverlay, #telegramMenu').addClass('open');
	});

	$('#settings').click(function (e) {
		e.preventDefault();
		if ($('#telegramOverlay, #telegramSetting').hasClass('open')) {
			$('#telegramOverlay, #telegramSetting').removeClass('open');
		}
		else{
			$('#telegramOverlay, #telegramSetting').addClass('open');
		}
	});
	$('.toggle').minitoggle();


});