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
    it('agregar usuario', done => {
        chai.request(url)
        .post("/Usuario")
        .send({username: "Alinemhdez", password: "secret", nombre: "aline", apellidos: "Hdez Fajardo", correo: "alinemhdez@gmail.com"})
        .end( function(err,res){
            console.log(res,body)
            expect(res).to.have.status(200);
            done();
        });
    });
});
describe('#Asynchronous user crud test', () => {
    it('obtener "usuarios" ', done => {
        chai.request(app)
            .get("/Usuario")
            .end(function (err, res) {
                if(err) done(err);
                done();
                console.log('Salida: %s, users: %s',res.statusCode, res.body.length)
            });
    }).timeout(0);
});

