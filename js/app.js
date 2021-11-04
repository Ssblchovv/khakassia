"use strict";

/** @type {HTMLElement} */
let headerElement = null;

/** @type {HTMLElement} */
let menuButtonElement = null;

const onPageScrolled = function () {
    if (window.pageYOffset > headerElement.offsetTop) {
        headerElement.classList.replace("header_normal", "header_scrolled");
    } else {
        headerElement.classList.replace("header_scrolled", "header_normal");
    }
}

/**
 * 
 * @param {String} callee 
 */
const openFullscreenMenu = function(menuId) {
    document.body.old_overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    headerElement.old_visibility = headerElement.style.visibility;
    headerElement.style.visibility = "hidden";

    document.getElementById(menuId).classList.remove("overlayMenu_closed");
}

/**
 * 
 * @param {HTMLElement} callee 
 */
const closeNav = function(callee) {
    document.body.style.overflow = document.body.old_overflow;
    delete document.body.old_overflow;

    headerElement.style.visibility = headerElement.old_visibility;
    delete headerElement.old_visibility;

    callee.closest(".overlayMenu").classList.add("overlayMenu_closed");
}

/**
 * 
 * @param {HTMLElement} callee 
 */
const navigateMenu = function(callee) {
    closeNav(callee);
    let targetElement = document.querySelector(`[data-secname=${callee.dataset.target}]`);
    if (targetElement != null) {
        targetElement.scrollIntoView(true);
    }
}

const init = function () {
    headerElement = document.querySelector(".header");
    menuButtonElement = document.querySelector(".menu-button");

    window.addEventListener("scroll", _ => onPageScrolled());
    menuButtonElement.addEventListener("click", _ => openFullscreenMenu("mainNavMenu"));
}

document.addEventListener("DOMContentLoaded", function (event) {
    init()
});