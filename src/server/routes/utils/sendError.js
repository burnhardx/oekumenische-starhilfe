module.exports = (res,message, code)=>{
    res.status(!code ? 404 : code).send(!message? 'Es ist ein Fehler aufgetreten' : message);
}