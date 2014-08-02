<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

function genie_ajouter_date_redac_articles_dist ($t) {
    //spip_log("Mon travail c est juste une ligne de log....",_LOG_INFO_IMPORTANTE);
    // echo "1";
    if ($resultats = sql_select("*", "spip_articles","id_secteur=115 AND statut='publie' AND date_redac=0000-00-00")) {
        // boucler sur les resultats
        while ($res = sql_fetch($resultats)) {
            // utiliser les resultats

            // hierarchie des rubriques de l'article via la fonction de spip
            include_spip("inc/rubriques");
            $hierarchie = calcul_hierarchie_in($res['id_rubrique'],true);


            // la date_numero et l'id_rubrique de la rubrique Numéro.
            $numero = sql_fetsel("date_numero,id_rubrique","spip_rubriques",array(sql_in('id_rubrique',$hierarchie),'profondeur=1'));

            // la date du numéro est à 0. On ne vérifie que l'année (?)
            if (substr($numero['date_numero'],0,4) == '0000') {
                spip_log("Article #".$res['id_article']." : la date_redac n'a pas pu être modifiée. La rubrique #".$numero['id_rubrique']." correspondant au numéro n'a pas de date valide.",'vacarme_cron'._LOG_INFO_IMPORTANTE);
                // return 1; // 0 ou 1 ?
            }
            // on met à jour
            else {
                spip_log("Mise à jour de l'article #".$res['id_article'],'vacarme_cron'._LOG_INFO_IMPORTANTE);
                sql_updateq("spip_articles", array('date_redac'=>$numero['date_numero']),"id_article=".intval($res['id_article']));
                // return 1;
            }
        }
    }
    return 1;
}

?>