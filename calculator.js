let rows = "";
let validResults = [];
while (true) {
    let x = prompt("Enter the first number for your calculation:");
    if (x === null) break;

    let operator = prompt("Enter an operator (+ - * / %):");
    if (operator === null) break;

    let y = prompt("Enter the second number for your calculation:");
    if (y === null) break;

    let result;

    if (isNaN(Number(x)) || isNaN(Number(y))) {
        result = "Error: not a number";
    } else if (operator === "+") {
        result = Number(x) + Number(y);
    } else if (operator === "-") {
        result = Number(x) - Number(y);
    } else if (operator === "*") {
        result = Number(x) * Number(y);
    } else if (operator === "/") {
        result = Number(x) / Number(y);
    } else if (operator === "%") {
        result = Number(x) % Number(y);
    } else {
        result = "Error: bad operator";
    }

    rows += "<tr><td>" + x + "</td><td>" + operator + "</td><td>" + y + "</td><td>" + result + "</td></tr>";

    if (typeof result === "number") {
        validResults.push(result);
    }
}
document.write("<p>Loop finished</p>");
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");
document.write(rows);
document.write("</table>");