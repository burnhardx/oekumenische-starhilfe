const should = require("chai").should();

const underTest = require("./../../../src/mobile-volunteer/calendar/calendarEventsForMonth");

const EventItem = require("./../../../src/mobile-volunteer/calendar/eventItem")
const CalendarEvent = require("./../../../src/mobile-volunteer/calendar/calendarEvent")

const storage = require("./../../../src/mobile-volunteer/storage/localStorage")
const storageKeys = require("./../../../src/mobile-volunteer/storage/storageKeys")

describe("calendarEventsForMonth", () => {

    const storageKey = storageKeys.create.dateKey(6,2018);

    const firstEvent = new CalendarEvent.NewEvent(new Date(2018, 6,18))
        .forDonor('Herbert Meier')
        .begin('10:00')
        .withItem(
            new EventItem.NewItem('Pfandflaschen')
                .withNumber(4599)
                .create())
        .create();

    const secondEvent = new CalendarEvent.NewEvent(new Date(2018, 6,6))
        .forDonor('Harald Bittner')
        .begin('19:00')
        .withItem(
            new EventItem.NewItem('Stühle')
                .withNumber(20)
                .withDescription('Wunderhübsch anzusehen')
                .create())
        .create();

    it("can store events in localStorage", () => {

        const eventsInJune = new underTest(6, 2018);

        eventsInJune.events.length.should.equal(0);
        eventsInJune.add(firstEvent);
        eventsInJune.events.length.should.equal(1);


        const storedEvents = storage.get(storageKey);

        storedEvents.length.should.equal(1);

        const storedEvent = storedEvents[0];
        storedEvent.donor.should.equal(firstEvent.donor);
        storedEvent.begin.should.equal(firstEvent.begin);
        storedEvent.items.length.should.equal(firstEvent.items.length);
    })
    it("remove events from storage",()=>{

        const eventsInJune = new underTest(6, 2018);
        eventsInJune.add(secondEvent);
        eventsInJune.events.length.should.equal(2);

        eventsInJune.remove(firstEvent.id);
        eventsInJune.events.length.should.equal(1);

        const resolvedEvent = eventsInJune.get(secondEvent.id);
        resolvedEvent.donor.should.equal(secondEvent.donor);
        resolvedEvent.begin.should.equal(secondEvent.begin);
        resolvedEvent.items.length.should.equal(secondEvent.items.length);
    })

    after(()=>{
        storage.remove(storageKey);
    })

})
