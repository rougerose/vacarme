<?php
$GLOBALS['puce'] = "<img src='squelettes/images/commun/Puce.png' alt='-' class='puce'>";

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


function couper_intro($texte, $long) {
	$texte = extraire_multi(eregi_replace("(</?)intro>", "\\1intro>", $texte)); // minuscules
	$intro = '';
	while ($fin = strpos($texte, "</intro>")) {
		$zone = substr($texte, 0, $fin);
		$texte = substr($texte, $fin + strlen("</intro>"));
		if ($deb = strpos($zone, "<intro>") OR substr($zone, 0, 7) == "<intro>")
			$zone = substr($zone, $deb + 7);
		$intro .= $zone;
	}

	if ($intro)
		$intro = $intro.'&nbsp;(...)';
	else {
		$intro = preg_replace(',([|]\s*)+,S', '; ', couper($texte, $long));
	}

	// supprimer un eventuel chapo redirecteur =http:/.....
	return $intro;
}



// Raccourcis supplémentaires pour les intertitres
//*********************************************
# Et on y ajoute quatre nouvelles pour les intertitre :
$GLOBALS['debut_intertitre_2'] = '<h4 class="spip">';
$GLOBALS['fin_intertitre_2'] = '</h4>';
$GLOBALS['debut_intertitre_3'] = '<h5 class="spip">';
$GLOBALS['fin_intertitre_3'] = '</h5>';



function initiale($texte) {
  $texte = substr($texte, 0, 1);
  return $texte;
}
function supprimer_espace ($texte) {
  $texte = preg_replace ('/\s+/','',$texte);
  $texte = htmlentities($texte);
  return $texte;
}

// RECHERCHE
//*********************************************
function google_like($string){
	$query = rtrim(str_replace("+", " ", $_GET['recherche']));  
	$qt = explode(" ", $query);
	$num = count ($qt);
	$cc = ceil(120 / $num);
		for ($i = 0; $i < $num; $i++) {
			$tab[$i] = preg_split("/($qt[$i])/i",$string,2, PREG_SPLIT_DELIM_CAPTURE);
			if(count($tab[$i])>1){
				$avant[$i] = substr($tab[$i][0],-$cc,$cc);
	    	    	        $apres[$i] = substr($tab[$i][2],0,$cc);
		    	        $string_re .= "[...] $avant[$i]<strong>".$tab[$i][1]."</strong>$apres[$i] [...] ";
	       }
	 }
	 return $string_re;
}

/*
 * Fonction prenom_nom()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 *
 * Copyright : GNU Public Licence
 *
 * Si le nom ET le prénom sont présents, on les renvoie concaténés et
 * séparés par un espace insécable, le nom étant passé en majuscules
 *
 * Dans le cas contraire (soit dans le cas où au moins des deux éléments
 * est vide), on renvoie les deux d'un coup (et celui qui n'est pas vide
 * sera affiché). Et s'ils sont tous les deux vides, on renverra du vide,
 * comme il est de bon ton dans ce genre de situation.
 * 
 */
function prenom_nom($texte) {
//	if(strstr(ereg_replace("(@-|@-|@ |@|#-|#_|# |#)","",$texte),"*")) {
  if(strstr(ereg_replace("(@-|@-|@ |@)","",$texte),"*")) {
		if(prenom($texte) && nom($texte))
			return prenom($texte)."&nbsp;".nom($texte);
		else
			return prenom($texte).nom($texte);
	}
	else
		return $texte;
}

/*
 * Fonction prenom_nom()
 * 
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 * 
 * Copyright : GNU Public Licence
 * 
 * Cette fonction :
 * - enlève le signe distinctif des secrétaires de rédaction;
 * - renvoie le prénom après l'avoir passé en minuscules et 
 *   avoir passé l'initiale en majuscules.
 * 
 */
function prenom($texte) {
  $texte = ereg_replace("(@-|@-|@ |@)","",$texte);
//	$texte = ereg_replace("(@-|@-|@ |@|#-|#_|# |#)","",$texte); // On commence par virer le signe distinctif d'un secrétaire de rédaction ou celui d'un traducteur
	if(strstr($texte,"*")) {
		if($prenom = trim(ereg_replace("^(.*)\*(.*)","\\2",$texte))) {
			return harmonise_noms($prenom);
		}
		else {
			if(substr($texte,0,1) == "*")
				return harmonise_noms($texte);
			else
				return "";
		}
	}
	else
		return "";
}

/*
 * Fonction nom()
 * 
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 * 
 * Copyright : GNU Public Licence
 * 
 * Cette fonction :
 * - enlève le signe distinctif des secrétaires de rédaction;
 * - renvoie le nom après l'avoir passé en minuscules et 
 *   avoir passé l'initiale en majuscules
 * 
 */
function nom($texte) {
  $texte = ereg_replace("(@-|@-|@ |@)","",$texte);
//	$texte = ereg_replace("(@-|@-|@ |@|#-|#_|# |#)","",$texte); // On commence par virer le signe distinctif des secrétaires de rédaction
	if(strstr($texte,"*")) {
		if($nom = trim(ereg_replace("^(.*)\*(.*)","\\1",$texte))) {
			return harmonise_noms($nom);
		}
		else {
			if(substr($texte,0,1) == "*")
				return "";
			else
				return harmonise_noms($texte);
		}
	}
	else {
		return $texte;
	}
}

/*
 * Fonction harmonise_noms()
 * 
 * Auteur : François Schreuer <francois@schreuer.org>
 * 
 * Copyright : GNU Public Licence
 * 
 * Harmonise le format de l'affichage des noms.
 * 
 * Vous pouvez changer facilement le modèle qui vous convient
 * en activant la ligne adéquate.
 * 
 */
function harmonise_noms($texte) {

	// Passe tout en minuscule et met les initiales en majuscules
//	return ucwords_amelioree(strtolower(trim(str_replace("*"," ",str_replace("_"," ",$texte)))));

	// Ne fait rien
 return trim($texte);

	// Passe tout en majuscules (avec la fonction idoine de SPIP)
	// return majuscules(trim($texte));

	// Met les initiales en majuscules
	// return ucwords_amelioree(trim($texte));

}


/*
 * Fonction ucwords_amelioree()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 *
 * Copyright : GNU Public Licence
 *
 * Transforme la première lettre de chaque mot (et de chaque
 * partie d'un mot composé) d'une chaîne en majuscule. Convertit
 * aussi les caractères accentués.
 *
 * Par exemple, "jean-édern hallier" devient "Jean-Édern Hallier"
 *
 */
//function ucwords_amelioree($texte) {
/*
	// On commence par les mots qui suivent un espace
	$tableau_1 = explode(" ",$texte);
    for($i=0;$i<sizeof($tableau_1);$i++) {
		$tableau_1[$i] = ucfirst_fr($tableau_1[$i]); }
	$texte = implode(" ",$tableau_1);
	
	// puis un espace insécable
	$tableau_2 = explode("&nbsp;",$texte);
    for($i=0;$i<sizeof($tableau_2);$i++) {
		$tableau_2[$i] = ucfirst_fr($tableau_2[$i]); }
	$texte = implode("&nbsp;",$tableau_2);

	// enfin un tiret
	$tableau_3 = explode("-",$texte);
    for($i=0;$i<sizeof($tableau_3);$i++) {
		$tableau_3[$i] = ucfirst_fr($tableau_3[$i]); }
	$texte = implode("-",$tableau_3);

	// Et on renvoie le tout
	return $texte;
}
*/
/*
 * Fonction ucfirst_fr()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 *
 * Copyright : GNU Public Licence
 *
 * Transforme la première lettre d'une chaîne en majuscule
 * en traitant aussi les caractères accentués. Il s'agit
 * donc d'une version améliorée de ucfirst_fr()
 *
 * NB : Cette fonction a besoin de la fonction majuscules()
 * de SPIP
 *
 */
function ucfirst_fr($chaine) {
	return majuscules(substr($chaine,0,1)).substr($chaine,1);
}

/*
 * Autre écriture possible pour ucwords_amelioree() (nettement
 * plus jolie mais il faut encore implémenter dedans le
 * traitement des caractères français) :
*/
function ucwords_amelioree($texte) {
  return ucwords(preg_replace_callback('`(\w+)(-)(\w+)`','mot_compose',$texte));
}

// Sous-fonction de la précédente
  function mot_compose($match){
    return $match[1].$match[2].ucfirst($match[3]);
    }



?>