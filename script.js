function scrollUpdate() {
	if (window.scrollY > 0) {
		document.querySelector('nav').classList.add('shadow');
	} else {
		document.querySelector('nav').classList.remove('shadow');
	}
}
document.body.onscroll = scrollUpdate;
scrollUpdate();



for (let item of document.querySelectorAll('nav ul li')) {
	if (item.hasAttribute('data-menu-item')) {
		item.onclick = function() {
			window.location.hash = `#${item.getAttribute('data-menu-item')}`;
		}
	}
}



let copyright_year = document.getElementById('copyright-year').innerText;
let current_year = new Date().getFullYear();

if (copyright_year != current_year) {
    document.getElementById('copyright-year').innerText = copyright_year + ' – ' + current_year;
}