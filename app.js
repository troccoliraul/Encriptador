const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const hiddenElements = document.getElementById('hidden');
const showElements = document.getElementById('show');
const btnEncryptText = document.getElementById('encryptText');
const btnDecryptText = document.getElementById('decryptText');
const btnCopyOutputText = document.getElementById('copyOutputText');
const hintClass = document.querySelector('.hint');
const errorMessage = document.getElementById('error');

// Llaves para encriptar o desencriptar el texto
const keys = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
};

inputText.addEventListener('input', () => {
    isValidInput(inputText.value);
});

// Agregamos el evento 'click' para el boton de copiar el texto de salida.
btnCopyOutputText.addEventListener('click', () => {
    copyText(outputText.value);
});

// Agregamos el evento 'click' para el boton encriptar el texto.
btnEncryptText.addEventListener('click', () => {
    outputText.value = encryptText(inputText.value);
    hideOrShowElements(true);
});

// Agregamos el evento 'click' para el boton desencriptar el texto.
btnDecryptText.addEventListener('click', () => {
    outputText.value = decryptText(inputText.value);
    hideOrShowElements(true);
});

// Validar el texto a encriptar o desencriptar
function isValidInput(input) {
    if (!input) {
        setValidationAttributes('No ha ingresado el texto.', true);
        hideOrShowElements(false);
        return;
    }
    if (!/[^a-z|ñ\s]+/g.test(input)) {
        setValidationAttributes('Solo letras minúsculas y sin acentos.', false, true);
        return;
    }
    setValidationAttributes(
        `Solo letras minúsculas y sin acentos. El texto contiene ${input.match(/[^a-z|ñ\s]+/g).length} caracteres Inválidos`,
        true);
    return;
}

// Función para deshabilitar/habilitar los botones y mostrar mensajes de error si los hay.
function setValidationAttributes(error, btnStatus, removeStyle = false, color = 'red') {
    errorMessage.innerHTML = error;
    hintClass.style.color = color;
    if (removeStyle) {
        hintClass.removeAttribute('style');
    }
    btnEncryptText.disabled = btnStatus;
    btnDecryptText.disabled = btnStatus;
}

// Función para mostrar o esconder los elementos según se necesite.
function hideOrShowElements(hide) {
    if (hide) {
        hiddenElements.classList.add('d-none');
        outputText.classList.add('message');
        showElements.classList.remove('d-none');
    } else {
        hiddenElements.classList.remove('d-none');
        outputText.classList.remove('message');
        showElements.classList.add('d-none');
    }
}

// Función para para encriptar el texto de entrada.
function encryptText(textToEncrypt) {
    let result = textToEncrypt.replace(/[eiou]/g, match => keys[match]);
    return result;
}

// Función para desencriptar el texto de entrada.
function decryptText(textToDecrypt) {
    let result = textToDecrypt;
    for (const [key, value] of Object.entries(keys).sort()) {
        result = result.replaceAll(value, key);
    }
    return result;
}

// Función para copiar el texto.
function copyText(copyClipboard) {
    navigator.clipboard.writeText(copyClipboard).then(
        () => {
            sweetAlertMessage('success', 'Copiado correctamente.');
        },
        () => {
            sweetAlertMessage('error', 'Error al copiar el texto');
        },
    );
}

// Alerta predeterminada con SweetAlert.
function sweetAlertMessage(icon, text) {
    Swal.fire({
        icon: icon,
        text: text,
        showConfirmButton: false,
        timer: 1500
    });
}
