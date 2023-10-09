const productos = [
    {
       titulo : "computadora portatil",
       imagen:"notebook.jpg",
       precio: 3500,
       id: "compuportatil"

},
    {
       titulo : "computadora de escritorio", 
       imagen:"computadora.jpg",
       precio: 1500,
       id: "compuesc"
},
    {
       titulo : "silla gamer" ,
       imagen:"sillagamer.jpg",
       precio: 800,
       id: "sillaG"
},
    {
       titulo : "silla comun",
       imagen:"silla.jpg",
       precio: 400,
       id: "sillaC"
},
    {
       titulo : "teclado y mouse inalambricos" ,
       imagen:"teclado.jpg",
       precio: 1000,
       id: "teci"
},
    {
       titulo : "teclado y mouse con cable",
       imagen:"teclado.jpg",
       precio: 600,
       id: "tecc"
},
    {
       titulo : "auriculares inalambricos",
       imagen:"auricularesgamer.jpg",
       precio: 800,
       id: "auri"
},
    {
       titulo : "auriculares con cable",
       imagen:"auriculares.jpg",
       precio: 400,
       id: "auric"
}

];
const contProd = document.querySelector("#contenedor-prod");
let botonAgregar = document.querySelectorAll(".producto-agregar");
const total = document.querySelector(".total");
let sumaTotal = document.querySelector(".sumaTotal");
const carritoDetallado = document.querySelector('#carrito-detallado');


function botonAgregado(){
    botonAgregar = document.querySelectorAll(".producto-agregar");
    botonAgregar.forEach( boton => {
        boton.addEventListener("click", agregarCarrito);
    })
}

const agregados = [];
let suma = 0;

function agregarCarrito (e){
    
    const id = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === id);
    
    suma += prodAgregado.precio


    agregados.push(prodAgregado);
    localStorage.setItem("productosCarrito", JSON.stringify(agregados));
    

    console.log(agregados);
    console.log(suma);

    
    localStorage.setItem("suma",suma);
    let sumaLocal = localStorage.getItem("suma");
    sumaTotal.innerHTML = "$" + suma;



}

function loadProductsAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productos);
      }, 1000); 
    });
  }
  
  async function carga() {
    try {
      const products = await loadProductsAsync();
  
      products.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
          </div>
        `;
  
        contProd.append(div);
      });
  
      botonAgregado();
    } catch (error) {
      console.error(error);
    }
  }
  carga(productos);
  

function agregarCarrito(e) {
    
    const id = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === id);

    suma += prodAgregado.precio;
    sumaTotal.innerHTML = `$${suma}`;

    agregados.push(prodAgregado);
    localStorage.setItem("productosCarrito", JSON.stringify(agregados));

    actualizarMiniaturaDetallada(prodAgregado);

    console.log(agregados);
    console.log(suma);

    localStorage.setItem("suma", suma);
    let sumaLocal = localStorage.getItem("suma");
    sumaTotal.innerHTML = "$" + suma;
}


function estaEnCarrito(producto) {
    return agregados.find(item => item.id === producto.id);
}

function agregarOActualizarCarrito(producto) {
    const productoEnCarrito = estaEnCarrito(producto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        producto.cantidad = 1;
        agregados.push(producto);
    }
}

function agregarCarrito(e) {
    Toastify({
        text: "producto agergado al carrito",
        duration: 1000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const id = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === id);

    suma += prodAgregado.precio;
    sumaTotal.innerHTML = `$${suma}`;

    agregarOActualizarCarrito(prodAgregado); 

    localStorage.setItem("productosCarrito", JSON.stringify(agregados));

    actualizarMiniaturaDetallada(); 

    console.log(agregados);
    console.log(suma);

    localStorage.setItem("suma", suma);
    let sumaLocal = localStorage.getItem("suma");
    sumaTotal.innerHTML = "$" + suma;
}


function actualizarMiniaturaDetallada() {
    carritoDetallado.innerHTML = ''; 

   
    agregados.forEach((producto) => {
        const miniaturaDiv = document.createElement('div');
        miniaturaDiv.classList.add('miniatura-detallada');
        miniaturaDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" width="50">
            <span>${producto.titulo}</span>
            <span>Precio: $${producto.precio}</span>
            <span>Cantidad: ${producto.cantidad}</span>
            <button class="eliminar-producto" id="${producto.id}">Eliminar</button>
        `;

        carritoDetallado.appendChild(miniaturaDiv);

     
        const eliminarProductoBtn = miniaturaDiv.querySelector('.eliminar-producto');
        eliminarProductoBtn.addEventListener('click', eliminarProductoCarrito);
    });
    localStorage.setItem("productosCarrito", JSON.stringify(agregados));
    localStorage.setItem("suma", suma);
}

function eliminarProductoCarrito(e) {
    Toastify({
        text: "producto eliminado",
        duration: 1000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #f57a7a, #f70000 )",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const id = e.currentTarget.id;
    const productoEnCarrito = agregados.find(producto => producto.id === id);
    
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {
          
            const index = agregados.indexOf(productoEnCarrito);
            if (index > -1) {
                agregados.splice(index, 1);
            }
        }

      
        actualizarMiniaturaDetallada();
        suma -= productoEnCarrito.precio;
        sumaTotal.innerHTML = `$${suma}`;

        localStorage.setItem("productosCarrito", JSON.stringify(agregados));
        localStorage.setItem("suma", suma);

        console.log(agregados);
        console.log(suma);
    }
}
// ...
const comprarBtn = document.querySelector('#comprar-btn');

comprarBtn.addEventListener('click', comprarProductos);

function comprarProductos() {
    Swal.fire({
        title: 'Compra realizada con exito!',
        allowOutsideClick: () => {
          const popup = Swal.getPopup()
          popup.classList.remove('swal2-show')
          setTimeout(() => {
            popup.classList.add('animate__animated', 'animate__headShake')
          })
          setTimeout(() => {
            popup.classList.remove('animate__animated', 'animate__headShake')
          }, 500)
          return false
        }
      })
      
    agregados.length = 0;
    suma = 0;
    localStorage.removeItem("productosCarrito");
    localStorage.removeItem("suma");
    actualizarMiniaturaDetallada();
    sumaTotal.innerHTML = `$${suma}`;
}
