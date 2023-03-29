const display = document.querySelector(".display-div");
const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonPressed);
});

let displayVal = '0'
let valX = '0'
let valY = ''
let operator = ''
function buttonPressed(e) {
    // IF NUMBER PRESSED
    if (parseInt(e.target.id.slice(1))) {
        let value = e.target.id.slice(1);
        // IF NO OPERATOR
        if (operator == '') {
            if (valX == '0') {
                valX = value;
                displayVal = valX;
            } else {
                valX = valX + value;
                displayVal = valX;
            }
        }
        // IF OPERATOR 
        else {
            if (valY == '') {
                valY = value;
                displayVal = valY;
            } else {
                valY = valY + value;
                displayVal = valY;
            }
        }
    } 
    // OPERATION PRESSED
    else {
        switch (e.target.id) {
            case 'clear':
                clearDisplay();
                break;         
            case 'negative':
                negative();
                break;         
            case 'percent':
                percent();
                break;         

            // EQUAL
            case 'equal':
                valX = operate(parseFloat(valX), parseFloat(valY), operator);
                displayVal = valX;
                valY = '';
                break;         

            // OPERATORS
            case 'divide':
            case 'mult':
            case 'sub':
            case 'add':
                operator = e.target.id;
                console.log(operator);
                break;
            
            // DECIMAL
            case '.':
                decimal();
        }
    }
    display.textContent = displayVal;
}

function clearDisplay() {
    displayVal = '0';
    valX = '0';
    valY = '';
    operator = '';
    return;
}

function negative() {
    if (valY == '') {
        valX *= -1;
        displayVal = valX;
    } else {
        valY *= -1;
        displayVal = valY;
    }
    return;
}

function percent() {
    if (valY == '') {
        valX /= 100;
        displayVal = valX;
    } else {
        valY /= 100;
        displayVal = valY;
    }
    return;
}

function operate(x, y, op) {
    let result = 0;
    switch (op) {
        case 'add':
            result = x + y;
            break;
        case 'sub':
            result = x - y;
            break;
        case 'mult':
            result = x * y;
            break;
        case 'divide':
            result = x / y;
            break;
    }
    console.log(result);
    return result;
}

function decimal() {
    console.log('valX: ' + valX)
    console.log('valY: ' + valY)
    if (valY == '' && !(valX.includes('.'))) {
        valX += '.';
        displayVal = valX;
    } else if (valY != '' && !(valY.includes('.'))) {
        valY += '.';
        displayVal = valY;
    } else {
        console.log('decimal already present');
    }
    return;
}

