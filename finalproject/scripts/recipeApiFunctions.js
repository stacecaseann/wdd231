import { Recipe } from "./recipes.js";
let currentOffset = 0;
let numberRetrieved = 10;
const apiKey = "b0e4337af9msh58c47d67545d9f4p1d2fa4jsnb47ad5943664";
const apiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

//TODO Can't get this to save to local storage
let cachedRecipes = [];
// export function saveCachedRecipesToCache()
// {
    
//     localStorage.setItem(cachedRecipesKey, JSON.stringify(cachedRecipes));
// }
// export function loadCachedRecipes()
// {
//     const cachedRecipesFromLocal = JSON.parse(localStorage.getItem("recipes"));
//     if (cachedRecipesFromLocal)
//     {
//         cachedRecipes = cachedRecipesFromLocal;
//     }
// }
// export function clearCachedRecipes()
// {
//     cachedRecipes = [];
//     saveCachedRecipesToCache();
// }

async function fetchData(url)
{
    // try 
    // {
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-rapidapi-host': apiHost, // Example for an authorization token
    //             'x-rapidapi-key': apiKey // Add any other custom headers you need        
    //         }
    //     });
    //     if (response.ok)
    //     {
    //         const data = await response.json();
    //         console.log(data);
    //         return data;
    //     }
    // }
    // catch(error)
    // {
    //     console.log(error);
    // }
}
/* Use this basic for testing */
export async function getRecipesFromFile()
{
    const response = await fetch("data/sampleRecipes.json");
    return response.json();
}

//TODO Switch back
export async function getRecipes()
{
    const response = await fetch("data/sampleRecipes.json");
    return response.json();
}

export async function getRecipeInformationById(recipeId)
{
    if (cachedRecipes[recipeId])
        return cachedRecipes[recipeId];
    
    //Don't add a cache here as I have it before this is called
    const response = await fetch("data/sampleRecipeDetails.json");
    const json = await response.json();

    const recipeDetails = json.find(recipe => recipe.id == recipeId);
    const recipe = new Recipe(recipeDetails.id, recipeDetails.title, recipeDetails);
    cachedRecipes[recipeId] = recipe;
    return recipe;
} 
export async function getRecipesForTestingOLD(
    searchCriteria,
    increaseOffset
)
{
    if (increaseOffset)
    {
        currentOffset +=numberRetrieved;
    }
    else
    {
        currentOffset = 0;
    }

    const addRecipeInstructions = false
    const addRecipeNutrition = false;
    const fillIngredients = false;
    const addRecipeInformation=false;
    const instructionsRequired=false;
    const number = numberRetrieved;
    const offset = currentOffset;
    const includeIngredients = searchCriteria.ingredient;
    const mealType = searchCriteria.mealType;

    let queryParams =  new URLSearchParams({
        addRecipeInstructions, instructionsRequired, 
        addRecipeInformation,fillIngredients, addRecipeNutrition, 
        number, offset   });
    if (includeIngredients && mealType)
    {
        const type = getMealType(mealType);
        queryParams =  new URLSearchParams({
            addRecipeInstructions, instructionsRequired, 
            addRecipeInformation,fillIngredients, addRecipeNutrition, 
            includeIngredients,
            type,
            number, offset   }); 
    }
    else if (includeIngredients && !mealType)
    {
        queryParams =  new URLSearchParams({
            addRecipeInstructions, instructionsRequired, 
            addRecipeInformation,fillIngredients, addRecipeNutrition, 
            includeIngredients,
            number, offset   }); 
    }
    else if (!includeIngredients && mealType)
    {
        const type = getMealType(mealType);
        queryParams =  new URLSearchParams({
            addRecipeInstructions, instructionsRequired, 
            addRecipeInformation,fillIngredients, addRecipeNutrition, 
            type,
            number, offset   }); 
    }
    const url = `${baseUrl}/recipes/complexSearch?${queryParams}`;
    console.log(url);
    const data = await fetchData(url);
    console.log(data);
    return data.results;
}

export async function getRecipeInformationByIdOLD(
    recipeId
)
{
    if (cachedRecipes[recipeId])
    {
        return cachedRecipes[recipeId];
    }
    try
    {
        const includeNutrition=true;
        const queryParams =  new URLSearchParams({
            includeNutrition}).toString();
        const url = `${baseUrl}/recipes/${recipeId}/information?${queryParams}`;
        const recipeDetails = await fetchData(url);
        console.log(recipeDetails);
        const recipe = new Recipe(recipeDetails.id, recipeDetails.title, recipeDetails);
        cachedRecipes[recipeId] = recipe;
        return recipe;
    }
    catch(error)
    {
        console.log(error);
    }
}

function getMealType(mealType)
{
    if (mealType === "sideDish")
        return "side dish";
    if (mealType === "mainCourse")
        return "main course";
    return mealType;
}