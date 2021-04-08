<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}


/**
 * Filtre |prenom_nom
 *
 * Transformer la chaîne Nom*Prénom en Prénom Nom
 *
 * @param  string $texte Nom*Prénom
 * @return string Prénom Nom
 */
function filtre_prenom_nom($texte) {
  return prenom_nom($texte);
}


/**
 * Transformer la chaîne Nom*Prénom en Prénom Nom
 *
 * @param  string $texte Nom*Prénom
 * @return string Prénom Nom
 */
function prenom_nom($texte) {
	if (strstr($texte, '*')) {
		$prenom = prenom($texte);
		$nom = nom($texte);
		if ($prenom && $nom) {
			return $prenom.'&nbsp;'.$nom;
		} else {
			$prenom.$nom;
		}
	} else {
		return $texte;
	}
}


/**
 * Extraire le prénom de la chaîne Nom*Prénom
 *
 * @param  string $texte Nom*Prénom
 * @return string Prénom
 */
function prenom($texte) {
	if (strstr($texte, '*')) {
		if ($prenom = trim(preg_replace('#^(.*)\*(.*)#', '$2', $texte))) {
			return $prenom;
		} else {
			return '';
		}
	} else {
		return '';
	}
}


/**
 * Extraire le nom de la chaîne Nom*Prénom
 *
 * @param  string $texte Nom
 * @return string Nom
 */
function nom($texte) {
	if (strstr($texte, '*')) {
		if ($nom = trim(preg_replace('#^(.*)\*(.*)#', '$1', $texte))) {
			return $nom;
		} else {
			return '';
		}
	} else {
		return '';
	}
}
