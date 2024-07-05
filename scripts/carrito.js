class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        //Busca si el producto que ingresa ya se encuentra cargado en el carrito
        const productoExistente = this.productos.find(p => p.id === producto.id);
        if (productoExistente) {
            //Si es asi, suma una cantidad más
            productoExistente.cantidad += 1;
        } else {
            
            producto.cantidad = 1;
            console.log('cantidad 1')
            this.productos.push(producto);
        }
        this.mostrarCarrito();
    }

   
    mostrarCarrito() {
        const modalBody = document.querySelector('.modal-content .modal-body');
    
        if (modalBody) {
            modalBody.innerHTML = '';
    
            if (Array.isArray(this.productos) && this.productos.length > 0) {
                // Por cada producto que se agregue, lo muestra en el modal
                this.productos.forEach(producto => {
                    const { nombre, imagen, cantidad, precio } = producto;
    
                    if (nombre && imagen && cantidad !== undefined && precio !== undefined) {
                        // contenedor del producto
                        const productDiv = document.createElement('div');
                        productDiv.style.display = 'flex';
    
                        // imágen del producto
                        const productImg = document.createElement('img');
                        productImg.src = imagen;
                        productImg.alt = nombre;
                        productImg.style.width = '50px';
                        productImg.style.height = '50px';
    
                        // descripción del producto
                        const productDescription = document.createElement('p');
                        productDescription.textContent = `${nombre} - ${cantidad} x $${precio.toFixed(2)} = $${(precio * cantidad).toFixed(2)}`;
    
                        const productosCantidad = document.querySelector('#productos-total-WEB');

                        if(productosCantidad){
                            productosCantidad.innerText =  `Productos: ${cantidad}`;
                        }

                        // agrega imagen y descripción al contenedor
                        productDiv.appendChild(productImg);
                        productDiv.appendChild(productDescription);

                        modalBody.appendChild(productDiv);
                    }
                });
            } else {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'El carrito está vacío';
                modalBody.appendChild(emptyMessage);
            }
        
        const total = this.calcularTotal();

        const totalElement = document.querySelector('#carrito-total');
        const totalWebElement = document.querySelector('#carrito-total-WEB');
        
        if (totalElement || totalWebElement) {
            totalElement.innerText = `Total: $${total}`;
            totalWebElement.innerText= `Total: $${total}`;
        } 
        } else {
            if (modalBody) {
                  
                    const parrafo = document.createElement('p');
                    
                    parrafo.textContent = 'El carrito está vacío';
        
                    modalBody.appendChild(parrafo);
            } 
            const totalElement = document.querySelector('#carrito-total');
            if (totalElement) {
                totalElement.innerText = `Total: $0.00`;
            }
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0).toFixed(2);
    }
}

const carrito = new Carrito();


