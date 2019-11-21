const express = require('express')
const router = express.Router()
const Foto = require('../dataaccess/model/Foto')

/**
 * Obtener todas las fotos en la BD. (No será usada por el Cliente)
 */
router.get('/getAllphotos', (req, res) =>{
    Foto.find(function (err, docs){
        if(err){
            res.status(500).json({
                "mensaje" : "Hubo un error al ejecutar la consulta",
                "error" : err
            })
            console.error(err)
            return
        }
        res.json(docs)
    })
});

/**
 * Obtener una foto por ID
 */
router.get('/getPhoto/:id', (req, res) =>{
    let jsonId = req.params.id

    Foto.findById({ _id:jsonId}, function(err, docs){
        if(err){
            res.status(500).json({
                'mensaje': 'Hubo un error al ejecutar la consulta',
                'error': err
            })
            return
        }
        res.json(docs)
    })
})

/**
 * Crear un nuevo objeto Foto. Usado al subir una foto desd el cliente
 */
router.post('/poto/new', (req, res)=>{
    var username = req.body.username,
    var fecha = req.body.fecha,
    var path = req.body.path //Verificar dónde se genera el path

    /**
     * Validación de los parámetros obligatorios
     */

     if(!username || !fecha || !path){
         res.status(400).json({
             'mensaje' : 'Parámetros incompletos',
             'error' : err
         })
     }
})



module.exports = router