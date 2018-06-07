const should = require("chai").should();
const underTest = require("./../../../src/mobile-volunteer/calendar/eventItem");

describe("eventItem", () => {

    const data = {
        number: 66,
        title: 'Flammenwerfer',
        description: 'Brennt schnell und liegt gut in der Hand!'
    }

    const assertResult = result=>{
        result.number.should.equal(data.number);
        result.title.should.equal(data.title);
        result.description.should.equal(data.description);
    }

    it("can be created fluently", () => {

        const result = new underTest.NewItem(data.title)
            .withNumber(data.number)
            .withDescription(data.description)
            .create();

        assertResult(result);
    })

    it("can be created with serialized values", ()=>{

        const result=new underTest(JSON.parse(JSON.stringify(data)))
        assertResult(result);
    })

})