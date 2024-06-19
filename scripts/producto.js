class Producto {
    /**
     * Contructor del producto
     * @param {String} nombre 
     * @param {String} descripcion 
     * @param {String} id 
     * @param {String} precio 
     * @param {String} imagen
     * @param {String} categoria
     */
    constructor(nombre, descripcion, id, precio, imagen, categoria) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.id = id;
      this.categoria = categoria;
      this.imagen= imagen;
      this.precio = parseFloat(precio);
      this.cantidad = 1; 
    }
  
    /**
     * Devuelve un string con formato de HTML para mostrar
     * el producto
     * 
     */
    toString() {
      return `
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="product_card">
              <img src="${this.imagen}"> 
              <h3 class="">${this.nombre}</h3>
              <p style="margin-bottom:20px;">${this.descripcion}</p>
              <p class="precio">$${this.precio}</p>
                 <button class="btn-add-to-cart" data-id="${this.id}" data-toggle="modal" data-target="#carritoModal">Agregar al Carrito</button>
              <hr style="border:1px solid white;">
              <p >${this.categoria}</p>
            </div>
          </div> `;
      
    }
  
    show(etiqueta) {
      document.querySelector(etiqueta).innerHTML += this.toString();
    }
    
     /**
   * Obtiene los productos del json
   * @param {String} listaProductos
   * @returns {Promise<Producto[]>}
   */
    static async obtenerProductos(listaProductos) {
        const response = await fetch(listaProductos);
        const data = await response.json();
        return data.map(item => new Producto(item.nombre, item.descripcion, item.id, item.precio, item.imagen, item.categoria));
    }
  }
  