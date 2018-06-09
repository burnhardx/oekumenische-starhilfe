class AuthUser {
    constructor(build) {
        this.login= build.login;
        this.password = build.password;
    }

    static get NewUser() {
        class NewUser {
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
                return new NewUser(this);
            }
        }
        return NewUser;
    }
}

module.exports = AuthUser;