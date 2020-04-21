const DOMselectors = {
    calculatorWrapper : document.querySelector('.calculator-wrapper'),
    clearButton: document.querySelector('.clear'),
    viewer: document.querySelector('.viewer'),
    numButtons: Array.from(document.querySelectorAll('.num')),
    opsButtons: document.querySelectorAll('.ops')
}

const state = {
}



// UI CONTROLLER
const UIController = {
    
    updateView: (value) => {
        DOMselectors.viewer.innerHTML = value;
    }
}

const globalController = {
    getInput: (event) => {
        console.log(event);
        //CLEAR:
        if (event.id = 'clear') {
            UIController.updateView('0');
        }
        
        //NUMBERS:
        if (event.target.classList.contains('num')) {
            UIController.updateView(event.target.dataset.num);
        }
        // UIController.updateView(event);
    }
}

// DOMselectors.clearButton.addEventListener("click", globalController.getInput);
//EVENT LISTENERS:

//NUMBERS:

DOMselectors.calculatorWrapper.addEventListener('click', globalController.getInput);