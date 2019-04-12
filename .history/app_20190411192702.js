// Require

var express = require('express');
var moongose = require('mongoose');


// Inicializar variables

var app = express();

// Importar rutas

var appRoutes = require('./routes/app');

// Conexion BD
moongose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Base de datos:\x1b[32m', 'online');

});

// Rutas

app.use('/', appRoutes);

// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[32m', 'online');
});