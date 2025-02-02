export const memberships = 
[
    {
        "membershipLevel": "Non Profit Membership Level",
        "membershipId": "np",
        "description": "Free membership to advertise in our chamber directory",
        "price":"0",
        "benefits": 
        [
            "directory"
        ]
    },
    {
        "membershipLevel": "Bronze Membership Level",
        "membershipId": "bronze",
        "description": "Bronze membership comes with spotlights on our home page.",
        "price":10,
        "benefits": 
        [
            "directory",
            "spotlights"
        ]
    },
    {
        "membershipLevel": "Silver Membership Level",
        "membershipId": "silver",
        "description": "Silver membership comes with spotlights on our home page and networking opportunities.",
        "price":20,
        "benefits": 
        [
            "directory",
            "spotlights",
            "networking"

        ]
    },
    {
        "membershipLevel": "Gold Membership Level",
        "membershipId": "gold",
        "description": "Gold membership comes with spotlights on our home page, networking opportunities, business spotlights, logo and banner ads, recognition at events, banners at city events.",
        "price":30,
        "benefits": 
        [
            "directory",
            "spotlights",
            "networking",
            "logo",
            "recognition",
            "banner"
        ]
    }        
];

// let cachedData = null;
// async function getMembershipData()
// {
//     if (cachedData)
//     {
//         return cachedData;
//     }
//     try{
//         const response = await fetch("data/memberships.json");
//         const data = await response.json();
//         if (!response.ok)
//         {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log(data);
//         cachedData = data;
    
//         return data;
//     }
//     catch(error)
//     {
//         console.error('Unable to load file', error);
//     }
// }

function createMembershipLevelDialog(membershipData)
{
    //TODO trying to reuse the business card
    const cardHtml = `<div class=business-card">
    <h3>${membershipData.membershipLevel}</h3>
    <p>${membershipData.description}</p>
    
    </div>`;
    return cardHtml;
}
export function getMembershipLevelCards(membershipCardsElement, membershipDialog)
{
    const data = memberships;
    data.forEach( (membership) => 
    {
        const div = createMembershipLevelCard(membership, membershipDialog)
        membershipCardsElement.appendChild(div);
    }
    );
}

function createMembershipLevelCard(membershipData, membershipDialog)
{
    let div = document.createElement("div");
    div.className = "membership-level";
    const header = document.createElement("h3");
    header.textContent = membershipData.membershipLevel;
    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.addEventListener("click", () => showMembershipLevel(membershipData, membershipDialog));
    div.appendChild(header);
    div.appendChild(button);
    return div;
    
}

function showMembershipLevel(membershipData, membershipDialog)
{
    const title = membershipDialog.querySelector("h2");
    title.textContent = membershipData.membershipLevel;
    const info = membershipDialog.querySelector("p");
    info.textContent = membershipData.description;
    const priceElement = membershipDialog.querySelectorAll("p")[1];
    var priceHtml = `Price: ${membershipData.price==0 ? "": "$"}${membershipData.price==0 ? "Free" : membershipData.price}`;
    priceElement.innerHTML = priceHtml;
    membershipDialog.showModal();
}