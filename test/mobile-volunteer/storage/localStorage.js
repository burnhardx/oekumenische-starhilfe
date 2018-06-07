const should = require("chai").should();

const underTest = require("./../../../src/mobile-volunteer/storage/localStorage");

describe("localStorage", ()=>{

    const testValues={key:'test',value:'anyTestValue'};

    it("stores values in the localStorage",()=>{
        underTest.set(testValues.key, testValues.value);
        underTest.get(testValues.key).should.equal(testValues.value);
    })

    it("removes stored values", ()=>{
        underTest.remove(testValues.key);
        should.not.exist(underTest.get(testValues.key));
    })

    it("wraps the stored values with timestamp and transfer flag", ()=>{

        underTest.set(testValues.key, testValues.value);
        const wrapped = JSON.parse(underTest.localStorage.getItem(testValues.key));
        wrapped.timestamp.should.not.equal('')
        wrapped.transferred.should.equal(false);
        wrapped.value.should.equal(testValues.value);
    })

    it("stores objects properly",()=>{

        const complexValue={name:'Herbert',female:true};
        underTest.set(testValues.key, complexValue);
        const stored=underTest.get(testValues.key);
        stored.name.should.equal(complexValue.name);
        stored.female.should.equal(complexValue.female)
    })

    after(()=>{
        underTest.remove(testValues.key);
    })

})