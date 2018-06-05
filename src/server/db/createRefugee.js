const model = require("./model");
const qr = require("qrcode");
const Q = require("q");
const cache = require("./../cache");

module.exports = refugeeData => {
    const defer = Q.defer();
    const Refugee = model(cache.db).Refugee;

    Refugee.create(refugeeData)
        .then(created => {
            Refugee.findOne({where: {id: created.id}})
                .then(refugee => {

                    qr.toDataURL('public/data/' + refugee.id)
                        .then(dataUrl => {

                            refugee.update({image: dataUrl})
                                .then(updated => {
                                    defer.resolve(updated);
                                })
                                .catch(err => {
                                    defer.reject(err);
                                })

                        })
                        .catch(err => {
                            defer.reject(err);
                        })


                })


        })
        .catch(err => {
            defer.reject(err);
        })

    return defer.promise;
}
