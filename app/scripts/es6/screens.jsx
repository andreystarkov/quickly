var CompanyDetailsActions = require('./react/companyDetails.react.jsx');
var MenuItemsActions = require('./react/menuItems.react.jsx');

function showScreen(screenId){
    var aniOut = 'transition.flipXOut';
    var aniIn = 'transition.flipXIn';

    var screenId = '#'+screenId;

    $('.screen-toggle').removeClass('active');

    easyVelocity('.page-wrapper', aniOut, function(){
        easyVelocity(screenId, aniIn, function(){
          // im done
        });
    });

    $(this).addClass('active');

    console.log('showScreen: Toggling To = '+screenId);

    $(screenId).addClass('screen-active');
}

$(function() {

    $(document).on('click', '.company-toggle', function(event) {
        var company = $(this).data('company');
        console.log('CompanyToggle: Toggling: ', company);
        currentCompany = company;
        console.log(CompanyDetailsActions);
        CompanyDetailsActions.updateData(company);
        MenuItemsActions.updateData(company);
        showScreen('pageCompany');
    });

    $(document).on('click', '.screen-toggle', function(event) {
        event.preventDefault();
        var aniOut = 'transition.flipXOut';
        var aniIn = 'transition.flipXIn';

        var screenId = '#'+$(this).data('screen');

        $('.screen-toggle').removeClass('active');

        easyVelocity('.page-wrapper', aniOut, function(){
            easyVelocity(screenId, aniIn, function(){
              // im done
            });
        });

        $(this).addClass('active');

        console.log('Screens: Toggling To = '+screenId);

        $(screenId).addClass('screen-active');
    });

});
