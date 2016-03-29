var cuisinesList;
var isAuth;

var currentCompany = 1;

var userSMSCode = Cookies.get('code');
var userToken = Cookies.get('token');
var userPhone = Cookies.get('phone');

var serverUrl = 'http://176.112.201.81';
var imageBaseUrl = 'http://176.112.201.81/static/cdn';
var hallsUrl = 'http://176.112.201.81/static/hallsCdn/';

var currentReservationTime;

var theCart = {
    contents: [],
    summary: []
};

var theReservation = {
    contents: []
};

var cityId = 3;

if (userToken !== undefined) {
    isAuth = 1;
}

function isEmpty(obj) {
    if (obj) return Object.keys(obj).length === 0;
}

function setStorage(itemName, theJSON) {
    localStorage.setItem(itemName, JSON.stringify(theJSON));
}

function getStorage(itemName) {
    var out = JSON.parse(localStorage.getItem(itemName));
    return out;
}

function flyToCart(what) {
    $('#cartBottomPanel').css({'display':'block'});
    var cart = $('.checkout');
    var panel = $('.bottom-panel');
    var dropTo = $('.checkout-total');
    var imgtodrag = what;
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
        .addClass('notransition')
        .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
        .css({
            'opacity': '0.6',
            'position': 'absolute',
            'height': imgtodrag.outerHeight(),
            'width': imgtodrag.outerWidth(),
            'z-index': '8'
        })
        .appendTo($('body'))
        .velocity({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75,
        }, 400, "easeOutSine", function() {

        });

        setTimeout(function() {
	        panel.velocity({
	        	translateY: 10
	        }, 200, function(el){
	        	panel.velocity({ translateY: 0 }, 350, function(){
			        dropTo.velocity({
			        	scale: 1.2,
			        	rotate: 10
			        }, function(el){
			        	dropTo.velocity({ scale: 0.8, rotate: -5}, 150, function(el){
			        		dropTo.velocity({ scale: 1, rotate: 0});
			        	});
			        });
	        	});
	        });
        }, 280);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function() {
            $(this).detach()
        });
    }

}
