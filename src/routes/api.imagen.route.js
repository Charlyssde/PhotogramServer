const express = require('express')
const router = express.Router()

const multer = require('multer')
const destination = (req, file, cb)=>{cb(null, './imgs/')}
const filename = (req, file, cb) =>{cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname)}
const storage = multer.diskStorage({destination, filename})
const upload = multer({storage: storage})

const Imagen = require('../dataaccess/model/Imagen')



/**
 * Obtener todas las fotos en la BD. (No será usada por el Cliente)
 */
router.get('/img/getAllImages', (req, res) =>{
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
router.get('/img/getImg/:id', (req, res) =>{
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
 * Crear un nuevo objeto Foto. Usado al subir una foto desde el cliente.
 * IMPORTANTE: Los campos de la petición deben coincidir en nombre con los campos declarados abajo.
 * En especial la IMAGEN en la petición deberá ser declarada como: newImage
 */
router.post('/img/new', upload.single('newImage'), async (req, res)=>{
    
    /**
     * Validación de la existencia del archivo en la petición
     */
     if(!req.file){
         res.status(400).json({
             'message' : 'Error en los parámetros. No hay ningún archivo.',
             'req' : res.body,
         })
     }

    var username = req.body.username;
    let fecha = new Date();
    //var path = req.body.path //Verificar dónde se genera el path

    /**
     * Validación de los parámetros obligatorios
     */

     if(!username || !fecha){
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
         path: req.file.path
     })

     await img.save( function (err, doc){
         if(err){
             res.status(500).json({
                 'mensaje' : 'Hubo un error al subir la imagen',
                 'error' : err
             })
             console.error(err)
             return
         }
         res.json(doc)
     })
}),

/**
 * Recuperar todos los objetos Imagen de un Usuario en específico
 * @params El username del Usuario que emite la petición.rs
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
}),

/**
 * Recuperar todas las Imágenes de los amigos de un Usuario determinado
 * @params Un Array con los amigos del Usuario que emite la req.
 */
router.get('/img/getFeed', (req, res)=>{
    let amigos = req.body.amigos
    if(!amigos){
        res.status(400).json({
            'mensaje': 'Parámetros inválidos o incompletos',
            'error' : err
        })
        return
    }


    Imagen.find({username:{$in: amigos }}, function(err, doc){
        if(err){
            res.status(500).json({
                'mensaje' : 'Error al ejecutar la consulta',
                'error' : err
            })
            return
        }
        res.json(doc)
    })

    
}),

module.exports = router