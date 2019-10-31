let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
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