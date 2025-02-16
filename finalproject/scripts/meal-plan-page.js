import { setupMenuButton, createNavigation } from './menu.js';
import { printMenu, loadMealPlan } from './meal-plan.js';
import { populateFooterWithDates } from './footer.js';

setupMenuButton();
populateFooterWithDates();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("mealPlan");


document.addEventListener("DOMContentLoaded", () => 
{
    loadMealPlan();
    printMenu(menuPlanElement, menuPlanDialog);
});

