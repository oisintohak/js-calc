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
        let numList = ['0','1','2','3','4','5','6','7','8','9','.'];
        let opsList = ['*','/','+','-'];
        let opsNames = ['multiplication', 'division', 'addition', 'subtraction'];
        //CLEAR:
        if (event.target.id == 'clear' || event.code == 'KeyC') {
            state.clearState();
            UIController.updateView();
        }

        // EQUALS:
        if (event.target.id == 'equals' || event.key == '=') {
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
        if (event.target.classList.contains('num') || numList.indexOf(event.key) != -1) {
            //add digit to current value
            if (event.type == 'click') {
                state.val1 += `${event.target.dataset.num}`;
            }
            if (event.type == 'keypress') {
                state.val1 += `${event.key}`;
            }

            //update viewerstring
            state.viewerString = state.val1;

            // update UI
            UIController.updateView();
        }

        //OPERATOR (M/D/A/S):
        if (event.target.classList.contains('ops') || opsList.indexOf(event.key) != -1) {
            // record operator name
            let opName;
            // convert keypress to named operator
            if (event.type == 'keypress') {
                opName = opsNames[opsList.indexOf(event.key)];
                console.log(opName);
            }
            // record click event
            if (event.type == 'click') {
                opName = event.target.dataset.ops;
            }

            //if nothing stored, do nothing:
            if (!state.val1 && !state.val2 && !state.currentOperator) {
                return;
            }

            
            // if only val1
            else if (!state.val2 && !state.currentOperator && state.val1 != '') {
                //record operator
                state.currentOperator = opName;

                //move val1 to val2
                state.val2 = state.val1;

                //clear val1
                state.val1 = '';
            }

            // if only val1 & operator
            else if (!state.val2 && state.val1 != '' && state.currentOperator != '') {
                //record operator
                state.currentOperator = opName;
            }

            // if there's val2 but no val1
            else if (state.val2 != '' && !state.val1) {
                //record operator
                state.currentOperator = opName;
            }

            // if val1 & val2
            else if (state.val1 != '' && state.val2 != '') {
                // calculate result & asign to val2
                state.val2 = calcController.calculate();

                // clear val1
                state.val1 = '';
                
                // update UI
                state.viewerString = state.val2; 
                UIController.updateView();
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
window.addEventListener('keypress', inputController.getInputClick);

