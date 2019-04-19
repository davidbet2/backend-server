var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

// default options
app.use(fileUpload());

app.put('/', (req, res) => {

    console.log(req.files);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            error: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    // if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    //     return res.status(400).json({
    //         ok: false,
    //         mensaje: 'Extension no valida',
    //         error: { message: 'Las extensiones validad son' + extensionesValidas.join(',') }
    //     });
    // }

    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente',
        extensionArchivo: extensionArchivo
    })
});

module.exports = app;