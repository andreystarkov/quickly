/* q */

function initSlideRange(obj, units, range, bindMin, bindMax) {
    $(obj).noUiSlider({
        start: units,
        step: 10,
        margin: 20,
        connect: true,
        range: range
    });

    var min = $(bindMin),
        max = $(bindMax);
    min.val(parseInt(units[0]));
    max.val(parseInt(units[1]));
    $(obj).on('change', function() {
        var value = $(this).val();
        min.val(parseInt(value[0]));
        max.val(parseInt(value[1]));
    });
    return $(obj);
}

$(function() {
    $.material.init();

    initSlideRange('#control-price', [400, 1500], {
        'min': 300,
        'max': 2000
    }, '#filter-price-min', '#filter-price-max');
    $('#sidebar').click(function(){
        $(this).removeClass('mobile');
        console.log('lalds');
    })

    $('#menu-close').click( function() {
        console.log('666');
        $('#sidebar').addClass('mobile');
    });
});

/* checkout */

(function() {
    [].slice.call( document.querySelectorAll( '.checkout' ) ).forEach( function( el ) {
        var openCtrl = el.querySelector( '.checkout-button' ),
            closeCtrl = el.querySelector( '.checkout-cancel' );

        openCtrl.addEventListener( 'click', function(ev) {
            ev.preventDefault();
            classie.add( el, 'checkout-active' );
            $('.overlay').addClass('visible');
        });

        closeCtrl.addEventListener( 'click', function() {
            classie.remove( el, 'checkout-active' );
            $('.overlay').removeClass('visible');
        });
    });
})();