const express = require('express');
const router = express.Router();
const Moderador =  require("../dataaccess/model/Moderador");

/**
 * Obtener la lista de moderadores
 */
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

/**
 * Registro de usuario nuevo
 */
router.post("/", (req, res) => {
    var username = req.body.username
    var password = req.body.password

    /**
     * Verificación de los parámetros
     */
    if (!username || !password) {
        res.status(400).json({
            "message": "Parámetros inválidos"
        })
        return;
    }

    /**
     * Creación de nuevo objeto moderador
     */
    var moderador = new Moderador({
        username: username,
        password: password
    });

    /**
     * Función de guardado 
     * Regresa 500 si hay un error,
     * Regresa 200 si fue exitoso
     */
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