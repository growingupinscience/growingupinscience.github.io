
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

export function getLongDate(datestr){
    const date = new Date(datestr)
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    const day = date.getDate()
    var suffix = "th"
    if (day % 10 === 1 && day !== 11) suffix = "st"
    else if (day % 10 === 2 && day !== 12) suffix = "nd"
    else if (day % 10 === 3 && day !== 13) suffix = "rd"
    return months[date.getMonth()] + " " + day + suffix + ", " + date.getFullYear()
}

// Short, human-readable date for listing tables, e.g. "Aug 5, 2026".
export function getDateFormat(datestr){
    const date = new Date(datestr)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
}

