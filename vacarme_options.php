<?php

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

$GLOBALS['z_blocs'] = ['content', 'bando', 'head', 'head_js', 'header', 'panier', 'aside', 'footer'];

// Debug
// error_reporting(E_ALL^E_NOTICE);
// ini_set ("display_errors", "On");
// define('SPIP_ERREUR_REPORT', E_ALL);
// define('_NO_CACHE', -1);
// define('_INTERDIRE_COMPACTE_HEAD_ECRIRE', true);
// define('_LOG_FILELINE',true);
// define('_LOG_FILTRE_GRAVITE',8);

// intertitres
$GLOBALS['debut_intertitre'] = "\n<h2>";
$GLOBALS['fin_intertitre'] = "</h2>\n";

// Barrière mobile : nombre de jours à partir desquels les articles sont gratuits (complets)
define('_VACARME_GRATUITE', 730);

// Désactiver héritage des logos de rubrique
define('_LOGO_RUBRIQUE_DESACTIVER_HERITAGE', true);
