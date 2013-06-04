<?php

if (isset($_GET['IDshow'])) {
  @header('HTTP/1.1 500 Internal Server Error');
  die("<a href='/'>/</a>");
}
// webmestres
define ('_ID_WEBMESTRES', '1:153');

// champs extra : restreindre affichage aux rubriques nécessaires
// ISBN
function autoriser_rubrique_isbn_modifierextra_dist($faire, $type, $id, $qui, $opt){
    $id_parent = $opt['contexte']['id_parent'];
    if (!$id_parent) {
        $id_parent = sql_getfetsel("id_parent", "spip_rubriques", "id_rubrique=".intval($id));
    }
    if ($id_parent == 115) {
        return true;
    }
    return false;
}
 function autoriser_rubrique_isbn_voirextra_dist($faire, $type, $id, $qui, $opt) {
    return autoriser('modifierextra', $type, $id, $qui, $opt);
}

// redacs chefs
function autoriser_rubrique_redacteurchef_modifierextra_dist($faire, $type, $id, $qui, $opt){
    $id_parent = $opt['contexte']['id_parent'];
    if (!$id_parent) {
        $id_parent = sql_getfetsel("id_parent", "spip_rubriques", "id_rubrique=".intval($id));
    }
    if ($id_parent == 115) {
        return true;
    }
    return false;
}
function autoriser_rubrique_redacteurchef_voirextra_dist($faire, $type, $id, $qui, $opt) {
    return autoriser('modifierextra', $type, $id, $qui, $opt);
}


?>