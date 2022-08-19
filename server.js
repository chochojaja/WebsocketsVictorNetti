const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')  

const Contenedor = require ("./contenedor")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
productos=[]

app.get('/', async (req, res) => {
    res.sendFile('index.ejs', { root: __dirname })
    const contenedor = new Contenedor('./producto.txt')
const productos= await contenedor.getAll()
    console.log(productos)
})

app.use(express.urlencoded( {extended : true } ))

app.set('view engine', 'ejs')
app.set('views', './views')




 io.on('connection', socket => {
    console.log('Nuevo usuario conectado: ', socket.id)

    const mensaje = {
        id: socket.id,
        mensaje: 'Welcome to the app',
        productos
    }

    socket.on ('producto-nuevo', producto => {
        
        productos.push(producto)
        io.sockets.emit('mensaje-servidor', mensaje)
    })
    
    socket.emit('mensaje-servidor', mensaje)

    socket.on('disconnect', () => {
        console.log('usuario desconectado: ', socket.id)
    })
})

const server = httpServer.listen(4000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

