$(document).ready(function() {
    
    // Formulaire recherche dans colorbox/mediabox
    $("#btn-nav-search,#btn-search").colorbox({
        opacity: '0.95',
        transition: 'fade',
        inline:true, width:'80%',
        onComplete:function(){
            $("#recherche").focus();
        }
    });
    // search
    /*$("#search").each(function(){
        var search = $(this);
        var raccourcis = search.prev("div");
        $("#btn-search,#btn-search-nav").click(function(e){
            search.toggleClass("search-bar--open");
            raccourcis.toggleClass("nav-raccourcis--search-bar-open");
            e.preventDefault();
        });
        if ($("html.page_recherche").length) {
            search.addClass("search-bar--open");
        }
    });*/

    // accordeon
    /*$("#accordeon").each(function(){
        var $accordeon = $(this),
        $header = $accordeon.find(".accordeon__header"),
        $content =  $accordeon.find(".accordeon__content"),
        $link = $accordeon.find(".accordeon__link");
        $link.click(function(){
            var $a = $content.filter(this.hash),
            $a_id = $a.attr("id"),
            $open = $content.filter(".accordeon__content--opened");
            $(this).toggleClass("accordeon__link--close");
            if ($open) {
                var $open_id = $open.attr("id");
                if ($a_id == $open_id) {
                    $open.slideUp(600).removeClass('accordeon__content--opened');
                } else {
                    $open.slideToggle(600).toggleClass('accordeon__content--opened').prev('header').find('.accordeon__link').removeClass("accordeon__link--close");
                    $a.slideToggle(600).toggleClass('accordeon__content--opened');
                }
            } else {
                $a.slideToggle(600).toggleClass('accordeon__content--opened');
            }
            return false;
        });
    });*/

    // flexslider
    $('#flexslider').flexslider({
       animation: "slide",
       slideshow: false,
       controlNav: false,
       prevText: "&#12296;",
       nextText: "&#12297;",
       start: function(slider){
         slider.viewport.css({"overflow":"visible"});
         slider.newSlides.css({'opacity':0.3});
         slider.slides.eq(slider.currentSlide).fadeTo('slow',1);
        },
        before: function(slider) {
            slider.slides.fadeTo('slow',0.3);
        },
        after: function(slider) {
            // console.log(slider.currentSlide);
            slider.slides.eq(slider.currentSlide).fadeTo('slow',1);
        }
    });

    // tabs jquery ui
    //$( "#tabs" ).tabs();
});