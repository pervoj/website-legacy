/**
 * This file controls automatic language switching
 */


/** supported languages */
const LANGS = [ 'en', 'cs' ];


// get constants
const LANG_PAGE = document.documentElement.getAttribute('lang');
const LANG_USER = (navigator.language || navigator.userLanguage).split('-')[0];
const PATH = window.location.pathname;


// language switching function
function switch_langs() {
	// if is current language correct
	// or user language isn't supported,
	// don't do anything
	if (LANG_PAGE === LANG_USER) return;
	if (!LANGS.includes(LANG_USER)) return;

	// thing to replace with in current URL
	const REPLACEMENT = (LANG_USER === 'en') ? '' : `/${LANG_USER}`;

	// build new path from current URL and replacement
	const NEW_PATH = (LANG_PAGE === 'en') ?
		`/${LANG_USER}${PATH}` : PATH.replace(`/${LANG_PAGE}`, REPLACEMENT);

	// redirect
	window.location.replace(NEW_PATH || '/');
}


// returns get parameter
function get_parameter(key) {
	// address of the current window
	address = window.location.search

	// returns an URLSearchParams object instance
	parameters = new URLSearchParams(address)

	// returning the respected value associated with the provided key
	return parameters.get(key)
}


// checking the `?keeplang` get parameter
if (get_parameter('keeplang') !== null) {

	// if set to `1`, enable
	// otherwise, disable
	(get_parameter('keeplang') === '1') ?
		localStorage.setItem('keeplang', 1) :
		localStorage.removeItem('keeplang');

}


// if keeplang is disabled, switch languages
if (!localStorage.getItem('keeplang')) switch_langs();
