import { getProductos, deleteProducto } from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const productosContainer = document.getElementById('productos-container');
    const mensajeNoProductos = document.getElementById('mensaje-no-productos');

    let productos = await getProductos();

    // Sobreescribir productos con los guardados en localStorage si existen
    const localProductos = JSON.parse(localStorage.getItem('productos'));
    if (localProductos) {
        productos = localProductos;
    }

    function renderizarProductos() {
        productosContainer.innerHTML = '';
        if (productos.length === 0) {
            mensajeNoProductos.style.display = 'block';
        } else {
            mensajeNoProductos.style.display = 'none';
            productos.forEach(producto => {
                const card = document.createElement('div');
                card.className = 'producto-card';
                card.dataset.id = producto.id;
                card.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" />
                    <div class="card-container--info">
                        <p>${producto.nombre}</p>
                        <div class="card-container--value">
                            <p>$ ${producto.precio}</p>
                            <img src="img/basura.png" alt="Eliminar" class="delete-icon" />
                        </div>
                    </div>
                `;
                productosContainer.appendChild(card);
            });

            // Añadir event listener para los botones de eliminar
            const deleteIcons = document.querySelectorAll('.delete-icon');
            deleteIcons.forEach(icon => {
                icon.addEventListener('click', async function() {
                    const id = this.closest('.producto-card').dataset.id;
                    await deleteProducto(id);
                    location.reload();
                });
            });
        }
    }

    renderizarProductos();
});
