document.addEventListener('DOMContentLoaded', () => {
    const qs = selector => document.querySelector(selector);
    
    const num1 = qs('#num1');
    const num2 = qs('#num2');
    const op = qs('#op');
    const calcBtn = qs('#calcBtn');
    const resultsDiv = qs('#results');
    const err1 = qs('#err1');
    const err2 = qs('#err2');
    
    const history = [];

    const validate = (input, errEl) => {
        const val = input.value.trim().replace(',', '.');
        
        if (val === '') {
            input.classList.remove('invalid');
            errEl.textContent = '';
            return true;
        }
        
        if (isNaN(Number(val))) {
            input.classList.add('invalid');
            errEl.textContent = 'Только числа';
            return false;
        }
        
        input.classList.remove('invalid');
        errEl.textContent = '';
        return true;
    };

    num1.addEventListener('input', () => validate(num1, err1));
    num2.addEventListener('input', () => validate(num2, err2));

    calcBtn.addEventListener('click', () => {
        const isV1Valid = validate(num1, err1);
        const isV2Valid = validate(num2, err2);
        
        if (num1.value.trim() === '') { err1.textContent = 'Заполните поле'; num1.classList.add('invalid'); }
        if (num2.value.trim() === '') { err2.textContent = 'Заполните поле'; num2.classList.add('invalid'); }
        
        if (!isV1Valid || !isV2Valid || num1.value.trim() === '' || num2.value.trim() === '') return;

        const n1 = parseFloat(num1.value.replace(',', '.'));
        const n2 = parseFloat(num2.value.replace(',', '.'));
        const operator = op.value;
        let res;

        if (operator === '+') res = n1 + n2;
        else if (operator === '-') res = n1 - n2;
        else if (operator === '*') res = n1 * n2;
        else if (operator === '/') {
            if (n2 === 0) {
                num2.classList.add('invalid');
                err2.textContent = 'Деление на ноль';
                return;
            }
            res = n1 / n2;
        }

        res = parseFloat(res.toFixed(5));
        history.push(`${n1} ${operator} ${n2} = ${res}`);
        
        if (history.length > 5) history.shift();
        
        resultsDiv.innerHTML = history.map((item, index) => 
            `<div class="${index === history.length - 1 ? 'current-result' : 'history-item'}">${item}</div>`
        ).join('');
    });
});