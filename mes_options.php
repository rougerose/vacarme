<?php
// include("/usr/local/share/shim/www/_securite_/ecran_securite.php");

$type_urls = "html";

define ('_ID_WEBMESTRES', '1:153');

# Variables de personnalisation pour les petites majucules:
$GLOBALS['debut_smallcaps'] = '<span class="PetitesCaps">';
$GLOBALS['fin_smallcaps'] = '</span>';

# Variables de personnalisation pour le texte en exposant
$GLOBALS['debut_exposant'] = '<sup class="spip">';
$GLOBALS['fin_exposant'] = '</sup>';


function avant_typo($texte) {

	$chercher_raccourcis = array(
		/*  3 */	"/<-->/",
		/*  4 */	"/-->/",
		/*  5 */	"/<--/");

	$remplacer_raccourcis = array(
		/*  3 */	"&harr;",
		/*  4 */	"&rarr;",
		/*  5 */	"&larr;");

	return preg_replace($chercher_raccourcis, $remplacer_raccourcis, $texte);

}

function avant_propre($texte) {

	$chercher_raccourcis = array(
		/*  1 */	"/\{0\{/",
		/*  2 */	"/\}0\}/",
		/*  3 */	"/\{1\{/",
		/*  4 */	"/\}1\}/",
		/*  5 */	"/\{2\{/",
		/*  6 */	"/\}2\}/",
		/*  7 */	"/\{3\{/",
		/*  8 */	"/\}3\}/",
		/*  9 */	"/\[\*/",
		/* 10 */	"/\*\]/",
		/* 11 */	"/\[\^/",
		/* 12 */	"/\^\]/");

	$remplacer_raccourcis = array(
		/*  1 */	"<@@SPIP_debut_intertitre_0@@>",
		/*  2 */	"<@@SPIP_fin_intertitre_0@@>",
		/*  3 */	"<@@SPIP_debut_intertitre@@>",
		/*  4 */	"<@@SPIP_fin_intertitre@@>",
		/*  5 */	"<@@SPIP_debut_intertitre_2@@>",
		/*  6 */	"<@@SPIP_fin_intertitre_2@@>",
		/*  7 */	"<@@SPIP_debut_intertitre_3@@>",
		/*  8 */	"<@@SPIP_fin_intertitre_3@@>",
		/*  9 */	"__SPIP_debut_smallcaps__",
		/* 10 */	"__SPIP_fin_smallcaps__",
		/* 11 */	"__SPIP_debut_exposant__",
		/* 12 */	"__SPIP_fin_exposant__");

	return preg_replace($chercher_raccourcis, $remplacer_raccourcis, $texte);

}

function apres_propre($texte) {


	# Intertitre -1 (intertitre de niveau supérieur à l'intertitre usuel de spip)
	global $debut_intertitre_0, $fin_intertitre_0;
	tester_variable('debut_intertitre_0', "\n<h2 class=\"spip\">");
	tester_variable('fin_intertitre_0', "</h2>");
	$texte = ereg_replace('(<p class="spip">)?[[:space:]]*<@@SPIP_debut_intertitre_0@@>', $debut_intertitre_0, $texte);
	$texte = ereg_replace('<@@SPIP_fin_intertitre_0@@>[[:space:]]*(</p>)?', $fin_intertitre_0, $texte);


	# Intertitre de deuxième niveau
	global $debut_intertitre_2, $fin_intertitre_2;
	tester_variable('debut_intertitre_2', "\n<h4 class=\"spip\">");
	tester_variable('fin_intertitre_2', "</h4>");
	$texte = ereg_replace('(<p class="spip">)?[[:space:]]*<@@SPIP_debut_intertitre_2@@>', $debut_intertitre_2, $texte);
	$texte = ereg_replace('<@@SPIP_fin_intertitre_2@@>[[:space:]]*(</p>)?', $fin_intertitre_2, $texte);

	# Intertitre de troisième niveau
	global $debut_intertitre_3, $fin_intertitre_3;
	tester_variable('debut_intertitre_3', "\n<h5 class=\"spip\">");
	tester_variable('fin_intertitre_3', "</h5>");
	$texte = ereg_replace('(<p class="spip">)?[[:space:]]*<@@SPIP_debut_intertitre_3@@>', $debut_intertitre_3, $texte);
	$texte = ereg_replace('<@@SPIP_fin_intertitre_3@@>[[:space:]]*(</p>)?', $fin_intertitre_3, $texte);

	# Traitement des petites majuscules
	global $fin_smallcaps, $debut_smallcaps;
	tester_variable('debut_smallcaps', '<span class="PetitesCaps">');
	tester_variable('fin_smallcaps', '</span>');
	$texte = str_replace('__SPIP_debut_smallcaps__', $debut_smallcaps, $texte);
	$texte = str_replace('__SPIP_fin_smallcaps__', $fin_smallcaps, $texte);

	# Traitement des exposants
	global $fin_exposant, $debut_exposant;
	tester_variable('debut_exposant', '<sup class="spip">');
	tester_variable('fin_exposant', '</sup>');
	$texte = str_replace('__SPIP_debut_exposant__', $debut_exposant, $texte);
	$texte = str_replace('__SPIP_fin_exposant__', $fin_exposant, $texte);

	global $activer_antispam;
	if($activer_antispam && function_exists('anti_spam'))
		return anti_spam($texte);
	else
		return $texte;
}
?>