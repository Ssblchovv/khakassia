"use strict";

/** @type {HTMLElement} */
let headerElement = null;

/** @type {HTMLElement} */
let menuButtonElement = null;

/** @type {HTMLElement} */
let toursListBtnMore = null;

const onPageScrolled = function () {
    if (window.pageYOffset > 0) {
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

const showAllTours = function() {
    document.querySelectorAll(".tours-list-element_hidden").forEach(e => {
        e.classList.remove("tours-list-element_hidden");
    });
    toursListBtnMore.style.display = "none";
}

const init = function () {
    headerElement = document.querySelector(".header");
    menuButtonElement = document.querySelector(".menu-button");
    toursListBtnMore = document.querySelector(".tours-list-btn-more");

    window.addEventListener("scroll", _ => onPageScrolled());
    menuButtonElement.addEventListener("click", _ => openFullscreenMenu("mainNavMenu"));
    toursListBtnMore.addEventListener("click", _ => showAllTours());
}

document.addEventListener("DOMContentLoaded", function (event) {
    init()
});