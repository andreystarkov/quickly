function initTabs() {
    $(document).on('click', 'ul.tabs li', function(event) {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $('#' + tab_id).addClass('current');
    });
}

function showTab(theTab, group){
    var tabTrigger = $('a[href="'+theTab+'"]');
    var groupClass = tabTrigger.data('tabs');

    console.log('showTab: Toggling Tab = '+theTab);
    console.log('showTab: groupClass = '+groupClass);

    $('.button', tabTrigger.parent()).removeClass('active');
    $('a[href="'+theTab+'"]').addClass('active');

    $(theTab).addClass('tab-active');
}

$(document).on('click', '.tab-toggle', function(event) {
    event.preventDefault();

    var groupClass = '.'+$(this).parent().data('tabs');
    var theTab = $(this).data('tab');

    var aniInClass = 'animated fadeIn';

    console.log('Tabs: Group = '+groupClass);
    console.log('Tabs: Tab = #'+theTab);

    $('.button', $(this).parent()).removeClass('active');
    $(this).addClass('active');

    $(groupClass).removeClass('tab-active '+aniInClass);
    $('#'+theTab).addClass('tab-active '+aniInClass);

});


function selectTab(tabId, callback){
    $('a[href="'+tabId+'"]').click();
    if (callback) callback();
}

$(function() {


});

window.onload = function() {
/*
    if(window.location.hash) {
      var hash = window.location.hash.substring(1);
      console.log('Page Hash: '+hash);
      showTab('#'+hash);
    } else {
      // No hash found
    }*/

};
