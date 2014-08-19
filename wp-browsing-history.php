<?php
/*
Plugin Name: WP Browsing History
Plugin URI: http://did2memo.net/2014/08/19/wp-browsing-history/
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
	wp_enqueue_script(
		'wp-browsing-history-jquery-cookie',
		plugins_url('/jquery.cookie.js', __FILE__),
		array ( 'jquery' )
	);

	if ( @file_exists ( TEMPLATEPATH . '/wp-browsing-history-variables.js' ) ) {
		$variables_path = get_template_directory_uri() . '/wp-browsing-history-variables.js';
	} else {
		$variables_path = plugins_url('/wp-browsing-history-variables.js', __FILE__);
	}
	wp_enqueue_script(
		'wp-browsing-history-variables',
		$variables_path,
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

	wp_enqueue_style('wp-browsing-history', plugins_url('wp-browsing-history.css', __FILE__), false);
}

function wp_browsing_history_list() {
	echo '<div class="wp-browsing-history"></div>'; 
}

add_action('the_content', 'wp_browsing_history_variables_injection');

function wp_browsing_history_variables_injection( $content ) {
	global $post;
	if ( is_single() ) {
		setup_postdata( $post );
		$content .= '<div id="wp-browsing-history-title" style="display:none;">' . get_the_title() . '</div>';
		$content .= '<div id="wp-browsing-history-url" style="display:none;">' . get_permalink( $post->ID ) . '</div>';
	}
	return $content;
}