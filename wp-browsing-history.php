<?php
/*
Plugin Name: WP Browsing History
Plugin URI: http://did2memo.net/
Description:
	You can place a history list of pages read by each user on your template using wp-user-history().
	History records are stored as cookies.
	Storing records and displaying history lists are performed by scripts in JavaScript
	to work with page caches using reverse proxy servers (e.g. Nginx).
Version: 1.0.0
Author: did2
Author URI: http://did2memo.net/
License: GPL2
*/

$wp_history = array(); // global variable for PHP <= 5.2

add_action('wp_enqueue_scripts', 'wp_browsing_history_script');

function wp_browsing_history_script() {
	if ( ! is_user_logged_in() ) {
		return;
	}

	wp_enqueue_script(
		'wp-browsing-history-jquery-cookie',
		plugins_url('/jquery.cookie.js', __FILE__),
		array ( 'jquery' )
	);

	wp_enqueue_script(
		'wp-browsing-history-variables',
		plugins_url('/wp-browsing-history-variables.js', __FILE__),
		array ( 'jquery', 'wp-browsing-history-jquery-cookie' )
	);
	
	wp_enqueue_script(
		'wp-browsing-history-display',
		plugins_url('/wp-browsing-history-display.js', __FILE__),
		array ( 'jquery', 'wp-browsing-history-jquery-cookie', 'wp-browsing-history-variables' )
	);

	if ( is_single() ) {
		wp_enqueue_script(
			'wp-browsing-history-logging',
			plugins_url('/wp-browsing-history-logging.js', __FILE__),
			array ( 'jquery', 'wp-browsing-history-jquery-cookie', 'wp-browsing-history-variables', 'wp-browsing-history-display' )
		);
	}
}

function wp_browsing_history_list() {
	echo '<div class="history"></div>'; 
}