const Sequelize = require('sequelize');

const Q = require("q");

const config = require("./../config");

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


module.exports = ()=>{
    return sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            const scheme = require("./model")(sequelize);
            const defer = Q.defer();
            Q.all(Object.keys(scheme).map(key => scheme[key].sync({force: false}))).then(() => {
                defer.resolve(sequelize);
            })
            return defer.promise;
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}