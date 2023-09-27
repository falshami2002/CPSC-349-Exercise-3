const btns = document.querySelectorAll('.btn');

console.log(btns);

btns.forEach(btn => btn.addEventListener("click", event => {
    let paragraph = null;
    if (event.target.nodeName == "DIV") {
        paragraph = event.target.querySelector("p");
    }
    else {
        paragraph = event.target;
    }
    let op = paragraph.innerHTML;
    let equ = document.querySelector('#equation');
    if (op.includes("C")) {
        equ.innerHTML = "";
    }
    else if (op.includes("=")) {
        equ.innerHTML = parseFloat((evaluate(equ.innerHTML)).toFixed(2));
    }
    else {
        equ.innerHTML += op.trim();
    }
}));

function evaluate(equation) {
    if (equation.includes("+")) {
        let a = parseFloat(equation.split('+')[0]);
        let b = parseFloat(equation.split('+')[1]);
        return a + b;
    }
    else if (equation.includes("-")) {
        let a = parseFloat(equation.split('-')[0]);
        let b = parseFloat(equation.split('-')[1]);
        return a - b;
    }
    else if (equation.includes("/")) {
        let a = parseFloat(equation.split('/')[0]);
        let b = parseFloat(equation.split('/')[1]);
        return a / b;
    }
    else if (equation.includes("x")) {
        let a = parseFloat(equation.split('x')[0]);
        let b = parseFloat(equation.split('x')[1]);
        return a * b;
    }
}
