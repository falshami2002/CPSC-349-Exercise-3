const btns = document.querySelectorAll('.btn');

const canvas = document.querySelector('#tree');
var ctx = canvas.getContext("2d");

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else if (op.includes("=")) {
        equ.innerHTML = parseFloat((recurse(equ.innerHTML, 1000, 50, 1)).toFixed(2));
    }
    else {
        equ.innerHTML += op;
    }
}));

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
}

function recurse(equation, width, height, x) {
    let divIndex = equation.indexOf("/");
    let multIndex = equation.indexOf("x");
    let addIndex = equation.indexOf("+");
    let subIndex = equation.indexOf("-");
    if ((divIndex < multIndex && divIndex != -1) || (divIndex != multIndex && multIndex == -1)) {
        let first = equation.substring(0, divIndex);
        let second = equation.substring(divIndex + 1);
        ctx.beginPath();
        ctx.arc(width, height, 40, 0, 2 * Math.PI);
        ctx.font = "30px Arial";
        ctx.fillText("/", width, height);
        ctx.stroke();
        console.log("division")
        return recurse(first, width + 250/x, height + 200, x+0.5) / recurse(second, width - 250/x, height + 200, x+0.5);
    }
    else if ((divIndex > multIndex && multIndex != -1) || (divIndex != multIndex && divIndex == -1)) {
        let first = equation.substring(0, multIndex);
        let second = equation.substring(multIndex + 1);
        ctx.beginPath();
        ctx.arc(width, height, 40, 0, 2 * Math.PI);
        ctx.font = "30px Arial";
        ctx.fillText("x", width, height);
        ctx.stroke();
        console.log("division")
        return recurse(first, width + 250/x, height + 200, x+0.5) / recurse(second, width - 250/x, height + 200, x+0.5);
    }
    else if ((addIndex < subIndex && addIndex != -1) || (addIndex != subIndex && subIndex == -1)) {
        let first = equation.substring(0, addIndex);
        let second = equation.substring(addIndex + 1);
        ctx.beginPath();
        ctx.arc(width, height, 40, 0, 2 * Math.PI);
        ctx.font = "30px Arial";
        ctx.fillText("+", width, height);
        ctx.stroke();
        console.log("division")
        return recurse(first, width + 250/x, height + 200, x+0.5) / recurse(second, width - 250/x, height + 200, x+0.5);
    }
    else if ((addIndex > subIndex && subIndex != -1) || (addIndex != subIndex && addIndex == -1)) {
        let first = equation.substring(0, subIndex);
        let second = equation.substring(subIndex + 1);
        ctx.beginPath();
        ctx.arc(width, height, 40, 0, 2 * Math.PI);
        ctx.font = "30px Arial";
        ctx.fillText("-", width, height);
        ctx.stroke();
        console.log("division")
        return recurse(first, width + 250/x, height + 200, x+0.5) / recurse(second, width - 250/x, height + 200, x+0.5);
    }
    else {
        console.log("something")
        ctx.beginPath();
        ctx.arc(width, height, 40, 0, 2 * Math.PI);
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillText(equation.trim(), width, height);
        ctx.stroke();
        return parseFloat(equation);
    }
}