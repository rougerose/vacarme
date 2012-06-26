$(document).ready(function() {
   // ajout du titre d'une image dans les boites modales d'un portfolio
   $("#pf a.mediabox").colorbox({
      title: function(){
         return $(this).find('img').attr('alt');
      }
   });
});

/*

$("a.gallery").colorbox({rel: 'gal', title: function(){
    var url = $(this).attr('href');
    return '<a href="' + url + '" target="_blank">Open In New Window</a>';
}});

*/

