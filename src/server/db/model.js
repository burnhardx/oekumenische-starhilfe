/**
 * Contains the complete database scheme.
 */

const Sequelize = require('sequelize');
const hashString = require("./../crypto/hashString")

module.exports = sequelize => {

    const id = {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    };

    return {
        User: sequelize.define('users', {
                id: id,
                name: {
                    type: Sequelize.STRING
                },
                login: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
                }
            },
            {
                setterMethods: {
                    password(pw){
                        this.setDataValue('password', hashString(pw))
                    }

                }
            }
        ),
        Refugee: sequelize.define('refugees', {
            id: id,
            number: {
                type:Sequelize.INTEGER
            },
            prename: {
                type: Sequelize.STRING
            },
            surname: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATEONLY
            },
            female: {
                type:Sequelize.BOOLEAN,
                defaultValue:true
            },
            adress: {
                type: Sequelize.STRING
            },
            officialState: {
                type: Sequelize.ENUM,
                values:['BÜMA','AE','AG'],
                notNullValue:true
            },
            description: {
                type:Sequelize.STRING
            },
            cardNr:{
                type:Sequelize.STRING
            },
            cardDate:{
                type: Sequelize.DATEONLY
            },
            nation:{
                type:Sequelize.STRING
            },
            image:{
                type:Sequelize.STRING.BINARY
            }
        })
    }
}
