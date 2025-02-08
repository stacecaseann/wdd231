export const places = 
[
    {
        "name": "Sri Sri Radha Krishna Temple",
        "address": "311 West 8500 South, Spanish Fork, UT 84660",
        "description": "This Hare Krishna temple is renowned for its stunning architecture and vibrant cultural events, including the annual Festival of Colors.",
        "image": "temple.webp",
         "url":"https://www.utahkrishnas.org/"
      },
      {
        "name": "Spanish Fork River Trail",
        "address": "1100 East and 4200 South, Spanish Fork, UT 84660",
        "description": "A scenic trail ideal for biking, walking, and running, meandering alongside the Spanish Fork River and offering picturesque views.",
        "image": "sfrivertrail.webp",
        "url":"https://www.alltrails.com/trail/us/utah/spanish-fork-river-trail--2"
      },
      {
        "name": "Canyon View Park",
        "address": "3300 East Powerhouse Road, Spanish Fork, UT 84660",
        "description": "A well-maintained park featuring playgrounds, sand volleyball courts, walking trails, and a pond, making it a perfect spot for family outings.",
        "image": "canyon-view.webp",
        "url":"https://www.tripadvisor.com/Attraction_Review-g57134-d13136791-Reviews-Canyon_View_Park-Spanish_Fork_Utah.html"        
      },
      {
        "name": "Spanish Oaks Reservoir",
        "address": "2931 South Spanish Oaks Drive, Spanish Fork, UT 84660",
        "description": "A popular local spot for fishing, swimming, and picnicking, surrounded by beautiful scenery and equipped with sandy beaches.",
        "image": "reservoir.webp",
        "url":"https://dyeclan.com/outdooractivities/paddling/?page=spanish-oaks-reservoir"        
      },
      {
        "name": "Dripping Rock Falls",
        "address": "2900 East Powerhouse Road, Spanish Fork, UT 84660",
        "description": "A serene waterfall accessible via a short hike, offering a tranquil setting and a refreshing spot to visit, especially during warmer months.",
        "image": "drippingrock.webp",
        "url":"https://www.utahsadventurefamily.com/dripping-rock-trail/"        
      },
      {
        "name": "Maple Mountain (Spanish Fork Peak)",
        "address": "Trailhead near 1200 East Powerhouse Road, Spanish Fork, UT 84660",
        "description": "A challenging hike leading to the summit of Spanish Fork Peak, rewarding adventurers with panoramic views of Utah Valley.",
        "image": "escalante.webp",
        "url":"https://www.utahsadventurefamily.com/escalante-cross-spanish-fork/"        
      },
      {
        "name": "Dream Mine",
        "address": "3 miles northeast of Spanish Fork, UT",
        "description": "Also known as the Relief Mine, this historical site is linked to local legends and offers insight into early 20th-century mining endeavors.",
        "image": "dream-mine.webp",
        "url":"https://www.atlasobscura.com/places/dream-mine"        
      },
      {
        "name": "Red Cliffs Recreation Area",
        "address": "Leeds, UT 84746",
        "description": "A scenic area with stunning red rock formations, hiking trails, and opportunities for rock climbing and photography.",
        "image": "red-cliffs.webp",
        "url":"https://www.utahsadventurefamily.com/red-ledges-picnic-area/"        
      },
      {
        "name": "Fifth Water Hot Springs",
        "address": "Diamond Fork Canyon, Spanish Fork, UT 84660",
        "description": "A beautiful hike leading to a series of natural hot springs with cascading waterfalls, popular for soaking and relaxation.",
        "image": "fifth-water.webp",
        "url":"https://www.alltrails.com/trail/us/utah/fifth-water-hot-springs-trail"        
      },
      {
        "name": "Devil's Kitchen",
        "address": "Nebo Loop Road, near Payson, UT 84651",
        "description": "A unique geological area featuring striking red rock formations, often referred to as a mini-Bryce Canyon.",
        "image": "devils-kitchen.webp",
        "url":"https://www.utah.com/destinations/cities-towns/provo/hiking/devils-kitchen/"        
      }
];
  
  
export function createDiscoverCards(placesElement, discoverDialog)
{
    const data = places;
    data.forEach( (place) => 
    {
        const div = createDiscoverCard(place, discoverDialog)
        placesElement.appendChild(div);
    }
    );
}

function createDiscoverCard(place, discoverDialog)
{
    let div = document.createElement("div");
    div.className = "display-card";
    const header = document.createElement("h3");
    header.textContent = place.name;
    const image = document.createElement("img");
    
    image.loading = "lazy";
    image.src = `images/${place.image}`;
    image.alt = `${place.name}`;
    image.height = "150";
    image.width = "200";
    const description = document.createElement("p");
    description.textContent = place.description;
    const address = document.createElement("address");
    address.textContent = place.address;
    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.addEventListener("click", () => showDiscoverDialog(place, discoverDialog));
    div.appendChild(header);
    div.appendChild(image);
    div.appendChild(description);
    div.appendChild(address);
    div.appendChild(button);
    return div;
}

function showDiscoverDialog(place, discoverDialog)
{
    const title = discoverDialog.querySelector("h2");
    title.textContent = place.name;
    const info = discoverDialog.querySelector("p");
    info.textContent = place.description;
    discoverDialog.showModal();
}