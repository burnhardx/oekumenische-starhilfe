const should = require("chai").should();
const qrcode = require("qrcode")
const path = require("path");
const fs = require("fs");


describe("npm module qrcode", () => {

    it("can create qrcodes as base64", done => {
        qrcode.toDataURL('tetsts')
            .then(url => {
                url.substring(0, 10).should.equal('data:image');
                done();
            })
    })

    it("can create qrcodes as files", done => {
        const output = path.resolve(__dirname, 'testData.png');

        qrcode.toFile(output, 'anyGivenUrl')
            .then(image=>{
                fs.existsSync(output);
                fs.unlinkSync(output);
                done();
            })
    })

})