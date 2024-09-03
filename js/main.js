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

    } catch (error) {
        console.error("Hubo un problema con la solicitud fetch:", error);
    }
}

fetchPlatos();


function buscador(platos){
    let buscador = document.getElementById("buscador");
    buscador.addEventListener("input", function(e) {
        let busca = e.target.value.toLowerCase(); 
        let platosFiltrados = platos.filter(plato => 
            plato.nombre.toLowerCase().includes(busca) || plato.descripcion.toLowerCase().includes(busca)
        );
        mostrarObjetos(platosFiltrados); 
    });

}

function mostrarObjetos(platos){
        let producto = document.getElementById("menu");
        let categorias = {};

        platos.forEach(plato => {
            let categoria="";
            if (!categorias[plato.categoria]) {
                categorias[plato.categoria] = `
                    <section id="${plato.categoria}" class="row orden">
                        <h2 data-aos="zoom-in">${plato.categoria}</h2>
                    <article class="card producto col-sm-5 col-md-5 col-lg-2 col-xl-2" data-aos="fade-down">
                    <img src="../assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ">
                    <div class="card-body">
                        <h3 class="card-title">${plato.nombre}</h3>
                        <p class="card-text">${plato.descripcion}</p>
                        <p class="precio">Precio: $${plato.precio}</p>
                        <button type="button" class="btn btn-outline-dark">Agregar al Carrito</button>
                    </div>
                    </article>
                `;
                categoria=[plato.categoria];
            }else{
                categorias[plato.categoria]+= `
                <article class="card producto col-sm-5 col-md-5 col-lg-2 col-xl-2" data-aos="fade-down">
                    <img src="../assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ">
                    <div class="card-body">
                        <h3 class="card-title">${plato.nombre}</h3>
                        <p class="card-text">${plato.descripcion}</p>
                        <p class="precio">Precio: $${plato.precio}</p>
                        <button type="button" class="btn btn-outline-dark">Agregar al Carrito</button>
                    </div>
                </article>
            `;
                if(categoria!=[plato.categoria]){
                    categorias[plato.categoria]+= `</section>`;
                }
            
            }
        });

        
        producto.innerHTML = Object.values(categorias).join('');
};