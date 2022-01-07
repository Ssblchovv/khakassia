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
 * @param {String} menuId 
 */
const openFullscreenMenu = function(menuId) {
    document.body.old_overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    headerElement.old_visibility = headerElement.style.visibility;
    headerElement.style.visibility = "hidden";

    let menuElement = document.getElementById(menuId);
    menuElement.style.display = "block";
    requestAnimationFrame(() => {
        menuElement.classList.replace("overlay-menu_closed", "overlay-menu_opened");
        menuElement.querySelector(".overlay-menu__close-btn").classList.add("overlay-menu__close-btn_closer")
    });
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

    try {
        let menuElement = callee.closest(".overlay-menu");
        menuElement.classList.replace("overlay-menu_opened", "overlay-menu_closed");
        menuElement.querySelector(".overlay-menu__close-btn").classList.remove("overlay-menu__close-btn_closer");
    } catch {}
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

/**
 * 
 * @param {HTMLElement} callee 
 */
const navigateInlineMenu = function(callee) {
    let targetElement = document.querySelector(`[data-secname=${callee.dataset.target}]`);
    if (targetElement != null) {
        const yOffset = -headerElement.clientHeight / 2; 
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
        window.scrollTo({top: y, behavior: 'smooth'});
    }
}

const showAllTours = function() {
    document.querySelectorAll(".tours-list-element_hidden").forEach(e => {
        e.classList.remove("tours-list-element_hidden");
    });
    toursListBtnMore.style.display = "none";
}

/**
 * 
 * @param {HTMLElement} menuElement 
 */
const onAnimationEnd = function(menuElement) {
    if (menuElement.classList.contains("overlay-menu_closed")) {
        menuElement.style.display = "none";
    }
}

const init = function () {
    headerElement = document.querySelector(".header");
    menuButtonElement = document.querySelector(".menu-button");
    toursListBtnMore = document.querySelector(".tours-list-btn-more");

    window.addEventListener("scroll", _ => onPageScrolled());
    menuButtonElement.addEventListener("click", _ => openFullscreenMenu("mainNavMenu"));
    toursListBtnMore.addEventListener("click", _ => showAllTours());

    document.querySelectorAll(".overlay-menu").forEach(menu => {
        menu.style.display = "none";
        menu.addEventListener("transitionend", _ => onAnimationEnd(menu), true);
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    init()
});