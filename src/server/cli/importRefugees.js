/**
 * CLI to import refugee data from an xlsx file.
 */
const xlsx = require("node-xlsx")
const prompt = require("prompt");
const Q = require("q");
const startDB = require("./../db/startDB")
const model = require("./../db/model")
const createRefugee = require("./../db/createRefugee");
const cache = require("./../cache");
const convertXlsxRowToRefugee = require("./utils/convertXlsxRowToRefugee");

prompt.message = "";

const questionPath = 'Pfad zur Excel Datei';
const questionSheet = 'Arbeitsblatt'

const importRefugeesFromSheet = (sheet) => {

    const entries = sheet.data
        .filter(row => Number.isInteger(row[0]))
        .map(convertXlsxRowToRefugee);

    let index=0;

    const addRefugeeToDB =()=>{
        const fugee=entries[index];
        if(!fugee){
            cache.db.close();
            return;
        }
        const next=()=>{
            index++;
            addRefugeeToDB();
        }
        const identFugee= fugee.prename+" "+fugee.surname;

        const Refugee = model(cache.db).Refugee;

        Refugee.create(fugee)
            .then(()=>{
            console.log(identFugee+' imported');
            next();
        }).catch(err=>{
            console.log("Error :"+identFugee+" - "+index+" not imported");
            console.log(fugee)
            console.log(err);
            next()
        });
    }

    addRefugeeToDB();
}

prompt.get(questionPath, (err, result) => {
    const path = result[questionPath];
    try {
        const sheets = xlsx.parse(path.trim());

        console.log('Aus welchem Arbeitsblatt sollen Daten importiert werden?');
        console.log(
            sheets
                .map((sheet, index) => Math.abs(index + 1) + ' - ' + sheet.name)
                .join('\n')
        )

        prompt.get(questionSheet, (err, result) => {
            const selectedSheet = sheets[Math.abs(result[questionSheet] - 1)];

            startDB().then(db=>{
                cache.db = db;
                importRefugeesFromSheet(selectedSheet);
            })
        })

    } catch (err) {
        console.log(path + ' ist keine lesbare Excel Datei');
    }
})

//const workSheetsFromFile = xlsx.parse('/home/vollmer/Dokumente/refugees.xlsx');

