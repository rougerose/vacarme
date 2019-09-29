//
// http://johnpolacek.com/2012/10/03/help-prevent-fouc/
// Les CSS ne sont pas du tout optimisées et entraînent une latence assez grande
// au chargement. Le formulaire de recherche en "overlay" devient visible.
// Rustine en attendant une réelle optimisation.
//
$('.no-fouc').removeClass('no-fouc');
