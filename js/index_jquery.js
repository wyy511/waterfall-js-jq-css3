$(window).on('load', function() {
    waterfall();
    var dataInt = { "data": [{ "src": '1.jpg' }, { "src": '2.jpg' }, { "src": '3.jpg' }, { "src": '4.jpg' }] }
    $(window).on('scroll', function() {
        if (checkScrollSlide()) {
            var html = '';
            $.each(dataInt.data, function(key, value) {
                html += '<div class="box"><div class="pic"><img src="images/' +
                    $(value).attr('src') + '" alt=""></div></div>'
            })
            $('#main').append(html);
            waterfall();
        }
    })
});

function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis > scrollTop + documentH) ? true : false;
}

function waterfall() {
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth(); //padding/border在内
    var cols = Math.floor($(window).width() / w);
    $('#main').width(cols * w).css('margin', '0 auto');
    var hArr = [];
    $boxs.each(function(index, value) {
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr.push(h);
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            })
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    })
}