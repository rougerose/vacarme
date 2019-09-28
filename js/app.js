$(function(){
'use strict';
// =====================================
// a11y-dialog init
// =====================================

// utilise :
// 'node_modules/a11y-dialog/a11y-dialog.min.js',
// 'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js'

var html = document.documentElement,
	dialogSearchBox = document.getElementById('dialogSearchBox');

if (dialogSearchBox != null) {
	var dialogSBInstance = new A11yDialog(dialogSearchBox, html);
	console.log(dialogSBInstance);
	dialogSBInstance.on('show', function (dialogSearchBox, triggerEl) {
		bodyScrollLock.disableBodyScroll(dialogSearchBox);
	});
	dialogSBInstance.on('hide', function(dialogSearchBox, triggerEl) {
		bodyScrollLock.enableBodyScroll(dialogSearchBox);
	});
}

// =====================================
// Search form
// =====================================


var $searchBox = $('.c-search-box');
var $searchInput = $searchBox.find('input.search');

$searchInput.on('focus focusout', searchBoxIsFilled);

function searchBoxIsFilled(event) {
	var $el = $(this);
	var $parent = $el.parent();

	if ('' !==  $el.val()) {
		$el.addClass('is-filled');
		$parent.addClass('is-filled');
	} else {
		$el.removeClass('is-filled');
		$parent.removeClass('is-filled');
	}

	if (event.type === 'focus') {
		$el.addClass('is-filled');
		$parent.addClass('is-filled');
	}
}

// =====================================
// site-nav
// =====================================

var siteNav = $(".js-site-nav"),
	menuToggle = $(".js-menu-toggle");

menuToggle.on("click", function(){
	siteNav.toggleClass("is-open");
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
		$tabs_lien = $tabs.find("> a"),
		$panels = $el.find("#tabs-contenu section"),
		selected_section = "tabs-section--is-selected nav-item--is-active",
		selected_item = "tabs-nav__item--is-selected nav-item--is-active";

		$tabs.click(function(){
			$tabs_lien.removeClass("on");
			var $lien = $(this).find("> a").addClass("on"),
			id = $lien.attr("href");
			$panels.hide().removeClass(selected_section).filter(id).show().addClass(selected_section);
			$tabs.removeClass(selected_item);
			$(this).addClass(selected_item);
			return false;
		}).filter(':first').click();
	};
}

});