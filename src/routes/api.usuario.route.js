const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");

/**
 * Obtener todos los usuarios
 */
router.get("/user/all", (req, res) => {
    Usuario.find(function (err, docs) {
        if (err) {
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta",
                "error" : err
            })
            console.error(err);
            return;
        }

        res.json(docs);
    });
});

/**
 * Obtener a un Usuario por su Username
 */
router.get("/user/:username", (req, res) =>{
    var username = req.params.username;

    Usuario.findOne({
        username:username}, 
        function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Error al ejecutar",
                "error" : err
            })
            return
        }
        res.json(docs);
    });
});

/**
 * Registrar un usuario nuevo y guardarlo en la BD
 */
router.post('/user', (req, res) => {
    
    var username = req.body.username
    var password = req.body.password
    var nombre = req.body.nombre
    var apellidoPaterno = req.body.apellidoP
    var apellidoMaterno = req.body.apellidoM
    var correo = req.body.correo
    var estado = req.body.estado
    var estadoCuenta = req.body.estadoCuenta

    /**
     * Validación de los parámetros obligatorios
     */
    if (!username || !password || !nombre || !apellidoPaterno || !apellidoMaterno
        || !correo) {
        res.status(404).json({
            message: 'Error, parámetros incompletos o inválidos.',
            req : req.body
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
        estadoCuenta: estadoCuenta
    });
    /**
     * Función de registro 
     */
    usuario.save(function (err, doc) {
        if (err) {
            res.status(500).json({
                "message": "Error durante el registro"
            })
            console.error(err);
            return;
        }
        res.status(200).json(doc);
    });
});

/**
 * Actualización de los datos del usuario de acuerdo al identificador
 */
router.put(`/user/:id`, (req, res) => {
    var jsonId = req.params.id;

    var username = req.body.username
    var password = req.body.password
    var nombre = req.body.nombre
    var apellidoPaterno = req.body.apellidoPaterno
    var apellidoMaterno = req.body.apellidoMaterno
    var correo = req.body.correo
    var estado = req.body.estado
    var estadoCuenta = req.body.estadoCuenta
    var amigos = req.body.amigos
    /**
     * Verificación de los parámetros
     */
    if (!username || !password || !nombre || !apellidoPaterno || !apellidoMaterno
        || !correo || !amigos) {
        res.status(400).json({
            "message": "Parametros inválidos",
            "error" : err
        })
        return;
    }

    /**
     * Función de actualización 
     */
    Usuario.findOneAndUpdate({
        _id: jsonId},
        {$set:
            {
            username: username,
            password: password,
            nombre: nombre,
            apellidoPaterno : apellidoPaterno,
            apellidoMaterno : apellidoMaterno,
            correo: correo,
            estado: estado,
            estadoCuenta: estadoCuenta,
            amigos: amigos
            //fotoPerfil: fotoPerfil
            }            
        }, function (err, docs){
            if(err){
                res.status(500).json({
                    message: "Error al actualizar",
                    "response" : req.body,
                    "error" : err
                })
                return;
            }    
            res.json(docs);
    });
});

/**
 * Eliminación de un usuario de acuerdo a su identificador
 */
router.delete("/user/:id", (req, res) => {
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
                message: "Error al eliminar",
                "error" : err
            })
            return;
        }
        res.json(doc);
    });
});
module.exports = router;

