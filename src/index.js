// Definimos 2 variables para obtener por su id al elemento

let display = document.getElementById("display")
let check = document.getElementById("theme")

/* Definimos una variable para llevar la cuenta de cuantas veces
se ha usado un operador sin poner un numero */
let isOperator = 0;

//con esta funcion asignamos el texto al display de la calculadora

function addText(text){
    //formateamos el texto antes de ponerlo para separarlo mas facil
    let t = format(text.innerText)
    if(display.textContent == "0" || display.textContent == "NaN"){
        // si el texto es 0 o NaN solo cambiamos el valor, si, no lo concatenamos
        if(isOperator > 0){
            // si tratamos de poner un operador al inicio no nos dejara a menos que
            // el primer elemento sea un numero
            display.textContent = "0"
            
        }else{
            display.textContent = t
        }
    }
    else{
        display.textContent += t
    
    }
}

// con esta funcion formateamos el texto para agregarle unos espacios, y separarlo
// para realizar las operaciones, solo en caso de los operadores y lo retornamos

function format(txt){
    let txtDef = ""
    switch(txt){
        case "+":
        case "-":
        case "/":
        case "*":
            if(isOperator > 0 && display.textContent != "0"){
                // si traramos de repetir un operador este sera remplazado
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

// esta funcion se ejecuta al presionar el boton igual y nos retorna el resultado

function equals(){
    // separamos los numero y los operadores
    let op = display.textContent.split(" ")
    // con reduce iteramos y formateamos cada elemento,
    // y aplicamos su respectiva operacion matematica
    // guardamos el resultado en la variable res
    let res = op.reduce((v,i, index) => {
        switch(i){
            case "+":
                // se hizo uso de un callback para simplificar el codigo
                // ya que se repetia muchas veces, solo les pasamos los argumentos para hacer
                // la operacion
                return v = operacion(suma, v, op, index)
            case "*":
                return v = operacion(multi, v, op, index)
            case "/":
                return v = operacion(div, v, op, index)
            case "-":
                return v = operacion(resta, v, op, index)
            default:
                return v
        }
    }, 0)
    display.textContent = res
}
// esta funcion recibe un callback como parametro, que seria la operacion a realizar
function operacion(callback, acc , op, index){
    if(acc == 0){
        return acc = callback(parseFloat(op[index-1]),parseFloat(op[index+1]))
    }else{
        return acc = callback(parseFloat(acc),parseFloat(op[index+1]))
    }
}

// aca definimos las funciones para cada operacion (sumas, resta, multiplicacion, division)

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

// con esta funcion limpiamos el display y lo dejamos en 0

function clean(){
    display.textContent = "0"
}

// con esta funcion borramos de a un caracter

function borrar(){
    // Tomamos los tres ultimos caracteres del display
    let lastChar = display.textContent.substring(display.textContent.length - 3)
    if(display.textContent.length > 1){
        // comparamos si son un operador
        switch(lastChar){
            case " + ":
            case " - ":
            case " / ":
            case " * ":
                // si lo son los borramos, si no borramos el ultimo digito
                display.textContent = display.textContent.slice(0, -3)
                isOperator = 0
                break
            default:
                display.textContent = display.textContent.slice(0, -1)
                break
        }
    }else{
        // si no hay nada dejamos la calculadora en 0
        display.textContent = "0"
    }
}

// con esta funcion cambiamos el tema de dia a oscuro y visceversa

function changueMode(){
    //vemos si el checkbox esta checkeado para cambiar los colores
    if(check.checked){
        // accedemos al root y cambiamos el valos de las custom propertys
        document.documentElement.style.setProperty("--accent", "#44484b")
        document.documentElement.style.setProperty("--accentDark", "#293242")
        document.documentElement.style.setProperty("--aux", "white")
    }else{
        document.documentElement.style.setProperty("--accent", "#cccacd")
        document.documentElement.style.setProperty("--accentDark", "#f4f2f5")
        document.documentElement.style.setProperty("--aux", "black")
    }
}