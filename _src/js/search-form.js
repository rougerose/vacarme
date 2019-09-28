// =====================================
// Search form
// =====================================


var $searchBox = $('.c-search-box');
var $searchInput = $searchBox.find('input.search');

$searchInput.on('focus focusout', searchBoxIsFilled);

function searchBoxIsFilled(event) {
	var $el = $(this);
	var $parent = $el.parent();

	if ('' !==  $el.val()) {
		$el.addClass('is-filled');
		$parent.addClass('is-filled');
	} else {
		$el.removeClass('is-filled');
		$parent.removeClass('is-filled');
	}

	if (event.type === 'focus') {
		$el.addClass('is-filled');
		$parent.addClass('is-filled');
	}
}
