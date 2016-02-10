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

function initTabs(){
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });
}

function removeHoverCSSRule() {
  if ('createTouch' in document) {
    try {
      var ignore = /:hover/;
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (!sheet.cssRules) {
          continue;
        }
        for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
          var rule = sheet.cssRules[j];
          if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
            sheet.deleteRule(j);
          }
        }
      }
    }
    catch(e) {
        console.log(e);
    }
  }
}

function appendEach(obj, what){
    $(obj).each(function(){
        $(this).append(what);
    });
}

$(function() {
    $.material.init();

    removeHoverCSSRule();
    initTabs();

    $('#reservation-datetime').datetimepicker({
        inline: true,
        locale: moment.locale('ru'),
        icons: {
            time: 'picker-time glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        }
    });

    appendEach('.the-room .point.free', '<i class="icon-anchor"></i>');
    $('.picker-time').append('<i>Выбрать время</i>');

    $('.the-room .point.free').click(function(){
        $(this).toggleClass('mine');
    });

    // $('.bootstrap-datetimepicker-widget a[data-action]').append('Выбрать время');
    $('.tab-toggle').click(function(event){
        var aniInClass = "fadeOutRight animated";
        var aniOutClass = "slideOutLeft animated";
        $('.buttons-tabs .button').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
        $('.tab-active').removeClass('tab-active');
        var theTab = $(this).attr('href');
        $(theTab).addClass('tab-active bounceInRight animated');
    });

    $('.control-minus').click(function(){
        var curr = $('input', $(this).parent());
        if( !(curr.val() <= 1) ){
         curr.val( parseInt(curr.val())-1 );
        }
    });

    $('.control-plus').click(function(){
        var curr = $('input', $(this).parent());
        curr.val( parseInt(curr.val())+1 );
    });

    initSlideRange('#control-price', [400, 1500], {
        'min': 300,
        'max': 2000
    }, '#filter-price-min', '#filter-price-max');

    $('.button-open').click(function(){
        $(this).parent().removeClass('mobile');
    });

    $('.button-close').click( function() {
        $(this).parent().addClass('mobile');
    });
});

/* checkout */

(function() {
    [].slice.call( document.querySelectorAll( '.checkout' ) ).forEach( function( el ) {
        var openCtrl = el.querySelector( '.checkout-button' ),
            closeCtrl = el.querySelector( '.checkout-cancel' ),
            closeMenuCtrl = el.querySelector( '.button-close' );

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