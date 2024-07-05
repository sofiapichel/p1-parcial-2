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
    toElement() {
      const productDiv = document.createElement('div');
      productDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');

      const card = document.createElement('div');
      card.classList.add('product_card');

      const img = document.createElement('img');
      img.src = this.imagen;

      const h3 = document.createElement('h3');
      h3.textContent = this.nombre;

      const pDescripcion = document.createElement('p');
      pDescripcion.textContent = this.descripcion;
      pDescripcion.style.marginBottom = '20px';

      const pPrecio = document.createElement('p');
      pPrecio.classList.add('precio');
      pPrecio.textContent = `$${this.precio}`;

      const button = document.createElement('button');
      button.classList.add('btn-add-to-cart');
      button.dataset.id = this.id;
      button.dataset.toggle = 'modal';
      button.dataset.target = '#carritoModal';
      button.textContent = 'Agregar al Carrito';

      const hr = document.createElement('hr');
      hr.style.border = '1px solid white';

      const pCategoria = document.createElement('p');
      pCategoria.textContent = this.categoria;

      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(pDescripcion);
      card.appendChild(pPrecio);
      card.appendChild(button);
      card.appendChild(hr);
      card.appendChild(pCategoria);

      productDiv.appendChild(card);

      return productDiv;
  }

  show(etiqueta) {
      const container = document.querySelector(etiqueta);
      if (container) {
          container.appendChild(this.toElement());
      }
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
  