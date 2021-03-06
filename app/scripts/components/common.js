function getRandom(min, max){
    return Math.random() * (max - min) + min;
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

function easyVelocity(element, animationType, callback){
  $(element).velocity(animationType, {
      duration: 200, complete: callback
  });
}

function createNotice(targetObject, noticeTitle, noticeText){
  var obj = $(targetObject);
  obj.popover({
    animation: true,
    trigger: 'manual',
    placement: 'bottom',
    content: noticeText,
    title: noticeTitle
  });
  obj.on('show.bs.popover', function (e) {
      var $pop = $(this);
      setTimeout(function () {
          $pop.popover('hide');
      }, 3000);
  });
  obj.popover('show');
  return obj;
}

function createPopover(targetObject, noticeTitle, noticeText){
  var obj = targetObject;
  obj.popover({
    trigger: 'manual',
    placement: 'bottom',
    html: true,
    content: noticeText,
    title: noticeTitle,
    show: function(){
      $(this).css({'visibility': 'hidden', scale: 0});
      $(this).velocity({'visibility': 'visible', scale: 1});
    }
  });


  obj.popover('show');
  return obj;
}


function appendEach(obj, what){
    $(obj).each(function(){
        $(this).append(what);
    });
}

function aniMagic(obj, aniClass){
    $(obj).addClass('magictime '+aniClass);
}

function animateThis(obj, aniClass){
    $(obj).addClass('animated '+aniClass)
}


function showProfile(){
    easyVelocity('.page-wrapper', 'transition.flipXOut', function(){
        easyVelocity('#pageProfile', 'transition.flipXIn', function(){
          // boring here
        });
    });
}

function showShop(){
    $('.tab-active').removeClass('animated fadeInRight');
    easyVelocity('.page-wrapper', 'transition.fadeOut', function(){

    });
}

(function () {

    var orig = $.fn.popover,
        proto = $.extend({}, $.fn.popover.Constructor.prototype);

    $.fn.popover = function (options) {
        return this.each(function () {
            orig.call($(this), options);
            if (typeof options.show == 'function') {
                $(this).data('bs.popover').show = function () {
                    options.show.call(this.$tip, this);
                    proto.show.call(this);
                };
            }
        });
    }

})();
