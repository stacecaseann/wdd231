import {createDiscoverCards} from './places.js'
import { getLastVisitedTimeMessage } from './localStorage.js';
import { setupMenuButton } from './menu.js';
import { populateFooterWithDates } from './footer.js';

populateFooterWithDates();
setupMenuButton();

const displayCards = document.querySelector("#display-cards");
const displayDialog = document.querySelector("#display-dialog");
const closeButton = document.querySelector("#display-dialog button");
closeButton.addEventListener("click", () => displayDialog.close());

createDiscoverCards(displayCards, displayDialog);

const lastDateElement = document.querySelector("#welcome-back");
const lastDateMessage = getLastVisitedTimeMessage();
lastDateElement.textContent = lastDateMessage;

