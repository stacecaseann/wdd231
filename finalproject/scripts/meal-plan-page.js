import { setupMenuButton, createNavigation } from './menu.js';
import { loadMealPlan, createMenuHtml } from './meal-plan.js';
import { populateFooterWithDates } from './footer.js';

setupMenuButton();
populateFooterWithDates();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("mealPlan");

const menuPlanElement = document.querySelector("#menu-plan-content");
const menuPlanDialog = document.querySelector("#menu-plan-dialog");

document.addEventListener("DOMContentLoaded", async () => 
{
    loadMealPlan();
    const div = await createMenuHtml(menuPlanElement, menuPlanDialog, "meal-plan-cards-display");
    menuPlanElement.replaceChildren(div);
});

