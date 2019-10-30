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
    if(req.body === undefined){
        res.json({
            "msg":"error"
        });
        return;
    }
    var username = req.body.username
    var password = req.body.password

    if (username === undefined || password === undefined) {
        res.status(400).json({
            "message": "Parametros inválidos"
        })
        return;
    }

    var usuario = new Usuario({
        username: username,
        password: password
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

module.exports = router;

