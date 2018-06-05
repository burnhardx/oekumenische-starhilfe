const chai = require('chai')
    , chaiHttp = require('chai-http');
const should = chai.should();

const models = require("./../../../src/server/db/model")

chai.use(chaiHttp);

require("./../startFugeeTestSystem");

describe("Login @FugeeServer", () => {

    const testUser = {
        name: 'beppo',
        login: 'Beppo' + new Date().getTime(),
        password: 'beppo'
    }

    // Add testUser to DB
    before(done=>{
        models(db).User.create(testUser).then(()=>{
            done();
        })
    })

    let token;

    it("is possible with known user credentials", ()=> {
        chai.request(app)
            .post('/login')
            .send({login:testUser.login, password:testUser.password})
            .end((err,res)=>{
                should.exist(res.body.token);
                token=res.body.token;
            })
    })

    it("is not possible with unknown user credentials", ()=>{
        chai.request(app)
            .post('/login')
            .send({login:testUser.login, password:'wrong password'})
            .end((err,res)=>{
                should.not.exist(res.body.token);
                res.statusCode.should.equal(404);
            });

        chai.request(app)
            .post('/login')
            .send({login:'unkown login'.login, password:'wrong password'})
            .end((err,res)=>{
                should.not.exist(res.body.token);
                res.statusCode.should.equal(404);
            });

        chai.request(app)
            .post('/login')
            .send({login:'unkown login'.login, password:testUser.password})
            .end((err,res)=>{
                should.not.exist(res.body.token);
                res.statusCode.should.equal(404);
            });

        chai.request(app)
            .post('/login')
            .send({login:testUser.login.toLowerCase(), password:testUser.password})
            .end((err,res)=>{
                should.not.exist(res.body.token);
                res.statusCode.should.equal(404);
            });
    })

    after(done=>{
        models(db).User.findOne({where:{login:testUser.login}}).then(user=>{
            user.destroy();
            done();
        })
    })

})
