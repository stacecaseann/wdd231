import { setupMenuButton, createNavigation } from './menu.js';
import { populateFooterWithDates } from './footer.js';

setupMenuButton();
populateFooterWithDates();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("home");