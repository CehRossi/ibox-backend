const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // Conf para que a app reconhça requisições Web Socket (ws)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-r9opv.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
})

app.use((req, res, next) =>{
    req.io = io;

    return next;
});

/*
//Criando uma rota pelo metodo GET

app.get('/teste', (req, res) => {
    return res.send('Hello World');
}) 
*/

// Cadastrando um modulo no express
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //Permite envio de arquivos pela requisição
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes.js'));

server.listen(3333); 