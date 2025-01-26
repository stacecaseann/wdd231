
const lat = 40.115488864527755;
const lon = -111.653520983868;
const unit = "imperial";
//Get from file
const apiKey = "3898d2436b52ab46f96c8c6230ff013e";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
async function apiFetch(url) 
{
    try{
        const response = await fetch(url);
        if (response.ok)
        {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error)
    {
        console.log(error);
    }
}
export async function loadWeatherData(weatherElement, forecastElement)
{
    try{
        
        const [weatherData, weatherForecast] = await Promise.all(
            [
                apiFetch(weatherUrl),
                apiFetch(forecastUrl)
            ]);
        
        createWeatherCard(weatherData, weatherElement);
        createWeatherForecastCard(weatherForecast, forecastElement);
    }
    catch(error)
    {
        console.log(error);
    }
}
function createWeatherForecastCard(forecast, weatherElement)
{    
    let forecastHtml = `<div class="weather-column">`;
    for (let i=0; i<2; i++)
    {
        const dailyData = forecast.list[i];
        const todayDateStr = dailyData.dt;
        const todayDate = new Date(todayDateStr * 1000);
        const temp = dailyData.main.temp;
        const icon = dailyData.weather[0].icon;
        const iconPath = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        forecastHtml += `
        <p>${i == 0 ? "Today" : todayDate.toLocaleString('en-US', { weekday: 'long' })}: 
        <span class="highlight">${temp}&deg; F</span></p>
        <p>     <img src="${iconPath}" width="50" height="50" alt="weather icon"></p>
        `;

    }
    forecastHtml += `</div>`;
    weatherElement.innerHTML = forecastHtml;
}
function createWeatherCard(weatherData, weatherElement)
{
    //const jsonObject = JSON.parse(weatherData);
    const weatherDesc = weatherData.weather[0].description;
    //TODO change the desc to Title case
    const icon = weatherData.weather[0].icon;
    const iconPath = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const temp = weatherData.main.temp;
    const low = weatherData.main.temp_min;
    const high = weatherData.main.temp_max;
    const humidity = weatherData.main.humidity;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;
    const date = new Date(sunrise * 1000);
    const date2 = new Date(sunset * 1000);
    const sunriseTime = date.toLocaleString('en-US', { timeStyle: 'short' });
    const sunsetTime = date2.toLocaleString('en-US', { timeStyle: 'short' });
    const weatherHtml = `<div class="weather-column">
    <img src="${iconPath}" width="100" height="100" alt="weather icon">
    </div>
    <div class="weather-column">
    <p class="highlight">${temp}&deg; F</p>
    <p class="title-case">${weatherDesc}</p>
    <p>High: ${high}&deg; F</p>
    <p>Low: ${low}&deg; F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Sunrise: ${sunriseTime}</p>
    <p>Sunset: ${sunsetTime}</p>
    </div>`;
    weatherElement.innerHTML = weatherHtml;
}
