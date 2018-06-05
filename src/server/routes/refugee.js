const model = require("./../db/model");
const validateToken = require("./utils/validateToken");
const sendError = require("./utils/sendError")
const loadRefugeeById = require("./utils/loadRefugeeById");

const createRefugee = require("./../db/createRefugee");

const cache = require("./../cache");

module.exports = app => {

    const Refugee = model(cache.db).Refugee;

    const url = "/data/:token/refugees";
    const urlSpecific = url + '/:id';

    app.get(url, validateToken, (req, res) => {
        const query = Object.keys(req.query).length == 0 ? {} : {where: req.query};
        Refugee.findAll(query)
            .then(fugees => {
                res.send({data: fugees.length == 1 ? fugees[0] : fugees});
            })
            .catch(err => {
                sendError(res, 'No refugees available at the moment', 503);
            })
    })

    app.post(url, validateToken, (req, res) => {
        createRefugee(req.body)
            .then(created => {
                res.send({data: {id: created.id}});
            })
            .catch(err => {
                sendError(res, err, 503);
            })
    })

    app.put(urlSpecific, validateToken, loadRefugeeById, (req,res)=>{
        req.fugee.update(req.body)
            .then(success=>{
                res.send('ok');
            })
            .catch(err=>{
                sendError(res,JSON.stringify(err),503);
            })
    })

    app.get(urlSpecific, validateToken, loadRefugeeById, (req, res) => {
        res.send({data: req.fugee})
    })

    app.delete(urlSpecific, validateToken, loadRefugeeById, (req, res) => {
        req.fugee.destroy()
            .then(deleted => {
                res.send('done');
            })
            .catch(err => {
                sendError(res, 'deletion failed', 503);
            })
    })

}