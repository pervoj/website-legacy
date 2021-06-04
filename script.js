// Localise:

let langs = ['cs']; // All supported languages except the default

let lang = navigator.language.toLowerCase().split('-')[0];
if (langs.includes(lang)) {
    loadLang(lang);
}

function loadLang(lang) {
    let locales = JSON.parse(readFile('locales/' + lang + '.json'));
    let elements = document.getElementsByClassName('translate');

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = locales[elements[i].innerHTML];
    }
}



// Page toggling:

let menu_home = document.getElementById('menu-home');
let menu_about = document.getElementById('menu-about');
let menu_contact = document.getElementById('menu-contact');
let menu_projects = document.getElementById('menu-projects');

let page_home = document.getElementById('page-home');
let page_about = document.getElementById('page-about');
let page_contact = document.getElementById('page-contact');
let page_projects = document.getElementById('page-projects');

window.addEventListener('resize', togglePages);
window.addEventListener('hashchange', togglePages);

if (window.location.hash) {
    togglePages();
} else {
    window.location.hash = '#home';
}

function togglePages() {
	page_home.style.maxHeight = null;
	page_about.style.maxHeight = null;
	page_contact.style.maxHeight = null;
	page_projects.style.maxHeight = null;
	menu_home.classList.remove('menu-item-active');
	menu_about.classList.remove('menu-item-active');
	menu_contact.classList.remove('menu-item-active');
	menu_projects.classList.remove('menu-item-active');

    switch (window.location.hash) {
        case '#home':
            page_home.style.maxHeight = page_home.scrollHeight + 'px';
            menu_home.classList.add('menu-item-active');
            break;
        case '#about':
            page_about.style.maxHeight = page_about.scrollHeight + 'px';
            menu_about.classList.add('menu-item-active');
            break;
        case '#contact':
            page_contact.style.maxHeight = page_contact.scrollHeight + 'px';
            menu_contact.classList.add('menu-item-active');
            break;
        case '#projects':
            page_projects.style.maxHeight = page_projects.scrollHeight + 'px';
            menu_projects.classList.add('menu-item-active');
            break;
    }
}



// Copyright year:

let copyright_year = document.getElementById('copyright-year').innerText;
let current_year = new Date().getFullYear();

if (copyright_year != current_year) {
    document.getElementById('copyright-year').innerText = copyright_year + ' – ' + current_year;
}



// Other functions:

function readFile(filePath) {
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}
