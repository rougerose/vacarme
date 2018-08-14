$(function(){
'use strict';
// =====================================
// panier-mini
// =====================================

var $body = $('body'),
	$panierMini = $('#panierMini'),
	$main = $('#main'),
	$fermerPanier = $('.js-fermer-panier'),
	$triggerPanier = $('.js-icone-panier'),
	$overlay = $('.js-panier-mini-overlay');

// ajouter un article
$main.on('click', '.js-update-panier', updatePanier);

// fermer le mini-panier
$fermerPanier.on('click', togglePanier);

// icone du panier : sur la page panier, cela ne provoque rien ; sur les autres
// pages, ouverture du mini-panier.
$triggerPanier.on('click', 'a', actionPanier);


/**
 * Mettre à jour le panier, via le rechargement ajax
 *
 * Un timer semble nécessaire pour attendre que l'ajout en base et en session
 * soit effectif avant le rechargement.
 * 
 */
function updatePanier() {
	var timer;
	window.clearTimeout(timer);
	timer = window.setTimeout(rechargerBlocs, 500);
}

/**
 * Rechargement en ajax de l'icone (nombre d'articles dans le panier) 
 * et de la liste des articles dans le mini-panier
 * 
 */
function rechargerBlocs() {
	ajaxReload('panierMini', {
		callback: togglePanier
	});
	ajaxReload('iconePanier');
}

/**
 * Déterminer la page courante et ouvrir le mini-panier
 * si le visiteur n'est pas déjà sur la page panier. 
 * 
 * @param  event e [description]
 */
function actionPanier(e) {
	e.preventDefault();
	if (window.location.href.indexOf('panier') == -1) {
		togglePanier();
	}
}


/**
 * Changement alternatif de toutes les classes liées à l'ouverture du mini-panier
 * 
 * @param  event e
 */
function togglePanier(e) {
	$panierMini.toggleClass('est-ouvert');
	$overlay.toggleClass('est-visible');
	// pas de scroll sur la fenêtre principale qui est en arrière-plan.
	$body.toggleClass('u-noscroll');
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