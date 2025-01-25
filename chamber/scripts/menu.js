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
