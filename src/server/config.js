/**
 * Collects all necessary environment variables.
 */

module.exports = {
    database: process.env.FUGEE_DB,
    user: process.env.FUGEE_DB_USER,
    password: process.env.FUGEE_DB_PASSWORD
}
