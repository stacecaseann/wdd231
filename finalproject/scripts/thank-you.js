//http://127.0.0.1:5500/chamber/thankyou.html?fname=Stacy&lname=Yarrington
// &title=Organization&email=stacecase%40gmail.com&phone=18014043376&organization=Enuit&membership=np&description=&timestamp=Fri+Jan+31+2025+22%3A11%3A53+GMT-0700+%28Mountain+Standard+Time%29
import { setupMenuButton,createNavigation } from './menu.js';
import { populateFooterWithDates } from './footer.js';

populateFooterWithDates();
setupMenuButton();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("home");


const currentUrl = window.location.href;
const formInputs = currentUrl.split('?');
let formData = formInputs[1].split('&');

const interests = [
    {
        "id":"healthyRecipes", 
        "name": "Healthy Recipes"
    },
    {
        "id":"nutrition", 
        "name": "Nutrition"
    },
    {
        "id":"mealPlans", 
        "name": "Meal Plans"
    },
    {
        "id":"Fitness", 
        "name": "Fitness"
    },   
]
function showInput(key)
{
    if (key == "foodType")
    {
        const items = formData.filter(item => item.startsWith(key)) || null;
        const selectedValues = [];
        items.forEach(item => 
        {
            const itemValue = item.split('=')[1];
            
            const interestName = interests.find( (interest) => 
            interest.id == itemValue
            );
            if (interestName)
                selectedValues.push(interestName.name);           
        }
        );
        return selectedValues.join(",");

    }
    const item = formData.find(item => item.startsWith(key)) || null;
    if (item && key == "timestamp")
    {
        const dateString = item.split('=')[1].replace(/\+/g," ");
        const decoded = decodeURIComponent(dateString);
        console.log(decoded);
        const date = new Date(decoded);
        const formattedDate = date.toLocaleDateString("en-US",{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false // Use 24-hour format
        });
        return formattedDate;
    }  
    else if (item)
    {
        const itemValue = item.split('=')[1].replace('%40', '@')
            .replace(/\+/g," ");
        return itemValue;
    }
    else 
    {
        return '';   
    }
}

function createThankYouHtml()
{
    const html = `
    <table><tr><td>Name</td>
    <td>${showInput("fname")} ${showInput("lname")}</td></tr>
    <tr><td>Email</td><td>${showInput("email")}</td></tr>
    <tr><td>Interests</td><td>${showInput("foodType")}</td></tr>
    <tr><td>Time Entered</td><td>${showInput("timestamp")}</td></tr></table>
    `;
    return html;
}
const thankYouElement = document.querySelector('.thank-you');
thankYouElement.innerHTML = createThankYouHtml();