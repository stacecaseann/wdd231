import { setupMenuButton } from './menu.js';
import { populateFooterWithDates } from './footer.js';
import {getMembershipLevelCards} from './memberships.js';

populateFooterWithDates();
setupMenuButton();

const currentTimeElement = document.getElementById("timestamp");
const currentTime = new Date();
currentTimeElement.value = currentTime;

const membershipCardsElement = document.querySelector(".membership-cards");
// const membershipCardHtml = await getMembershipCards();
// membershipCardsElement.innerHTML = membershipCardHtml;

const membershipDialog = document.querySelector("#membership-dialog");
const closeButton = document.querySelector("#membership-dialog button");
closeButton.addEventListener("click", () => membershipDialog.close());

getMembershipLevelCards(membershipCardsElement, membershipDialog);
