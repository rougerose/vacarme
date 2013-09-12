$(document).ready(function() {
    $("#bnS,#search--nav").click(function(e){
        $("#search").toggleClass("search-bar--open");
        e.preventDefault();
    });
});