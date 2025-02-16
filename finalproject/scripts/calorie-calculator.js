import { calorieGoalKey } from "./constants.js";
export function saveCalorieTargetToLocalStorage(calorieGoal)
{
    window.localStorage.setItem(calorieGoalKey, calorieGoal);
}

export function getCalorieTargetFromLocalStorage(calorieGoal)
{
    return Number(window.localStorage.getItem(calorieGoalKey, calorieGoal));
}