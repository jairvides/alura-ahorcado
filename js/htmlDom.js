var sounds = ["button.mp3", "error.mp3", "Lost.mp3", "Winner.mp3"];

/*01: AGREGA SONIDOS A LOS BOTONES | ADD SOUNDS TO BUTTON*/
window.addEventListener("load", function() {
    var buttons = document.querySelectorAll('button,a');
    const btnClick = function(event) {
        playSound(sounds[0]);
    }
    buttons.forEach(btn => { btn.addEventListener("click", btnClick) });
});
/*02: CONTROLADOR PARA CAMBIO DE PAGINA | PAGE CHANGE HANDLER CONTROLLER*/
function pageChandler(request) {
    var request = document.querySelector(request);
    for (var i = 0; i < 3; i++) {
        var search = ".page_" + (i + 1);
        var main = document.querySelector(search);
        visibilityMain(main, false);
    }
    visibilityMain(request, true);
}
/*03: CONTROLADOR PARA HACER ELEMENTO VISIBLE O INVISIBLE |CONTROLLER TO CHANGE AN ELEMENT TO VISIBLE OR HIDDEN*/
function visibilityMain(page, action) {
    if (action == true) {
        page.style.display = "block";
    } else {
        page.style.display = "none";
    }
}
/*04: CONTROLADOR DE NOTIFICACION FLOTANTE |POPUP CONTROLLER*/
function popup(request) {
    if (request == false) {
        var response = document.querySelector("#popupMessages");
        response.style.display = "none";
    } else {
        var response = document.querySelector("#popupAlert");
        var popup = document.querySelector("#popupMessages");
        response.innerHTML = request;
        popup.style.display = "block";
    }
}
/*05:LIMPIA UN INPUT |CLEAN INPUT*/
function cleanInput(request) {
    var response = document.querySelector(request);
    response.value = "";
}
/*06: REPRODUCE SONIDO | PLAY SOUND*/
function playSound(request) {
    const music = new Audio("sounds/" + request);
    music.play();
}
/*07: CREAR ELEMENTO HTML | CREATE ELEMENTS HTML*/
function createElementHtml(request, id) {
    var response = document.createElement(request);
    if (id != false) {
        response.setAttribute('id', id);
    }
    return response;
}
/*08: AGREGA TEXTO A UN ELEMENTO | ADD TEXT TO ELEMENTS*/
function changeTextContent(element, request) {
    element.textContent = request;
}
/*
    Alura Challenge - Oracle Next Education
    Jair Vides - Colombia
    Juego Ahorcado
*/