export function setupMenuButton()
{
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector("#animate-me");
    const header = document.querySelector("header");
    menuButton.addEventListener('click', () => 
    {
        menuButton.classList.toggle('open');
        navigation.classList.toggle('open');
    });

}
