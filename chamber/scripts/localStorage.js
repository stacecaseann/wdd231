const minDate = new Date("2000-01-01");
const lastVisitedKey = "lastVisited";
export function getLastVisitedTimeMessage()
{
    const startDate = getLastVisitedTime();
    setLastVisitedTime();
    if (startDate == minDate)
    {
        return "Welcome! Let us know if you have any questions.";
    }
    const daysSinceLastVisit = getDaysSinceLastVisit(startDate);
    if ( daysSinceLastVisit == 1)
    {
        return "Back so soon! Awesome!";
    }
    else{
        return `You last visited ${daysSinceLastVisit} days ago.`;
    }

}
function getLastVisitedTime()
{
    let startItemString = window.localStorage.getItem(lastVisitedKey)
    let startDate = startItemString ? new Date(startItemString) : minDate;
    return startDate;
    //return new Date("2024,2,6");

}
function setLastVisitedTime()
{
    const currentDay = new Date();
    window.localStorage.setItem(lastVisitedKey, currentDay);
}

function getDaysSinceLastVisit(date)
{
    const msInOneDay = 1000*60*60*24;
    const currentDay = new Date();
    const lastDate = date;
    const diff = currentDay -lastDate;
    const msToDay = diff/msInOneDay;
    const days = Math.floor(msToDay);
    return days;
}

//for testing
export function clearLastDate()
{
    window.localStorage.removeItem(lastVisitedKey); 
}