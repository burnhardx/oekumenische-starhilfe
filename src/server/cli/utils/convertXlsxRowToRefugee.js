/**
 * Converts a row from a defined xlsx row to a refugee.
 */

module.exports = row=>{

    const emptyIfUndefined = value=> !value ? undefined : typeof stringValue =='string' ? value.trim() : value;

    const getOfficialState = row=>{
        return emptyIfUndefined(row[6])=='x' ? 'BÜMA' :
            emptyIfUndefined(row[7])=='x' ? 'AE' :
                emptyIfUndefined(row[8])=='x' ? 'AG' : null;
    }

    const fillZeros= str => {return str.length==1 ? '0'+str : str};

    const formatDate = date=>{
        if(date==''){
            return undefined;
        }
        const correctDate = new Date(1899, 12, Math.abs(date-1));
        return !correctDate.getTime() ? undefined : correctDate;
        //return fillZeros(correctDate.getDate()+'')+'.'+fillZeros(Math.abs(correctDate.getMonth()+1)+'')+'.'+correctDate.getFullYear();
    }

    return {
        number: row[0],
        surname: row[1],
        prename:row[2],
        birthday: formatDate(emptyIfUndefined(row[3])),
        female: !row[4] ? false : row[4].trim().toLowerCase()=='w',
        adress: emptyIfUndefined(row[5]),
        officialState: getOfficialState(row),
        description: emptyIfUndefined(row[9]),
        cardNr: emptyIfUndefined(row[10]),
        cardDate: formatDate(emptyIfUndefined(row[11])),
        nation: emptyIfUndefined(row[12])
    }

}
