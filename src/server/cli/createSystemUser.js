/**
 * CLI to create a user that is stored in db.
 */
const prompt = require("prompt");
prompt.message = "";
const startDB = require("./../db/startDB")
const dbSchema = require("./../db/model")

const schemaLogin = {
    properties: {
        Name: {
            required: true
        },
        Login: {
            message: 'Bitte einen Benutzernamen angeben. Es sind nur alphanumerische Zeichen erlaubt.',
            pattern: /^[a-zA-Z0-9_]*$/,
            required: true
        }
    }
}

const schemaPassword = {
    properties: {
        Passwort: {
            message: 'Bitte ein Passwort angeben. Es sind nur alphanumerische Zeichen erlaubt.',
            pattern: /^[a-zA-Z0-9_]*$/,
            required: true,
            hidden: true
        },
        ["Passwort wiederholen"]: {
            message: 'Bitte ein Passwort angeben. Es sind nur alphanumerische Zeichen erlaubt.',
            pattern: /^[a-zA-Z0-9_]*$/,
            required: true,
            hidden: true
        }
    }
}

let db;
startDB().then(establishedDb => {
    db = establishedDb;
    const User = dbSchema(db).User;

    console.log("Legen Sie bitte nun einen neuen Benutzer für den Starthilfe Server an.")

    prompt.get(schemaLogin, (err, resultLogin) => {
        if (!resultLogin) {
            console.log(err);
            return;
        }
        User.findOne({where: {login: resultLogin.Login}}).then(userWithSameLogin => {

            if (userWithSameLogin == null) {

                prompt.get(schemaPassword, (err, resultPassword) => {
                    const password = resultPassword.Passwort;
                    const passwordMatch = resultPassword["Passwort wiederholen"];
                    if (password === passwordMatch) {

                        User.create({
                            name: resultLogin.Name,
                            login: resultLogin.Login,
                            password: password
                        }).then(created => {
                            console.log(resultLogin.Name+" wurde erfolgreich angelegt");
                            db.close();
                        })

                    } else {
                        console.log("Passwort wurde nicht korrekt wiederholt.")
                        db.close();
                    }

                })

            } else {
                console.log("Es gibt bereits einen Benutzer mit diesem Login.")
                db.close();
            }

        })
    })

});