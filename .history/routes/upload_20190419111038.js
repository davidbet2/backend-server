var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    console.log(req.files);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            error: { message: 'Debe de seleccionar una imagen' }
        });
    };

    // Obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            error: { message: 'Las extensiones validad son' + extensionesValidas.join(',') }
        });
    };


    // tipos de coleccion

    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            error: { message: 'Tipo de coleccion no es valida' }
        });
    }

    // nombre de archivo personalizado

    var nombreArchivo = `${id} -${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                error: err
            });
        };

        res.status(200).json({
            ok: true,
            mensaje: 'Archivo movido',
            extensionArchivo: extensionArchivo
        });
    });


});

module.exports = app;