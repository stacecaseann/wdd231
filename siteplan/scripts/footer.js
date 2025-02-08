export function populateFooterWithDates()
{
    const yearSpan = document.querySelector(".year")
    const date = new Date();
    const year = date.getFullYear();
    yearSpan.textContent = year;

    const lastModified = document.getElementById("lastModified");
    lastModified.innerHTML = `Last Modified: ${document.lastModified}`
}
