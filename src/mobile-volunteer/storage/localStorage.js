/**
 * Wrapper for localStorage.
 */
const wrapValue = value => {
    return {
        timestamp: new Date().getTime(),
        transferred: false,
        value: value
    }
}

class LocalStorage {
    constructor() {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            this.localStorage = new LocalStorage('./localStorageDump');
        } else {
            this.localStorage = localStorage;
        }
    }

    get(key) {
        const result=JSON.parse(this.localStorage.getItem(key));
        return result==null ? result : result.value;
    }

    set(key, value) {
        this.localStorage.setItem(key, JSON.stringify(wrapValue(value)));
    }

    remove(key) {
        this.localStorage.removeItem(key);
    }

    allKeys(){
        if (typeof localStorage === "undefined" || localStorage === null) {
            return this.localStorage._keys;
        }
        return Object.keys(this.localStorage);
    }
}
module.exports = new LocalStorage();