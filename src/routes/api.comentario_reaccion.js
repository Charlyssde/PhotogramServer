const express = require('express')
const router = express.Router()
const Comentario = require('../dataaccess/model/Comentario')
const Reaccion = require('../dataaccess/model/Reaccion')

/**
 * Crear un nuevo Comentario
 * @params los campos requeridos de Comentario
 */
router.post('/comment/new', (req, res)=>{
    let username = req.body.username
    let fecha = new Date;
    let contenido = req.body.contenido

    //Validación de los parámetros del body
    if(!username || !contenido){
        res.status(400).json({
            'mensaje' : 'Parámetros incompletos y/o inválidos',
            'error' : err
        })
        return
    }

    let comentario = new Comentario({
        username: username,
        fecha: fecha,
        contenido: contenido
    })

    comentario.save(function(err, doc){
        if(err){
            res.status(500).json({
                'mensaje': 'Error al guardar el comentario',
                'error': err
            })
            return
        }
        res.json(doc)
    })
})

 /**
  * Crear una nueva Reacción
  * @params los campos requeridos de una Reacción
  */
 router.post('/reaction/new', (req, res)=>{
     let username = req.body.username;
     let name = req.body.name;
     let fecha = new Date();

     if(!username || !name){
         res.status(400).json({
             'mensaje': 'Parámetros inválidos y/o incompletos'
         })
         return
     }

     let reaccion = new Reaccion({
         name: name,
         username: username,
         fecha: fecha
     })

     reaccion.save(function(err, doc){
         if(err){
             res.status(500).json({
                 'mensaje': 'Error al guardad la reacción',
                 'error': err
             })
             return
         }
         res.json(doc)
     })

 })
/**
 * Obtener todos los comentarios y reacciones de una Imagen
 * @params id de la Imagen 
 */




 module.exports = router