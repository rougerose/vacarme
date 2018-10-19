// =====================================
// site-nav
// =====================================

var siteNav = $(".js-site-nav"),
	menuToggle = $(".js-menu-toggle");

menuToggle.on("click", function(){
	siteNav.toggleClass("is-open");
});
