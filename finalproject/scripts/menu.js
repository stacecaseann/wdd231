const items =
[
    { key: "home", url:"index.html", description:"Home"},
    { key: "search", url:"recipe-search.html", description: "Recipe Search"},
    { key: "mealPlan", url:"meal-plan.html", description: "Meal Plan"}
];
export function createNavigation(active)
{
    let html = "<ul>"
    const htmlString = items.map(item => createListItem(item, active));
    html += htmlString.join("");
    html += "</ul>";
    return html;
}

function createListItem(item, active)
{
    const activeClass = item.key == active ? ` class="active"` : "";
    return `<li><a href="${item.url}"${activeClass}>${item.description}</a></li>`;
}
export function setupMenuButton()
{
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector("#animate-me");

    menuButton.addEventListener('click', () => 
    {
        menuButton.classList.toggle('open');
        navigation.classList.toggle('open');
    });

}
