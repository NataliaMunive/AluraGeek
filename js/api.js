const API_URL = 'db.json';

// Método GET para obtener productos
export async function getProductos() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.productos;
}

// Método POST para agregar un nuevo producto
export async function addProducto(producto) {
    let productos = await getProductos();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
    return producto;
}

// Método DELETE para eliminar un producto
export async function deleteProducto(id) {
    let productos = await getProductos();
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    return { id };
}
