/*
* Test cases to assert that data from xlsx files will be imported as expected.
 */
const should = require("chai").should();
const xlsx = require("node-xlsx")
const path = require("path");
const underTest = require("./../../../../src/server/cli/utils/convertXlsxRowToRefugee")

const sheets = xlsx.parse(path.resolve(__dirname,'../../../data/refugees.xlsx'));
const fugeeTable =sheets[1];
describe("convertXlsxRowToRefugee", ()=>{

    it("converts a given xlsx row to a refugee",()=>{

        const exampleRow = fugeeTable.data[3];

        const refugee = underTest(exampleRow);

        refugee.prename.should.equal('Amina');
        refugee.surname.should.equal('Hasan');
        refugee.birthday.getTime().should.equal(37407600000);
        refugee.female.should.equal(true);

        refugee.adress.should.equal('Hünertshagen 17');
        refugee.officialState.should.equal('BÜMA');
        should.not.exist(refugee.description)
        refugee.cardNr.should.equal(470131);

        refugee.cardDate.getTime().should.equal(1448233200000)
        refugee.nation.should.equal('SYR');
    })
})


