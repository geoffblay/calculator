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
    if (displayVal == 'bruh') {
        clearDisplay();
    }

    if (parseInt(e.target.id.slice(1)) || e.target.id == 'n0') {
        let value = e.target.id.slice(1);
        // IF NO OPERATOR
        if (operator == '' && valX.length < 9) {
            if (valX == '0') {
                valX = value;
                displayVal = valX;
            } else {
                valX = valX + value;
                displayVal = valX;
            }
        }
        // IF OPERATOR 
        else if (operator != '' && valY.length < 9) {
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
                equal();
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
        // valX *= -1;
        valX = operate(valX, -1, 'mult')
        displayVal = valX;
    } else {
        // valY *= -1;
        valX = operate(valY, -1, 'mult')
        displayVal = valY;
    }
    return;
}

function percent() {
    if (valY == '') {
        // valX /= 100;
        valX = operate(valX, 100, 'divide');
        displayVal = valX;
    } else {
        // valY /= 100;
        valY = operate(valY, 100, 'divide');
        displayVal = valY;
    }
    return;
}

function equal() {
    if (valY != '') {
        valX = operate(parseFloat(valX), parseFloat(valY), operator);
        console.log('FINAL: ' + valX)

        if (valX.length < 9) {
            displayVal = valX;
            valY = '';
        } else {
            clearDisplay();
        }
    } else {
        displayVal = valX;
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
            if (y == 0) {
                return 'bruh';
            }
            result = x / y;
            break;
    }
    console.log(result);
    let [before, after] = result.toString().split('.')
    while (result % 1 != 0 && result.toString().length >= 9) {
        result = Number((result).toFixed(after.length - 1));
        [before, after] = result.toString().split('.');
        console.log(result);

    }

    return result.toString();
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

