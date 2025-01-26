const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let cachedData = null;
let cachedFilteredData = null;
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
async function getFilteredCompanyData()
{
    if (cachedFilteredData)
    {
        return cachedFilteredData;
    }
    const companyData = await getCompanyData();
    const filteredData = companyData.filter(
        (data) => data.membershipLevel >= 2
    )
    cachedFilteredData = filteredData;
    return filteredData;
}
async function getCompanyData(){
    if (cachedData){
        return cachedData;
    }
    try
    {
        const response = await fetch("data/members.json");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        cachedData = data;
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

export async function getFilteredCompanyDataCardHtml(companyIndex)
{
    const data = await getFilteredCompanyData();
    if (companyIndex < data.length)//todo, test this
    {
        const companyData = data[companyIndex];
        const html = createCompanyDataCardHtml(companyData);
        return html;
    }
}

function createCompanyDataCardHtml(companyData)
{
    const companyCardHtml = `<div class="business-card">
    <h3>${companyData.name}</h3>
    <p>${companyData.tagLine}</p>
    <div class="line"></div>
    <div class="business-card-details">
        <div class="business-card-column">
            <img src="images/${companyData.icon}" width="75" height="75" alt="${companyData.name} logo">
        </div>
            <div class="business-card-column">
                <p><span class="highlight">EMAIL:</span> ${companyData.email}</p>
                <p><span class="highlight">PHONE:</span> ${companyData.phoneNumber}</p>
                <p><span class="highlight">URL:</span> <a href="${companyData.url}">${companyData.name}</a></p>
            </div>
        </div>
    </div>`
    return companyCardHtml;
}
export async function getFilteredCompanyDataArraySize()
{
    const data = await getFilteredCompanyData();
    return data.length;
}
export async function getIconAttributionsHtml(iconIndexes)
{
    const data = await getFilteredCompanyData();
    const result = iconIndexes.map(index => data[index].iconAttribution);
    console.log("icon attributions" + result);
    const htmlArray = result.map( (attribution) => createAttributionHtml(attribution));

    return htmlArray.join('');
}
function createAttributionHtml(attribution)
{
    return `<p>${attribution}<\p>`;
}