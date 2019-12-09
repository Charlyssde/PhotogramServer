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


const usuario = {
    username: "Alinemhdez",
    password: "secret",
    nombre: "aline",
    apellidoP: "Hernández",
    apellidoM: "Fajardo",
    correo: "alinemhdez@gmail.com",
    estado: "Hola",
    estadoCuenta: 0
}

const objeto_usuario = new Usuario({
    username: "rodrigo",
    password: "123",
    nombre: "Rodrigo",
    apellidoP: "Ordóñez",
    apellidoM: "Pacheco",
    correo: "rodrigo.op1791@gmail.com",
    estado: "Hola, soy Rodrigo",
    estadoCuenta: 0
})



const usuario_incompleto = {
    'username': "Alinemhdez",
    'password': "secret",
    'nombre': "aline",
    'apellidoP': "Hernández",
    'estado': "Hola",
    'estadoCuenta': 0
}

before((done) => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after((done) => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/**
 * TESTING USUARIO CRUD
 */
 //REGISTRAR USUARIO
 describe('/POST Usuario(async)', (done) =>{
   
    beforeEach((done)=>{
        Usuario.deleteOne({username: 'Alinemhdez'}, (err)=>{done()})
     });

    it('it should post Usuario with full fields', done => { 
        chai.request(app)
        .post("/api/user")
        .send(usuario)
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.have.property('_id')
            res.body.should.have.property('username')
            res.body.should.have.property('password')
            res.body.should.have.property('nombre')
            res.body.should.have.property('apellidoPaterno')
            res.body.should.have.property('apellidoMaterno')
            res.body.should.have.property('correo')
            res.body.should.have.property('estado')
            res.body.should.have.property('estadoCuenta')
        done()    
        })
             
    });
    it('it should NOT POST Usuario with incomplete fields', done=>{
        chai.request(app)
            .post('/api/user')
            .send(usuario_incompleto)
            .end((err, res)=>{
                res.should.have.status(404)
            done()
            })    
    })
})

//GET ALL USUARIOS
describe('/GET Usuarios', () => {
    it('it should get all Usuarios', done => {
        chai.request(app)
            .get("/api/user/all")
            .end(function (err, res) {
                if(err) done(err);
                res.should.have.status(200)
            done() 
            });
    });
    it('it should only get the specified Usuario', done=>{
        const id = "5dedffc661e74f262828e24c"
        chai.request(app)
            .get(`api/user/${id}`)
            .end((err,res)=>{
                res.should.have.status(200)
            done()
            })
            done()
    })
})

describe('/POST Imagen', ()=>{
    it('should create a new Imagen object and file under /imgs', done =>{
        let imagen = { username: 'rodrigo', image: 'IMAGEN_PRUEBA_A_STRING'}
        chai.request(app)
        .post('/api/img/prueba')
        .send(imagen)
        .end((err, res)=>{
            res.should.have.status(200)
            done()
        })
    })
})

