var CompanyDetailsActions = require('./react/stores/companyDetailsStore.js');
var MenuItemsActions = require('./react/stores/menuItemsStore.js');

export function showScreen(screenId){
  //  var aniOut = 'transition.flipXOut';
  //  var aniIn = 'transition.flipXIn'; // 'transition.flipXIn';
  var aniOut = 'transition.slideLeftOut';
  var aniIn = 'transition.slideRightBigIn'; // 'transition.flipXIn';
    var screenId = '#'+screenId;

    if( $(screenId).length ){
        $('.screen-toggle').removeClass('active');
        console.log('showScreen: Screen = '+screenId);

        easyVelocity('.page-wrapper', aniOut, function(){
            easyVelocity(screenId, aniIn, function(){
              // im done yo
            });
        });

        $(this).addClass('active');
        $(screenId).addClass('screen-active');
    } else console.log('showScreen: Screen not exists. ID: '+screenId);
}

$(function() {

    showScreen('pageMain');


    $(document).on('click', '#buttonReturnShop', function(event) {
        showScreen('pageMain');
    });

/*
    $(document).on('click', '.company-toggle', function(event) {
        var company = $(this).data('company');
        console.log('CompanyToggle: Toggling: ', company);
        currentCompany = company;
        console.log(CompanyDetailsActions);
        CompanyDetailsActions.updateData(company);
        MenuItemsActions.updateData(company);
        showScreen('pageCompany');
    });*/

    $(document).on('click', '.screen-toggle', function(event) {
        event.preventDefault();
        var screenId = $(this).data('screen');
        showScreen(screenId);
    });

});

$(function() {

    var hash = window.location.hash.replace("#", "");

    if(hash !== ''){
      console.log('Hash = '+hash);
      showScreen(hash);
    }

    $(document).on('click', '#buttonReturnShop', function(event) {
        showShop();
    });
});
