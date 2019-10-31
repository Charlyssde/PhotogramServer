let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
var mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);
const url = 'http://localhost:7777';

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
    it('agregar "usuario"', (done) => {
        chai.request(app)
        .post("/Usuario")
        .send({username: "Alinemhdez", password: "secret", nombre: "aline", apellidos: "Hdez Fajardo", correo: "alinemhdez@gmail.com", estado: "Hola", estadoCuenta: "activo", fotoPerfil: "foto"})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
            
        });
    }).timeout(0);
});
describe('#Insertar usuario con error', () =>{
    it('recibe un usuario con error', (done) => {
        chai.request(url)
        .post("/Usuario")
        .send({username: "Charlyssde", password: "secret", nombre: "Carlos", apellidos: "Carillo", correo: "alinemhdez@gmail.com", estado: "Hola", estadoCuenta: "activo", fotoPerfil: "foto"})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(500);
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

