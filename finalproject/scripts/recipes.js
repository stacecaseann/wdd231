import { Nutrition } from "./nutrition.js";

export class Recipe{
    constructor(id, name, json){
        this.id = id;
        this.name = name;
        //this.json = json;
        this.protein = 0;
        this.carbs = 0;
        this.fat = 0;
        this.nutrition = this.setNutrition(json);
        this.ingredients = this.setIngredients(json);
        this.instructions = this.setInstructions(json);
        this.image = json.image;
        this.rating = this.setRating(json);
        this.readyInMinutes = json.readyInMinutes;
        this.servings = json.servings;
        this.summary = json.summary;
    }
    setRating(json)
    {
        let number = parseFloat(json.spoonacularScore ?? 0).toFixed(2);
        return Math.round(number * 100)/100;
    }
    setIngredients(json)
    {
        const ingredients = json.extendedIngredients.map(ingredient => {
            const id = ingredient.id;
            const aisle = ingredient.aisle;
            const name = ingredient.name;
            const description = ingredient.original;
            const amount = ingredient.amount;
            const unit = ingredient.unit;
            return new Ingredient(id, name, description, amount, unit, aisle);
        });
        return [...ingredients];
    }
    setNutrition(json)
    {
       const calories = json.nutrition.nutrients.find( (nutrient) => nutrient.name == "Calories")?.amount ?? 0;
       const protein = json.nutrition.nutrients.find( (nutrient) => nutrient.name == "Protein")?.amount ?? 0;
       const fat = json.nutrition.nutrients.find( (nutrient) => nutrient.name == "Fat")?.amount ?? 0;
       const carbs = json.nutrition.nutrients.find( (nutrient) => nutrient.name == "Carbohydrates")?.amount ?? 0;
    
       return new Nutrition(calories, protein, fat, carbs);    
    }
    setInstructions(json)
    {
        const instructions = json.analyzedInstructions[0].steps.map(instruction => {
            const number = instruction.number;
            const step = instruction.step;
            return new Instructions(number, step);
        });
        return [...instructions];
    }
    createFullRecipeDetailsHtml(includeTitle)
    {    
        let recipeHtml = "";
        if (includeTitle)
        {
            recipeHtml += `<h2>${this.name}</h2`;
        }
        recipeHtml += "<table>";
        recipeHtml += `<tr><th>Ready in:</th><td>${this.readyInMinutes}</td></tr>`;
        recipeHtml += `<tr><th>Serves:</th><td>${this.servings}</td></tr>`;
        recipeHtml +=  `</table>`;
        recipeHtml += `<p>Summary: ${this.summary}</p>`;
        recipeHtml += `<ul>`;
        const ingredientHtml = this.ingredients.map( (ingredient) => {
            return `<li>${ingredient.description}</li>`;
        });
        recipeHtml += ingredientHtml.join("");
        recipeHtml += `</ul>`;
        
        recipeHtml += `<ol>`;
        const instructionsHtml = this.instructions.map( (instruction) => {
            return `<li>${instruction.step}</li>`;
        });
        recipeHtml += instructionsHtml.join("");
        recipeHtml += `</ol>`;

        return recipeHtml;
    }

}
//This uses the recipeDetails from getRecipeById


class Ingredient{
    constructor(id,name, description,amount, unit,aisle){
        this.id = id;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.unit = unit;
        this.aisle = aisle;
    }
}

class Instructions{
    constructor(number, step)
    {
        this.number = number;
        this.step = step;
    }
}