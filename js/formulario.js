import { addProducto } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
    const formAgregarProducto = document.getElementById('form-agregar-producto');

    formAgregarProducto.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nombreProducto = document.getElementById('nombreProducto').value;
        const precioProducto = document.getElementById('precioProducto').value;
        const imagenProducto = document.getElementById('imagenProducto').value;

        const nuevoProducto = {
            id: Math.random().toString(36).substr(2, 9), // Generar ID aleatorio
            nombre: nombreProducto,
            precio: parseFloat(precioProducto).toFixed(2),
            imagen: imagenProducto
        };

        try {
            await addProducto(nuevoProducto);
            alert('Producto agregado exitosamente');
            location.reload();
        } catch (error) {
            alert('Error al agregar el producto. Inténtalo de nuevo.');
        }
    });
});
