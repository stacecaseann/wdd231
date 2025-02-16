import {getRecipes, getRecipesFromFile} from './recipeApiFunctions.js';
import { daysOfWeek, addMeal, mealTypes, printMenu } from './meal-plan.js';

import { getRecipe } from './meal-plan.js';

export async function getRecipeCardsFromFile(recipeCardsElement, recipeDialog, menuPlanElement, menuPlanDialog)
{
    try{
        const recipesData = await getRecipesFromFile();
        recipesData.forEach( (recipe) => 
        {
            const div = createRecipeCard(recipe, recipeDialog,menuPlanElement, menuPlanDialog);
            recipeCardsElement.appendChild(div);
        })
    }catch(error){
        console.error("Error getting recipes: ", error);
    }    
}
export async function getFilteredRecipeCards(searchCriteria,increaseOffset,recipeCardsElement, recipeDialog, menuPlanElement, menuPlanDialog)
{
    try{
        const recipesData = await getRecipes(searchCriteria,increaseOffset);
        recipesData.forEach( (recipe) => 
        {
            const div = createRecipeCard(recipe, recipeDialog,menuPlanElement, menuPlanDialog);
            recipeCardsElement.appendChild(div);
        })
    }catch(error){
        console.error("Error getting recipes: ", error);
    }
}

function createRecipeCard(recipe, recipeDialog, menuPlanElement, menuPlanDialog)
{
    let div = document.createElement("div");
    div.className = "recipe-card";
    const recipeHtml = getRecipeHtml(recipe);
    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.addEventListener("click", () => showRecipeDialog(recipe, recipeDialog));
    
    //Create small form to insert recipe
    //TODO add drop down of meals and days
    const form = document.createElement("form");
    form.id = recipe.id;
    const selectDay = createDropDown(daysOfWeek, "dayOfWeek");
    const label = document.createElement("label");
    label.textContent = "Day of Week";
    label.setAttribute("for", "dayOfWeek");
    form.appendChild(selectDay);
    
    const selectMealType = createDropDown(mealTypes, "mealType");
    const mealTypeLabel = document.createElement("label");
    mealTypeLabel.textContent = "Meal";
    mealTypeLabel.setAttribute("for", "mealType");
    form.appendChild(selectMealType);

    const addMealButton = document.createElement("button");
    addMealButton.textContent = "Add to Menu";
    addMealButton.type = "button";
    addMealButton.id = "addMealButton";
    addMealButton.addEventListener("click", async () => {
        const selectedDay = selectDay.value;
        const selectedMealType = selectMealType.value;
        await addMeal(selectedDay, selectedMealType, recipe.id);
        await printMenu (menuPlanElement, menuPlanDialog);
    });
    form.appendChild(addMealButton);
    
    div.innerHTML = recipeHtml;
    //TODO Store id in the background
    div.appendChild(form);
    div.appendChild(button);
    return div;
}
function createDropDown(options, id)
{
    const select = document.createElement("select");
    select.id = id;
    options.forEach( optionValue => 
    {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
    });
    return select;
}
function getRecipeHtml(recipe)
{
    return `<h3>${recipe.title}</h3>
    <img src="${recipe.image}" alt="${recipe.title}" loading="lazy" width="200" height="100">
    `;
}

async function showRecipeDialog(recipe, recipeDialog)
{
    try{
        const recipeDetails = await getRecipe(recipe.id);//This calls the api to get the recipe if it doesn't exist
        console.log(recipeDetails);
        const title = recipeDialog.querySelector("h2");
        title.textContent = recipe.title;
        let divElement = document.querySelector("#recipe");
        const recipeHtml = recipeDetails.createFullRecipeDetailsHtml(false);
        divElement.className="full-recipe";
        divElement.innerHTML = recipeHtml;
        recipeDialog.showModal();
    }catch(error){
        console.log(error);
    }
}

