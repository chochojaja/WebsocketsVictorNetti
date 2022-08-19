const server = io().connect()


const render = (productos) => {
    let listado = document.querySelector('#listado')
    let html = productos.map(prod => {
        return `<li>
            <strong>Nombre: ${prod.nombre}</strong>
            <em>Precio: ${prod.precio}</em>
        </li>`
    })
    listado.innerHTML = html.join(' ')
}

const addProduct= (val) => {
    const nombre = document.querySelector('#nombre').value
    const precio = document.querySelector('#precio').value

    const producto = {nombre, precio}
     console.log(producto)
    server.emit('producto-nuevo', producto, (id)=>{
        console.log(id)
    })
    return false
}


/* Listening for a message from the server. */
server.on('mensaje-servidor', mensaje => {
    render(mensaje.productos)
})
