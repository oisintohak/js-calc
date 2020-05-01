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
        state.result = '';
    },

    clearStored: (...params) => {
        for (let item of params) {
            state[item] = '';
        }
    }
}

state.clearState();

// UI CONTROLLER
const UIController = {
    updateView: () => {
        DOMselectors.viewer.innerHTML = state.viewerString;
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
                // state.clearState();
            }

            // check if only 1 value, clear any stored operator, then display value
            else if (!state.val2) {
                state.clearStored('currentOperator');
                UIController.updateView();
            }

            // check for 2 values & operator, then display result
            else if (state.val1 != '' && state.val2 != '' && state.currentOperator != '') {
                state.viewerString = calcController.calculate();
                state.result = state.viewerString;
                UIController.updateView();
                // remove values and operator
                state.clearStored('val1', 'val2', 'currentOperator');
                console.log(state);
            }
        }
        //NUMBERS:
        if (event.target.classList.contains('num') || numList.indexOf(event.key) != -1) {
            // if last value was from equals, clear it
            if (state.result != '') {
                state.clearStored('result');
            }
            let val;
            //add digit to current value
            if (event.type == 'click') {
                val = `${event.target.dataset.num}`;
            }
            if (event.type == 'keypress') {
                val = `${event.key}`;
            }
            
            // check for previous decimal
            if (state.val1.indexOf('.') != -1 && val == '.') {
                return;
            }

            state.val1 += val;

            //update viewerstring
            state.viewerString = state.val1;

            // update UI
            UIController.updateView();
        }

        //OPERATOR (M/D/A/S):
        if (event.target.classList.contains('ops') || opsList.indexOf(event.key) != -1) {
            // if last value was from equals, move it to val2
            if (state.result != '') {
                state.val2 = state.result;
                state.clearStored('result');
            }
            // record operator name
            let opName;
            // convert keypress to named operator
            if (event.type == 'keypress') {
                opName = opsNames[opsList.indexOf(event.key)];
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
                state.clearStored('val1');
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
                state.clearStored('val1');

                // store operator
                state.currentOperator = opName;

                // update UI
                state.viewerString = state.val2; 
                UIController.updateView();
                console.log(state);
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
        let val1 = parseFloat(state.val1);
        let val2 = parseFloat(state.val2);
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
        return result.toString(10);

    }
}

//EVENT LISTENERS:
DOMselectors.calculatorWrapper.addEventListener('click', inputController.getInputClick);
window.addEventListener('keypress', inputController.getInputClick);

const button = document.querySelector('button');
// mdc.ripple.MDCRipple.attachTo(button);

