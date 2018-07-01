const chai = require('chai')
    , chaiHttp = require('chai-http');
const should = chai.should();

const models = require("./../../../src/server/db/model")
const cache = require("./../../../src/server/cache");
chai.use(chaiHttp);

require("./../startFugeeTestSystem");

describe("Managing refugees @FugeeServer", () => {

    const testUser = {
        name: 'beppo',
        login: 'Beppo' + new Date().getTime(),
        password: 'beppo'
    }


    let token;
    const serverUrl = ()=>{return '/data/'+token+'/refugees'} ;
    // Add testUser to DB
    before(done=>{
        models(db).User.create(testUser).then(()=>{
            chai.request(app)
                .post('/login')
                .send({login:testUser.login, password:testUser.password})
                .end((err,res)=>{
                    should.exist(res.body.token);
                    token=res.body.token;
                    done();
                })

        })
    })


    const sampleRefugees = [{
        number: 666,
        surname: 'Heiapopeia',
        prename:'Harald',
        birthday: new Date(),
        female: false,
        adress: 'Sackgasse 23',
        officialState: 'BÜMA',
        description: undefined,
        cardNr: 4811,
        cardDate: new Date(),
        nation: 'GER'
    },{
        number: 79009,
        surname: 'Stoiber',
        prename:'Karl',
        birthday: new Date(),
        female: false,
        adress: 'Am Fresseturm 9',
        officialState: 'BÜMA',
        description: 'really really bad',
        cardNr: 4812,
        cardDate: new Date(),
        nation: 'GER'
    }]

    it("can create new refugees", done=>{
        chai.request(app)
            .post(serverUrl())
            .send(sampleRefugees[0])
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                should.exist(res.body.data.id);
                sampleRefugees[0].id=res.body.data.id;

                chai.request(app)
                    .post(serverUrl())
                    .send(sampleRefugees[1])
                    .end((err,res)=>{
                        res.statusCode.should.equal(200);
                        should.exist(res.body.data.id);
                        sampleRefugees[1].id=res.body.data.id;
                        done();
                    })
            })
    })

    it("retrieves all stored refugees", done=> {

        models(db).Refugee.findAll({}).then(allRefugees=>{
            chai.request(app)
                .get('/data/'+token+'/refugees')
                .end((err,res)=>{
                    should.exist(res.body.data);
                    res.body.data.length.should.equal(allRefugees.length);
                    done();
                })
        })
    })

    it("can read refugees by id", done=>{

        chai.request(app)
            .get(serverUrl()+'/'+sampleRefugees[1].id)
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.data.prename.should.equal(sampleRefugees[1].prename);
                res.body.data.surname.should.equal(sampleRefugees[1].surname);
                done();
            })

    })

    it("can read single refugee by query parameters", done=>{

        chai.request(app)
            .get(serverUrl()+'?number=666')
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.data.prename.should.equal(sampleRefugees[0].prename);
                res.body.data.id.should.equal(sampleRefugees[0].id);
                done();
            })

    })

    it("can read multiple refugees by query parameters", done=>{

        chai.request(app)
            .get(serverUrl()+'?nation=GER')
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.data.length.should.equal(2);
                done();
            })

    })

    it("can update refugees by id", done=>{
        const dataToUpdate = {prename:'Willi', surname:'Wutz'};
        chai.request(app)
            .put(serverUrl()+"/"+sampleRefugees[0].id)
            .send(dataToUpdate)
            .end((err,res)=>{
                res.statusCode.should.equal(200);

                chai.request(app)
                    .get(serverUrl()+'?prename='+dataToUpdate.prename+'&surname='+dataToUpdate.surname)
                    .end((err,res)=>{
                        res.body.data.id.should.equal(sampleRefugees[0].id)
                        done();
                    })

            })

    })

    it("can delete refugees", done=>{
        chai.request(app)
            .delete(serverUrl()+"/"+sampleRefugees[0].id)
            .end((err,res)=>{
                res.statusCode.should.equal(200);

                chai.request(app)
                    .delete(serverUrl()+"/"+sampleRefugees[1].id)
                    .end((err,res)=>{
                        res.statusCode.should.equal(200);
                        done();
                    })
            })
    })


    after(done=>{
        models(db).User.findOne({where:{login:testUser.login}}).then(user=>{
            user.destroy();
            done();
        })
    })

})
