// Require

var express = require('express');
var moongose = require('mongoose');
var bodyPaser = require('body-parser');


// Inicializar variables

var app = express();


// Body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

// Conexion BD
moongose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Base de datos:\x1b[32m', 'online');

});

// Rutas

app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[32m', 'online');
});