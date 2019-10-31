let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');

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

/* asyn test */
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
            chai.request(app)
            .post("/usuarios/")
            .send(usuarios[usuario])
            .end((err,res)=>{
                res.should.have.status(200);
                console.log("Response Body:", res.body);
            })
        }
        done()
        
        });

})
describe('#Insertar usuario con error', () =>{
    it('recibe un usuario con error', (done) => {
        chai.request(url)
        .post("/Usuario")
        .send({username: "Charlyssde", password: "secret", nombre: "Carlos", apellidos: "Carillo", correo: "alinemhdez@gmail.com", estado: "Hola", estadoCuenta: "activo", fotoPerfil: "foto"})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});
describe('#Asynchronous user crud test', () => {
    it('obtener "usuarios" ', (done) => {
        chai.request(app)
            .get("/Usuario")
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('Salida: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);
});

describe('#Get usuario por id',()=>{
    it('Obtener usuario por id', (done) =>{
        chai.request(app)
        .get('/Usuario/1')
        .end( function(err,res){
            console.log(res.body)
            expect(res.body).to.have.property('id').to.be.equal(1);
            expect(res).to.have.status(200);
            done();
        });
    });
});
describe('Update el nombre del usuario con el id',()=>{
    it('Update del id', (done)=>{
        chai.request(app)
        .put('/Usuario/1/nombre/montserrat')
        .end( function(err,res){
            console.log(res.body)
            expect(res.body).to.have.property('nombre').to.be.equal("montserrat");
            expect(res).to.have.status(200);
            done();
        });
    });
});
describe("Usuarios", function(){
    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            console.log ("Deleting all data in db first.")
            chai.request(app)
                .delete("/Usuario/")
                .send({})
                .end((err,res)=>{
                    //console.log (res)
                    // console.log("err",err);
                    res.should.have.status(200)
                    console.log("Response Body:", res.body);
                    // console.log (result);
                    done();
                });
        });

    });
});

