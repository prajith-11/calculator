var firstNum = "";
var secondNum = "";
var operation = "";
var opSet = false;
var equalsSet = false;

var numbers = document.querySelectorAll('.button');
validateButtons();

function validateButtons(){
    numbers.forEach(num => {
        num.addEventListener(
            "click",(event)=>{
                var value = event.target.textContent;
                if((value>="0" && value<="9") || value=="."){
                    generateNum(value);
                }
                else if(value=="x" || value=="+" || value=="-" || value=="÷" || value=="%")
                    setOperand(value);
                else if(value=="="){
                    performCalc();
                }
                else if(value=="CLR"){
                    clearAll();
                }
                else if(value=="BSP"){
                    backspaceValue();
                }
                updateDisplay(value);
            }
        )
    });
}

function generateNum(digit){
    if(!opSet){
        if(firstNum=="0") firstNum = digit;
        else firstNum += digit;
    }
    else{
        if(secondNum=="0") secondNum = digit;
        else secondNum += digit;
    }
}

function setOperand(op){
    operation = op;
    opSet = true;
}

function performCalc(){
    var num1 = parseFloat(firstNum);
    var num2 = parseFloat(secondNum);
    if(isNaN(num1) || isNaN(num2)){
        alert("Errorneous input. Please start again");
        clearAll();
        return;
    }
    var result;
    switch(operation){
        case "+" : result = (num1+num2);
        break;
        case "-" : result = (num1-num2);
        break;
        case "x" : result = (num1*num2);
        break;
        case "÷" : 
        if(num2==0){
            alert("Invalid operation: Division by zero not possible");
            updateDisplay("0");
            clearAll();
            return;
        }
        result = (num1/num2);
        break;
        case "%" : result = (num1%num2);
        break;
        default: alert("Some error occured");
        clearAll();
        break;
    }
    // alert(result);
    console.log(firstNum+" "+secondNum)
    firstNum = result;
    secondNum = "";
    operation = "";
    opSet = false;
    equalsSet = true;
}

function clearAll(){ 
    firstNum = "";
    secondNum = "";
    operation = "";
    opSet = false;
    equalsSet = false;
    updateDisplay("0");
}

var display = document.getElementById('calculator_display');
function updateDisplay(value){
    if(value>="0" && value<="9" && !opSet){
        display.innerHTML = firstNum;
    }
    else if(value>="0" && value<="9"){
        display.innerHTML = secondNum;
    }
    else if(value=="+" || value=="-" || value=="x" || value=="÷" || value=="%"){
        display.innerHTML = value;
    }
    else if(value=="=") display.innerHTML = firstNum;
}

function backspaceValue(){
    if(equalsSet){
        clearAll();
        return;
    }
    else if(!opSet){
        firstNum = firstNum.slice(0,-1);
        if(firstNum==="") firstNum = "0";
        updateDisplay(firstNum);
    }
    else{ 
        secondNum = secondNum.slice(0,-1);
        if(secondNum==="") secondNum = "0";
        updateDisplay(secondNum);
    }
}