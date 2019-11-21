const express = require('express')
const router = express.Router()
const Imagen = require('../dataaccess/model/Imagen')

/**
 * Obtener todas las fotos en la BD. (No será usada por el Cliente)
 */
router.get('/getAllphotos', (req, res) =>{
    Imagen.find(function (err, docs){
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
 * Obtener una foto por ID de la Imagen
 */
router.get('/getImg/:id', (req, res) =>{
    let jsonId = req.params.id

    Imagen.findById({ _id:jsonId}, function(err, docs){
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
router.post('/img/new', (req, res)=>{
    var username = req.body.username;
    let fecha = new Date();
    var path = req.body.path //Verificar dónde se genera el path

    /**
     * Validación de los parámetros obligatorios
     */

     if(!username || !fecha || !path){
         res.status(400).json({
             'mensaje' : 'Parámetros incompletos',
             'error' : err
         })
         return
     }

     /**
      * Creación del nuevo Objeto Imagen
      */
     var img = new Imagen({
         username: username,
         fecha: fecha,
         path: path
     })

     img.save(function (err, doc){
         if(err){
             res.status(500).json({
                 'mensaje' : 'Hubo un erro al subir la imagen',
                 'error' : err
             })
             console.error(err)
             return
         }
         res.json(doc)
     })
})

/**
 * Recuperar todos los objetos Imagen de un Usuario en específico
 */
router.get('/img/getImgsUser/:username', (req, res)=>{
    let username = req.params.username;

    if(!username){
        res.status(400).json({
            'mensaje' : 'Parámetro incompleto',
            'error' : err
        })
        return
    }
    
    Imagen.find({username:username}, function(err, docs){
        if(err){
            res.status(500).json({
                'mensaje' : 'Hubo un erro al ejecutar la consulta',
                'error' : err
            })
            return
        }
        res.json(docs)
    })
})


module.exports = router