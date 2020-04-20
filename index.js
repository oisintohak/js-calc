const DOMselectors = {
    calculatorWrapper : document.querySelector('.calculator-wrapper'),
    clearButton: document.querySelector('.clear'),
    viewer: document.querySelector('.viewer'),
    numButtons: Array.from(document.querySelectorAll('.num')),
    opsButtons: document.querySelectorAll('.ops')
}

const state = {
}

function updateView (value) {
    if (value.id = 'clear') {
        DOMselectors.viewer.innerHTML = 0;
    }
}

// UI CONTROLLER
const UIController = {
}

const globalController = {

}

const clearBut = document.querySelector('.clear');

clearBut.addEventListener("click", updateView);
//EVENT LISTENERS:

//NUMBERS:
// DOMselectors.clearButton.addEventListener('click', updateView(0));