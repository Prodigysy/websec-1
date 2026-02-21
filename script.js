const inputNum1 = document.getElementById('num1');
const inputNum2 = document.getElementById('num2');
const selectOp = document.getElementById('operation');
const btnCalc = document.getElementById('calc-btn');
const errText1 = document.getElementById('error1');
const errText2 = document.getElementById('error2');
const historyLog = document.getElementById('history');
const currentResult = document.getElementById('result');

let operationsHistory = []; 

btnCalc.addEventListener('click', () => {
    inputNum1.classList.remove('error');
    inputNum2.classList.remove('error');
    errText1.textContent = '';
    errText2.textContent = '';

    const val1 = inputNum1.value.trim().replace(',', '.');
    const val2 = inputNum2.value.trim().replace(',', '.');
    const op = selectOp.value;

    let hasError = false;

    if (val1 === '' || isNaN(val1)) {
        inputNum1.classList.add('error');
        errText1.textContent = 'Введите корректное число';
        hasError = true;
    }

    if (val2 === '' || isNaN(val2)) {
        inputNum2.classList.add('error');
        errText2.textContent = 'Введите корректное число';
        hasError = true;
    }

    if (hasError) return;

    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);
    let result = 0;

    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/':
            if (num2 === 0) {
                inputNum2.classList.add('error');
                errText2.textContent = 'На ноль делить нельзя!';
                return;
            }
            result = num1 / num2;
            break;
    }

    result = Math.round(result * 100000000) / 100000000;

    const operationString = `${num1} ${op} ${num2} = ${result}`;

    if (currentResult.textContent !== 'Результат будет здесь') {
        operationsHistory.push(currentResult.textContent);
        if (operationsHistory.length > 3) {
            operationsHistory.shift(); 
        }
        historyLog.innerHTML = operationsHistory.join('<br>');
    }

    currentResult.textContent = operationString;
});