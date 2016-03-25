function initSlideRange(obj, units, range, bindMin, bindMax) {
    if ( $(obj).length > 0 ) $(obj).noUiSlider({
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
        min.val(parseInt(value[0]));
        max.val(parseInt(value[1]));
    });
    return $(obj);
}

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
