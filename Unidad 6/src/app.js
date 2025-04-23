import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

//handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const PORT = 8080;

app.use(express.static('public'));

//endpoints
app.use('/', viewsRouter);

//persistencia en memoria de nuestros mensajes
const messages = [];

//websocket del lado del servidor
io.on('connection', (socket)=> {
  //socket es un objeto que representa la conexion del cliente con el servidor
  console.log("un nuevo usuario se conecto");

  socket.emit('welcome', { greeting: 'bienvenido a nuestro chat' });

  //emitimos los mensajes al usuario que se conecto
  socket.emit('message history', messages);

  //escuchamos un evento
  socket.on('new message', (dataMessage)=> {
    messages.push(dataMessage);

    //transmitimos el nuevo mensaje a todos los clientes
    io.emit('broadcast new message', dataMessage);
  });

});

server.listen(PORT, ()=> {
  console.log("servidor iniciado en el puerto: ", PORT);
});