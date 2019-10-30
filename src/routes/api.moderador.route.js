const express = require('express');
const router = express.Router();
const Moderador =  require("../dataaccess/model/Moderador");

router.get("/", (req, res) => {
    Moderador.find(function (err, docs) {
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

    if (!username || !password) {
        res.status(400).json({
            "message": "Parámetros inválidos"
        })
        return;
    }

    var moderador = new Moderador({
        username: username,
        password: password
    });

    moderador.save(function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error al guardar"
            })
            return;
        }
        res.json(doc);
    });
});

module.exports = router;