$.fn.accordeon = function() {
    var $accordeon = this,
    $bodies = $accordeon.find(".accordeon__body"),
    $buttons = $accordeon.find(".icon-svg--accordeon");
    $bodies.hide();
    $buttons.click(function(){
        $bodies.slideUp();
        if ($(this).hasClass("icon-svg--accordeon--is-open")) {
            $(this).removeClass("icon-svg--accordeon--is-open");
        } else {
            $buttons.removeClass("icon-svg--accordeon--is-open");
            $(this).addClass("icon-svg--accordeon--is-open").parent().next().slideDown();
        }
    });
    return this;
}