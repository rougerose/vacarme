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

// Supprimer les caractères accentués sur la première lettre d'une chaîne.
// Si couper = non, la chaîne est reconstituée sur 31 caractères.
function desaccentuer($texte,$couper='oui') {
    $encoding = 'UTF-8';
    $t = trim($texte);
    $initiale = mb_strtoupper(mb_substr($t,0,1,$encoding),$encoding);
    $accents = array('À' => 'A', 'Â' => 'A', 'Ä' => 'A', 'Æ' => 'A', 'É' => 'E', 'È' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ñ' => 'N', 'Œ' => 'O', 'Û' => 'U', 'Ù' => 'U', 'Ú' => 'U');
    $t_initiale = strtr($initiale,$accents);
    if ($couper == 'non') {
        $t_suite = mb_strtoupper(mb_substr($t,1,30,$encoding),$encoding);
        $txt = $t_initiale.$t_suite;
        return $txt;
    }
    return $t_initiale;
}

// Supprimer l'article au début d'une chaîne : la,le,les,l',des,du,de,d'. 
// Et désaccentuation de la première lettre.
function sans_article($texte) {
    $encoding = 'UTF-8';
    $t = trim($texte);
    $recherche = '#^(\bles?|l\'|le|la|des?|d\'|de|du\b)#ui';
    $remplacement = '';
    $t = mb_strtoupper(trim(preg_replace($recherche,$remplacement,$t)),$encoding);
    $texte = desaccentuer($t,'non');
    return $texte;
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

function tri_array($tableau,$ordre) {
    if ($ordre == 'inverse') {
        krsort($tableau);
    } else {
        ksort($tableau);
    }
    return $tableau;
}

function tri_tableau(&$array, $key,$reverse=false) {
    $sorter=array();
    $ret=array();
    reset($array);
    foreach ($array as $ii => $va) {
        $sorter[$ii]=$va[$key];
    }
    ($reverse)? arsort($sorter) : asort($sorter);
    foreach ($sorter as $ii => $va) {
        $ret[$ii]=$array[$ii];
    }
    $array=$ret;
    return $array;
}

/**
*
* Fonction comparaison de date
*
**/
/* 
Pour l'utiliser il faut modifier 
la méthode de calcul de l'age des articles, voir todo.
usage : [(#DATE_NUMERO|date_comparaison{365}|?{oui,non})]
*/

function date_comparaison($date,$jours) {
    $datetime1 = new DateTime($date);
    $datetime2 = new DateTime('now');
    $interval = $datetime1->diff($datetime2);
    $nbre = $interval->format('%a');
    if ($nbre >= $jours) {
        return true;
    } else {
        return false;
    }
}

?>