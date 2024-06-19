document.addEventListener('DOMContentLoaded', async () => {
  // Cargar y mostrar productos desde JSON
  const listaProductos = 'productos.json';
  let productos = await Producto.obtenerProductos(listaProductos);
  productos.forEach(producto => producto.show('#productos'));

// Filtrar productos por categoría
document.querySelectorAll('.filtro-categoria').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const categoria = event.target.textContent;
        console.log("🚀 ~ link.addEventListener ~ categoria:", categoria);

        // Limpia el contenido antes de mostrar los productos filtrados
        const productosContenedor = document.querySelector('#productos');
        productosContenedor.innerHTML = '';

        if (categoria === 'Todas las categorias') {
            productos.forEach(producto => producto.show('#productos'));
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
            productosFiltrados.forEach(producto => producto.show('#productos'));
        }
    });
});

//Muestra el modal cuando se lo llama deesde el botón VER CARRITO
  document.querySelector('#verCarritoBtn').addEventListener('click', event =>{
    abrirModal(); 
  })

  // Agregar producto al carrito y muestra el modal
  document.querySelector('#productos').addEventListener('click', event => {
      if (event.target.classList.contains('btn-add-to-cart')) {
          const productId = event.target.getAttribute('data-id');
          const producto = productos.find(p => p.id.toString() === productId);
          if (producto) {
              carrito.agregarProducto(producto); // Agrega producto al carrito
              abrirModal(); 
          }
      }
  });

    // Función para abrir el modal 
    function abrirModal() {
        const modal = document.getElementById('modalCarrito');
        carrito.mostrarCarrito(); // Actualiza el contenido del carrito

        modal.style.display = 'block';
        //Cierra el modal
        const cerrarModalBtn = modal.querySelector('#cerrarModal');
        cerrarModalBtn.onclick = function() {
            modal.style.display = 'none';
        };

        const closeModal = modal.querySelector('.close');
        closeModal.onclick = function() {
            modal.style.display = 'none';
        };

        
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }


});
