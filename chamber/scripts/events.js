let cachedData = null;
async function getEventsData(){
    if (cachedData){
        return cachedData;
    }
    try
    {
        const response = await fetch("data/events.json");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        data.sort
        cachedData = data;
        return data;
    }
    catch(error)
    {
        console.error('Unable to load file', error);
    }
}

export async function getEventsDataHtml(){
    const data = await getEventsData();
    const htmlArray = data.map(
        (event) => getEventHtml(event)
    )
    return htmlArray.join('');
}

function getEventHtml(event){
    return `<p><span class="highlight">${event.name}:</span> ${event.date}`;
}