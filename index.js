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
    clearState: () => {
        state.viewerString = '0';
        state.currentValue = '';
        state.previousValue = '';
        state.currentOperator = '';
        state.previousOperator = '';
        state.result = 0;
    }
}

state.clearState();


// UI CONTROLLER
const UIController = {
    
    updateView: () => {
        DOMselectors.viewer.innerHTML = state.viewerString;
        console.log(state);
    }
}

// INPUT CONTROLLER

const inputController = {
    getInputClick: (event) => {

        //CLEAR:
        if (event.target.id == 'clear') {
            state.clearState();
            UIController.updateView();
        }

        // EQUALS:
        if (event.target.id == 'equals') {
            //CALCULATE RESULT:
            state.viewerString = calcController.calculate();
            //UPDATE UI
            UIController.updateView();
            // CLEAR previous value
            state.currentValue = state.viewerString;
            state.previousValue = '';
        }
        //NUMBERS:
        if (event.target.classList.contains('num')) {
            //add digit to current value
            state.currentValue += `${event.target.dataset.num}`;

            //update viewerstring
            state.viewerString = state.currentValue;

            // update UI
            UIController.updateView();
            
        }

        //OPERATOR (M/D/A/S):
        if (event.target.classList.contains('ops')) {
            //check for previous value:
            if (state.previousValue == '') {
                //move current value to previous value:
                state.previousValue = state.currentValue;                
                
                //set current value to 0:
                state.currentValue = '';
                
                //record operator
                state.currentOperator = event.target.dataset.ops;
            }
            else {
                // calculate result using 2 values & previous operator
                // asign result to previous value
                state.previousValue = calcController.calculate();
                state.viewerString = state.previousValue;

                //record operator
                state.currentOperator = event.target.dataset.ops;
            }
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
        console.log(state.previousValue, state.currentValue);
        let val1 = parseFloat(state.currentValue);
        let val2 = parseFloat(state.previousValue);
        console.log(val1, val2);
        // MULTIPLY:
        if(state.currentOperator == 'multiplication') {
            result = val2 * val1;
        }
        //DIVIDE:
        if(state.currentOperator == 'division') {
            result = val2 / val1;
        }
        //ADD:
        if(state.currentOperator == 'addition') {
            result = val2 + val1;
        }
        //SUBTRACT:
        if(state.currentOperator == 'subtraction') {
            result = val2 - val1;
        }
        console.log(result);
        return result.toString(10);

    }
}

//EVENT LISTENERS:

//NUMBERS:

DOMselectors.calculatorWrapper.addEventListener('click', inputController.getInputClick);