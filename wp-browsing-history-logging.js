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

	/* history 新規作成 */
	if ( history == null || history["version"] != WPBH_COOKIE_VERSION ) {
		history = {
			'version': WPBH_COOKIE_VERSION,
			'length': 0,
			'list': {}
		};
	}

	/* 後ろにずらす起点を決定 */
	var i_space = parseInt(history["length"]);
	if ( WPBH_ENABLE_DUPLICATION_AVOIDANCE ) {
		for ( var i = 0; i < parseInt(history["length"]); i++ ) {
			if ( history["list"][i].url == record.url ) {
				i_space = i;
				break;
			}
		}
	}

	/* 古いレコードを後ろにずらす */
	for ( var i = i_space; 0 < i ; i-- ) {
		history["list"][i] = history["list"][i-1];
	}

	/* 新しいレコードで先頭を上書き */
	history["list"][0] = record;
	if ( i_space < history["length"] ) {
		history["length"] += 0;
	} else {
		history["length"] += 1;
	}

	/* 長過ぎたら末尾を削除 */
	if ( WPBH_MAX_HISTORY_LENGTH < parseInt(history["length"]) ) {
		delete history["list"][WPBH_MAX_HISTORY_LENGTH];
		history["length"] -= 1;
	}

	$.cookie( WPBH_COOKIE_NAME_HISTORY, JSON.stringify( history ), { expires: 30, path: "/" });
});