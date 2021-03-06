jQuery(function($) {
	var history = JSON.parse( $.cookie( WPBH_COOKIE_NAME_HISTORY ) );
	if ( history == null || history["version"] != WPBH_COOKIE_VERSION ) {
		$("div.wp-browsing-history").attr("style", "display:none;");
		return;
	}

	if ( parseInt(history["length"]) > 0 ) {
		var html = "";
		if ( WPBH_ENABLE_HEADING ) {
			html += '<h2 class="history-header">' + WPBH_HEADING_TEXT + '</h2>';
		}
		html += '<ol class="history-list">';

		var list = "";
		for ( var i = 0; i < parseInt(history["length"]); i++ ) {
			var hist = history["list"][i];
			list += '<li class="history-record history-record-' + (i+1) + '">';

			// list += '<span class="history-number">';
			// list += '[' + (i+1) + ']';
			// list += '</span>';

			list += '<span class="history-title">';
			list += '<a href="' + hist["url"] + '" class="history-link">';
			list += hist["title"];
			list += '</a>';
			list += '</span>';

			if ( WPBH_ENABLE_DATE_BR ) {
				list += '<br />';
			}

			if ( WPBH_ENABLE_DATE ) {
				list += '<span class="history-date">';
				if ( WPBH_ENABLE_DATE_PARENTHESIS ) {
					list += '(' + new Date( hist["time"] * 1000 ).toLocaleString() + ')';
				} else {
					list += new Date( hist["time"] * 1000 ).toLocaleString();
				}
				list += '</span>';
			}

			list += '</li>';
		}
		html += list;
		html += "</ol>";

		if ( WPBH_SHOW_PLUGIN_LINK ) {
			html += '<p class="history-powered-by">powered by <a href="http://did2memo.net/2014/08/19/wp-browsing-history/" rel="nofollow">WP Browsing History Plugin</a></p>';
		}

		if ( 0 < $(".wp-browsing-history").size() ) {
			$(".wp-browsing-history").append( html );
		}
	}
});