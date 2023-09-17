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
            if(operand2 === 0){
                return 'NO DIV BY 0'; //ERROR OCCURS SINCE .toFixed REQUIRES A NUMBER
            }
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
        console.log('2nd');
        
        //IF NUM IS PRESSED AFTER OPERATION IS COMPLETE IT WILL
        //CLEAR THE SCREEN AND START A NEW OPERATION
        let topExpression = topDisplay.textContent;
        let expressionArr = topExpression.split(' ');
        let arrLength = expressionArr.length;

        if(expressionArr[arrLength - 1] !== operator){
            clearScreen();
            firstOperand = e.target.textContent;
            displayValue.push(firstOperand);
            bottomDisplay.textContent = firstOperand;
            return;
        }
        
        secondOperand = displayValue.join('');
        bottomDisplay.textContent = secondOperand;
        secondOperandUsed = true;
    } else{
        console.log('1st');
        firstOperand = displayValue.join('');
        bottomDisplay.textContent = firstOperand;
    }
}

const operatorButtons = document.querySelectorAll('.operator-buttons');
operatorButtons.forEach(operator => operator.addEventListener('click', addOperator));

function addOperator(e){
    if(firstOperandUsed && secondOperandUsed){
        checkForDecimals();
        topDisplay.textContent = result;
    }

    if(secondOperandUsed){
        
        topDisplay.textContent = result.toString().concat(' ', e.target.textContent);
    } else {
        topDisplay.textContent = firstOperand.concat(' ', e.target.textContent);
    }

    displayValue.splice(0, displayValue.length);
    bottomDisplay.textContent = result;
    firstOperandUsed = true;
    operator = e.target.textContent;

}

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', equalsTo);

function equalsTo(){
    
    if(!firstOperandUsed || !secondOperandUsed){
        bottomDisplay.textContent = 'ERROR';
        displayValue.splice(0, displayValue.length);
        return;
    }

    let currDisplayed = topDisplay.textContent;

    if(!(currDisplayed.split(' ').includes(secondOperand, 1))){
        topDisplay.textContent = currDisplayed.concat(' ', secondOperand);
    }

    checkForDecimals();
    
    bottomDisplay.textContent = result;
   
}

function checkForDecimals(){

    if(firstOperand.includes('.') || secondOperand.includes('.')){
        result = (operate(operator, +firstOperand, +secondOperand)).toFixed(2);
    }else{

        result = operate(operator, +firstOperand, +secondOperand);
        if(result.toString().includes('.')){
            let valHold = result.toFixed(2);
            result = +valHold;
        }
    }
}

const clearButton = document.querySelector('.erase-buttons');

clearButton.addEventListener('click', clearScreen);

function clearScreen(){
    displayValue.splice(0, displayValue.length);
    operator = '';
    firstOperand = '';
    secondOperand = '';
    result = '';
    firstOperandUsed = false;
    secondOperandUsed = false;
    bottomDisplay.textContent = 'BOTTOM';
    topDisplay.textContent = 'TOP';
}


