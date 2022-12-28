module.exports = {
    getTime: () =>{
        var date = new Date();
        return {
            hour : date.getHours(),
            minutes: date.getMinutes()
        }
    }, 
    getDateNow: () => {
        var date = new Date();
        return {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
    }
}