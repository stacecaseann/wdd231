const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function createDirectoryCardForGrid(companyData)
{
    return `<div class="grid-item">
    <img src="images/${companyData.image}" width="200" height="100" alt="${companyData.name}">
    <p>${companyData.address}</p>
    <p>${companyData.phoneNumber}</p>
    <a href="${companyData.url}">${companyData.name}</a>
    </div>`;
}
function createDirectoryItemForList(companyData)
{
    return `<tr><td>${companyData.name}</td>
    <td>${companyData.address}</td>
    <td>${companyData.phoneNumber}</td>
    <td><a href="${companyData.url}">${companyData.name}</a></td>
    </tr>`;
}
async function getCompanyData(){
    try
    {
        const response = await fetch("data/members.json");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.error('Unable to load file', error);
    }
}

export async function printCompanyData(filter, directoryElement){
    const companies = await getCompanyData();
    let companiesFiltered = companies;
    if (filter != "ALL")
    {
        companiesFiltered = companies.filter( (company) =>
            company.name.toLowerCase().startsWith(filter.toLowerCase())
        );
    } 
    if (companiesFiltered.length == 0)
    {
        directoryElement.innerHTML = "<p>There are no items returned.</p>"
    }   
    else
    {
        if (directoryElement.classList.contains('list'))
        {
            const companyHtml = companiesFiltered.map( (companyData) => 
            {
                return createDirectoryItemForList(companyData);
            });
            directoryElement.innerHTML = `<table>${companyHtml.join('')}</table>`;
        }
        else if (directoryElement.classList.contains('grid'))
        {
            // console.log(createDirectoryCardForGrid(companiesFiltered[0]));
            const companyHtml = companiesFiltered.map( (companyData) => 
            {
                return createDirectoryCardForGrid(companyData)
            });
            directoryElement.innerHTML = companyHtml.join('');
        }
    }
}

export function createAlphabetDirectory(alphabetElement, directoryElement)
{
    let alphabetHtml = `<table><tr><td colspan="3" class="clear">Clear Filter</td></tr><tr>`;
    alphabet.forEach((item, index) => {
        alphabetHtml += `<td class="alphabetFilter" id="${item}">${item}</td>`;
        if ((index + 1) % 3 === 0)
        {
            alphabetHtml +="</tr><tr>";
        }
    });
    alphabetElement.innerHTML = alphabetHtml;//filter;

    const clearElement = alphabetElement.querySelector(".clear");
    clearElement.addEventListener('click', () => 
        {
            printCompanyData("ALL", directoryElement);
        });

}