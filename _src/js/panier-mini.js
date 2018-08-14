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
