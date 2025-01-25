import { setupMenuButton } from './menu.js';
import { createAlphabetDirectory, printCompanyData } from './companyData.js';
import { populateFooterWithDates } from './footer.js';

let directoryElement = document.querySelector(".grid");
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const alphabetElement = document.querySelector(".alphabet");

populateFooterWithDates();
setupMenuButton();
printCompanyData("ALL", directoryElement);
createAlphabetDirectory(alphabetElement);

gridButton.addEventListener('click', () => 
{
    directoryElement.classList.remove('list');
    directoryElement.classList.add('grid');
    printCompanyData("ALL", directoryElement);
});

listButton.addEventListener('click', () => 
    {
        directoryElement.classList.remove('grid');
        directoryElement.classList.add('list');
        printCompanyData("ALL", directoryElement);
    });

const alphabetFilterItems = document.querySelectorAll(".alphabetFilter");
alphabetFilterItems.forEach( (item) => 
    {
        item.addEventListener('click', () => 
        {
            const filterId = item.id;
            printCompanyData(filterId, directoryElement);
        });       
});
