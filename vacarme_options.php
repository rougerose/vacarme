<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

$GLOBALS['z_blocs'] = array('content', 'head', 'head_js', 'header', 'panier', 'aside', 'footer');

// debug
// error_reporting(E_ALL^E_NOTICE);
// ini_set ("display_errors", "On");
// define('SPIP_ERREUR_REPORT',E_ALL);

// intertitres
$GLOBALS['debut_intertitre'] = "\n<h2>";
$GLOBALS['fin_intertitre'] = "</h2>\n";

// Barrière mobile : nombre de jours à partir desquels les articles sont gratuits (complets)
define('_VACARME_GRATUITE', 730);

// Désactiver héritage des logos de rubrique
define('_LOGO_RUBRIQUE_DESACTIVER_HERITAGE', true);
?>
