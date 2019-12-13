const express = require('express')
const router = express.Router()
const Imagen = require('../dataaccess/model/Imagen')
const Comentario = require('../dataaccess/model/Comentario')

/**
 * Crear un nuevo Comentario
 * @params los campos requeridos de Comentario
 */
router.post('/comment', (req, res)=>{
    let username = req.body.username
    let contenido = req.body.contenido
    let img_id = req.body.img_id
    let fecha = new Date()

    //Validación de los parámetros del body
    if(!username || !contenido || !img_id){
        res.status(400).json({
            'mensaje' : 'Parámetros incompletos y/o inválidos',
            'error' : req.body,
        })
        return
    }

    let comentario = new Comentario({
        username: username,
        fecha: new Date().getTime().toString(),
        contenido: contenido
    })

    Imagen.updateOne({_id : img_id}, {$push: { comentarios: comentario} }, (err, msg) =>{

        if(err){
            res.status(500).json({
                'message' : 'Hubo un erro al guardar el comentario',
                'error' : err.body
            })
            return
        }
        
    })

    res.status(200).json({
        'message' : 'Comentario guardado.',
        'res': response.body,
    })
})

 /**
  * Crear una nueva Reacción
  * @params los campos requeridos de una Reacción
  */
 router.post('/reaction', (req, res)=>{
     let username = req.body.username
     let img_id = req.body.img_id
     

     if(!username || !img_id){
         res.status(400).json({
             'message' : 'Parámetros incompletos o inexistentes.',
             'req' : req.body
         })
         return
     }

     Imagen.updateOne({_id : img_id}, {$push: { reacciones: username} }, (err, response) =>{

        if(err){
            res.status(500).json({
                'message' : 'Hubo un erro al guardar la reacción.',
                'error' : err.body
            })
            return
        }
    })
    res.status(200).json({
        'message' : 'Te gusta esto.',
        'res': res.body,
    })
    
 }),
 module.exports = router