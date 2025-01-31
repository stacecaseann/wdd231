import { setupMenuButton } from './menu.js';
import { populateFooterWithDates } from './footer.js';
import { loadWeatherData } from './weather.js';
import { getIconAttributionsHtml, getFilteredCompanyDataArraySize, getFilteredCompanyDataCardHtml } from './companyData.js';
import { getEventsDataHtml } from './events.js';

populateFooterWithDates();
setupMenuButton();
populateEvents();

const footerAttributionElement = document.querySelector("#icon-attributions");
const weatherElement = document.querySelector(".weather-details");
const forecastElement = document.querySelector(".weather-forecast");
loadWeatherData(weatherElement, forecastElement);

const companyCardsElement = document.querySelector(".business-cards");
createCompanyCards();

async function populateEvents()
{
    const eventsElement = document.querySelector(".event-details");
    const eventHtml = await getEventsDataHtml();
    eventsElement.innerHTML = eventHtml;
}
async function createCompanyCards()
{
    try
    {
        const dataSize = await getFilteredCompanyDataArraySize();
        const randomNumbers = getRandomNumbers(0,dataSize-1);
        console.log("RandomNumbers" + randomNumbers);
        const htmlPromises = randomNumbers.map(async (index) => 
            {
                return await getFilteredCompanyDataCardHtml(index);
            }
        );
        const html = await Promise.all(htmlPromises);
        const companyCardHtml = html.join('');
        companyCardsElement.innerHTML = companyCardHtml;
        //attribute for the icons used on the page
        const attributions = await getIconAttributionsHtml(randomNumbers);
        footerAttributionElement.innerHTML = attributions;
    } catch (error)
    {
        console.error("Error creating company cards:", error);
    }
}

function getRandomNumbers(min, max)
{
    const result = new Set();
    while (result.size < 3)
    {
        const index = Math.floor(Math.random() * (max - min + 1)) + min;
        result.add(index);
        
    }
    return [...result];
}



