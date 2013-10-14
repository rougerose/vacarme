<?php 
if (!defined('_ECRIRE_INC_VERSION')) return;

function prenom_nom($texte) {
    if (strstr($texte, "*")) {
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

function prenom($texte) {
    if(strstr($texte,"*")) {
        if ($prenom = trim(preg_replace('#^(.*)\*(.*)#', '$2', $texte))) {
            return $prenom;
        } else {
            return "";
        }
    } else {
        return "";
    }
}

function nom($texte) {
    if(strstr($texte,"*")) {
        if ($nom = trim(preg_replace('#^(.*)\*(.*)#', '$1', $texte))) {
            return $nom;
        } else {
            return "";
        }

    } else {
        return "";
    }
}

function initiale_az($texte) {
    $encoding = 'UTF-8';
    $initiale = mb_substr($texte, 0,1,$encoding);
    $initiale = mb_strtoupper($initiale,$encoding);
    $accents = array('À' => 'A', 'Â' => 'A', 'Ä' => 'A', 'Æ' => 'A', 'É' => 'E', 'È' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ñ' => 'N', 'Œ' => 'O', 'Û' => 'U', 'Ù' => 'U', 'Ú' => 'U');
    // ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ
    $initiale = strtr($initiale,$accents);
    return $initiale;
}

function array_sort($tableau) {
    sort($tableau);
    return $tableau;
}

function intro($texte) {
    // l'utisation de <intro> et <poesie> perturbait la fonction.
    // on récupère un bout de la fonction de filtre_introduction_dist dans le code (récent) de spip
    // http://trac.rezo.net/trac/spip/browser/spip/ecrire/public/composer.php#filtre_introduction_dist
    $intro = '';
    $texte = preg_replace(",(</?)intro>,i", "\\1intro>", $texte); // minuscules
    while ($fin = strpos($texte, "</intro>")) {
        $zone = substr($texte, 0, $fin);
        $texte = substr($texte, $fin + strlen("</intro>"));
        if ($deb = strpos($zone, "<intro>") OR substr($zone, 0, 7) == "<intro>")
            $zone = substr($zone, $deb + 7);
        $intro .= $zone;
    }
    if (strlen($intro))
        $texte = $intro;
    return $texte;
}

?>