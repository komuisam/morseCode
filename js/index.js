const snPunto = new Audio("assets/sonds/point.mp3");
const snRaya = new Audio("assets/sonds/line.mp3");
// Implementar un traductor de texto a código morse.
const inputText = document.getElementById('inputText');
const inputMorse = document.getElementById('inputMorse');
const btnPlay = document.querySelector('.play');
let isPlaying = false
function addCaracter(caracter) {
    const inputText = document.getElementById('input');
    inputText.value += caracter; // Agrega el carácter al campo de entrada
};

document.querySelector(".interativeButtom").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("morse-btn")) {
        inputMorse.value += target.textContent
        inputMorse.focus()
        morseToText()
    };
});

const updateValues = () => {
    inputMorse.innerText = ''; // Limpiar el campo de inputMorse
    const valor = inputText.value.toLowerCase().split(''); // Obtener el texto en minúsculas
    const valorTraducido = valor.map(letra => {
        if (letra === " ") {
            return "//"; // Separador de palabras
        }
        return CODIGO_MORSE[letra] ?? letra; // Convertir letra a Morse o dejarla igual si no está en el mapa
    }).join('/').replaceAll("////", '//').replaceAll("///", ''); // Unir letras con '/' como separador
    inputMorse.value = valorTraducido;
};
// Función para convertir Morse a texto
function morseToText(morse) {
    // Divide el código Morse en palabras (separadas por //)
    const words = inputMorse.value.trim().split('//');
    // Convierte cada palabra en texto
    const decodedWords = words.map(word => {
        return word.split('/').map(character => morseCodeMap[character.trim()] || '').join('');
    });
    // Une las palabras en una sola cadena y devuelve en minúsculas
    inputText.value = decodedWords.join(' ');
    // return decodedWords.join(' ');
}

// Función para reproducir los sonidos del código Morse
const playMorseSounds = async () => {
    if (isPlaying) {
        return;
    }
    btnPlay.classList.add('playing')
    isPlaying = true
    for (let char of inputMorse.value) {
        if (char === '.') {
            snPunto.currentTime = 0; // Reiniciar el audio de punto
            await snPunto.play();
            await sleep(300); // Esperar 300ms por el punto
        } else if (char === '-') {
            snRaya.currentTime = 0; // Reiniciar el audio de raya
            await snRaya.play();
            await sleep(900); // Esperar 900ms por la raya
        } else if (char === '/') {
            await sleep(700); // Esperar 700ms entre letras
        }
        await sleep(100); // Esperar un pequeño tiempo entre símbolos
    }
    btnPlay.classList.remove('playing')
    isPlaying = false
};

// Función para pausar la ejecución por un tiempo específico
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

inputText.addEventListener('input', updateValues);
inputMorse.addEventListener('input', morseToText);
btnPlay.addEventListener('click', playMorseSounds);
