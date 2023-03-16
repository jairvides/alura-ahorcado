/*VARIABLES GLOBALES*/
var word = ""; //Palabra Aleatoria
var words = ["hotel", "alura", "html", "css"];
var attempts = [0, 0]; //Intentos [Correctos,Incorrectos]
var gameState = false; // Estado del Juego false => Terminado;  True => Emepezar
var touchDevice = false;
var display = window.innerWidth;

if (display < 900) {
    touchDevice = true;
}
/*01: CONTROL PARA DISPOSITIVOS TACTILES | CONTROL FOR TOUCH DEVICES*/
var controlTouch = document.querySelector("#keyboard");
controlTouch.addEventListener("input", function(event) {
    if (touchDevice == true) {
        if (gameState != false) {
            var key = event['data'];
            var request = isRightLetter(key.toLowerCase());
            gameExecution(request, key.toLowerCase());
            cleanInput("#keyboard");
        }
    }
});
/*02: CONTROLADOR DE PULSACIONES DE TECLADO PC | PC KEYSTROKE CONTROLLER*/
document.addEventListener('keydown', function gameController(event) {
    if (touchDevice == false) {
        var specialKeyPress = specialKeys(event['key'].toLowerCase());
        console.log(event['key']);
        if (specialKeyPress != true) {
            if (gameState != false) {
                document.querySelector("#keyboard").value = event['key'];
                var key = document.querySelector("#keyboard").value;
                var request = isRightLetter(key);
                gameExecution(request, key);
                cleanInput("#keyboard");
            }
        }

    }
});
/*03: EVALUA LAS REGLAS DE JUEGO | ASSESS THE RULES OF THE GAME*/
function gameExecution(request, key) {
    if (gameState != false) {
        var text = "";
        if (verifyEnteredLetter(key) != false) {
            if (request != false) {
                var letter = document.querySelectorAll("#" + key);
                for (var x = 0; x < letter.length; x++) {
                    changeTextContent(letter[x], key);
                    text = text + key;
                }
                regWords(text, 0);
            } else {
                regWords(key, 1);
                var element = document.querySelector("#wrongWord");
                changeTextContent(element, (attempts[1].toUpperCase()));
                graphDrawing(attempts[1].length);
            }
        }
        if (attempts[1].length == 9) {
            popup("<h3><span>&#129325;</span>Perdiste</h3>");
            endGame();
            playSound(sounds[2]);
        }
        if (attempts[0].length == word.length) {
            popup("<h3><span>&#129351;</span>Ganaste</h3>");
            endGame();
            playSound(sounds[3]);
        }
    }
}

/*04: INICIA JUEGO | START GAME*/
function gameStart() {
    endGame();
    gameState = true;
    word = randWord(words);
    pageChandler('.page_3');
    var element = document.querySelector("#wrongWord");
    changeTextContent(element, " ");
    inputGame(word);
    clearCanvas();
    cleanInput("#keyboard");
}
/*05: TERMINA JUEGO | FINISH GAME*/
function endGame() {
    word = null;
    attempts = ["", ""];
    gameState = false;
}
/*06: AGREGA PALABRA AL ARRAY | ADD WORD TO ARRAY*/
function addWords(request) {
    request = verifyWord(request);
    if (request != false) {
        words.push(request);
        popup("<h3>Palabra Agregada</h3>");
        cleanInput("#gameWord");
        gameStart();
    } else {
        popup("<h3><span>&#129320;<span>Palabra Incorrecta No puede contener Numeros o Caracteres Especiales</h3>");
        cleanInput("#gameWord");
    }
}
/*07: VERIFICA QUE LA PALABRA INGRESADA CUMPLA CON LOS REQUISITOS | VERIFY THAT THE WORD ENTERED MEETS THE REQUIREMENTS */
function verifyWord(request) {
    var response = request.toLowerCase();
    if (request.length > 8) {
        response = false;
    } else {
        for (var i = 0; i < response.length; i++) {
            var letter = verifyEnteredLetter(response[i]);
            if (letter != true) {
                response = false;
            }
        }
    }
    return response;
}
/*08: VERIFICA QUE LA LETRA INGRESADA NO CONTENGA CARACTERES INCORRECTOS | VERIFY THAT THE LETTER ENTERED DOES NOT CONTAIN WRONG CHARACTERS*/
function verifyEnteredLetter(request) {
    var filter = '1234567890=@.;?¿!¡|"[]<>, ';
    var response = true;
    if (filter.indexOf(request.charAt()) != -1) {
        response = false;
    }
    return response
}
/*09: SELECCIONA UNA PALABRA ALEATORIA PARA LA PARTIDA | SELECT A RANDOM WORD FOR THE GAME*/
function randWord(request) {
    var randNumber = Math.floor((Math.random() * ((request.length - 1) - 0 + 1)) + 0)
    var response = request[randNumber];
    return response;
}
/*10: CREA EL TABLERO DE ESPACIOS PARA LOS CARACTERES | CREATE BOARD FOR THE  FOR THE GAME*/
function inputGame(request) {
    var ul = document.querySelector(".correctWord");
    ul.innerHTML = " ";
    for (var i = 0; i < request.length; i++) {
        li = createElementHtml("li", word[i]);
        ul.appendChild(li);
    }
}
/*11: EVALUA QUE LA LETRA INGRESADA POR EL USUARIO ESTA DENTRO DEL ARRAY | EVALUATES THAT THE LETTER ENTERED BY THE USER IS WITHIN THE ARRAY*/
function isRightLetter(request) {
    var response = false;
    for (var x = 0; x < word.length; x++) {
        if (request.toLowerCase() == word[x]) {
            if (word[x] != attempts[0]) {
                response = true;
            }
        }
    }
    return response;
}
/*12: REGISTRA LETRAS INGRESADAS SI NO ESTAN EN LA PALABRA O SI ESTAN | RECORD LETTERS ENTERED IF THEY ARE NOT IN THE WORD OR IF THEY ARE*/
function regWords(request, type) {
    var response = false;
    if (attempts[type].length == 0) {
        attempts[type] = attempts[type] + "" + request;
        response = true;
    } else {
        var i = attempts[type].indexOf(request);
        if (i == -1) {
            attempts[type] = attempts[type] + "" + request;
            response = true;
        }
    }
    return response;
}
/*13: VERIFICA QUE NO SE PULSEN TECLAS ESPECIALES | VERIFY THAT NO SPECIAL KEYS ARE PRESSED*/
function specialKeys(request) {
    var response = false;
    var specialKeys = ['contextmenu', 'control', 'tab', 'capslock', 'shift', 'alt', 'altgraph', 'enter', 'meta', 'dead', 'backspace', 'home', 'end', 'delete', 'pageup', 'pagedown', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'numlock', 'escape', 'pause', 'insert', 'scrolllock', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'];
    for (var x = 0; x < specialKeys.length; x++) {
        if (request == specialKeys[x]) {
            response = true;
        }
    }
    return response
}
/*
    Alura Challenge - Oracle Next Education
    Dev Jair Vides - Colombia
    Juego Ahorcado
*/
