function initTabs() {
    $(document).on('click', 'ul.tabs li', function(event) {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $('#' + tab_id).addClass('current');
    });
}

$(document).on('click', '.tab-toggle', function(event) {
    var aniInClass = 'fadeOutRight animated';
    var aniOutClass = 'slideOutLeft animated';
    var groupClass = '.'+$(this).parent().data('tabs');

    event.preventDefault();

    console.log('Tabs: Toggling');

    $('.button', $(this).parent()).removeClass('active');

    $(this).addClass('active');

    console.log('Tabs: Group = '+groupClass);

    $(groupClass).removeClass('tab-active');

    var theTab = $(this).attr('href');

    $(theTab).addClass('tab-active animated fadeInRight');

});

function selectTab(tabId, callback){
//    $('a[href="'+tabId+'"]').click();
    if (callback) callback();
}

