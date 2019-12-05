const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");


/**
 * Registrar un usuario nuevo y guardarlo en la BD
 */
router.post('/registro', (req, res) => {
    
    var username = req.body.username
    var password = req.body.password
    

    if (!username || !password ) {
        res.status(400).json({
            "request" : req.body,
            "error" : "err"
        })
        return;
    }

    /**
     * Creación del nuevo usuario
     */
    var usuario = new Usuario({
        username: username,
        password: password,
        
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
        res.json(doc);
    });
});
router.get("/getAllusers", (req, res) => {
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



module.exports = router;

