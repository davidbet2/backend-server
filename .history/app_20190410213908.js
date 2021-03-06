// Require

var express = require('express');


// Inicializar variables

var app = express();

// Rutas

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    })
});

// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[32m', 'online');
});