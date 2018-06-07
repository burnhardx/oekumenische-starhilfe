const uuid = require("uuid");

class EventItem {
    constructor(build) {
        this.number = build.number;
        this.title = build.title;
        this.description = build.description;
        this.id=build.id;
    }

    static get NewItem() {
        class NewItem {
            constructor(title) {
                this.title = title;
                this.id = uuid.v4();
            }
            withNumber(number){
                this.number=number;
                return this;
            }
            withDescription(description){
                this.description=description;
                return this;
            }
            create() {
                return new EventItem(this);
            }
        }
        return NewItem;
    }
}

module.exports = EventItem;