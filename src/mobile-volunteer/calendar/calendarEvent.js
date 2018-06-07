const uuid = require("uuid");

class CalendarEvent {

    constructor(build) {
        this.date = build.date;
        this.donor = build.donor;
        this.street = build.street;
        this.plz = build.plz;
        this.city = build.city;
        this.begin = build.begin;
        this.items = build.items;
        this.id = build.id;
    }

    static get NewEvent() {
        class NewEvent {
            constructor(date) {
                this.date = date;
                this.id = uuid.v4();
            }
            forDonor(donor){
                this.donor = donor;
                return this;
            }
            atStreet(street){
                this.street=street;
                return this;
            }
            atPlz(plz){
                this.plz=plz;
                return this;
            }
            atCity(city){
                this.city=city;
                return this;
            }
            begin(begin){
                this.begin=begin;
                return this;
            }
            withItem(item){
                if(!this.items){
                    this.items=[];
                }
                this.items.push(item);
                return this;
            }

            create() {
                return new CalendarEvent(this);
            }
        }
        return NewEvent;
    }
}

module.exports = CalendarEvent;