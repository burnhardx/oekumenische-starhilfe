const should = require("chai").should();
const underTest = require("./../../../src/server/db/createRefugee");

const models = require("./../../../src/server/db/model")
const cache = require("./../../../src/server/cache");

require("./../startFugeeTestSystem");

describe("createRefugee.js", () => {

    const refugeeData = {
        number: 77875554,
        surname: 'Neo',
        prename: 'Nia',
        birthday: new Date(),
        female: false,
        adress: 'Sackgasse 23',
        officialState: 'BÜMA',
        description: undefined,
        cardNr: 558,
        cardDate: new Date(),
        nation: 'USA'
    };


    it("writes given refugee data to db", done => {

        underTest(refugeeData).then(created => {
            should.exist(created.id);
            models(cache.db).Refugee.findOne({where: {id: created.id}})
                .then(loaded => {
                    loaded.prename.should.equal(refugeeData.prename);
                    loaded.surname.should.equal(refugeeData.surname);
                    loaded.image.should.not.equal('');
                    loaded.destroy()
                        .then(() => {
                            done();
                        })
                })
        });

    })


})