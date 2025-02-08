import {createDiscoverCards} from './places.js'
import { getLastVisitedTimeMessage, clearLastDate } from './localStorage.js';

const displayCards = document.querySelector("#display-cards");
const displayDialog = document.querySelector("#display-dialog");
const closeButton = document.querySelector("#display-dialog button");
closeButton.addEventListener("click", () => displayDialog.close());

createDiscoverCards(displayCards, displayDialog);

// clearLastDate();
const lastDateElement = document.querySelector("#welcome-back");
const lastDateMessage = getLastVisitedTimeMessage();
lastDateElement.textContent = lastDateMessage;

