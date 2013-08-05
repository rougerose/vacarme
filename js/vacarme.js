$(document).ready(function() {
    //var a = $( document.activeElement ); console.log(a);
    
    $("#formulaire_recherche form:not:(.active-search)").click(function(){
        $(this).addClass("active-search");
    });

    $("#formulaire_recherche form input.search__field").blur(function(){
        $(this).parent().parent().removeClass("active-search");
    });
    
    // formulaire recherche
     //$("#formulaire_recherche").each(function(){

    //     var $sf = $(this).find(".search__field"),
    //     $f = $(this).find("form");
    //     $()
    //});
});