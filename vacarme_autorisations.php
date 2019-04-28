<?php

if (!defined("_ECRIRE_INC_VERSION")) {
	return;
}

function vacarme_autoriser() {
	//
}


function autoriser_vacarme_configurer($faire, $type, $id, $qui, $opt) {
	return autoriser('webmestre');
}
