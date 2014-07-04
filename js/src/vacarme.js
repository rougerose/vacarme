
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

    // owl.carousel
    $("#videos-carousel").owlCarousel({
        items:3,
        navigation:true,
        itemsDesktop : [1024,3], //5 items between 1000px and 901px
        itemsDesktopSmall : false, // betweem 900px and 601px
        itemsTablet: [480,2], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });

    //tabs (media-query lap-and-up via modernizr)
    if (Modernizr.mq('(min-width: 481px)')) {
        if ($("#tabs").length) {
            var $el = $("#tabs"),
            $tabs = $el.find("#tabs-nav > ul > li"),
            $panels = $el.find("#tabs-contenu section");

            $tabs.click(function(){
                var id = $(this).find("> a").attr("href");
                $panels.hide().removeClass("tabs-section--is-selected").filter(id).show().addClass("tabs-section--is-selected");
                $tabs.removeClass("tabs-nav__item--is-selected");
                $(this).addClass("tabs-nav__item--is-selected");
                return false;
            }).filter(':first').click();
        };
    }
});
