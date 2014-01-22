<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

// jquery ui tabs
function vacarme_jqueryui_plugins($scripts){
    $scripts[] = "jquery.ui.tabs";
    return $scripts;
}

// css spécifiques
function vacarme_header_prive_css($flux) {
    $flux .= '<link rel="stylesheet" type="text/css" href="'._DIR_PLUGIN_VACARME.'css/vacarme_prive.css" />';
    return $flux;
}
?>