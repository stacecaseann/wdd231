import { Recipe } from "./recipes.js";

const apiKey = "b0e4337af9msh58c47d67545d9f4p1d2fa4jsnb47ad5943664";
const apiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

const cachedRecipes = [];
async function fetchData(url)
{
    try 
    {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': apiHost, // Example for an authorization token
                'x-rapidapi-key': apiKey // Add any other custom headers you need        
            }
        });
        if (response.ok)
        {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}
/* Use this basic for testing */
export async function getRecipesForTesting()
{
    const response = await fetch("data/sampleRecipes.json");
    return response.json();
}
export async function getRecipeInformationById(recipeId)
{
    //Don't add a cache here as I have it before this is called
    const response = await fetch("data/sampleRecipeDetails.json");
    const json = await response.json();

    const recipeDetails = json.find(recipe => recipe.id == recipeId);
    const recipe = new Recipe(recipeDetails.id, recipeDetails.title, recipeDetails);
    return recipe;
} 
export async function getRecipesForTestingOLD(
)
{
    //TODO STORE the offset for when they request more recipes
    const addRecipeInstructions = true;
    const addRecipeNutrition = true;
    const fillIngredients = false;
    const addRecipeInformation=false;
    const instructionsRequired=false;
    const number = 10;
    const offset = 1;
    const queryParams =  new URLSearchParams({
        addRecipeInstructions, instructionsRequired, addRecipeInformation,fillIngredients, addRecipeNutrition, number, offset
//        cuisine,
//        excludeCuisine,
//         diet,
//         intolerances,
//    includeIngredients,
//    excludeIngredients,
//     type,
//     addRecipeInstructions,
//         addRecipeNutrition,
//         titleMatch,maxReadyTime,
//         sort,
//        minCalories, maxCalories,minCarbs, maxCarbs, 
//        minFat, maxFat,minProtein, maxProtein, 
//        minSugar,maxSugar,minFiber,maxFiber, 
//        number, offset
   });
//TODO add try catch
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
        const data = await fetchData(url);
        console.log(data);
        cachedRecipes[recipeId] = data;
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}
/*
This function returns recipes by category and overall search criteria
query: string (required)
 recipe search
cuisine: string (optional)
The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
excludeCuisine: string (opt)
diet: string (optional)
pescetarian, lacto vegetarian, ovo vegetarian, vegan, paleo, primal, and vegetarian.
intolerances: (optional)
dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
includeIngredients: sting (opt)
An comma-separated list of ingredients that must not be contained in the recipes.
type: string (opt)
The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
addRecipeInstructions: bool (opt)
If set to true, you get analyzed instructions for each recipe returned.
addRecipeNutrition: bool (opt)
If set to true, you get nutritional information about each recipes returned.
titleMatch: string (opt)
A string that the recipes must contain in their titles.
maxReadyTime: int (opt) default 45
The maximum time in minutes it should take to prepare and cook the recipe.
sort
max-used-ingredients is default, other options 
meta-score,popularity, healthiness, price, time, random, 
then all nutrition also
offset,
number
*/
//todo handle null values
export async function getRecipes(
    query,
     cuisine,
     excludeCuisine,
     intolerances,
          includeIngredients,
          excludeIngredients,

     //    // diet,

//     type,
     addRecipeInstructions,
   addRecipeNutrition,
//    titleMatch,
//    maxReadyTime,
    sort,
//    minCalories, 
//    maxCalories,
//    minCarbs, 
//    maxCarbs, 
//    minFat, 
//    maxFat,
//    minProtein, 
//    maxProtein, 
//    minSugar,
//    maxSugar,
//    minFiber,
//    maxFiber,
   number,
   offset
)
{
    const queryParams =  new URLSearchParams({
        query,
     //   cuisine,
     //   excludeCuisine,
        //diet,
        // intolerances,
   // includeIngredients,
   // excludeIngredients,
    //type,
    addRecipeInstructions,
        addRecipeNutrition,
        //titleMatch,maxReadyTime,
        sort,
    //    minCalories, maxCalories,minCarbs, maxCarbs, 
    //    minFat, maxFat,minProtein, maxProtein, 
    //    minSugar,maxSugar,minFiber,maxFiber, 
       number, offset
    });
    const url = `${baseUrl}/recipes/complexSearch?${queryParams}`;
    const data = await fetchData(url);
    return data;
}

/*
This function returns recipes by ingredeients
ingredients: comma separated list of ingredients
    apples,flour,sugar
number: int
    number of ingredients to return, optional
ignorePantry: True or False
    whether to include pantry ingredients, like water, salt, flour
ranking: number
    Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
example:
https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1"
*/
export async function getRecipesByIngredients(
    ingredients, 
    number=10, 
    ignorePantry=true, 
    ranking=1)
{
    const ingString = ingredients.join(','); 
    const url = `${baseUrl}/recipes/findByIngredients?ingredients=${ingString}&number=${number}&ignorePantry=${ignorePantry}&ranking=${ranking}`;
    const data = await fetchData(url);
    return data;
}

/*
Get recipes by nutritional values

minCarbs: number
maxCarbs
minCalories
maxCalories: number
minFat
maxFat: number

minProtein:
maxProtein: The maximum number of protein in grams the recipe can have.
minFiber: number
maxFiber
minSugar
maxSugar
random: true/false
    gives random recipes
offset: The offset number for paging in the interval [0,990].
number: 
The number of expected results in the interval [1,10].

/findByNutrients?minProtein=0&minVitaminC=0&minSelenium=0&maxFluoride=50&maxVitaminB5=50&maxVitaminB3=50&maxIodine=50&minCarbs=0&maxCalories=250&minAlcohol=0&maxCopper=50&maxCholine=50&maxVitaminB6=50&minIron=0&maxManganese=50&minSodium=0&minSugar=0&maxFat=20&minCholine=0&maxVitaminC=50&maxVitaminB2=50&minVitaminB12=0&maxFolicAcid=50&minZinc=0&offset=0&maxProtein=100&minCalories=0&minCaffeine=0&minVitaminD=0&maxVitaminE=50&minVitaminB2=0&minFiber=0&minFolate=0&minManganese=0&maxPotassium=50&maxSugar=50&maxCaffeine=50&maxCholesterol=50&maxSaturatedFat=50&minVitaminB3=0&maxFiber=50&maxPhosphorus=50&minPotassium=0&maxSelenium=50&maxCarbs=100&minCalcium=0&minCholesterol=0&minFluoride=0&maxVitaminD=50&maxVitaminB12=50&minIodine=0&maxZinc=50&minSaturatedFat=0&minVitaminB1=0&maxFolate=50&minFolicAcid=0&maxMagnesium=50&minVitaminK=0&maxSodium=50&maxAlcohol=50&maxCalcium=50&maxVitaminA=50&maxVitaminK=50&minVitaminB5=0&maxIron=50&minCopper=0&maxVitaminB1=50&number=10&minVitaminA=0&minPhosphorus=0&minVitaminB6=0&minFat=5&minVitaminE=0
*/
//TODO make functions that require less parameters then call this one with all the parameters
export async function getRecipesByNutrition(
    minCalories, 
    maxCalories,
    minCarbs, 
    maxCarbs, 
    minFat, 
    maxFat,
    minProtein, 
    maxProtein, 
    minSugar,
    maxSugar,
    minFiber,
    maxFiber,
    offset,
    number
)
{
    const queryParams =  new URLSearchParams({
        minCalories, maxCalories, minCarbs, maxCarbs, minFat, maxFat, minProtein, maxProtein,
        minSugar, maxSugar, minFiber, maxFiber,offset,number}).toString();
    const url = `${baseUrl}/recipes/findByNutrients?${queryParams}`;
    const data = await fetchData(url);
    return data;
}

/*
Get recipes by nutritional values

minCarbs: number
maxCarbs
minCalories
maxCalories: number
minFat
maxFat: number

minProtein:
maxProtein: The maximum number of protein in grams the recipe can have.
minFiber: number
maxFiber
minSugar
maxSugar
random: true/false
    gives random recipes
offset: The offset number for paging in the interval [0,990].
number: 
The number of expected results in the interval [1,10].

/findByNutrients?minProtein=0&minVitaminC=0&minSelenium=0&maxFluoride=50&maxVitaminB5=50&maxVitaminB3=50&maxIodine=50&minCarbs=0&maxCalories=250&minAlcohol=0&maxCopper=50&maxCholine=50&maxVitaminB6=50&minIron=0&maxManganese=50&minSodium=0&minSugar=0&maxFat=20&minCholine=0&maxVitaminC=50&maxVitaminB2=50&minVitaminB12=0&maxFolicAcid=50&minZinc=0&offset=0&maxProtein=100&minCalories=0&minCaffeine=0&minVitaminD=0&maxVitaminE=50&minVitaminB2=0&minFiber=0&minFolate=0&minManganese=0&maxPotassium=50&maxSugar=50&maxCaffeine=50&maxCholesterol=50&maxSaturatedFat=50&minVitaminB3=0&maxFiber=50&maxPhosphorus=50&minPotassium=0&maxSelenium=50&maxCarbs=100&minCalcium=0&minCholesterol=0&minFluoride=0&maxVitaminD=50&maxVitaminB12=50&minIodine=0&maxZinc=50&minSaturatedFat=0&minVitaminB1=0&maxFolate=50&minFolicAcid=0&maxMagnesium=50&minVitaminK=0&maxSodium=50&maxAlcohol=50&maxCalcium=50&maxVitaminA=50&maxVitaminK=50&minVitaminB5=0&maxIron=50&minCopper=0&maxVitaminB1=50&number=10&minVitaminA=0&minPhosphorus=0&minVitaminB6=0&minFat=5&minVitaminE=0
*/
//TODO make functions that require less parameters then call this one with all the parameters
export async function getRecipeInformationByIdOLD2(
    recipeId
)
{
    const includeNutrition=true;
    const queryParams =  new URLSearchParams({
        includeNutrition}).toString();
    const url = `${baseUrl}/recipes/${recipeId}/information?${queryParams}`;
    const data = await fetchData(url);
    return data;
}