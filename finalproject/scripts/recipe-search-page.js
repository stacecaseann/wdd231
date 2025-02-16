import { setupMenuButton, createNavigation } from './menu.js';
import { printMenu, loadMealPlan } from './meal-plan.js';
import { populateFooterWithDates } from './footer.js';
import {getFilteredRecipeCards,getRecipeCardsFromFile} from './recipe-cards.js';

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
        //TODO could create a filter class
        let searchCriteria = getSearchCriteria();
        
        recipeCardsElement.replaceChildren();
        getFilteredRecipeCards(searchCriteria,false,recipeCardsElement, recipeDialog,menuPlanElement,menuPlanDialog);

        //recipeCardsElement.innerHTML = recipeCardsHtml;
})

function getSearchCriteria()
{
    let searchCriteria = {};
    let mealTypeSelected = "";
    let ingredient = "";
    const mealTypeSelectedElement = document.querySelector('input[name="mealType"]:checked');

    const ingredientElement = document.getElementById("ingredient");
    if (mealTypeSelectedElement)
    {
        if (mealTypeSelectedElement.value != "any")
            mealTypeSelected = mealTypeSelectedElement.value;
    }
    if (ingredientElement)
        ingredient = ingredientElement.value;
    searchCriteria.ingredient = ingredient;
    searchCriteria.mealType = mealTypeSelected;
    return searchCriteria;
}

const printMenuButton = document.querySelector("#print-menu-button");

printMenuButton.addEventListener("click", async() => 
{
    //TODO get filters
    //load recipes
        //const recipeCardsHtml = 
        //TODO do i need async 
        await printMenu(menuPlanElement, menuPlanDialog);

        //recipeCardsElement.innerHTML = recipeCardsHtml;

})

document.addEventListener("DOMContentLoaded", () => 
{
    loadMealPlan();
    // loadCachedRecipes();
    printMenu(menuPlanElement, menuPlanDialog);
});

//TODO Get random
getRecipeCardsFromFile(recipeCardsElement, recipeDialog, menuPlanElement, menuPlanDialog);

const loadMoreButton = document.querySelector("#load-more");
loadMoreButton.addEventListener("click", () => 
{
    recipeCardsElement.replaceChildren();
    getFilteredRecipeCards( getSearchCriteria(),true,recipeCardsElement, recipeDialog, menuPlanElement, menuPlanDialog)
}
);

// document.addEventListener("beforeunload", () => 
// {
//     saveMealPlan();
// })