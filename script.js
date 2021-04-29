// Localise:

var langs = ['cs']; // All supported languages except the default

if (langs.includes(navigator.language)) {
    loadLang(navigator.language);
}

function loadLang(lang) {
    var locales = JSON.parse(readFile('locales/' + lang + '.json'));
    var elements = document.getElementsByClassName('translate');

    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = locales[elements[i].innerHTML];
    }
}



// Page toggling:

var menu_home = document.getElementById('menu-home');
var menu_about = document.getElementById('menu-about');
var menu_contact = document.getElementById('menu-contact');
var menu_projects = document.getElementById('menu-projects');

var page_home = document.getElementById('page-home');
var page_about = document.getElementById('page-about');
var page_contact = document.getElementById('page-contact');
var page_projects = document.getElementById('page-projects');

window.addEventListener('hashchange', togglePages);

if (window.location.hash) {
    togglePages();
} else {
    window.location.hash = '#home';
}

function togglePages() {
    switch (window.location.hash) {
        case '#home':
            page_home.style.maxHeight = page_home.scrollHeight + 'px';
            page_about.style.maxHeight = null;
            page_contact.style.maxHeight = null;
            page_projects.style.maxHeight = null;
            menu_home.classList.add('menu-item-active');
            menu_about.classList.remove('menu-item-active');
            menu_contact.classList.remove('menu-item-active');
            menu_projects.classList.remove('menu-item-active');
            break;
        case '#about':
            page_home.style.maxHeight = null;
            page_about.style.maxHeight = page_about.scrollHeight + 'px';
            page_contact.style.maxHeight = null;
            page_projects.style.maxHeight = null;
            menu_home.classList.remove('menu-item-active');
            menu_about.classList.add('menu-item-active');
            menu_contact.classList.remove('menu-item-active');
            menu_projects.classList.remove('menu-item-active');
            break;
        case '#contact':
            page_home.style.maxHeight = null;
            page_about.style.maxHeight = null;
            page_contact.style.maxHeight = page_contact.scrollHeight + 'px';
            page_projects.style.maxHeight = null;
            menu_home.classList.remove('menu-item-active');
            menu_about.classList.remove('menu-item-active');
            menu_contact.classList.add('menu-item-active');
            menu_projects.classList.remove('menu-item-active');
            break;
        case '#projects':
            page_home.style.maxHeight = null;
            page_about.style.maxHeight = null;
            page_contact.style.maxHeight = null;
            page_projects.style.maxHeight = page_projects.scrollHeight + 'px';
            menu_home.classList.remove('menu-item-active');
            menu_about.classList.remove('menu-item-active');
            menu_contact.classList.remove('menu-item-active');
            menu_projects.classList.add('menu-item-active');
            break;
    }
}



// Copyright year:

var copyright_year = document.getElementById('copyright-year').innerText;
var current_year = new Date().getFullYear();

if (copyright_year != current_year) {
    document.getElementById('copyright-year').innerText = copyright_year + ' – ' + current_year;
}



// Other functions:

function readFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}
