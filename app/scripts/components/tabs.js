function initTabs() {
    $(document).on('click', 'ul.tabs li', function(event) {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
}

$(document).on('click', '.tab-toggle', function(event) {
    var aniInClass = "fadeOutRight animated";
    var aniOutClass = "slideOutLeft animated";
    $('.buttons-tabs .button').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
    $('.tab-active').removeClass('tab-active');
    var theTab = $(this).attr('href');
    $(theTab).addClass('tab-active animated fadeInRight');
});