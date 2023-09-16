function add(operand1, operand2){
    return operand1 + operand2;
}

function subtract(operand1, operand2){
    return operand1 - operand2;
}

function multiply(operand1, operand2){
    return operand1 * operand2;
}

function divide(operand1, operand2){
    return operand1 / operand2;
}

function operate(operator, operand1, operand2){
    
    switch(operator){
        case '+':
            return add(operand1,operand2);
        case '-':
            return subtract(operand1,operand2);
        case '*':
            return multiply(operand1,operand2);
        case '/':
            return divide(operand1,operand2);
    }
}

let firstOperand;
let secondOperand;
let operator;
let displayValue = [];
let firstOperandUsed = false;
let secondOperandUsed = false;
let result;

const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');

const digitButtons = document.querySelectorAll('.digit-buttons');
digitButtons.forEach(button => button.addEventListener('click', displayDigits));

function displayDigits(e){
    displayValue.push(e.target.textContent);

    if(result){
        firstOperand = result.toString();
    }

    if(firstOperandUsed){
        secondOperand = displayValue.join('');
        bottomDisplay.textContent = secondOperand;
        secondOperandUsed = true;
    } else{
        firstOperand = displayValue.join('');
        bottomDisplay.textContent = firstOperand;
    }
}

const operatorButtons = document.querySelectorAll('.operator-buttons');
operatorButtons.forEach(operator => operator.addEventListener('click', addOperator));

function addOperator(e){
    if(firstOperandUsed && secondOperandUsed){
        result = operate(operator, +firstOperand, +secondOperand);
        topDisplay.textContent = result;
    }

    if(secondOperandUsed){
        topDisplay.textContent = result.toString().concat(' ', e.target.textContent);
    } else {
        topDisplay.textContent = firstOperand.concat(' ', e.target.textContent);
    }

    displayValue.splice(0, displayValue.length);
    bottomDisplay.textContent = 'EMPTY';
    firstOperandUsed = true;
    operator = e.target.textContent;

}

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', equalsTo);

function equalsTo(){

    if(!firstOperandUsed || !secondOperandUsed){
        bottomDisplay.textContent = 'ERROR';
        return;
    }

    let currDisplayed = topDisplay.textContent;

    if(!(currDisplayed.split(' ').includes(secondOperand, 1))){
        console.log('used');
    
        topDisplay.textContent = currDisplayed.concat(' ', secondOperand);
    }

    result = operate(operator, +firstOperand, +secondOperand);
    bottomDisplay.textContent = result;
   
}



