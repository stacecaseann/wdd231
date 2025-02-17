//import {getRecipeInformationById, clearCachedRecipes, setCachedRecipes, getCachedRecipes} from './recipeApiFunctions.js';
import {getRecipeInformationById} from './recipeApiFunctions.js';
import { Nutrition, Macros } from './nutrition.js';
export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const mealTypes = ["Breakfast","Lunch", "Dinner", "Snacks"];
import { mealPlanKey } from './constants.js';

//To do add like

class MealPlanDay {
    constructor(day, meals, nutrition){
        this.day = day;
        if (!meals)
        {
            this.meals = {};
        }
        else
        {
            this.meals = meals;
        }
        if (!nutrition)
        {
            this.nutrition = new Nutrition(0,0,0,0);
        }
        else
        {
            this.nutrition = nutrition;
        }
    }
    addMeal(mealType, recipeDetails){
        if (!this.meals[mealType])
        {
            this.meals[mealType] = [];
        }
        if (!this.meals[mealType].includes(recipeDetails.id))
        {
            this.meals[mealType].push(recipeDetails.id);
            this.calculateNutrition(recipeDetails);
        }

    }
    removeMeal(mealType, recipe)
    {
        if (!this.meals[mealType])
        {
            console.log(`No meals are found for ${mealType}`);
            return;
        }
        const index = this.meals[mealType].indexOf(recipe.id);
        if (index !== -1)
        {
            this.meals[mealType].splice(index,1);
            if (this.meals.length === 0)
            {
                this.meals[mealType] = [];
            }
            this.removeNutrition(recipe);
        }
    }
    calculateNutrition(recipeDetails)
    {
        this.nutrition.addNutrition(recipeDetails.nutrition);
    }
    removeNutrition(recipeDetails)
    {
        this.nutrition.removeNutrition(recipeDetails.nutrition);
    }
    displayNutritionChart()
    {
        return this.nutrition.displayMacroChart();
        //calculate the percentage and display
        //maybe put it in a class
    }
}
class MealPlan{
    constructor(){
        // this.mealPlanDays = {
        //     "Monday": new MealPlanDay("Monday"),
        //     "Tuesday": new MealPlanDay("Tuesday"),
        //     "Wednesday": new MealPlanDay("Wednesday"),
        //     "Thursday": new MealPlanDay("Thursday"),
        //     "Friday": new MealPlanDay("Friday"),
        //     "Saturday": new MealPlanDay("Saturday"),
        //     "Sunday": new MealPlanDay("Sunday")
        // }
       this.mealPlanDays = [
            new MealPlanDay("Monday", null, null),
            new MealPlanDay("Tuesday", null, null),
            new MealPlanDay("Wednesday", null, null),
            new MealPlanDay("Thursday", null, null),
            new MealPlanDay("Friday", null, null),
            new MealPlanDay("Saturday", null, null),
            new MealPlanDay("Sunday", null, null)
       ];

    }
    toJson(){
        return JSON.stringify(this.mealPlanDays);
    }

    findDay(dayOfWeek)
    {
        const foundDay = this.mealPlanDays.find(day => day.day == dayOfWeek);
        if (!foundDay)
            console.log(`Day of Week ${dayOfWeek} is not valid`);
        return foundDay;
    }
    saveToLocalStorage(){
        localStorage.setItem(mealPlanKey, this.toJson());
    }

    static loadFromStorage()
    {
        const data = localStorage.getItem(mealPlanKey);
        if (!data) return new MealPlan();

        const jsonData = JSON.parse(data);
        const mealPlan = new MealPlan();
        mealPlan.mealPlanDays = jsonData.map(jsonDay =>
        {
            const nutrition = new Nutrition(
                jsonDay.nutrition.calories,
                jsonDay.nutrition.protein,
                jsonDay.nutrition.fat,
                jsonDay.nutrition.carbs,
                new Macros(
                    jsonDay.nutrition.macros.protein,
                    jsonDay.nutrition.macros.fat,
                    jsonDay.nutrition.macros.carbs
                )
            );
            return new MealPlanDay(jsonDay.day, jsonDay.meals, nutrition);
        }
        );


        return mealPlan;
    }

}

let mealPlanInstance = new MealPlan();

//const mealPlanInstance = new MealPlan();
//TODO For testing


// mealPlanInstance.findDay("Monday").addMeal("Breakfast",716406);
// mealPlanInstance.findDay("Monday").addMeal("Lunch",644387);
// mealPlanInstance.findDay("Monday").addMeal("Dinner",715446);

// mealPlanInstance.findDay("Tuesday").addMeal("Breakfast",782601);
// mealPlanInstance.findDay("Tuesday").addMeal("Lunch",716426);
// mealPlanInstance.findDay("Tuesday").addMeal("Dinner",716004);

// mealPlanInstance.findDay("Wednesday").addMeal("Breakfast",716627);
// mealPlanInstance.findDay("Wednesday").addMeal("Lunch",664147);
// mealPlanInstance.findDay("Wednesday").addMeal("Dinner",640941);

// mealPlanInstance.findDay("Thursday").addMeal("Breakfast",660306);
// mealPlanInstance.findDay("Thursday").addMeal("Lunch",716406);
// mealPlanInstance.findDay("Thursday").addMeal("Dinner",644387);

// mealPlanInstance.findDay("Friday").addMeal("Breakfast",782601);
// mealPlanInstance.findDay("Friday").addMeal("Lunch",716426);
// mealPlanInstance.findDay("Friday").addMeal("Dinner",716004);

// mealPlanInstance.findDay("Saturday").addMeal("Breakfast",716627);
// mealPlanInstance.findDay("Saturday").addMeal("Lunch",664147);
// mealPlanInstance.findDay("Saturday").addMeal("Dinner",640941);

// mealPlanInstance.findDay("Sunday").addMeal("Breakfast",782601);
// mealPlanInstance.findDay("Sunday").addMeal("Lunch",716426);
// mealPlanInstance.findDay("Sunday").addMeal("Dinner",716004);


export function loadMealPlan()
{
    mealPlanInstance = MealPlan.loadFromStorage();
    console.log("Meal plan loaded: ", mealPlanInstance);
}

export function saveMealPlan()
{
    mealPlanInstance.saveToLocalStorage();
    console.log("meal plan saved");
}
let usedRecipes = {};

export async function addMeal(dayOfWeek, mealType, recipeId)
{
    try
    {
        //TODO could cache this so it's available for both dialog and this without 2 calls
        //probably best since calls are limited

        const recipeDetails = await getRecipe(recipeId);


        const mealPlanDay = mealPlanInstance.findDay(dayOfWeek);
        mealPlanDay.addMeal(mealType, recipeDetails);
        addRecipe(recipeDetails);
    }
    catch (error){
        console.log(error);
    }
}
function addRecipe(recipe){
    if (!usedRecipes[recipe.id])
    {
        //This is extra page size in addition to cache, maybe I should get rid of the cache?
        usedRecipes[recipe.id] = recipe;
        console.log(`Recipe added ${recipe.name}`);
    }
}
export async function getRecipe(recipeId)
{
    if (usedRecipes[recipeId])
    {
        return usedRecipes[recipeId];
    }
    else
    {
        const recipe = await getRecipeInformationById(recipeId);
        return recipe;
    }
}

export async function printMenu(menuPlanElement, menuPlanDialog)
{
    const div = await createMenuHtml(menuPlanElement, menuPlanDialog, "meal-plan-cards");

    if (menuPlanElement) {
        menuPlanElement.replaceChildren(div);
    }

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
        saveMealPlan();
        //saveCachedRecipesToCache();
    });

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", async () => {
        mealPlanInstance = new MealPlan();
        //clearCachedRecipes();

        //TODO Clear out recipes?
        saveMealPlan();
        await printMenu(menuPlanElement, menuPlanDialog);
    });

    menuPlanElement.appendChild(saveButton);
    menuPlanElement.appendChild(clearButton);
}
export async function createMenuHtml(menuPlanElement, menuPlanDialog, className)
{
    // const test = document.readyState;
    const div = document.createElement("div");
    div.classList.add(className);
    // Use for...of loop here to work with async/await
    for (const mealPlan of mealPlanInstance.mealPlanDays) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("meal-plan-card");
        const dayOfWeek = document.createElement("p");
        dayOfWeek.textContent = mealPlan.day;
        const cardContentDiv = document.createElement("div");

        cardContentDiv.appendChild(dayOfWeek);
        // dayOfWeekButton.addEventListener("click", () => {
        //     cardContentDiv.classList.toggle("open");
        // });
        //create cards
        console.log(mealPlan.day);
        const table = document.createElement("table");

        for (const mealType of mealTypes) {
            console.log(mealType);
            //TODO move colspan to css

            if (mealPlan.meals[mealType] && mealPlan.meals[mealType].length !== 0) {
                const meals = mealPlan.meals[mealType];

                const tr = document.createElement("tr");
                // const tdEmpty = document.createElement("td");
                const tdMealType = document.createElement("td");
                tdMealType.colSpan = 2;
                tdMealType.textContent = mealType;
                // tr.appendChild(tdEmpty);
                tr.appendChild(tdMealType);
                table.appendChild(tr);

                for (const mealId of meals) {
                    const tr = document.createElement("tr");
                    const tdRecipe = document.createElement("td");
                    const recipe = await getRecipe(mealId);  // Asynchronously fetch the recipe
                    // tr.appendChild(document.createElement("td"));
                    // tr.appendChild(document.createElement("td"));
                    //TODO make a link or open modal
                    const spanElement = document.createElement("span");
                    spanElement.classList.add("link-text");
                    spanElement.addEventListener("click", () => showRecipeDialog(recipe, menuPlanDialog));
                    spanElement.textContent = recipe.name;
                    tdRecipe.appendChild(spanElement);

                    tr.appendChild(tdRecipe);
                    //Delete button
                    // tr.appendChild(document.createElement("td"));
                    //TODO make a link or open modal
                    const tdDelete = document.createElement("td");

                    const deleteSpanElement = document.createElement("span");
                    deleteSpanElement.classList.add("link-text");
                    deleteSpanElement.addEventListener("click", async () =>
                    {
                        mealPlan.removeMeal(mealType,recipe);
                        await printMenu(menuPlanElement, menuPlanDialog);
                    });
                    deleteSpanElement.textContent = "X";
                    deleteSpanElement.className = "highlight";
                    tdDelete.appendChild(deleteSpanElement);

                    tr.appendChild(tdDelete);

                    table.appendChild(tr);
                    console.log(recipe.name);
                }
            } 
            else 
            {
                const tr = document.createElement("tr");
                // const tdPlaceHolder = document.createElement("td");
                const tdMealType = document.createElement("td");
                tdMealType.colSpan = 2;
                tdMealType.textContent = mealType;
                // tr.appendChild(tdPlaceHolder);
                tr.appendChild(tdMealType);
                table.appendChild(tr);
                const trEmpty = document.createElement("tr");
                const tdEmpty = document.createElement("td");
                tdEmpty.innerHTML = "&nbsp;";
                tdEmpty.colSpan = 3;
                trEmpty.appendChild(tdEmpty);
                table.appendChild(trEmpty);
            }
        }

        cardContentDiv.appendChild(table);
        const macroChart = mealPlan.displayNutritionChart();
        cardContentDiv.appendChild(macroChart);

        cardDiv.appendChild(cardContentDiv);

        div.appendChild(cardDiv);

    }
    return div;
}

export async function printShoppingList()
{
    const shoppingListElement = document.createElement("div");
    //shoppingListElement.
}
//TODO this is duplicate of recipe-cards showRecipeDialog
function showRecipeDialog(recipe, menuDialog)
{
    try{
        const title = menuDialog.querySelector("h2");
        title.textContent = recipe.name;
        let divElement = document.querySelector("#recipe-for-menu");
        const recipeHtml = recipe.createFullRecipeDetailsHtml(false);
        divElement.className="full-recipe";
        divElement.innerHTML = recipeHtml;
        menuDialog.showModal();
    }catch(error){
        console.log(error);
    }
}

