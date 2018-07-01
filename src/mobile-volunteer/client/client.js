const Dexie = require("dexie");

document.addEventListener("DOMContentLoaded", function (event) {
    const db = new Dexie("myDB");
    db.version(1)
        .stores({
            anyData: 'column1,column2'
        })


    db.anyData
        .put({column1:'terror', column2:'Gefahr'})
        .then(()=>{
            return db.get({column2:'Gefahr'})
        })
        .then(entry=>{
            console.log(entry);
        })
});