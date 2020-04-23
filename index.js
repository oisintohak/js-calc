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
        state.val1 = '';
        state.val2 = '';
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
            // check if no value, then display 0
            if (!state.val1) {
                state.clearState();
            }

            // check if only 1 value, clear any stored operator, then display value
            else if (!state.val2) {
                state.currentOperator = '';
                UIController.updateView();
            }

            // check for 2 values & operator, then display result
            else if (state.val1 != '' && state.val2 != '' && state.currentOperator != '') {
                state.viewerString = calcController.calculate();
                state.val2 = state.viewerString;
                UIController.updateView();
                // remove first value and operator
                state.val1 = '';
                state.currentOperator = '';
            }
        }
        //NUMBERS:
        if (event.target.classList.contains('num')) {
            //add digit to current value
            state.val1 += `${event.target.dataset.num}`;

            //update viewerstring
            state.viewerString = state.val1;

            // update UI
            UIController.updateView();
            
        }

        //OPERATOR (M/D/A/S):
        if (event.target.classList.contains('ops')) {
            // replace current operator
            if (!state.val1 && !state.val2 && !state.currentOperator) {
                return;
            }

            if (!state.val2) {
                //record operator
                state.currentOperator = event.target.dataset.ops;

                // if there's val1, move it to val2
                if (val1 != '') {
                    state.val2 = state.val1;
                }

            }

            if (state.val1 != '' && state.val2 != '') {
                if (!state.currentOperator) {
                    //record operator if there is none
                    state.currentOperator = event.target.dataset.ops;
                }

                // calculate result & asign to val2
                state.val2 = calcController.calculate();
                
                // update UI
                state.viewerString = state.val2; 
                UIController.updateView();
            }
            else {
                // calculate result using 2 values & previous operator
                // asign result to previous value
                state.val2 = calcController.calculate();
                state.viewerString = state.val2;

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
        console.log(state.val2, state.val1);
        let val1 = parseFloat(state.val1);
        let val2 = parseFloat(state.val2);
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