
class Calendar {
    constructor() {
        const comparison = new Date();
        this.currentMonth = Math.abs(comparison.getMonth() + 1);
        this.currentYear = comparison.getFullYear();
    }

    weekRows() {

        const createDate = date => {
            return {
                date: date.getDate(),
                month: Math.abs(date.getMonth()+1),
                year: date.getFullYear()
            }
        }

        let lastDayOfMonth = new Date(this.currentYear, this.currentMonth, 0);

        const result = [];
        let row = [];

        const fillRow = (currentRow, day) => {
            if (day.getDay() == 1) {
                return;
            }
            const fillBefore = currentRow.length == 0;
            let targetMonth = fillBefore ? Math.abs(day.getMonth()) : Math.abs(day.getMonth()+1);
            let date = new Date(day.getFullYear(), targetMonth, fillBefore ? 0 : 1);
            const tillMonday= fillBefore ? Math.abs(7-day.getUTCDay()+1) : Math.abs(7-day.getUTCDay()-1);

            for (var j = 0; j < tillMonday; j++) {
                currentRow.push(createDate(date));
                date = new Date(day.getFullYear(),Math.abs(targetMonth-1), fillBefore ? Math.abs(date.getDate()-1) : Math.abs(date.getDate()+1));
            }
        }

        for (var i = 0; i < lastDayOfMonth.getDate(); i++) {
            const date = new Date(this.currentYear, Math.abs(this.currentMonth-1), Math.abs(i + 1));
            if (i == 0) {
                fillRow(row,date);
                row = row.reverse();
            }
            row.push(createDate(date))

            const isLast = i == Math.abs(lastDayOfMonth.getDate()-1);
            if (isLast) {
                fillRow(row,date)
            }
            if(row.length==7 || isLast){
                result.push(JSON.parse(JSON.stringify(row)));
                row=[];
            }
        }

        return result;
    }

}
const instance = new Calendar();
module.exports = instance;