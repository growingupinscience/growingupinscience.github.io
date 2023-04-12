
export function getDayofWeek(datestr){
    const date = new Date(datestr)
    const dow = date.getDay()
    const tostr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return tostr[dow]
}

export function getMonthDayFormat(datestr){
    const date = new Date(datestr)
    const tostr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return tostr[date.getMonth()] + " " + String(date.getDate()).padStart(2, "0")
}

export function getDateFormat(datestr){
    const date = new Date(datestr)
    return date.getFullYear() + "\t" + String(date.getMonth() + 1).padStart(2, "0") + "\t" + String(date.getDate()).padStart(2, "0")
}

