"use strict";

/** @type {Element} */
let headerElement = undefined;

const onPageScrolled = function () {
    console.log(window.pageYOffset);
    if (window.pageYOffset > headerElement.offsetTop) {
        headerElement.classList.add("header_scrolled");
        headerElement.classList.remove("header_normal");
    } else {
        headerElement.classList.remove("header_scrolled");
        headerElement.classList.add("header_normal");
    }
}

const init = function () {
    headerElement = document.querySelector(".header");

    window.addEventListener("scroll", _ => onPageScrolled());
}

document.addEventListener("DOMContentLoaded", function (event) {
    init()
});