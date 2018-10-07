<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

$GLOBALS['z_blocs'] = array('content', 'head', 'head_js', 'header', 'panier', 'footer');

// debug
// error_reporting(E_ALL^E_NOTICE);
// ini_set ("display_errors", "On");
// define('SPIP_ERREUR_REPORT',E_ALL);

// intertitres
$GLOBALS['debut_intertitre'] = "\n<h2>";
$GLOBALS['fin_intertitre'] = "</h2>\n";

// Nombre de jours à partir desquels les articles sont gratuits (complets)
define('_VACARME_GRATUITE', 730);

?>
