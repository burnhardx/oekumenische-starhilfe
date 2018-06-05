const should = require("chai").should();


describe("jwtWrapper", () => {

    let underTest;
    let createdToken;
    const millisForTest = 1000;

    process.env.FUGEE_TOKEN_EXPIRATION = millisForTest;

    it("uses config.tokenExpiration as expected", () => {
        underTest = require("./../../../src/server/crypto/jwtWrapper");
        underTest.expiresIn.should.equal(millisForTest);
    })

    it("signs a given user and verifies his integrity", () => {

        const anyObjectData = {
            prename: 'herbert',
            surname: 'feuerstein'
        }
        createdToken = underTest.sign(anyObjectData);

        const result = underTest.verify(createdToken);
        result.prename.should.equal(anyObjectData.prename);
        result.surname.should.equal(anyObjectData.surname);
    })

    xit("does not verify expired tokens", done => {

        setTimeout(()=>{
            const verified = underTest.verify(createdToken);
            should.not.exist(verified);
            done();
        }, Math.abs(millisForTest));

    })

})