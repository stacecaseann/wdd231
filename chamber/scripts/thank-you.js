//http://127.0.0.1:5500/chamber/thankyou.html?fname=Stacy&lname=Yarrington
// &title=Organization&email=stacecase%40gmail.com&phone=18014043376&organization=Enuit&membership=np&description=&timestamp=Fri+Jan+31+2025+22%3A11%3A53+GMT-0700+%28Mountain+Standard+Time%29
import { memberships } from "./memberships.js";

const currentUrl = window.location.href;
const formInputs = currentUrl.split('?');
let formData = formInputs[1].split('&');

function showInput(key)
{
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
    else if (item && key == "membership")
    {
        const itemValue = item.split('=')[1];
        const valuePicked = memberships.find( (membership) => 
            membership.membershipId == itemValue
        );
        return valuePicked.membershipLevel;        
    }     
    else if (item && key == "phone")
    {
        const itemValue = item.split('=')[1].replace(/^1?[ -]?(\d{3})[ -]?(\d{3})[ -]?(\d{4})/,"($1)-$2-$3");
        return itemValue;
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
    <tr><td>Phone</td><td>${showInput("phone")}</td></tr>
    <tr><td>Organization</td><td>${showInput("organization")}</td></tr>
    <tr><td>Membership Level</td><td>${showInput("membership")}</td></tr>
    <tr><td>Time Entered</td><td>${showInput("timestamp")}</td></tr></table>
    `;
    return html;
}
const thankYouElement = document.querySelector('.thank-you');
thankYouElement.innerHTML = createThankYouHtml();