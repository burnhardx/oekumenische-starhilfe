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

    const Item = sequelize.define('items', {
            id: {
                type: Sequelize.STRING,
                primaryKey:true
            },
            number: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            }
        }
    );

    const Event = sequelize.define('events', {
            id: {
                type: Sequelize.STRING,
                primaryKey:true
            },
            date: {
                type: Sequelize.DATEONLY
            },
            donor: {
                type: Sequelize.STRING
            },
            street: {
                type: Sequelize.STRING
            },
            plz: {
                type: Sequelize.INTEGER
            },
            city: {
                type: Sequelize.STRING
            },
            begin: {
                type: Sequelize.STRING
            }
        }
    );

    Event.hasMany(Item, {as:'items'});

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
                type: Sequelize.INTEGER
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
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            adress: {
                type: Sequelize.STRING
            },
            officialState: {
                type: Sequelize.ENUM,
                values: ['BÜMA', 'AE', 'AG'],
                notNullValue: true
            },
            description: {
                type: Sequelize.STRING
            },
            cardNr: {
                type: Sequelize.STRING
            },
            cardDate: {
                type: Sequelize.DATEONLY
            },
            nation: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING.BINARY
            }
        }),
        Event: Event,
        Item: Item
    }
}
