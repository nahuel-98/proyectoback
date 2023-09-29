
document.getElementById('product_form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const _id = document.getElementById('_id').value;

    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value
    };

    if(_id == 0) {
        socket.emit('new_product', data);
    } else {
        data._id = _id;
        socket.emit('edit_product', data);
    }
});
