<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

function vacarme_declarer_tables_objets_sql($tables) {
	$tables['spip_auteurs']['roles_titres']['intervieweur'] = 'vacarme:intervieweur';
	$tables['spip_auteurs']['roles_objets']['articles']['choix'][] = 'intervieweur';
	return $tables;
}
