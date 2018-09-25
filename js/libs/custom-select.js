var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected basic-select__select");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        // c.addEventListener("click", function (e) {
        //     /*when an item is clicked, update the original select box,
        //     and the selected item:*/
        //     var y, i, k, s, h;
        //     s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        //     h = this.parentNode.previousSibling;
        //     for (i = 0; i < s.length; i++) {
        //         if (s.options[i].innerHTML == this.innerHTML) {
        //             s.selectedIndex = i;
        //             h.innerHTML = this.innerHTML;
        //             y = this.parentNode.getElementsByClassName("same-as-selected");
        //             for (k = 0; k < y.length; k++) {
        //                 y[k].removeAttribute("class");
        //             }
        //             this.setAttribute("class", "same-as-selected");
        //             break;
        //         }
        //     }
        //     h.click();
        // });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        $('.select-selected').removeClass('active');
        $(this).addClass('active');
        var select = this.nextSibling;
        var realSelect = this.previousElementSibling;
        // show select
        if ($(select).hasClass('select-hide')){
            select.classList.remove("select-hide");
            var selectCopy = $(select).clone();
            $(selectCopy).find('div').removeClass('same-as-selected');
            $(selectCopy).find('div').eq($(realSelect).find("option:selected").index()).addClass('same-as-selected');
            $(selectCopy).find('div').eq(0).addClass('hidden');
            $('.absoluteSelect').html('');
            $('.absoluteSelect').append(selectCopy);

            var resultTopPosition = null;
            var selectPosX = $(this).parent().offset().left;
            var selectPosY = $(this).parent().offset().top;
            var selectWidth = $(this).parent().width();
            var selectHeight = $(this).parent().height();
            var absoluteSelectHeight = $('.absoluteSelect').height();

            var wrapperHeight = $('.wrapper').height();
            var heightForSubmenuBottom = wrapperHeight - selectPosY - selectHeight;

            var positionClass = 'to-top';

            // choose position for subMenu
             if (heightForSubmenuBottom > absoluteSelectHeight) {
                resultTopPosition = selectPosY + selectHeight;
                positionClass = '';
            } else {
                resultTopPosition = selectPosY - absoluteSelectHeight;
            }

            $('.absoluteSelect').css({
                'left':selectPosX,
                'top': resultTopPosition,
                'width': selectWidth,
            });
            $('.absoluteSelect').removeClass('to-top').addClass(positionClass);

        }
        // hide select
        else{
            $('.absoluteSelect').html('');
            $('.absoluteSelect').css({
                'left': '-9999px',
            });
            select.classList.add("select-hide");       
        }
        this.classList.toggle("select-arrow-active");
        $('.absoluteSelect .select-items').addClass("scroll-y scrollbar-right outer");
        $('.absoluteSelect .select-items.scrollbar-right').scrollbar();
    });
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
    $('.absoluteSelect').html('');
    $('.absoluteSelect').css({
        'left': '-9999px',
    });
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
window.addEventListener("resize", closeAllSelect);
$('.scroll-y').scroll(closeAllSelect);

$('.absoluteSelect').on('click','div div',function (e) {
    e.stopPropagation();
    var selectedItem = $(this);
    var currentBlock = $('.select-selected.active');
    var currentSelect = $('.select-selected.active').parent().find('select');
    $(currentBlock).html($(selectedItem).html());
    $(currentSelect).val($(selectedItem).html());
    closeAllSelect($(".select-selected .basic-select__select"));
});