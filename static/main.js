// footer year
document.querySelectorAll('footer .year').forEach(el => {
	const current_year = new Date().getFullYear();
	if (el.innerText != current_year) {
		el.innerText += ' – ' + current_year;
	}
});
