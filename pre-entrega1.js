let burger= "nombre";
let cantIng=0;
let cantCarne=1;
let totalIng=1;

const pesoPan=100;
const pesoCarne=130;

let ingredientes = ["pan"];
let pesoIng=[pesoPan];

function anadirIngredientes() {
    for (let i = 0; i < cantIng; i++) {
        let nuevoIng = prompt("Ingrese el ingrediente");
        let nuevoPeso = prompt ("Cuanto pesa");
        if (nuevoIng && 131>nuevoPeso>0) {
            ingredientes.push(nuevoIng);
            pesoIng.push(nuevoPeso);
        } else {
            alert("Error al ingresar ingrediente");
        }
    }
    
}


function pesarIngredientes(){
    let total=0;
    for (let i = 0; i < ingredientes.length; i++) {
        total+=Number(pesoIng[i]);
    }
    return total
}

function mostrarBurger(){
    let ingredientesString=ingredientes.join(", ");
    let pesoBurger=pesarIngredientes();
    alert ("Su burger "+burger+ " contiene los siguientes ingredientes: "+ingredientesString+". Que ganas de probarla");
}

function datosDesmenuzados(){
    let totalPeso=pesarIngredientes();
    console.log("Nombre de la nueva Burger:", burger);
    console.log("Ingredientes totales:"+totalIng);
    console.log("Peso total de Burger:"+totalPeso);
    console.log("PESO DE CADA INGREDIENTE:")
    for (let i = 0; i < totalIng; i++) {
        console.log(ingredientes[i]+":"+pesoIng[i]); 
    }
}

function crearBurger() {
    let confirmar = confirm("¿Quieres crear tu propia Burger?");
    if (confirmar){  
        burger= prompt("Ingresa el nombre que tendra:");
        for (let i = 0; i < 1;) {
            cantIng= prompt("Cuantos ingredientes quiere agregarle, sin contar la carne y pan");
            if(Number(cantIng)<6){
                i++;
            }
            else{
                alert("Por favor ingrese un numero valido, tope 5 ingredientes")
            }
        }
        for (let i = 0; i < 1;) {
            cantCarne= prompt("Cuantos medallones de carne tendra:");  
            if(Number(cantCarne)<4){
                i++;
            }
            else{
                alert("Por favor ingrese un numero valido, tope 3 medallones")
            }
        }
        if(cantIng>0){
            totalIng=Number(cantIng)+Number(cantCarne)+1;
        }
        for (let i=0; i < cantCarne; i++) {
            ingredientes.push("Medallon de Carne");
            pesoIng.push(pesoCarne);
        }  
        anadirIngredientes();
        datosDesmenuzados();
        mostrarBurger();
    } else {
        alert("Que lastima. La proxima sera");
    }
}

