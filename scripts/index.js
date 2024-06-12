'use strict';

let productos = []; 

async function cargarProductos() {
  const listaProductos = 'productos.json';
  productos = await Producto.obtenerProductos(listaProductos);
  mostrarProductos(productos);
}

function mostrarProductos(productosFiltrados) {
  const contenedor = document.querySelector("#productos");
  contenedor.innerHTML = ''; //Vacía el html para mostrar las cards renovadas
  productosFiltrados.forEach(producto => {
    producto.show("#productos");
  });
}

function filtrarPorCategoria(categoria) {
  if (categoria === 'Sin categoria') {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria); //Compara el texto de la categoría con la categoría del producto
    mostrarProductos(productosFiltrados);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  //Por cada click que se realice en los links, toma el valor del texto de ese link y lo utiliza para compararlo en el filtro
  document.querySelectorAll('.filtro-categoria').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const categoria = event.target.textContent;
      filtrarPorCategoria(categoria);
    });
  });
});

