/*
      ___           ___                       ___           ___           ___       ___
     /\  \         /\__\          ___        /\  \         /\__\         /\__\     |\__\
    /::\  \       /:/  /         /\  \      /::\  \       /:/  /        /:/  /     |:|  |
   /:/\:\  \     /:/  /          \:\  \    /:/\:\  \     /:/__/        /:/  /      |:|  |
   \:\~\:\  \   /:/  /  ___      /::\__\  /:/  \:\  \   /::\__\____   /:/  /       |:|__|__
    \:\ \:\__\ /:/__/  /\__\  __/:/\/__/ /:/__/ \:\__\ /:/\:::::\__\ /:/__/        /::::\__\
     \:\/:/  / \:\  \ /:/  / /\/:/  /    \:\  \  \/__/ \/_|:|~~|~    \:\  \       /:/~~/~
      \::/  /   \:\  /:/  /  \::/__/      \:\  \          |:|  |      \:\  \     /:/  /
      /:/  /     \:\/:/  /    \:\__\       \:\  \         |:|  |       \:\  \    \/__/
     /:/  /       \::/  /      \/__/        \:\__\        |:|  |        \:\__\
     \/__/         \/__/                     \/__/         \|__|         \/__/

*/

$(function() {

    var userInfo = {};
    var profile = {};

    $('body').css({'min-height': '100vh'});
    $('html').css({'height': '100%'});

    setTimeout(function(){
        profile = userInfo;
        setStorage('user', profile);
    },0);

    theReservation.contents = getStorage('theReservation');

   // removeHoverCSSRule();
    initTabs();

    $.material.init();

    var isMobile = false;

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    if(isMobile){
      $(document).on('click', '.food-item', function(event){
        var link = $(this); //preselect the link
        if (link.hasClass('open')) {
            return true;
        } else {
            link.addClass('open');
            $('.food-item').not(this).removeClass('open');
            e.preventDefault();
            return false; //extra, and to make sure the function has consistent return points
        }
      });
    }

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "340",
      "hideDuration": "400",
      "timeOut": "2000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

    swal.setDefaults({
        customClass: 'the-window',
        animation: true,
        buttonStyling: false,
        confirmButtonClass: 'modal-button-confirm',
        cancelButtonClass: 'modal-button-cancel',
        padding: 25
    });

    if(isMobile) $('#sidebar').appendTo(document.body);


    $('.tip').tooltip({ animation:true, });

    $('.picker-time').append('<i>Выбрать время</i>');

    $('.the-room .point.free').click(function(){
        $(this).toggleClass('mine');
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

    // testing

   // pasteCategories(1);

    pasteComments(1);

    $('#buttonEditProfile').click(function(){
        showProfile();
    });

    if (userToken === undefined || userToken  === null) {
        if(userPhone){
            waitingForCode();
        } else notAuthorized();
    } else {
        userAuthorized();
    }

});
