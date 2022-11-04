let display = document.getElementById("display")
let check = document.getElementById("theme")
let isOperator = 0;

function addText(text){
    let t = format(text.innerText)
    if(display.textContent == "0" || display.textContent == "NaN"){
        if(isOperator > 0){
            display.textContent = "0"
            
        }else{
            display.textContent = t
        }
    }
    else{
        display.textContent += t
    
    }
}

function format(txt){
    let txtDef = ""
    switch(txt){
        case "+":
        case "-":
        case "/":
        case "*":
            if(isOperator > 0 && display.textContent != "0"){
                display.textContent = display.textContent.slice(0, -3)
            }
            isOperator++
            txtDef = ` ${txt} `
            break
        default:
            isOperator = 0;
            txtDef = txt
            break
    }
    return txtDef
}

function equals(){
    op = display.textContent.split(" ")
    res = op.reduce((v,i, index) => {
        switch(i){
            case "+":
                if(v == 0){
                    return v = suma(parseFloat(op[index-1]),parseFloat(op[index+1]))
                }else{
                    return v = suma(parseFloat(v),parseFloat(op[index+1]))
                }
            case "*":
                if(v == 0){
                        return v = multi(parseFloat(op[index-1]),parseFloat(op[index+1]))
                    }else{
                        return v = multi(parseFloat(v),parseFloat(op[index+1]))
                    }
            case "/":
                if(v == 0){
                        return v = div(parseFloat(op[index-1]),parseFloat(op[index+1]))
                    }else{
                        return v = div(parseFloat(v),parseFloat(op[index+1]))
                    }
            case "-":
                if(v == 0){
                        return v = resta(parseFloat(op[index-1]),parseFloat(op[index+1]))
                    }else{
                        return v = resta(parseFloat(v),parseFloat(op[index+1]))
                    }
            default:
                return v
        }
    }, 0)
    display.textContent = res
}

function suma(a,b){
    return a + b
}

function multi(a,b){
    return a * b
}

function div(a,b){
    return a / b
}

function resta(a,b){
    return a - b
}

function clean(){
    display.textContent = "0"
}

function borrar(){
    let lastChar = display.textContent.substring(display.textContent.length - 3)
    if(display.textContent.length > 1){
        switch(lastChar){
            case " + ":
            case " - ":
            case " / ":
            case " * ":
                display.textContent = display.textContent.slice(0, -3)
                isOperator = 0
                break
            default:
                display.textContent = display.textContent.slice(0, -1)
                break
        }
    }else{
        display.textContent = "0"
    }
}

function changueMode(){
    if(check.checked){
        document.documentElement.style.setProperty("--accent", "#44484b")
        document.documentElement.style.setProperty("--accentDark", "#293242")
        document.documentElement.style.setProperty("--aux", "white")
    }else{
        document.documentElement.style.setProperty("--accent", "#cccacd")
        document.documentElement.style.setProperty("--accentDark", "#f4f2f5")
        document.documentElement.style.setProperty("--aux", "black")
    }
}