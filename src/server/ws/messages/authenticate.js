class Authenticate {
    constructor(build) {
        this.login= build.login;
        this.password = build.password;

    }

    static get User() {
        class User {
            constructor() {
            }
            withLogin(login){
                this.login=login;
                return this;
            }
            withPassword(password){
                this.password=password;
                return this;
            }
            create() {
                return new Authenticate(this);
            }
        }
        return User;
    }
}

module.exports = Authenticate;