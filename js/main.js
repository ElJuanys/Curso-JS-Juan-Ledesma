async function fetchPlatos() {
    try {
        const response = await fetch("http://200.45.208.91:8080/platos/traerPlatos", {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const platos = await response.json();  
        mostrarObjetos(platos);
        buscador(platos);
        carrito(platos);

    } catch (error) {
        console.error("Hubo un problema con la solicitud fetch:", error);
    }
}

fetchPlatos();
/*CARRITO DE COMPRAS*/
let carritoItems = recuperarCarrito(); 
function carrito(platos) {
    const producto = document.getElementById("menu");
    producto.addEventListener("click", function (e) {
        if (e.target && e.target.matches("button.btn.btn-outline-dark")) {
            const platoId = e.target.value; 
            const plato = platos.find(p => p.id == platoId); 
            if (plato) {
                añadirAlCarrito(plato);
            }
        }
    });
}
function añadirAlCarrito(plato) {
    carritoItems.push(plato); 
    guardarCarrito();
    mostrarCarrito(); 
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById("carro");
    let contenido = "<h2>Carrito</h2><ul>";
    carritoItems.forEach(plato => {
        contenido += `
            <li>${plato.nombre} - $${plato.precio}</li>
        `;
        
    });
    contenido += "</ul>";
    contenido += '<button id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</button>';
    carritoDiv.innerHTML = contenido; 
    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
}

function vaciarCarrito() {
    carritoItems = []; 
    guardarCarrito(); 
    mostrarCarrito(); 
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

function recuperarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});


/*BUSCADOR*/
function buscador(platos) {
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("input", function(e) {
        const busca = e.target.value.toLowerCase(); 
        const platosFiltrados = platos.filter(plato => 
            plato.nombre.toLowerCase().includes(busca) || plato.descripcion.toLowerCase().includes(busca)
        );
        mostrarObjetos(platosFiltrados); 
    });
}
/*MOSTRAR PLATOS*/
function mostrarObjetos(platos) {
    const producto = document.getElementById("menu");
    let contenido = "";

    platos.forEach(plato => {
        contenido += `
            <article class="card producto col-sm-5 col-md-5 col-lg-2 col-xl-2" data-aos="fade-down">
                <img src="../assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ${plato.nombre}">
                <div class="card-body">
                    <h3 class="card-title">${plato.nombre}</h3>
                    <p class="card-text">${plato.descripcion}</p>
                    <p class="precio">Precio: $${plato.precio}</p>
                    <button type="button" class="btn btn-outline-dark" value="${plato.id}">Agregar al Carrito</button>
                </div>
            </article>
        `;
    });

    producto.innerHTML = contenido;
}
