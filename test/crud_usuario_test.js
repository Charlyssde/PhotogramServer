process.env.NODE_ENV='test'

let mongoose = require('mongoose')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let url = 'http://localhost:7777/api';
let Usuario = require('../src/dataaccess/model/Usuario')

let should = chai.should
chai.should();
chai.use(chaiHttp);


before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
beforeEach((done)=>{
    Usuario.remove({}, err=>{
        done()
    })
})

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/**
 * TESTING USUARIO CRUD
 */

 //REGISTRAR USUARIO
 describe('#Asynchronous Usuario CRUD test', () =>{
    it('/POST Registrar usuario', (done) => {
        var usuario = {
            'username': "Alinemhdez",
            'password': "secret",
            'nombre': "aline",
            'apellidoP': "Hernández",
            'apellidoM': "Fajardo",
            'correo': "alinemhdez@gmail.com",
            'estado': "Hola",
            'estadoCuenta': "true"
        }
        chai.request(url)
        .post("/registro")
        .send(usuario)
        .end((err,res)=>{
            res.should.have.status(200)
            console.log("Response Body:", res.body);
        })
        done()       
        });

})

//GET ALL USUARIOS
describe('#Asynchronous user crud test', () => {
    it('obtener "usuarios" ', (done) => {
        chai.request(url)
            .get("/getAllusers")
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('Salida: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);
    it ("Should Fetch Particular Usuario only", (done)=>{
        chai.request(url)
            .get("/5dbb60ca7308fa2f90367115")
            .end((err, result)=>{                    
                result.should.have.status(200)
                console.log("Fetched Particlar Usuario using /GET/Usuario/:UsuarioId ::::", result.body)
                done();
            });
    });
});


/*
describe('Update el nombre del usuario con el username',()=>{
    it ("Should Update Partcular Usuario Only", (done)=>{
        var updatedUsuario = {
            username: "Charlysdd",
        password: "secret",
        nombre: "carlos",
        apellidos: "Carrillo",
        correo: "charlysdd@gmail.com",
        estado: "Hola",
        estadoCuenta: "true",
        //fotoPerfil: "foto"
        }
            chai.request(url)
            .put("/update/5dbb60ca7308fa2f90367115")
            .send(updatedUsuario)
            .end((err, res)=>{                    
                res.should.have.status(200);
                console.log("Updated Particlar Usuario using /GET/Usuario/:UsuarioID ::::", result.body)
                done();
            })
    })
    
});
describe("Usuarios", function(){
    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            console.log ("Deleting all data in db first.")
            chai.request(url)
            .delete("/user/5dbb60ca7308fa2f90367115")
                .send({})
                .end((err,res)=>{
                    //console.log (res)
                    // console.log("err",err);
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    // console.log (result);
                    done();
                });
        });

    });
});*/
