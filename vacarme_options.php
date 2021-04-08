<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

// Activer les rapports d’erreurs PHP
error_reporting(E_ALL^E_NOTICE);
ini_set('display_errors', 'On');

// Afficher toutes les erreurs dans SPIP
define('SPIP_ERREUR_REPORT', E_ALL);

// zcore
if (!isset($GLOBALS['z_blocs'])) {
	$GLOBALS['z_blocs'] = array(
		'content',
		'head',
		'head_js',
		'header',
	);
}
