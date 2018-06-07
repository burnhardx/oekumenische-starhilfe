const storage = require("./../storage/localStorage");
const storageKeys = require("./../storage/storageKeys");

const readEventsFromStorage = key=>{
    const events=storage.get(key);
    return events==null ? [] : events;
}

class CalendarEventsForMonth {
    constructor(month,year){
        this.storageKey = storageKeys.create.dateKey(month,year);
        this.events = readEventsFromStorage(this.storageKey);
    }

    add(event){
        this.events.push(event);
        storage.set(this.storageKey,this.events);
    }

    remove(eventId){
        const matching=this.events.filter(event=>event.id==eventId);
        const index = this.events.indexOf(matching[0]);
        if(index!=-1){
            this.events.splice(index, 1);
        }
    }

    get(eventId){
        return this.events.filter(event=>event.id==eventId)[0];
    }
}

module.exports = CalendarEventsForMonth;