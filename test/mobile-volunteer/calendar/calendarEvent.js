const should = require("chai").should();
const underTest = require("./../../../src/mobile-volunteer/calendar/calendarEvent");

const EventItem = require("./../../../src/mobile-volunteer/calendar/eventItem")

describe("calendarEvent", () => {

    const data = {
        donor: 'Meister Feuerstein',
        street: 'Sackgasse 34',
        plz: 28833,
        city: 'Bremen',
        begin: '10:30',
        items:[
            new EventItem.NewItem('Stuhl').withNumber(1).withDescription('Schöner Stuhl').create(),
            new EventItem.NewItem('Kochtöpfe').withNumber(5).create()
        ]
    }

    const assertResult = result=>{
        result.donor.should.equal(data.donor);
        result.street.should.equal(data.street);
        result.plz.should.equal(data.plz);
        result.city.should.equal(data.city);
        result.begin.should.equal(data.begin);
        result.items[0].title.should.equal(data.items[0].title);
    }

    it("can be created fluently", () => {

        const result = new underTest.NewEvent(new Date())
            .forDonor(data.donor)
            .atStreet(data.street)
            .atPlz(data.plz)
            .atCity(data.city)
            .begin(data.begin)
            .withItem(data.items[0])
            .withItem(data.items[1])
            .create();

        assertResult(result);
    })

    it("can be created with serialized values", ()=>{

        const result=new underTest(JSON.parse(JSON.stringify(data)))
        assertResult(result);
    })

})