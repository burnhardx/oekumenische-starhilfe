class Query {
    constructor(build) {
        this.db= build.db;
        this.query = build.query;

    }
    static get Refugees() {
        class Refugees {
            constructor() {
                this.db='Refugee';
            }
            with(query){
                this.query=query;
                return new Query(this);
            }
        }
        return Refugees;
    }
}

module.exports = Query;