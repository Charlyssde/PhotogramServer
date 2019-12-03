/**let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let url = 'http://localhost:7777/api';
let should = chai.should
var mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);


before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/* asyn test 
 describe('#Asynchronous user crud test', () =>{
    var usuarios = [{
        username: "Alinemhdez",
        password: "secret",
        nombre: "aline",
        apellidos: "Hdez Fajardo",
        correo: "alinemhdez@gmail.com",
        estado: "Hola",
        estadoCuenta: "activo",
        fotoPerfil: "foto"
    }]
    it('agregar "usuario"', (done) => {
        for(usuario in usuarios){
            chai.request(url)
            .post("/Usuario")
            .send(usuarios[usuario])
            .end((err,res)=>{
                res.should.have.status(200);
                console.log("Response Body:", res.body);
            })
        }
        done()
        
        });

})


describe('#Asynchronous user crud test', () => {
    it('obtener "usuarios" ', (done) => {
        chai.request(url)
            .get("/Usuario")
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('Salida: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);
    it ("Should Fetch Particular Usuario only", (done)=>{
        chai.request(url)
            .get("/Usuario")
            .end((err, result)=>{                    
                result.should.have.status(200)
                console.log("Fetched Particlar Usuario using /GET/Usuario/:UsuarioId ::::", result.body)
                done();
            });
    });
});



describe('Update el nombre del usuario con el username',()=>{
    it ("Should Update Partcular Usuario Only", (done)=>{
        var updatedUsuario = {
            username: "Charlysdd",
        password: "secret",
        nombre: "carlos",
        apellidos: "Carrillo",
        correo: "charlysdd@gmail.com",
        estado: "Hola",
        estadoCuenta: "activo",
        fotoPerfil: "foto"
        }
            chai.request(url)
            .put("/Usuario/5dbb60ca7308fa2f90367115")
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
            .delete("/Usuario/5dbb60ca7308fa2f90367115")
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
});

**/