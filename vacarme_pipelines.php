<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

// css spécifiques
function vacarme_header_prive_css($flux) {
    $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'css/vacarme_prive.css" />';
    return $flux;
}
?>