let firstOperand;
let secondOperand;
let operator;
let displayValue = [];
let firstOperandUsed = false;
let secondOperandUsed = false;
let result;

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
                return 'Infinity';
            }
            return divide(operand1,operand2);
    }
}

const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');

const digitButtons = document.querySelectorAll('.digit-buttons');
digitButtons.forEach(button => button.addEventListener('click', displayDigits));

function displayDigits(e){

    let numValue;

    if(e.type === 'keydown'){
        numValue = e.key;
    }else{
        numValue = e.target.textContent;
    }

    displayValue.push(numValue);

    if(result){
        firstOperand = result.toString();
    }

    //ALLOWS ONLY ONE DECIMAL POINT PER OPERAND
    if(numValue === '.'){
        let currPoint = numValue;

        if(displayValue.indexOf(currPoint) !== displayValue.lastIndexOf(currPoint)){
            displayValue.splice(displayValue.length - 1, 1);
        }
    }

    if(firstOperandUsed){
        //IF NUM IS PRESSED AFTER OPERATION IS COMPLETE IT WILL
        //CLEAR THE SCREEN AND START A NEW OPERATION
        let topExpression = topDisplay.textContent;
        let expressionArr = topExpression.split(' ');
        let arrLength = expressionArr.length;

        if(expressionArr[arrLength - 1] !== operator){
            clearScreen();
            firstOperand = numValue;
            displayValue.push(firstOperand);
            bottomDisplay.textContent = firstOperand;
            return;
        }
        
        //CREATES AND DISPLAYS 2ND OPERAND IF 1ST ALREADY CREATED
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

    let operatorValue;

    if(e.type === 'keydown'){
        operatorValue = e.key;
    }else{
        operatorValue = e.target.textContent;
    }

    if(firstOperandUsed && secondOperandUsed){
        checkForDecimals();
        topDisplay.textContent = result;
    }

    if(secondOperandUsed){
        topDisplay.textContent = result.toString().concat(' ', operatorValue);
    } else {
        topDisplay.textContent = firstOperand.concat(' ', operatorValue);
    }

    displayValue.splice(0, displayValue.length);
    bottomDisplay.textContent = result;
    firstOperandUsed = true;
    operator = operatorValue;

}

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', equalsTo);

function equalsTo(){
    
    //RETURNS ERROR IF BOTH OPERANDS ARENT PRESENT & '=' IS PRESSED
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
        let answer = (operate(operator, +firstOperand, +secondOperand));
        let decimalIndex = answer.toString().indexOf('.');
        let numLength = answer.toString().length;
        
        //CHECKS IF THERE ARE MORE THAN 2 NUMBERS AFTER THE DECIMAL
        //AND ROUNDS IF TRUE
        let maxDistance = 3; 

        result = ((numLength - decimalIndex) > maxDistance) ? answer.toFixed(2) : answer;
    }else{
        result = operate(operator, +firstOperand, +secondOperand);
        if(result.toString().includes('.')){
            let valHold = result.toFixed(2);
            result = +valHold;
        }
    }
}

const clearButton = document.querySelector('.clear-button');

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

const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', deleteNumber);

function deleteNumber(){
    //DETERMINE WHETHER DELETION SHOULD BE FROM THE FIRST OR SECOND OPERAND
    if(!secondOperandUsed && bottomDisplay.textContent == firstOperand){
        displayValue.splice(displayValue.length - 1, 1);
        let firstArr = firstOperand.split('');
        firstArr.splice(firstOperand.length - 1, 1);
        firstOperand = firstArr.join('');
        bottomDisplay.textContent = firstOperand;
    }else if(secondOperandUsed && bottomDisplay.textContent == secondOperand){
        displayValue.splice(displayValue.length - 1, 1);
        let secondArr = secondOperand.split('');
        secondArr.splice(secondOperand.length - 1, 1);
        secondOperand = secondArr.join('');
        bottomDisplay.textContent = secondOperand;
    }
}

window.addEventListener('keydown', pressButton);

function pressButton(e){
    digitButtons.forEach(button =>{
        if(button.innerText.includes(`${e.key}`)){
            displayDigits(e);
        }
    });
    
    operatorButtons.forEach(button =>{
        if(button.innerText.includes(`${e.key}`)){
            addOperator(e);
        }
    });

    if(equalButton.innerText.includes(`${e.key}`)){
        equalsTo();
    }else if(e.key === 'Enter'){
        //STOP ENTER KEY FROM TRIGGERING CLICK EVENT
        e.preventDefault();
        equalsTo();
    }
    
    if(e.key === 'Backspace'){
        deleteNumber();
    }
}