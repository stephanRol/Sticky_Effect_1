'use strict';

const scrollable = document.querySelector('.scrollable');
const stickyProject = document.querySelector('.project');

let images = [...document.querySelectorAll('img')]

let current = 0;
let target = 0;
const ease = 0.1;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function init() {
    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`  //devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización (viewport).
}

function smoothScroll() {
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`;
    sticky();
    animateImages();
    window.requestAnimationFrame(smoothScroll) //informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
}

function sticky() {
    let offset = window.innerHeight * 2;
    if (current < offset) {
        stickyProject.style.transform = `translate3d(0, 0, 0)`
    }

    if (current >= offset && current <= offset * 2) {
        stickyProject.style.transform = `translate3d(0, ${current - offset}px, 0)`
    }

    if (current >= offset * 2) {
        stickyProject.style.transform = `translate3d(0, ${current - offset}px, 0)`
    }
}

function animateImages() {
    for (let i = 0; i < images.length; i++) {
        let { top } = images[i].getBoundingClientRect(); //???
        if (i % 2 == 0) {
            images[i].style.transform = `rotate(${top * 0.03}deg)`
        }
        else {
            images[i].style.transform = `rotate(${top * 0.03 * -1}deg)`
        }
    }
}

init()
smoothScroll()