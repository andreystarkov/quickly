function closeCheckout(){

}
(function() {
    [].slice.call( document.querySelectorAll( '.checkout' ) ).forEach( function( el ) {
        var openCtrl = el.querySelector( '.checkout-button' ),
            closeCtrl = el.querySelector( '.checkout-cancel' ),
            closeMenuCtrl = el.querySelector( '.button-close' );

        openCtrl.addEventListener( 'click', function(ev) {
            ev.preventDefault();
            classie.add( el, 'checkout-active' );
            $('.overlay').addClass('visible');
            $('#cartBottomPanel').removeClass('checkout-hidden');
        });

        closeCtrl.addEventListener( 'click', function() {
            classie.remove( el, 'checkout-active' );
            $('.overlay').removeClass('visible');
            $('#cartBottomPanel').addClass('checkout-hidden');
        });
    });
})();
