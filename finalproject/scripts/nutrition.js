import { getCalorieTargetFromLocalStorage } from "./calorie-calculator.js";
import { calorieGoalKey } from "./constants.js";
export class Nutrition
{
    constructor(calories, protein, fat, carbs, macros)
    {
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.macros = macros ? new Macros(macros.protein, macros.fat, macros.carbs) : new Macros(0, 0, 0);
    }
    addNutrition(nutrition)
    {
        this.calories += nutrition.calories;
        this.protein += nutrition.protein;
        this.fat += nutrition.fat;
        this.carbs += nutrition.carbs;
        this.calculateMacros();
    }
    removeNutrition(nutrition)
    {
        this.calories -= nutrition.calories;
        this.protein -= nutrition.protein;
        this.fat -= nutrition.fat;
        this.carbs -= nutrition.carbs;
        this.calculateMacros();
    }
    calculateMacros()
    {
        const caloriesFromProtein = this.protein * 4;
        const caloriesFromFat = this.fat * 9;
        const caloriesFromCarbs = this.carbs * 4;

        let proteinPercentage = 0;
        let fatPercentage = 0;
        let carbPercentage = 0;
        if (this.calories != 0)
        {
            proteinPercentage = caloriesFromProtein/this.calories * 100;
            fatPercentage = caloriesFromFat/this.calories * 100;
            carbPercentage = caloriesFromCarbs/this.calories * 100;
        }
        this.macros = new Macros(proteinPercentage, fatPercentage, carbPercentage);
    }
    displayMacroChart()
    {
        const divWrapper = document.createElement("div");
        divWrapper.className = "macro-wrapper";
        const div = document.createElement("div");
        div.className = "macros";
        const p1 = document.createElement("p");
        p1.textContent = `Fat/Carbs/Protein: ${this.macros.fat.toFixed(0)}%/${this.macros.carbs.toFixed(0)}%/${this.macros.protein.toFixed(0)}%`;
        const divMacros = document.createElement("div");
        divMacros.className = "macro-percents";
        
        const fatMacros = document.createElement("div");
        fatMacros.className = "fat-placeholder";
        fatMacros.style.flex = `0 0 ${this.macros.fat}`;
        const carbMacros = document.createElement("div");
        carbMacros.className = "carb-placeholder";
        carbMacros.style.flex = `0 0 ${this.macros.carbs}`;
        const proteinMacros = document.createElement("div");
        proteinMacros.className = "protein-placeholder";
        proteinMacros.style.flex = `0 0 ${this.macros.protein}`;
        
        //TODO add extra calories
        // const extraCalories = document.createElement("div");
        // extraCalories.className = "extra-placeholder";
        divWrapper.appendChild(divMacros);
        // divWrapper.appendChild(extraCalories);

        divMacros.appendChild(fatMacros);
        divMacros.appendChild(carbMacros);
        divMacros.appendChild(proteinMacros);

        div.appendChild(p1);
        div.appendChild(divWrapper);
        const totalCalories = this.calories;
        const calorieGoal = getCalorieTargetFromLocalStorage(calorieGoalKey);

        //TODO Add red for over calorie target
        //make the width bigger than the total by the percent over;

        return div;
    }
}

export class Macros
{
    constructor(protein, fat, carbs)
    {
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }

}