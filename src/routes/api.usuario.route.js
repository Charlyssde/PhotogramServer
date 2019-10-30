const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
    
    var username = req.body.username
    var password = req.body.password
    var nombre = req.body.nombre
    var apellidos = req.body.apellidos
    var correo = req.body.correo
    var estado = req.body.estado
    var estadoCuenta = req.body.estadoCuenta
    var fotoPerfil = req.body.fotoPerfil

    if (!username || !password || !nombre || !apellidos
        || !correo) {
        res.status(400).json({
            "message": "Parametros inválidos"
        })
        return;
    }

    var usuario = new Usuario({
        username: username,
        password: password,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        estado: estado,
        estadoCuenta: estadoCuenta,
        fotoPerfil: fotoPerfil
    });
    usuario.save(function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error durante el guardado"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

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

    if (!username || !password || !nombre || !apellidos
        || !correo) {
        res.status(400).json({
            "message": "Parametros inválidos"
        })
        return;
    }

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

router.delete("/:id", (req, res) => {
    var jsonId = req.params.id;

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

