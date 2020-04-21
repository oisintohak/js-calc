const DOMselectors = {
    calculatorWrapper : document.querySelector('.calculator-wrapper'),
    clearButton: document.querySelector('.clear'),
    viewer: document.querySelector('.viewer'),
    numButtons: Array.from(document.querySelectorAll('.num')),
    opsButtons: document.querySelectorAll('.ops')
}

const state = {
    //user presses a series of numbers:
        //combine the numbers into a value
    //user presses an M/D/A/S:
        //apply the operator if there was a previous value

    viewerString: '',
    currentValue: 0,
    previousValue: '',
    currentOperator: '',
    previousOperator: '',
    result: 0
    

}



// UI CONTROLLER
const UIController = {
    
    updateView: (value) => {
        DOMselectors.viewer.innerHTML = value;
    }
}

// INPUT CONTROLLER

const inputController = {
    getInputClick: (event) => {
        console.log(event);
        //CLEAR:
        if (event.id = 'clear') {
            UIController.updateView('0');
        }

        //OPERATOR (M/D/A/S):
        if (event.target.classList.contains('ops')) {
            //check for previous value:
            if (state.previousValue == '') {
                //move current value to previous value:
                state.previousValue = state.currentValue;                
                
                //set current value to 0:
                state.currentValue = 0;
                
                //record operator
                state.currentOperator = event.target.dataset.ops;
            }
            else {
                // calculate result using 2 values & previous operator
                // asign result to previous value
                state.previousValue = calcController.calculate();
            }
        }

        if (state.previousValue && event.target.classList.contains('ops')) {

        }
        
        //NUMBERS:
        if (event.target.classList.contains('num')) {
            state.currentValue += `${event.target.dataset.num}`;
            
        }
    }
}


// CALC CONTROLLER
//takes input from input controller
//manipulates input
//input is sent to UI controller
const calcController = {
    calculate : () => {
        let result;
        let val1 = parseFloat(state.currentValue);
        let val2 = parseFloat(state.previousValue);
        // MULTIPLY:
        if(state.currentOperator = 'multiplication') {
            result = val2 * val1;
        }
        //DIVIDE:
        if(state.currentOperator = 'division') {
            result = val2 / val1;
        }
        //ADD:
        if(state.currentOperator = 'addition') {
            result = val2 + val1;
        }
        //SUBTRACT:
        if(state.currentOperator = 'subtraction') {
            result = val2 - val1;
        }
        return toString(result);

    }
}

// DOMselectors.clearButton.addEventListener("click", inputController.getInput);
//EVENT LISTENERS:

//NUMBERS:

DOMselectors.calculatorWrapper.addEventListener('click', inputController.getInputClick);