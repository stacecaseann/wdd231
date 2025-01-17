const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector("#cards");

async function getProphetDataAsync(){
    try{
        var response = await fetch(url);
        var data = await response.json();
        //console.table(data.prophets);
        displayProphets(data.prophets);

    }
    catch (error)
    {
        //console.error("Error", error);
    }
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => 
    {
        let card = document.createElement('section');
        let fullNameEl = document.createElement('h2');
        
        let portrait = document.createElement('img');
        const fullName = `${prophet.name} ${prophet.lastname}`;
        fullNameEl.textContent = fullName;
        portrait.setAttribute('src',prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${fullName}`);
        portrait.setAttribute('loading','lazy');
        portrait.setAttribute('width', '340' );
        portrait.setAttribute('height', '440');

        card.appendChild(fullNameEl);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}
getProphetDataAsync()