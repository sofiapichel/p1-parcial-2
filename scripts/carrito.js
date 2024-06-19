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
        
        if (modalBody && Array.isArray(this.productos) && this.productos.length > 0) {
            modalBody.innerHTML = '';
            //Por cada producto que se agregue, lo muestra en el modal
            this.productos.forEach(producto => {
                const { nombre, imagen, cantidad, precio } = producto;

                if (nombre && imagen && cantidad !== undefined && precio !== undefined) {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <div style="display:flex;"> 
                    <img src="${imagen}" alt="${nombre}" style="width: 50px; height: 50px;">
                        <p>${nombre} - ${cantidad} x $${precio.toFixed(2)} = $${(precio * cantidad).toFixed(2)}</p>
                    </div>
                    `;
                    modalBody.appendChild(div);
                } else {
                    console.error('Error:', producto);
                }
        });

        const total = this.calcularTotal();

        const totalElement = document.querySelector('#carrito-total');
        if (totalElement) {
            totalElement.innerText = `Total: $${total}`;
        } 
        } else {
            if (modalBody) {
                modalBody.innerHTML = '<p>El carrito está vacío</p>';
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


