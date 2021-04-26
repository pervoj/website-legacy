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
    page_home.style.maxHeight = page_home.scrollHeight + 'px';
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
