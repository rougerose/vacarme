$.fn.accordeon = function() {
    var $accordeon = this,
    $bodies = $accordeon.find(".accordeon__body"),
    $header = $accordeon.find(".accordeon__header"),
    $icons = $accordeon.find(".icon-svg");
    $bodies.slideUp("slow");
    $header.click(function(){
        $bodies.slideUp();
        var $icon = $(this).find(".icon-svg");
        if ($icon.hasClass("icon-svg--accordeon--is-open")) {
            $icon.removeClass("icon-svg--accordeon--is-open");
        } else {
            $icons.removeClass("icon-svg--accordeon--is-open");
            $icon.addClass("icon-svg--accordeon--is-open");
            $(this).next().slideDown();
        }
    });
    return this;
}