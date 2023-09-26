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
        equ.innerHTML = parseFloat((recurse(equ.innerHTML)).toFixed(2));
    }
    else {
        equ.innerHTML += op;
    }
}));

/*
//This function can only solve single operation equations.
function evaluate(equation) {
    if (equation.includes("+")) {
        let a = parseInt(equation.split('+')[0]);
        let b = parseInt(equation.split('+')[1]);
        return a + b;
    }
    else if (equation.includes("-")) {
        let a = parseInt(equation.split('-')[0]);
        let b = parseInt(equation.split('-')[1]);
        return a - b;
    }
    else if (equation.includes("/")) {
        let a = parseInt(equation.split('/')[0]);
        let b = parseInt(equation.split('/')[1]);
        return a / b;
    }
    else if (equation.includes("x")) {
        let a = parseInt(equation.split('x')[0]);
        let b = parseInt(equation.split('x')[1]);
        return a * b;
    }
}*/

function recurse(equation) {
    let divIndex = equation.indexOf("/");
    let multIndex = equation.indexOf("x");
    let addIndex = equation.indexOf("+");
    let subIndex = equation.indexOf("-");
    if ((divIndex < multIndex && divIndex != -1) || (divIndex != multIndex && multIndex == -1)) {
        let first = equation.substring(0, divIndex);
        let second = equation.substring(divIndex + 1);
        return recurse(first) / recurse(second);
    }
    else if ((divIndex > multIndex && multIndex != -1) || (divIndex != multIndex && divIndex == -1)) {
        let first = equation.substring(0, multIndex);
        let second = equation.substring(multIndex + 1);
        return recurse(first) * recurse(second);
    }
    else if ((addIndex < subIndex && addIndex != -1) || (addIndex != subIndex && subIndex == -1)) {
        let first = equation.substring(0, addIndex);
        let second = equation.substring(addIndex + 1);
        return recurse(first) + recurse(second);
    }
    else if ((addIndex > subIndex && subIndex != -1) || (addIndex != subIndex && addIndex == -1)) {
        let first = equation.substring(0, subIndex);
        let second = equation.substring(subIndex + 1);
        return recurse(first) - recurse(second);
    }
    else {
        return parseFloat(equation);
    }
}