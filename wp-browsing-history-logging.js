jQuery(function($) {
	var title = $("#wp-browsing-history-title").html();
	var url = $( "#wp-browsing-history-url").html();
	var time = parseInt((new Date)/1000);

	var record = {
		'title' : title,
		'url' : url,
		'time' : time
	};

	var history = JSON.parse( $.cookie( WPBH_COOKIE_NAME_HISTORY ) );
	if ( history == null || history["version"] != WPBH_COOKIE_VERSION ) {
		history = {
			'version': WPBH_COOKIE_VERSION,
			'length': 0,
			'list': {}
		};
	}

	for ( var i = parseInt(history["length"]) - 1; 0 <= i ; i-- ) {
		history["list"][i+1] = history["list"][i];
	}
	history["list"][0] = record;
	history["length"] += 1;

	if ( WPBH_MAX_HISTORY_LENGTH < parseInt(history["length"]) ) {
		delete history["list"][WPBH_MAX_HISTORY_LENGTH];
		history["length"] -= 1;
	}

	$.cookie( WPBH_COOKIE_NAME_HISTORY, JSON.stringify( history ), { expires: 30, path: "/" });
});