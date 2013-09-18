$(document).ready(function() {
    $("#search").each(function(){
        var search = $(this);
        $("#btn-search,#btn-search-nav").click(function(e){
            search.toggleClass("search-bar--open");
            e.preventDefault();
        });
        if ($("html.page_recherche").length) {
            search.addClass("search-bar--open");
        }
    });
});