const toolbarLeftSpacing = 10;
const toolbarTopSpacing = 10;

var scrollbarLeft = $('.toolbar__scroll.scrollbar-left');
var toolbarDropdowns = document.getElementsByClassName('toolbar-drop');

$('.left-bar__scroll.scrollbar-left').scrollbar();
scrollbarLeft.scrollbar({
    "onScroll": function (y, x) {
        if (y.scroll == y.maxScroll) {
            $('.toolbar__scrollup__btn').show();
            $('.toolbar__scrolldown__btn').hide();
            if (y.maxScroll == 0) {
                $('.toolbar__scrollup__btn').hide();
            }
        } else {
            $('.toolbar__scrollup__btn').hide();
            $('.toolbar__scrolldown__btn').show();
        }
        
        for (var i = 0; i < toolbarDropdowns.length; i++) {
            var e = toolbarDropdowns[i];

            if (e.classList.contains('active')) {          
                var oldTopPoint = $(".toolbar__item.active").position().top + toolbarTopSpacing;      
                if (oldTopPoint > 32) {
                    e.style.top = oldTopPoint + 'px';
                } else if (oldTopPoint > ($('#mainChart').height() - e.offsetHeight)) {
                    e.style.top = $('#mainChart').height() - e.offsetHeight - 5 + 'px';
                } else {
                    e.style.top = '32px';
                }
            }
        }
    }

});

/*---------------------------------------------------*/
/* Scroll up/down event for left toolbar */
/*---------------------------------------------------*/
$(".toolbar__scrollup__btn").on("click", function () {
    scrollbarLeft.animate({
        scrollTop: 0
    }, "slow");
});

$(".toolbar__scrolldown__btn").on("click", function () {
    scrollbarLeft.animate({
        scrollTop: scrollbarLeft.prop("scrollHeight") - scrollbarLeft.outerHeight()
    }, "slow");
});

function closeAllDropdown() {
    var x = document.getElementsByClassName('toolbar-drop');
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove('active');
    }

    $('.toolbar__item').removeClass('active');
}

$('.toolbar__item').click(function(e) {
    e.stopPropagation();
    closeAllDropdown();

    if ($(this).data('dropdown')) {
        var toolbarItem = this;
        var targetDropdown = document.getElementById(toolbarItem.getAttribute('data-dropdown'));
        var toolbarDropBtns;
        
        toolbarItem.classList.add('active');
        targetDropdown.classList.add('active');    

        // change position of target dropdown
        $(targetDropdown).css({
            'top': $(toolbarItem).position().top + toolbarTopSpacing,
            'left': toolbarItem.offsetWidth + toolbarLeftSpacing
        });

        toolbarDropBtns = targetDropdown.getElementsByClassName('toolbar-drop__btn');

        for (var j = 0; j < toolbarDropBtns.length; j++) {
            toolbarDropBtns[j].addEventListener("click", function(e) {
                e.stopPropagation();
                closeAllDropdown();
            });
        }
    }
});
