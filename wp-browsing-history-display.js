jQuery(function($) {
	var history = JSON.parse( $.cookie( WPBH_COOKIE_NAME_HISTORY ) );
	if ( history == null || history["version"] != WPBH_COOKIE_VERSION ) {
		return;
	}

	if ( parseInt(history["length"]) > 0 ) {
		var html = "";
		html += '<h2>閲覧履歴</h2>';

		var list = "";
		for ( var i = 0; i < parseInt(history["length"]); i++ ) {
			var hist = history["list"][i];
			list += '<li>';

			list += '<span class="number">';
			list += '[' + (i+1) + ']';
			list += '</span>';

			list += '<span class="date">(';
			list += new Date( hist["time"] * 1000 ).toLocaleString();
			list += ')</span><br />';

			list += '<a href="' + hist["url"] + '">';
			list += hist["title"];
			list += '</a>';

			list += '</li>';
		}
		html += "<ol>" + list + "</ol>";

		if ( 0 < $(".history").size() ) {
			$(".history").append( html );
		}
	}
});