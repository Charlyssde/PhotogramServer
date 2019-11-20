const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");

/**
 * Obtener todos los usuarios
 */
router.get("/getAll", (req, res) => {
    Usuario.find(function (err, docs) {
        if (err) {
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return;
        }

        res.json(docs);
    });
});

router.get("/:id", (req, res) =>{
    var jsonId = req.params.id;

    Usuario.findById({
        _id:jsonId}, 
        function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Error al ejecutar"
            })
            return
        }
        res.json(docs);
    });
});

/**
 * Registrar un usuario nuevo
 */
router.post('/registro', (req, res) => {
    
    var username = req.body.username
    var password = req.body.password
    var nombre = req.body.nombre
    var apellidoPaterno = req.body.apellidoP
    var apellidoMaterno = req.body.apellidoM
    var correo = req.body.correo
    var estado = req.body.estado
    var estadoCuenta = req.body.estadoCuenta
    //var fotoPerfil = req.body.fotoPerfil

    /**
     * Validación de los parámetros obligatorios
     */
    if (!username || !password || !nombre || !apellidoPaterno || !apellidoMaterno
        || !correo) {
        res.status(400).json({
            'response' : req.body
        })
        return;
    }

    /**
     * Creación del nuevo usuario
     */
    var usuario = new Usuario({
        username: username,
        password: password,
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        correo: correo,
        estado: estado,
        estadoCuenta: estadoCuenta,
        //FotoPerfil?
    });
    /**
     * Función de registro 
     */
    usuario.save(function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error durante el registro"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

/**
 * Actualización de los datos del usuario de acuerdo al identificador
 */
router.put("/:id", (req, res) => {
    var jsonId = req.params.id;

    var username = req.body.username
    var password = req.body.password
    var nombre = req.body.nombre
    var apellidos = req.body.apellidos
    var correo = req.body.correo
    var estado = req.body.estado
    var estadoCuenta = req.body.estadoCuenta
    var fotoPerfil = req.body.fotoPerfil

    /**
     * Verificación de los parámetros
     */
    if (!username || !password || !nombre || !apellidos
        || !correo) {
        res.status(400).json({
            "message": "Parametros inválidos"
        })
        return;
    }

    /**
     * Función de actualización 
     */
    Usuario.findOneAndUpdate({
        _id: jsonId},
        {
            username: username,
            password: password,
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            estado: estado,
            estadoCuenta: estadoCuenta,
            fotoPerfil: fotoPerfil
        }, function (err, doc){
            if(err){
                res.status(500).json({
                    message: "error al actualizar"
                })
                return;
            }    
            res.json(docs);
    });
});

/**
 * Eliminación de un usuario de acuerdo a su identificador
 */
router.delete("/:id", (req, res) => {
    var jsonId = req.params.id;

    /**
     * Función de eliminar
     * Regresa 500 si hay un error
     * Regresa 200 si fue exitoso.
     */
    Usuario.findOneAndDelete({
        _id: jsonId
    }, function (err, doc){
        if (err) {
            res.status(500).json({
                message: "Error al eliminar"
            })
            return;
        }
        res.json(doc);
    });
});
module.exports = router;

