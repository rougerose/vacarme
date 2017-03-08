<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

// css espace privé
function vacarme_header_prive($flux) {
    $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'css/vacarme_prive.css" />';
    return $flux;
}

// css espace public
function vacarme_insert_head_css($flux) {
  $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'js/flexslider/flexslider.css" />';
  $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'js/owl-carousel/owl.carousel.css" />';
  $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'css/vacarme.min.css" />';

  return $flux;
}

// cron

// fonction désactivée pour le moment. La date de rédaction n'étant pas disponible
// pour tous les articles (hors secteur 115), le tri par date_redac dans la recherche
// est donc faussé. Le tri dans la recherche se fera sur la date de publication
// pour le moment.

function vacarme_taches_generales_cron($taches_generales) {
    // $taches_generales['ajouter_date_redac_articles'] = 60*10;
    return $taches_generales;
}

?>
