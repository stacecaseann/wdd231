import { setupMenuButton, createNavigation } from './menu.js';
import { printMenu, saveMealPlan, loadMealPlan } from './meal-plan.js';
import { populateFooterWithDates } from './footer.js';
import {getFilteredRecipeCards} from './recipe-cards.js';
setupMenuButton();
populateFooterWithDates();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("search");

const recipeCardsElement = document.querySelector("#recipe-cards");

const recipeDialog = document.querySelector("#recipe-card-dialog");
const closeButton = document.querySelector("#recipe-card-dialog button");
closeButton.addEventListener("click", () => recipeDialog.close());

const menuPlanElement = document.querySelector("#menu-plan-content");
const menuPlanDialog = document.querySelector("#menu-plan-dialog");
const menuPlanCloseButton = document.querySelector("#menu-plan-dialog button");
menuPlanCloseButton.addEventListener("click", () => menuPlanDialog.close());


const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", /*async*/() => 
{
    //TODO get filters
    //load recipes
        //const recipeCardsHtml = 
        //TODO do i need async 
        //await getFilteredRecipeCards(recipeCardsElement, recipeDialog);
        getFilteredRecipeCards(recipeCardsElement, recipeDialog,menuPlanElement,menuPlanDialog);

        //recipeCardsElement.innerHTML = recipeCardsHtml;
})



const printMenuButton = document.querySelector("#print-menu-button");

printMenuButton.addEventListener("click", async() => 
{
    //TODO get filters
    //load recipes
        //const recipeCardsHtml = 
        //TODO do i need async 
        printMenu(menuPlanElement, menuPlanDialog);

        //recipeCardsElement.innerHTML = recipeCardsHtml;

})

document.addEventListener("DOMContentLoaded", () => 
{
    loadMealPlan();
    printMenu(menuPlanElement, menuPlanDialog);
});

//TODO Get random
getFilteredRecipeCards(recipeCardsElement, recipeDialog, menuPlanElement, menuPlanDialog);

// document.addEventListener("beforeunload", () => 
// {
//     saveMealPlan();
// })