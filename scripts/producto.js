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
      this.precio = precio;
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
              <p class="">${this.descripcion}</p>
              <p class="">$${this.precio}</p>
              <hr style="border:1px solid white;">
              <p class="">${this.categoria}</p>
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
  