// =====================================
// a11y-dialog init
// =====================================

// utilise :
// 'node_modules/a11y-dialog/a11y-dialog.min.js',
// 'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js'

var html = document.documentElement,
	dialogSearchBox = document.getElementById('dialogSearchBox');

if (dialogSearchBox != null) {
	var dialogSBInstance = new A11yDialog(dialogSearchBox, html);

	dialogSBInstance.on('show', function (dialogSearchBox, triggerEl) {
		bodyScrollLock.disableBodyScroll(dialogSearchBox);
	});
	dialogSBInstance.on('hide', function(dialogSearchBox, triggerEl) {
		bodyScrollLock.enableBodyScroll(dialogSearchBox);
	});
}
