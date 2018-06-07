const should = require("chai").should();

const underTest = require("./../../../src/mobile-volunteer/calendar/calendar");

describe("calendar", ()=>{

    it("starts with the current date", ()=>{
        const comparison = new Date();
        underTest.currentMonth.should.equal(Math.abs(comparison.getMonth()+1));
        underTest.currentYear.should.equal(comparison.getFullYear());
    })

    it("returns the correct array of weekdays",()=>{
        underTest.currentMonth=6;
        underTest.currentYear=2018;
        let rows = underTest.weekRows();
        rows.length.should.equal(5);

        const firstWeek = rows[0];
        firstWeek[0].date.should.equal(28)
        firstWeek[0].month.should.equal(5)
        firstWeek[0].year.should.equal(2018)

        const lastWeek = rows[4];
        lastWeek[0].date.should.equal(25)
        lastWeek[0].month.should.equal(6)
        lastWeek[0].year.should.equal(2018)
        lastWeek[6].date.should.equal(1)

        underTest.currentMonth=2;
        underTest.currentYear=2016;

        rows = underTest.weekRows();
        rows[4][0].date.should.equal(29)
    })

})