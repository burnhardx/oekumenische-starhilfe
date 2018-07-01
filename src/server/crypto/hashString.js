/**
 * Hashes a given string
 */

const crypto = require('crypto');
const config = require("./../config");

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = toHash=>{
    var hash = crypto.createHmac('sha512', config.password); /** Hashing algorithm sha512 */
    hash.update(toHash);
    return hash.digest('hex');
};

module.exports = sha512;