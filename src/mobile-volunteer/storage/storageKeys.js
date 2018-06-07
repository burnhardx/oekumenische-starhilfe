const dateKey = 'Date-';
module.exports = {
    dates:dateKey,
    create: {
        dateKey:(month,year)=>{return dateKey+month+'-'+year}
    }
}